import { apiClient } from "@/lib/api-client";
import {
  ApiResponse,
  Doctor,
  Appointment,
  CreateDoctorRequest,
  UpdateDoctorRequest,
  GetAppointmentsRangeParams
} from "@/types/api";

// Admin API - Doctors Management
export const adminDoctorsApi = {
  // POST /api/admin/doctors - Create doctor
  async createDoctor(data: CreateDoctorRequest): Promise<ApiResponse<Doctor>> {
    return apiClient.post<Doctor>("/api/admin/doctors", data);
  },

  // GET /api/admin/doctors - List all doctors
  async getDoctors(): Promise<ApiResponse<Doctor[]>> {
    return apiClient.get<Doctor[]>("/api/admin/doctors");
  },

  // PUT /api/admin/doctors/{id} - Update doctor
  async updateDoctor(
    id: string,
    data: UpdateDoctorRequest
  ): Promise<ApiResponse<Doctor>> {
    return apiClient.put<Doctor>(`/api/admin/doctors/${id}`, data);
  },

  // DELETE /api/admin/doctors/{id} - Deactivate doctor
  async deactivateDoctor(
    id: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/api/admin/doctors/${id}`);
  }
};

// Admin API - Appointments Management
export const adminAppointmentsApi = {
  // GET /api/admin/appointments - Get all appointments
  async getAppointments(): Promise<ApiResponse<Appointment[]>> {
    return apiClient.get<Appointment[]>("/api/admin/appointments");
  },

  // GET /api/admin/appointments/range - Get appointments by date range
  async getAppointmentsByRange(
    params: GetAppointmentsRangeParams
  ): Promise<ApiResponse<Appointment[]>> {
    return apiClient.get<Appointment[]>(
      "/api/admin/appointments/range",
      params
    );
  }
};

// Combined admin API object
export const adminApi = {
  doctors: adminDoctorsApi,
  appointments: adminAppointmentsApi
};

// Default export
export default adminApi;
