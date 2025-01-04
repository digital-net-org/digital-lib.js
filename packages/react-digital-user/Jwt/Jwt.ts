import { safeParse } from '../../core';
import { type JwtContent } from './JwtContent';
import { type DecodedJwt } from './DecodedJwt';

interface DecodedJwtRaw extends Omit<DecodedJwt, 'content'> {
    Content: string;
}

export default class Jwt {
    public static decode(token: string | null | undefined): DecodedJwt | null {
        if (!token) return null;
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const jwt = safeParse<DecodedJwtRaw>(
            decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join(''),
            ),
        );
        return jwt ? { ...Jwt.buildContent(jwt), token } : null;
    }

    public static isExpired(exp: string, threshold?: number): boolean {
        const decoded = Jwt.decode(exp);
        if (!decoded) return true;
        return decoded.exp - Math.floor(Date.now() / 1000) < (threshold ?? 1);
    }

    private static buildContent(decoded: DecodedJwtRaw): DecodedJwt {
        return {
            ...decoded,
            content: safeParse<JwtContent>(decoded.Content.toLowerCase())!,
        };
    }
}
