import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

// Interfaz genérica del cliente HTTP para desacoplar la app de la librería
export interface HttpClient {
  get<T = unknown>(
    url: string,
    config?: RequestConfig,
  ): Promise<HttpResponse<T>>;
  // Futuro: post, put, patch, delete...
}

// Tipos genéricos para requests/responses
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestConfig {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeoutMs?: number;
  signal?: AbortSignal; // soportado por Axios >= 1.x
}

export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

// Error normalizado a exponer hacia la app, independiente de Axios
export class HttpError extends Error {
  public readonly status?: number;
  public readonly cause?: unknown;

  constructor(message: string, options?: { status?: number; cause?: unknown }) {
    super(message);
    this.name = "HttpError";
    this.status = options?.status;
    this.cause = options?.cause;
  }
}

// Implementación basada en Axios
export class AxiosHttpClient implements HttpClient {
  private readonly instance: AxiosInstance;

  constructor(options?: {
    baseURL?: string;
    headers?: Record<string, string>;
    timeoutMs?: number;
  }) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: options?.baseURL,
      headers: options?.headers,
      timeout: options?.timeoutMs,
    };
    this.instance = axios.create(axiosConfig);

    // Interceptor de respuesta para normalizar errores
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "HTTP request failed";
        return Promise.reject(new HttpError(message, { status, cause: error }));
      },
    );
  }

  async get<T = unknown>(
    url: string,
    config?: RequestConfig,
  ): Promise<HttpResponse<T>> {
    try {
      const res = await this.instance.get<T>(url, {
        params: config?.params,
        headers: config?.headers,
        timeout: config?.timeoutMs,
        signal: config?.signal,
      });
      return {
        data: res.data,
        status: res.status,
        headers: (res.headers ?? {}) as Record<string, string>,
      };
    } catch (err) {
      if (err instanceof HttpError) throw err;

      const status =
        // @ts-expect-error axios error shape
        err?.response?.status ?? undefined;
      const message =
        // @ts-expect-error axios error shape
        err?.response?.data?.message || (err as Error)?.message || "HTTP error";
      throw new HttpError(message, { status, cause: err });
    }
  }
}

// Factoría para obtener una instancia de HttpClient; punto único de cambio de estrategia
function createHttpClient(options?: {
  baseURL?: string;
  headers?: Record<string, string>;
  timeoutMs?: number;
}): HttpClient {
  return new AxiosHttpClient(options);
}

export const AxiosClient = createHttpClient({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: { Authorization: "Bearer ..." },
});

// Uso recomendado en la app:
// const AxiosClient = createHttpClient({ baseURL: 'https://api.example.com', headers: { Authorization: 'Bearer ...' } });
// const res = await AxiosClient.get<User[]>('/users', { params: { page: 1 } });
// console.log(res.data);
