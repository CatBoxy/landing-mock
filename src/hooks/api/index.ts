// Export all API hooks for easy importing
export * from "./useAdmin";
export * from "./useDoctor";
export * from "./usePatient";

// Re-export API clients for direct usage if needed
export { adminApi } from "@/lib/api/admin";
export { doctorApi } from "@/lib/api/doctor";
export { patientApi } from "@/lib/api/patient";
export { apiClient, handleApiError } from "@/lib/api-client";

// Re-export types
export * from "@/types/api";
