"use server";

import jwt from "jsonwebtoken";

interface ContactFormData {
  nombre: string;
  email: string;
  localidad: string;
  mensaje: string;
  captchaToken: string;
  captchaInput: string;
}

interface CaptchaTokenResponse {
  token: string;
  imageUrl: string;
}

/**
 * Generate JWT token for server-side API calls
 */
function generateServerJWT(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  const payload = {
    iss: "landing-server",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour expiration
  };

  return jwt.sign(payload, secret);
}

/**
 * Get JWT token for client-side use
 */
export async function getClientJWT(): Promise<string | null> {
  try {
    const token = generateServerJWT();
    return token;
  } catch (error) {
    console.error("Error generating client JWT:", error);
    return null;
  }
}

/**
 * Get captcha token from API (server-side)
 */
export async function getCaptchaToken(): Promise<CaptchaTokenResponse | null> {
  try {
    const captchaBaseUrl = process.env.NEXT_PUBLIC_API_CAPTCHA_URL;

    if (!captchaBaseUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_CAPTCHA_URL environment variable is not set"
      );
    }

    const captchaUrl = `${captchaBaseUrl}/captcha/token`;

    const response = await fetch(captchaUrl, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      console.error("Failed to fetch captcha token:", response.status);
      const errorText = await response.text();
      console.error("Error response:", errorText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching captcha token:", error);
    return null;
  }
}

/**
 * Get captcha token from API (client-side)
 */
export async function getCaptchaTokenClient(): Promise<CaptchaTokenResponse | null> {
  try {
    const captchaBaseUrl = process.env.NEXT_PUBLIC_API_CAPTCHA_URL;

    if (!captchaBaseUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_CAPTCHA_URL environment variable is not set"
      );
    }

    const captchaUrl = `${captchaBaseUrl}/captcha/token`;

    console.log("DEBUG: Client captcha URL:", captchaUrl);

    const response = await fetch(captchaUrl, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      console.error("Failed to fetch captcha token (client):", response.status);
      const errorText = await response.text();
      console.error("Client error response:", errorText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching captcha token (client):", error);
    // Return a mock response for development when captcha server is unavailable
    if (error instanceof Error && error.message.includes("fetch failed")) {
      console.warn(
        "Captcha server appears to be unavailable. Using mock captcha for development."
      );
      return {
        token: "mock-token-" + Date.now(),
        imageUrl: "/captcha/image/mock-token"
      };
    }
    return null;
  }
}

/**
 * Submit contact form with captcha validation
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<{ success: boolean; message: string }> {
  try {
    const token = generateServerJWT();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_BASE_URL environment variable is not set"
      );
    }

    const payload = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: "", // Empty string as requested
      asunto: "Consulta Web", // Hardcoded as requested
      mensaje: formData.mensaje,
      captchaToken: formData.captchaToken,
      captchaInput: formData.captchaInput,
      website: "" // Empty string as requested
    };

    const contactUrl = `${baseUrl}/contact`;

    const response = await fetch(contactUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message:
          errorData.message ||
          "Error al enviar el formulario. Por favor, inténtalo de nuevo."
      };
    }

    const data = await response.json();
    return {
      success: true,
      message:
        data.message ||
        "¡Gracias por tu mensaje! Hemos recibido tu consulta y te responderemos pronto."
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message: "Error de conexión. Por favor, inténtalo de nuevo."
    };
  }
}
