import { apiClient } from "@/lib/api-client";
import {
  ApiResponse,
  Doctor,
  Appointment,
  AvailableSlot,
  CreateAppointmentRequest,
  SearchDoctorsParams,
  GetAvailableSlotsParams
} from "@/types/api";

// Patient API - Doctors Search
export const patientDoctorsApi = {
  // GET /api/patient/doctors - Search and list doctors
  async getDoctors(
    params?: SearchDoctorsParams
  ): Promise<ApiResponse<Doctor[]>> {
    return apiClient.get<Doctor[]>("/api/patient/doctors", params);
  },

  // GET /api/patient/doctors/{id} - Get specific doctor details
  async getDoctor(id: string): Promise<ApiResponse<Doctor>> {
    return apiClient.get<Doctor>(`/api/patient/doctors/${id}`);
  },

  // GET /api/patient/doctors/{id}/available-slots - Get doctor's available time slots
  async getAvailableSlots(
    id: string,
    params?: GetAvailableSlotsParams
  ): Promise<ApiResponse<AvailableSlot[]>> {
    return apiClient.get<AvailableSlot[]>(
      `/api/patient/doctors/${id}/available-slots`,
      params
    );
  }
};

// Patient API - Appointments Management
export const patientAppointmentsApi = {
  // POST /api/patient/appointments - Book an appointment
  async createAppointment(
    data: CreateAppointmentRequest
  ): Promise<ApiResponse<Appointment>> {
    return apiClient.post<Appointment>("/api/patient/appointments", data);
  },

  // GET /api/patient/appointments - Get my appointments
  async getAppointments(params?: {
    status?: string;
    upcoming?: boolean;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<Appointment[]>> {
    return apiClient.get<Appointment[]>("/api/patient/appointments", params);
  },

  // GET /api/patient/appointments/{id} - Get specific appointment details
  async getAppointment(id: string): Promise<ApiResponse<Appointment>> {
    return apiClient.get<Appointment>(`/api/patient/appointments/${id}`);
  },

  // DELETE /api/patient/appointments/{id} - Cancel appointment
  async cancelAppointment(
    id: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(
      `/api/patient/appointments/${id}`
    );
  },

  // PUT /api/patient/appointments/{id} - Update appointment (reschedule)
  async updateAppointment(
    id: string,
    data: { date?: string; time?: string; notes?: string }
  ): Promise<ApiResponse<Appointment>> {
    return apiClient.put<Appointment>(`/api/patient/appointments/${id}`, data);
  }
};

// Combined patient API object
export const patientApi = {
  doctors: patientDoctorsApi,
  appointments: patientAppointmentsApi
};

// Default export
export default patientApi;
