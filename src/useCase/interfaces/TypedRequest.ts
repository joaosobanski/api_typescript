
export interface TypedRequest<T> extends Express.Request {
    body: T;
    headers: T;
    query: T;
}