// Main API exports for easy importing
export { adminApi } from "./admin";
export { doctorApi } from "./doctor";
export { patientApi } from "./patient";
export {
  apiClient,
  ApiClientError,
  handleApiError,
  swrErrorHandler
} from "../api-client";

// Re-export types
export * from "@/types/api";
