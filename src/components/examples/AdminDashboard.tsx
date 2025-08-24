"use client";

import React, { useState } from "react";
import { useAdminApi } from "@/hooks/api/useAdmin";
import { CreateDoctorRequest, UpdateDoctorRequest } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Example component showing how to use the admin API
export default function AdminDashboard() {
  const {
    doctors,
    appointments,
    createDoctor,
    updateDoctor,
    deactivateDoctor,
    refreshDoctors,
    refreshAppointments
  } = useAdminApi();

  const [newDoctor, setNewDoctor] = useState<CreateDoctorRequest>({
    name: "",
    email: "",
    specialization: ""
  });

  const [editingDoctor, setEditingDoctor] = useState<{
    id: string;
    data: UpdateDoctorRequest;
  } | null>(null);

  const handleCreateDoctor = async () => {
    try {
      await createDoctor.trigger(newDoctor);
      setNewDoctor({ name: "", email: "", specialization: "" });
      refreshDoctors();
    } catch (error) {
      console.error("Failed to create doctor:", error);
    }
  };

  const handleUpdateDoctor = async () => {
    if (!editingDoctor) return;

    try {
      await updateDoctor.trigger(editingDoctor);
      setEditingDoctor(null);
      refreshDoctors();
    } catch (error) {
      console.error("Failed to update doctor:", error);
    }
  };

  const handleDeactivateDoctor = async (doctorId: string) => {
    try {
      await deactivateDoctor.trigger(doctorId);
      refreshDoctors();
    } catch (error) {
      console.error("Failed to deactivate doctor:", error);
    }
  };

  if (doctors.error) {
    return (
      <div className="text-red-500">
        Error loading doctors: {doctors.error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Create New Doctor */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Create New Doctor</h2>
        <div className="space-y-3">
          <Input
            placeholder="Doctor Name"
            value={newDoctor.name}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, name: e.target.value })
            }
          />
          <Input
            placeholder="Email"
            type="email"
            value={newDoctor.email}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, email: e.target.value })
            }
          />
          <Input
            placeholder="Specialization"
            value={newDoctor.specialization}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, specialization: e.target.value })
            }
          />
          <Button
            onClick={handleCreateDoctor}
            disabled={
              createDoctor.isMutating || !newDoctor.name || !newDoctor.email
            }
          >
            {createDoctor.isMutating ? "Creating..." : "Create Doctor"}
          </Button>
        </div>
      </Card>

      {/* Doctors List */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Doctors</h2>
          <Button onClick={refreshDoctors} disabled={doctors.isLoading}>
            {doctors.isLoading ? "Loading..." : "Refresh"}
          </Button>
        </div>

        {doctors.isLoading ? (
          <div>Loading doctors...</div>
        ) : doctors.data ? (
          <div className="space-y-3">
            {doctors.data.map((doctor) => (
              <div key={doctor.id} className="border p-3 rounded">
                {editingDoctor?.id === doctor.id ? (
                  <div className="space-y-2">
                    <Input
                      value={editingDoctor.data.name || doctor.name}
                      onChange={(e) =>
                        setEditingDoctor({
                          ...editingDoctor,
                          data: { ...editingDoctor.data, name: e.target.value }
                        })
                      }
                    />
                    <Input
                      value={editingDoctor.data.email || doctor.email}
                      onChange={(e) =>
                        setEditingDoctor({
                          ...editingDoctor,
                          data: { ...editingDoctor.data, email: e.target.value }
                        })
                      }
                    />
                    <Input
                      value={
                        editingDoctor.data.specialization ||
                        doctor.specialization
                      }
                      onChange={(e) =>
                        setEditingDoctor({
                          ...editingDoctor,
                          data: {
                            ...editingDoctor.data,
                            specialization: e.target.value
                          }
                        })
                      }
                    />
                    <div className="space-x-2">
                      <Button
                        onClick={handleUpdateDoctor}
                        disabled={updateDoctor.isMutating}
                      >
                        {updateDoctor.isMutating ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditingDoctor(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.email}</p>
                      <p className="text-sm text-gray-600">
                        {doctor.specialization}
                      </p>
                      <p className="text-sm">
                        Status: {doctor.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setEditingDoctor({
                            id: doctor.id,
                            data: {
                              name: doctor.name,
                              email: doctor.email,
                              specialization: doctor.specialization
                            }
                          })
                        }
                      >
                        Edit
                      </Button>
                      {doctor.isActive && (
                        <Button
                          variant="destructive"
                          onClick={() => handleDeactivateDoctor(doctor.id)}
                          disabled={deactivateDoctor.isMutating}
                        >
                          Deactivate
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>No doctors found</div>
        )}
      </Card>

      {/* Appointments Overview */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Appointments</h2>
          <Button
            onClick={refreshAppointments}
            disabled={appointments.isLoading}
          >
            {appointments.isLoading ? "Loading..." : "Refresh"}
          </Button>
        </div>

        {appointments.isLoading ? (
          <div>Loading appointments...</div>
        ) : appointments.error ? (
          <div className="text-red-500">
            Error: {appointments.error.message}
          </div>
        ) : appointments.data ? (
          <div className="space-y-3">
            {appointments.data.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="border p-3 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {appointment.doctor?.name} - {appointment.patient?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.date} at {appointment.time}
                    </p>
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={`capitalize ${
                          appointment.status === "confirmed"
                            ? "text-green-600"
                            : appointment.status === "cancelled"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {appointments.data.length === 0 && <div>No appointments found</div>}
          </div>
        ) : (
          <div>No appointments found</div>
        )}
      </Card>
    </div>
  );
}
