import React from 'react';
import { type Result } from '@digital-lib/dto';
import { useDigitalClient, skipRefreshHeader } from '@digital-lib/react-digital-client';
import { useJwt } from './User';

const refreshTokenUrl = `${CORE_API_URL}/authentication/user/refresh`;

export default function AuthMiddleware() {
    const { axiosInstance } = useDigitalClient();
    const [token, setToken] = useJwt();

    React.useEffect(() => {
        const onRequest = axiosInstance.interceptors.request.use(
            async req => {
                if (token) req.headers['Authorization'] = `Bearer ${token}`;
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
                const skipRefresh = originalRequest.headers?.[skipRefreshHeader] === 'true';

                if (!isUnauthorized || !token || skipRefresh) {
                    return Promise.resolve(error.response);
                }

                const isRefreshing = originalRequest.url === refreshTokenUrl;

                if (isRefreshing) {
                    setToken(undefined);
                    return Promise.reject(error);
                }

                if (!isUnauthorized || originalRequest._retry === true) {
                    return Promise.reject(error);
                }

                originalRequest._retry = true;
                const { status, data } = await axiosInstance.request<Result<string>>({
                    method: 'POST',
                    url: refreshTokenUrl,
                    withCredentials: true,
                });
                if (status !== 200 || !data.value) {
                    setToken(undefined);
                    return Promise.reject(error);
                }
                setToken(data.value);
                originalRequest.headers['Authorization'] = `Bearer ${data.value}`;
                return axiosInstance.request(originalRequest);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(onRequest);
            axiosInstance.interceptors.response.eject(onResponse);
        };
    }, [axiosInstance, setToken, token]);

    return <React.Fragment />;
}
