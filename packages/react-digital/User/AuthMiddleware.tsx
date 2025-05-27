import React from 'react';
import { type Result } from '@digital-lib/dto';
import { skipRefreshHeader, DigitalClient } from '@digital-lib/react-digital-client';
import { useJwt } from './User';

const refreshTokenUrl = `${DIGITAL_API_URL}/authentication/user/refresh`;

export default function AuthMiddleware() {
    const [token, setToken] = useJwt();

    React.useEffect(() => {
        const disposeReqHandler = DigitalClient.setRequestHandler(async req => {
            if (token) req.headers['Authorization'] = `Bearer ${token}`;
            return req;
        });
        const disposeResHandler = DigitalClient.setResponseHandler(
            response => response,
            async (error, response, originalRequest) => {
                const isUnauthorized = response.status === 401;
                const skipRefresh = originalRequest.headers?.[skipRefreshHeader] === 'true';

                if (!isUnauthorized || !token || skipRefresh) {
                    return Promise.resolve(response);
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
                const { status, data } = await DigitalClient.request<Result<string>>({
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
                return DigitalClient.request(originalRequest);
            }
        );
        return () => {
            disposeReqHandler();
            disposeResHandler();
        };
    }, [setToken, token]);

    return <React.Fragment />;
}
