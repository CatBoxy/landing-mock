export interface SigninRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export class AuthError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Client-side authentication service
 *
 * Note: User registration is handled manually via direct API calls for security.
 * To create new admin users, use POST /api/auth/signup with:
 * {
 *   "username": "admin",
 *   "email": "admin@example.com",
 *   "password": "password",
 *   "firstName": "Admin",
 *   "lastName": "User"
 * }
 */
export class AuthService {
  private static readonly TOKEN_KEY = "auth-token";
  private static readonly USER_KEY = "auth-user";

  /**
   * Sign in user
   */
  static async signin(data: SigninRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new AuthError(
          errorData.message || "Credenciales incorrectas",
          response.status
        );
      }

      const authData: AuthResponse = await response.json();
      // Store auth data in localStorage
      this.setAuthData(authData);

      return authData;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError("Error de conexión. Inténtalo de nuevo.");
    }
  }

  /**
   * Store authentication data in localStorage
   */
  static setAuthData(authData: AuthResponse): void {
    const user: User = {
      id: authData.id,
      username: authData.username,
      email: authData.email,
      roles: authData.roles
    };

    localStorage.setItem(this.TOKEN_KEY, authData.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Clear authentication data
   */
  static clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Get current user from localStorage
   */
  static getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(this.USER_KEY);
      if (!userStr) return null;
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }

  /**
   * Get auth token from localStorage
   */
  static getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    const token = this.getAuthToken();
    return !!(user && token);
  }

  /**
   * Check if user has admin role
   */
  static isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.roles.includes("ROLE_USER") || false; // Using ROLE_USER as admin role
  }

  /**
   * Get authorization header for API calls
   */
  static getAuthHeader(): Record<string, string> {
    const token = this.getAuthToken();
    if (!token) return {};

    return {
      Authorization: `Bearer ${token}`
    };
  }

  /**
   * Make authenticated API call
   */
  static async authenticatedFetch(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const authHeaders = this.getAuthHeader();

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...options.headers
      }
    });
    console.log(response);

    // If token is expired or invalid, clear auth data
    if (response.status === 401) {
      this.clearAuthData();
      throw new AuthError(
        "Sesión expirada. Por favor, inicia sesión nuevamente.",
        401
      );
    }

    return response;
  }

  /**
   * Logout user
   */
  static logout(): void {
    this.clearAuthData();
  }
}
