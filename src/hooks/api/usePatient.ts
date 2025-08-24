import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { patientApi } from "@/lib/api/patient";
import { swrErrorHandler } from "@/lib/api-client";
import {
  Doctor,
  Appointment,
  AvailableSlot,
  CreateAppointmentRequest,
  SearchDoctorsParams,
  GetAvailableSlotsParams
} from "@/types/api";

// SWR Keys for patient endpoints
export const PATIENT_SWR_KEYS = {
  doctors: "/api/patient/doctors",
  doctorsWithParams: (params?: SearchDoctorsParams) =>
    `/api/patient/doctors?${new URLSearchParams(params as any).toString()}`,
  doctor: (id: string) => `/api/patient/doctors/${id}`,
  availableSlots: (id: string, params?: GetAvailableSlotsParams) =>
    `/api/patient/doctors/${id}/available-slots?${new URLSearchParams(
      params as any
    ).toString()}`,
  appointments: "/api/patient/appointments",
  appointmentsWithParams: (params?: {
    status?: string;
    upcoming?: boolean;
    startDate?: string;
    endDate?: string;
  }) =>
    `/api/patient/appointments?${new URLSearchParams(
      params as any
    ).toString()}`,
  appointment: (id: string) => `/api/patient/appointments/${id}`
} as const;

// Patient Doctors Hooks
export function usePatientDoctors(params?: SearchDoctorsParams) {
  const key = params
    ? PATIENT_SWR_KEYS.doctorsWithParams(params)
    : PATIENT_SWR_KEYS.doctors;

  return useSWR(
    key,
    () => patientApi.doctors.getDoctors(params).then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

export function usePatientDoctor(id: string) {
  return useSWR(
    PATIENT_SWR_KEYS.doctor(id),
    () => patientApi.doctors.getDoctor(id).then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

export function useDoctorAvailableSlots(
  id: string,
  params?: GetAvailableSlotsParams
) {
  return useSWR(
    PATIENT_SWR_KEYS.availableSlots(id, params),
    () =>
      patientApi.doctors.getAvailableSlots(id, params).then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

// Patient Appointments Hooks
export function usePatientAppointments(params?: {
  status?: string;
  upcoming?: boolean;
  startDate?: string;
  endDate?: string;
}) {
  const key = params
    ? PATIENT_SWR_KEYS.appointmentsWithParams(params)
    : PATIENT_SWR_KEYS.appointments;

  return useSWR(
    key,
    () =>
      patientApi.appointments.getAppointments(params).then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

export function usePatientAppointment(id: string) {
  return useSWR(
    PATIENT_SWR_KEYS.appointment(id),
    () => patientApi.appointments.getAppointment(id).then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

export function useCreateAppointment() {
  return useSWRMutation(
    PATIENT_SWR_KEYS.appointments,
    async (url: string, { arg }: { arg: CreateAppointmentRequest }) => {
      const response = await patientApi.appointments.createAppointment(arg);
      return response.data;
    },
    {
      onError: swrErrorHandler
    }
  );
}

export function useCancelAppointment() {
  return useSWRMutation(
    PATIENT_SWR_KEYS.appointments,
    async (url: string, { arg }: { arg: string }) => {
      const response = await patientApi.appointments.cancelAppointment(arg);
      return response.data;
    },
    {
      onError: swrErrorHandler
    }
  );
}

export function useUpdateAppointment() {
  return useSWRMutation(
    PATIENT_SWR_KEYS.appointments,
    async (
      url: string,
      {
        arg
      }: {
        arg: {
          id: string;
          data: { date?: string; time?: string; notes?: string };
        };
      }
    ) => {
      const response = await patientApi.appointments.updateAppointment(
        arg.id,
        arg.data
      );
      return response.data;
    },
    {
      onError: swrErrorHandler
    }
  );
}

// Combined hook for patient operations
export function usePatientApi() {
  const doctors = usePatientDoctors();
  const appointments = usePatientAppointments();

  const createAppointment = useCreateAppointment();
  const cancelAppointment = useCancelAppointment();
  const updateAppointment = useUpdateAppointment();

  return {
    // Data
    doctors,
    appointments,

    // Mutations
    createAppointment,
    cancelAppointment,
    updateAppointment,

    // Helper methods
    refreshDoctors: () => doctors.mutate(),
    refreshAppointments: () => appointments.mutate()
  };
}
