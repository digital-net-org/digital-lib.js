import React from 'react';
import { type Result } from '../../core';
import { LocalStorage } from '../../react-storage';
import { Jwt } from '../utils';
import useDigitalClient from '../useDigitalClient';
import { AppUserContext } from './AppUserProvider';
import type { StoredAppUser } from './StoredAppUser';

export default function AuthInterceptor() {
    const { axiosInstance, authConfig } = useDigitalClient();
    const { update, remove } = React.useContext(AppUserContext);

    React.useEffect(() => {
        const onRequest = axiosInstance.interceptors.request.use(
            async (config) => {
                const user = LocalStorage.get<StoredAppUser>(authConfig.authStorageKey);
                if (user?.token) config.headers['Authorization'] = `Bearer ${user.token}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        const onResponse = axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const originalRequest = error.config;
                const isUnauthorized = error.response?.status === 401;
                const isRefreshing = originalRequest.url === authConfig.refreshTokenApi.endpoint;

                if (isRefreshing) {
                    remove();
                    return Promise.reject(error);
                }

                if (!isUnauthorized || originalRequest._retry === true) {
                    return Promise.reject(error);
                }

                originalRequest._retry = true;
                const { status, data } = await axiosInstance.request<Result<string>>({
                    method: authConfig.refreshTokenApi.method,
                    url: authConfig.refreshTokenApi.endpoint,
                    withCredentials: true,
                });
                if (status !== 200 || !data.value) {
                    remove();
                    return Promise.reject(error);
                }
                const token = { ...Jwt.decode(data.value), token: data.value };
                update({
                    ...token.content,
                    token: token.token,
                });

                originalRequest.headers['Authorization'] = `Bearer ${token.token}`;
                return axiosInstance.request(originalRequest);
            },
        );

        return () => {
            axiosInstance.interceptors.request.eject(onRequest);
            axiosInstance.interceptors.response.eject(onResponse);
        };
    }, [axiosInstance, authConfig, remove, update]);

    return null;
}
