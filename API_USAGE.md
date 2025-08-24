# API Layer Usage Guide

This document provides a comprehensive guide on how to use the API layer built for the appointment management system.

## Overview

The API layer is organized into three main modules:

- **Admin API**: For managing doctors and viewing all appointments
- **Doctor API**: For managing availability, schedule blocks, and appointments
- **Patient API**: For searching doctors and booking appointments

## Project Structure

```
src/
├── types/api.ts                 # TypeScript types and interfaces
├── lib/
│   ├── api-client.ts           # Base API client with error handling
│   └── api/
│       ├── admin.ts            # Admin API functions
│       ├── doctor.ts           # Doctor API functions
│       ├── patient.ts          # Patient API functions
│       └── index.ts            # Main exports
└── hooks/api/
    ├── useAdmin.ts             # Admin SWR hooks
    ├── useDoctor.ts            # Doctor SWR hooks
    ├── usePatient.ts           # Patient SWR hooks
    └── index.ts                # All hooks exports
```

## Configuration

Set your API base URL in your environment variables:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

If not set, it defaults to `http://localhost:3001`.

## Usage Examples

### 1. Admin Operations

#### Using SWR Hooks (Recommended)

```tsx
import { useAdminApi } from "@/hooks/api/useAdmin";

function AdminDashboard() {
  const {
    doctors,
    appointments,
    createDoctor,
    updateDoctor,
    deactivateDoctor,
    refreshDoctors
  } = useAdminApi();

  // Create a new doctor
  const handleCreateDoctor = async () => {
    try {
      await createDoctor.trigger({
        name: "Dr. Smith",
        email: "smith@example.com",
        specialization: "Cardiology"
      });
      refreshDoctors(); // Refresh the list
    } catch (error) {
      console.error("Failed to create doctor:", error);
    }
  };

  // Update doctor
  const handleUpdateDoctor = async (doctorId: string) => {
    try {
      await updateDoctor.trigger({
        id: doctorId,
        data: { name: "Dr. John Smith" }
      });
      refreshDoctors();
    } catch (error) {
      console.error("Failed to update doctor:", error);
    }
  };

  return (
    <div>
      {doctors.isLoading && <div>Loading doctors...</div>}
      {doctors.error && <div>Error: {doctors.error.message}</div>}
      {doctors.data && (
        <ul>
          {doctors.data.map((doctor) => (
            <li key={doctor.id}>
              {doctor.name} - {doctor.specialization}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

#### Direct API Usage

```tsx
import { adminApi } from "@/lib/api";

// Create doctor
const response = await adminApi.doctors.createDoctor({
  name: "Dr. Smith",
  email: "smith@example.com",
  specialization: "Cardiology"
});

// Get all doctors
const doctorsResponse = await adminApi.doctors.getDoctors();
const doctors = doctorsResponse.data;

// Get appointments by date range
const appointmentsResponse = await adminApi.appointments.getAppointmentsByRange(
  {
    startDate: "2024-01-01",
    endDate: "2024-01-31"
  }
);
```

### 2. Doctor Operations

```tsx
import { useDoctorApi } from "@/hooks/api/useDoctor";

function DoctorDashboard() {
  const {
    availability,
    appointments,
    createAvailability,
    updateAppointmentStatus,
    refreshAvailability
  } = useDoctorApi();

  // Set availability
  const handleSetAvailability = async () => {
    try {
      await createAvailability.trigger({
        dayOfWeek: 1, // Monday
        startTime: "09:00",
        endTime: "17:00"
      });
      refreshAvailability();
    } catch (error) {
      console.error("Failed to set availability:", error);
    }
  };

  // Update appointment status
  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      await updateAppointmentStatus.trigger({
        id: appointmentId,
        data: { status: "confirmed" }
      });
    } catch (error) {
      console.error("Failed to confirm appointment:", error);
    }
  };

  return <div>{/* Your component JSX */}</div>;
}
```

### 3. Patient Operations

```tsx
import { usePatientApi } from "@/hooks/api/usePatient";

function PatientBooking() {
  const { doctors, appointments, createAppointment, cancelAppointment } =
    usePatientApi();

  // Book appointment
  const handleBookAppointment = async () => {
    try {
      await createAppointment.trigger({
        doctorId: "doctor-id",
        date: "2024-01-15",
        time: "10:00",
        notes: "Regular checkup"
      });
    } catch (error) {
      console.error("Failed to book appointment:", error);
    }
  };

  // Cancel appointment
  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await cancelAppointment.trigger(appointmentId);
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    }
  };

  return <div>{/* Your component JSX */}</div>;
}
```

### 4. Advanced Usage

#### Custom SWR Configuration

```tsx
import useSWR from "swr";
import { adminApi } from "@/lib/api";

function CustomDoctorsList() {
  const { data, error, mutate } = useSWR(
    "/api/admin/doctors",
    () => adminApi.doctors.getDoctors().then((res) => res.data),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
      onError: (error) => {
        console.error("Custom error handler:", error);
      }
    }
  );

  return <div>{/* Your component JSX */}</div>;
}
```

#### Error Handling

```tsx
import { handleApiError } from "@/lib/api-client";

function ComponentWithErrorHandling() {
  const { createDoctor } = useAdminApi();

  const handleSubmit = async (doctorData) => {
    try {
      await createDoctor.trigger(doctorData);
    } catch (error) {
      const errorMessage = handleApiError(error);
      // Show error message to user
      alert(errorMessage);
    }
  };

  return <div>{/* Your component */}</div>;
}
```

## API Endpoints Mapping

### Admin Endpoints

- `POST /api/admin/doctors` → `adminApi.doctors.createDoctor()`
- `GET /api/admin/doctors` → `adminApi.doctors.getDoctors()`
- `PUT /api/admin/doctors/{id}` → `adminApi.doctors.updateDoctor()`
- `DELETE /api/admin/doctors/{id}` → `adminApi.doctors.deactivateDoctor()`
- `GET /api/admin/appointments` → `adminApi.appointments.getAppointments()`
- `GET /api/admin/appointments/range` → `adminApi.appointments.getAppointmentsByRange()`

### Doctor Endpoints

- `POST /api/doctor/availability` → `doctorApi.availability.createAvailability()`
- `GET /api/doctor/availability` → `doctorApi.availability.getAvailability()`
- `POST /api/doctor/schedule-blocks` → `doctorApi.scheduleBlocks.createScheduleBlock()`
- `GET /api/doctor/appointments` → `doctorApi.appointments.getAppointments()`
- `PUT /api/doctor/appointments/{id}/status` → `doctorApi.appointments.updateAppointmentStatus()`

### Patient Endpoints

- `GET /api/patient/doctors` → `patientApi.doctors.getDoctors()`
- `GET /api/patient/doctors/{id}/available-slots` → `patientApi.doctors.getAvailableSlots()`
- `POST /api/patient/appointments` → `patientApi.appointments.createAppointment()`
- `GET /api/patient/appointments` → `patientApi.appointments.getAppointments()`
- `DELETE /api/patient/appointments/{id}` → `patientApi.appointments.cancelAppointment()`

## Best Practices

1. **Use SWR Hooks**: Always prefer the SWR hooks over direct API calls for automatic caching and revalidation.

2. **Error Handling**: Implement proper error handling in your components using the `handleApiError` utility.

3. **Loading States**: Use the `isLoading` and `isMutating` states provided by SWR hooks.

4. **Data Refresh**: Use the provided refresh methods to update data after mutations.

5. **TypeScript**: Leverage the provided TypeScript types for better development experience.

6. **Environment Variables**: Always use environment variables for API configuration.

## Authentication

The API client is prepared for authentication. When you implement server-side auth, you can set the auth token:

```tsx
import { apiClient } from "@/lib/api-client";

// Set auth token (usually after login)
apiClient.setAuthToken("your-jwt-token");

// Remove auth token (on logout)
apiClient.removeAuthToken();
```

## Next Steps

1. Implement the backend API endpoints to match these client-side calls
2. Add authentication and authorization
3. Create the actual admin dashboard components
4. Implement proper error boundaries
5. Add loading skeletons and better UX
