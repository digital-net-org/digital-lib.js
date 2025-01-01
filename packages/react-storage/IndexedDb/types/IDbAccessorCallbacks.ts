export interface IDbAccessorCallbacks {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    onResolve?: () => void;
}
