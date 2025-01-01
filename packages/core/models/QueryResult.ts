import { type Result } from './Result';

export interface QueryResult<T> extends Result<Array<T>> {
    count: number;
    end: boolean;
    index: number;
    pages: number;
    size: number;
    total: number;
}
