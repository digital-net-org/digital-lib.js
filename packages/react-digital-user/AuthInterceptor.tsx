import React from 'react';
import { type Result } from '../core';
import { LocalStorage } from '../react-digital';
import { useDigitalClient } from '../react-digital-client';
import { Jwt } from './Jwt';
import { DigitalUserContext } from './DigitalUserProvider';
import type { StoredDigitalUser } from './StoredDigitalUser';

export default function AuthInterceptor() {
    const { axiosInstance } = useDigitalClient();
    const { update, remove, authStorageKey, refreshTokenApi } = React.useContext(DigitalUserContext);

    React.useEffect(() => {
        const onRequest = axiosInstance.interceptors.request.use(
            async (config) => {
                const user = LocalStorage.get<StoredDigitalUser>(authStorageKey);
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
                const isRefreshing = originalRequest.url === refreshTokenApi.endpoint;

                if (isRefreshing) {
                    remove();
                    return Promise.reject(error);
                }

                if (!isUnauthorized || originalRequest._retry === true) {
                    return Promise.reject(error);
                }

                originalRequest._retry = true;
                const { status, data } = await axiosInstance.request<Result<string>>({
                    method: refreshTokenApi.method,
                    url: refreshTokenApi.endpoint,
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
    }, [
        authStorageKey,
        axiosInstance,
        refreshTokenApi.endpoint,
        refreshTokenApi.method,
        remove,
        update,
    ]);

    return null;
}
