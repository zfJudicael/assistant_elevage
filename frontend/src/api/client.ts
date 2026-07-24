// Generic HTTP client used by every API service module in src/api.
//
// The base URL is read from the VITE_API_BASE_URL environment variable
// (see .env.example) so it's trivial to point this app at a real backend
// later without touching any component code — only this file (and the
// env var) needs to change.

const BASE_URL: string = "http://127.0.0.1:8000";

export class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    signal?: AbortSignal;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, signal } = options;

    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal,
    });

    if (!res.ok) {
        let message = res.statusText;
        try {
            const data = await res.json();
            message = data?.message || message;
        } catch {
            // response wasn't JSON, keep default message
        }
        throw new ApiError(message, res.status);
    }

    // Some endpoints (e.g. DELETE) may not return a body.
    const text = await res.text();
    return (text ? JSON.parse(text) : undefined) as T;
}

export const apiClient = {
    get: <T>(path: string, signal?: AbortSignal) => request<T>(path, { method: "GET", signal }),
    post: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
        request<T>(path, { method: "POST", body, signal }),
    put: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
        request<T>(path, { method: "PUT", body, signal }),
    patch: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
        request<T>(path, { method: "PATCH", body, signal }),
    delete: <T>(path: string, signal?: AbortSignal) =>
        request<T>(path, { method: "DELETE", signal }),
};
