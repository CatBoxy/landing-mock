"use client";

import { useState, useCallback } from "react";
import { getCaptchaTokenClient } from "@/app/actions/contact";

interface CaptchaState {
  token: string | null;
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useCaptcha() {
  const [captchaState, setCaptchaState] = useState<CaptchaState>({
    token: null,
    imageUrl: null,
    isLoading: false,
    error: null
  });

  const generateCaptcha = useCallback(async () => {
    setCaptchaState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await getCaptchaTokenClient();

      if (result) {
        setCaptchaState({
          token: result.token,
          imageUrl: result.imageUrl,
          isLoading: false,
          error: null
        });
      } else {
        setCaptchaState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Error al generar el captcha. Por favor, inténtalo de nuevo."
        }));
      }
    } catch {
      setCaptchaState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error de conexión. Por favor, inténtalo de nuevo."
      }));
    }
  }, []);

  const refreshCaptcha = useCallback(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const clearCaptcha = useCallback(() => {
    setCaptchaState({
      token: null,
      imageUrl: null,
      isLoading: false,
      error: null
    });
  }, []);

  return {
    captchaState,
    generateCaptcha,
    refreshCaptcha,
    clearCaptcha
  };
}
