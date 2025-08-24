import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { doctorApi } from "@/lib/api/doctor";
import { swrErrorHandler } from "@/lib/api-client";
import {
  AvailabilitySlot,
  ScheduleBlock,
  Appointment,
  CreateAvailabilityRequest,
  CreateScheduleBlockRequest,
  UpdateAppointmentStatusRequest
} from "@/types/api";

// SWR Keys for doctor endpoints
export const DOCTOR_SWR_KEYS = {
  availability: "/api/doctor/availability",
  scheduleBlocks: "/api/doctor/schedule-blocks",
  scheduleBlocksWithRange: (params?: {
    startDate?: string;
    endDate?: string;
  }) =>
    `/api/doctor/schedule-blocks?${new URLSearchParams(
      params as any
    ).toString()}`,
  appointments: "/api/doctor/appointments",
  appointmentsWithParams: (params?: {
    date?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  }) =>
    `/api/doctor/appointments?${new URLSearchParams(params as any).toString()}`,
  appointment: (id: string) => `/api/doctor/appointments/${id}`
} as const;

// Doctor Availability Hooks
export function useDoctorAvailability() {
  return useSWR(
    DOCTOR_SWR_KEYS.availability,
    () => doctorApi.availability.getAvailability().then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

export function useCreateAvailability() {
  return useSWRMutation(
    DOCTOR_SWR_KEYS.availability,
    async (url: string, { arg }: { arg: CreateAvailabilityRequest }) => {
      const response = await doctorApi.availability.createAvailability(arg);
      return response.data;
    },
    {
      onError: swrErrorHandler
    }
  );
}

export function useUpdateAvailability() {
  return useSWRMutation(
    DOCTOR_SWR_KEYS.availability,
    async (
      url: string,
      { arg }: { arg: { id: string; data: Partial<CreateAvailabilityRequest> } }
    ) => {
      const response = await doctorApi.availability.updateAvailability(
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

export function useDeleteAvailability() {
  return useSWRMutation(
    DOCTOR_SWR_KEYS.availability,
    async (url: string, { arg }: { arg: string }) => {
      const response = await doctorApi.availability.deleteAvailability(arg);
      return response.data;
    },
    {
      onError: swrErrorHandler
    }
  );
}

// Doctor Schedule Blocks Hooks
export function useDoctorScheduleBlocks(params?: {
  startDate?: string;
  endDate?: string;
}) {
  const key = params
    ? DOCTOR_SWR_KEYS.scheduleBlocksWithRange(params)
    : DOCTOR_SWR_KEYS.scheduleBlocks;

  return useSWR(
    key,
    () =>
      doctorApi.scheduleBlocks
        .getScheduleBlocks(params)
        .then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

export function useCreateScheduleBlock() {
  return useSWRMutation(
    DOCTOR_SWR_KEYS.scheduleBlocks,
    async (url: string, { arg }: { arg: CreateScheduleBlockRequest }) => {
      const response = await doctorApi.scheduleBlocks.createScheduleBlock(arg);
      return response.data;
    },
    {
      onError: swrErrorHandler
    }
  );
}

export function useUpdateScheduleBlock() {
  return useSWRMutation(
    DOCTOR_SWR_KEYS.scheduleBlocks,
    async (
      url: string,
      {
        arg
      }: { arg: { id: string; data: Partial<CreateScheduleBlockRequest> } }
    ) => {
      const response = await doctorApi.scheduleBlocks.updateScheduleBlock(
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

export function useDeleteScheduleBlock() {
  return useSWRMutation(
    DOCTOR_SWR_KEYS.scheduleBlocks,
    async (url: string, { arg }: { arg: string }) => {
      const response = await doctorApi.scheduleBlocks.deleteScheduleBlock(arg);
      return response.data;
    },
    {
      onError: swrErrorHandler
    }
  );
}

// Doctor Appointments Hooks
export function useDoctorAppointments(params?: {
  date?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}) {
  const key = params
    ? DOCTOR_SWR_KEYS.appointmentsWithParams(params)
    : DOCTOR_SWR_KEYS.appointments;

  return useSWR(
    key,
    () =>
      doctorApi.appointments.getAppointments(params).then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

export function useDoctorAppointment(id: string) {
  return useSWR(
    DOCTOR_SWR_KEYS.appointment(id),
    () => doctorApi.appointments.getAppointment(id).then((res) => res.data),
    {
      onError: swrErrorHandler
    }
  );
}

export function useUpdateAppointmentStatus() {
  return useSWRMutation(
    DOCTOR_SWR_KEYS.appointments,
    async (
      url: string,
      { arg }: { arg: { id: string; data: UpdateAppointmentStatusRequest } }
    ) => {
      const response = await doctorApi.appointments.updateAppointmentStatus(
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

// Combined hook for doctor operations
export function useDoctorApi() {
  const availability = useDoctorAvailability();
  const scheduleBlocks = useDoctorScheduleBlocks();
  const appointments = useDoctorAppointments();

  const createAvailability = useCreateAvailability();
  const updateAvailability = useUpdateAvailability();
  const deleteAvailability = useDeleteAvailability();

  const createScheduleBlock = useCreateScheduleBlock();
  const updateScheduleBlock = useUpdateScheduleBlock();
  const deleteScheduleBlock = useDeleteScheduleBlock();

  const updateAppointmentStatus = useUpdateAppointmentStatus();

  return {
    // Data
    availability,
    scheduleBlocks,
    appointments,

    // Availability mutations
    createAvailability,
    updateAvailability,
    deleteAvailability,

    // Schedule block mutations
    createScheduleBlock,
    updateScheduleBlock,
    deleteScheduleBlock,

    // Appointment mutations
    updateAppointmentStatus,

    // Helper methods
    refreshAvailability: () => availability.mutate(),
    refreshScheduleBlocks: () => scheduleBlocks.mutate(),
    refreshAppointments: () => appointments.mutate()
  };
}
