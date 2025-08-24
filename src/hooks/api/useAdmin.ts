import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { adminApi } from "@/lib/api/admin";
import { swrErrorHandler } from "@/lib/api-client";
import {
  Doctor,
  Appointment,
  CreateDoctorRequest,
  UpdateDoctorRequest,
  GetAppointmentsRangeParams
} from "@/types/api";

// SWR Keys for admin endpoints
export const ADMIN_SWR_KEYS = {
  doctors: "/api/admin/doctors",
  appointments: "/api/admin/appointments",
  appointmentsRange: (params: GetAppointmentsRangeParams) =>
    `/api/admin/appointments/range?${new URLSearchParams(
      params as any
    ).toString()}`
} as const;

// Admin Doctors Hooks
export function useAdminDoctors() {
  return useSWR(
    ADMIN_SWR_KEYS.doctors,
    () => adminApi.doctors.getDoctors().then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

export function useCreateDoctor() {
  return useSWRMutation(
    ADMIN_SWR_KEYS.doctors,
    async (url: string, { arg }: { arg: CreateDoctorRequest }) => {
      const response = await adminApi.doctors.createDoctor(arg);
      return response.data;
    },
    {
      onError: swrErrorHandler
    }
  );
}

export function useUpdateDoctor() {
  return useSWRMutation(
    ADMIN_SWR_KEYS.doctors,
    async (
      url: string,
      { arg }: { arg: { id: string; data: UpdateDoctorRequest } }
    ) => {
      const response = await adminApi.doctors.updateDoctor(arg.id, arg.data);
      return response.data;
    },
    {
      onError: swrErrorHandler
    }
  );
}

export function useDeactivateDoctor() {
  return useSWRMutation(
    ADMIN_SWR_KEYS.doctors,
    async (url: string, { arg }: { arg: string }) => {
      const response = await adminApi.doctors.deactivateDoctor(arg);
      return response.data;
    },
    {
      onError: swrErrorHandler
    }
  );
}

// Admin Appointments Hooks
export function useAdminAppointments() {
  return useSWR(
    ADMIN_SWR_KEYS.appointments,
    () => adminApi.appointments.getAppointments().then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

export function useAdminAppointmentsByRange(
  params: GetAppointmentsRangeParams
) {
  return useSWR(
    ADMIN_SWR_KEYS.appointmentsRange(params),
    () =>
      adminApi.appointments
        .getAppointmentsByRange(params)
        .then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

// Combined hook for admin operations
export function useAdminApi() {
  const doctors = useAdminDoctors();
  const appointments = useAdminAppointments();

  const createDoctor = useCreateDoctor();
  const updateDoctor = useUpdateDoctor();
  const deactivateDoctor = useDeactivateDoctor();

  return {
    // Data
    doctors,
    appointments,

    // Mutations
    createDoctor,
    updateDoctor,
    deactivateDoctor,

    // Helper methods
    refreshDoctors: () => doctors.mutate(),
    refreshAppointments: () => appointments.mutate()
  };
}
