export interface DecodedJwt<T = any> {
    content: T;
    token: string;
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
}
