import { apiClient } from "@/lib/api-client";
import {
  ApiResponse,
  AvailabilitySlot,
  ScheduleBlock,
  Appointment,
  CreateAvailabilityRequest,
  CreateScheduleBlockRequest,
  UpdateAppointmentStatusRequest
} from "@/types/api";

// Doctor API - Availability Management
export const doctorAvailabilityApi = {
  // POST /api/doctor/availability - Configure available hours
  async createAvailability(
    data: CreateAvailabilityRequest
  ): Promise<ApiResponse<AvailabilitySlot>> {
    return apiClient.post<AvailabilitySlot>("/api/doctor/availability", data);
  },

  // GET /api/doctor/availability - Get my availability schedule
  async getAvailability(): Promise<ApiResponse<AvailabilitySlot[]>> {
    return apiClient.get<AvailabilitySlot[]>("/api/doctor/availability");
  },

  // PUT /api/doctor/availability/{id} - Update availability slot
  async updateAvailability(
    id: string,
    data: Partial<CreateAvailabilityRequest>
  ): Promise<ApiResponse<AvailabilitySlot>> {
    return apiClient.put<AvailabilitySlot>(
      `/api/doctor/availability/${id}`,
      data
    );
  },

  // DELETE /api/doctor/availability/{id} - Remove availability slot
  async deleteAvailability(
    id: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(
      `/api/doctor/availability/${id}`
    );
  }
};

// Doctor API - Schedule Blocks Management
export const doctorScheduleBlocksApi = {
  // POST /api/doctor/schedule-blocks - Create schedule blocks (vacation, breaks, etc.)
  async createScheduleBlock(
    data: CreateScheduleBlockRequest
  ): Promise<ApiResponse<ScheduleBlock>> {
    return apiClient.post<ScheduleBlock>("/api/doctor/schedule-blocks", data);
  },

  // GET /api/doctor/schedule-blocks - Get my schedule blocks
  async getScheduleBlocks(params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<ScheduleBlock[]>> {
    return apiClient.get<ScheduleBlock[]>(
      "/api/doctor/schedule-blocks",
      params
    );
  },

  // PUT /api/doctor/schedule-blocks/{id} - Update schedule block
  async updateScheduleBlock(
    id: string,
    data: Partial<CreateScheduleBlockRequest>
  ): Promise<ApiResponse<ScheduleBlock>> {
    return apiClient.put<ScheduleBlock>(
      `/api/doctor/schedule-blocks/${id}`,
      data
    );
  },

  // DELETE /api/doctor/schedule-blocks/{id} - Remove schedule block
  async deleteScheduleBlock(
    id: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(
      `/api/doctor/schedule-blocks/${id}`
    );
  }
};

// Doctor API - Appointments Management
export const doctorAppointmentsApi = {
  // GET /api/doctor/appointments - Get my appointments
  async getAppointments(params?: {
    date?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  }): Promise<ApiResponse<Appointment[]>> {
    return apiClient.get<Appointment[]>("/api/doctor/appointments", params);
  },

  // PUT /api/doctor/appointments/{id}/status - Update appointment status
  async updateAppointmentStatus(
    id: string,
    data: UpdateAppointmentStatusRequest
  ): Promise<ApiResponse<Appointment>> {
    return apiClient.put<Appointment>(
      `/api/doctor/appointments/${id}/status`,
      data
    );
  },

  // GET /api/doctor/appointments/{id} - Get specific appointment details
  async getAppointment(id: string): Promise<ApiResponse<Appointment>> {
    return apiClient.get<Appointment>(`/api/doctor/appointments/${id}`);
  }
};

// Combined doctor API object
export const doctorApi = {
  availability: doctorAvailabilityApi,
  scheduleBlocks: doctorScheduleBlocksApi,
  appointments: doctorAppointmentsApi
};

// Default export
export default doctorApi;
