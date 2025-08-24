// Base API Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// User Types
export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Appointment Types
export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  doctor?: Doctor;
  patient?: Patient;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentRange {
  startDate: string;
  endDate: string;
}

// Availability Types
export interface AvailabilitySlot {
  id: string;
  doctorId: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isActive: boolean;
}

export interface ScheduleBlock {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  reason?: string;
  type: "vacation" | "break" | "meeting" | "other";
}

export interface AvailableSlot {
  date: string;
  time: string;
  available: boolean;
}

// Request Types
export interface CreateDoctorRequest {
  name: string;
  email: string;
  specialization: string;
}

export interface UpdateDoctorRequest {
  name?: string;
  email?: string;
  specialization?: string;
  isActive?: boolean;
}

export interface CreateAvailabilityRequest {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface CreateScheduleBlockRequest {
  date: string;
  startTime: string;
  endTime: string;
  reason?: string;
  type: "vacation" | "break" | "meeting" | "other";
}

export interface CreateAppointmentRequest {
  doctorId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface UpdateAppointmentStatusRequest {
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

// Query Parameters
export interface GetAppointmentsRangeParams {
  startDate: string;
  endDate: string;
  doctorId?: string;
  status?: string;
}

export interface GetAvailableSlotsParams {
  date?: string;
  days?: number; // Number of days to look ahead
}

export interface SearchDoctorsParams {
  specialization?: string;
  search?: string;
}
