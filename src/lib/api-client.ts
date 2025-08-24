import { ApiResponse, ApiError } from "@/types/api";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Custom error class for API errors
export class ApiClientError extends Error {
  public status: number;
  public code?: string;
  public details?: any;

  constructor(message: string, status: number, code?: string, details?: any) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// Request configuration interface
interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

// Helper function to build URL with query parameters
function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

// Base API client class
class ApiClient {
  private defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json"
  };

  // Set authorization token (for future auth implementation)
  setAuthToken(token: string) {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  // Remove authorization token
  removeAuthToken() {
    delete this.defaultHeaders.Authorization;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchConfig } = config;

    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
      ...fetchConfig,
      headers: {
        ...this.defaultHeaders,
        ...fetchConfig.headers
      }
    });

    // Handle non-JSON responses or network errors
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      let errorCode = response.status.toString();
      let errorDetails: any = null;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        errorCode = errorData.code || errorCode;
        errorDetails = errorData.details || errorDetails;
      } catch {
        // If response is not JSON, use default error message
      }

      throw new ApiClientError(
        errorMessage,
        response.status,
        errorCode,
        errorDetails
      );
    }

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      throw new ApiClientError(
        "Invalid JSON response from server",
        response.status,
        "INVALID_JSON"
      );
    }
  }

  // HTTP Methods
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET", params });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    params?: Record<string, string | number | boolean | undefined>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      params,
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    params?: Record<string, string | number | boolean | undefined>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      params,
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async delete<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE", params });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    params?: Record<string, string | number | boolean | undefined>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      params,
      body: data ? JSON.stringify(data) : undefined
    });
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient();

// Export the class for potential custom instances
export { ApiClient };

// Utility function to handle API errors in components
export function handleApiError(error: unknown): string {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}

// SWR error handler
export function swrErrorHandler(error: any) {
  console.error("SWR Error:", error);

  if (error instanceof ApiClientError) {
    // You can add specific error handling logic here
    // For example, redirect to login on 401 errors
    if (error.status === 401) {
      // Handle unauthorized access
      console.log("Unauthorized access - consider redirecting to login");
    }
  }

  return error;
}
