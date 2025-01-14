import React from 'react';
import { type Result } from '../../core';
import { LocalStorage } from '../../react-digital';
import { useDigitalClient } from '../../react-digital-client';
import { Jwt } from '../Jwt';
import { type StoredDigitalUser, useStoredDigitalUser } from '../DigitalUser';
import { type DigitalUserConfig } from '../config';

export default function AuthInterceptor({ authStorageKey, userApi }: DigitalUserConfig) {
    const { axiosInstance } = useDigitalClient();
    const { deleteStoredUser, updateStoredUser } = useStoredDigitalUser(authStorageKey);

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

                if (!isUnauthorized) {
                    return Promise.resolve(error.response);
                }

                const isRefreshing = originalRequest.url === userApi.refreshToken;

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
                    url: userApi.refreshToken,
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
            },
        );

        return () => {
            axiosInstance.interceptors.request.eject(onRequest);
            axiosInstance.interceptors.response.eject(onResponse);
        };
    }, [
        authStorageKey,
        axiosInstance,
        userApi,
        updateStoredUser,
        deleteStoredUser,
    ]);

    return null;
}
