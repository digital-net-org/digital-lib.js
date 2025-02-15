import React from 'react';
import { type Result } from '../../core';
import { LocalStorage } from '../../react-digital';
import { useDigitalClient } from '../../react-digital-client';
import { type StoredDigitalUser, useStoredDigitalUser } from '../DigitalUser';
import { Jwt } from '../Jwt';
import { config } from '../config';

export default function AuthInterceptor() {
    const { axiosInstance } = useDigitalClient();
    const { deleteStoredUser, updateStoredUser } = useStoredDigitalUser(config.authStorageKey);

    React.useEffect(() => {
        const onRequest = axiosInstance.interceptors.request.use(
            async req => {
                const user = LocalStorage.get<StoredDigitalUser>(config.authStorageKey);
                if (user?.token) req.headers['Authorization'] = `Bearer ${user.token}`;
                return req;
            },
            error => {
                return Promise.reject(error);
            }
        );

        const onResponse = axiosInstance.interceptors.response.use(
            response => {
                return response;
            },
            async error => {
                const originalRequest = error.config;
                const isUnauthorized = error.response?.status === 401;

                if (!isUnauthorized) {
                    return Promise.resolve(error.response);
                }

                const isRefreshing = originalRequest.url === config.userApi.refreshToken;

                if (isRefreshing) {
                    deleteStoredUser();
                    return Promise.reject(error);
                }

                if (!isUnauthorized || originalRequest._retry === true) {
                    return Promise.reject(error);
                }

                originalRequest._retry = true;
                const { status, data } = await axiosInstance.request<Result<string>>({
                    method: 'POST',
                    url: config.userApi.refreshToken,
                    withCredentials: true,
                });
                if (status !== 200 || !data.value) {
                    deleteStoredUser();
                    return Promise.reject(error);
                }
                const token = { ...Jwt.decode(data.value), token: data.value };
                updateStoredUser({
                    ...token.content,
                    token: token.token,
                });

                originalRequest.headers['Authorization'] = `Bearer ${token.token}`;
                return axiosInstance.request(originalRequest);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(onRequest);
            axiosInstance.interceptors.response.eject(onResponse);
        };
    }, [axiosInstance, updateStoredUser, deleteStoredUser]);

    return null;
}
