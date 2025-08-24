"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Plus, RefreshCw } from "lucide-react";
import { DoctorsTable } from "./DoctorsTable";
import { DoctorForm } from "./DoctorForm";
import { useAdminApi } from "@/hooks/api/useAdmin";
import { Doctor, CreateDoctorRequest, UpdateDoctorRequest } from "@/types/api";
import { handleApiError } from "@/lib/api-client";

export function DoctorsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const {
    doctors,
    createDoctor,
    updateDoctor,
    deactivateDoctor,
    refreshDoctors
  } = useAdminApi();

  const handleCreateDoctor = async (data: CreateDoctorRequest) => {
    setFormLoading(true);
    try {
      await createDoctor.trigger(data);
      setIsSheetOpen(false);
      refreshDoctors();
    } catch (error) {
      console.error("Error creating doctor:", error);
      alert(`Error: ${handleApiError(error)}`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateDoctor = async (data: UpdateDoctorRequest) => {
    if (!editingDoctor) return;

    setFormLoading(true);
    try {
      await updateDoctor.trigger({
        id: editingDoctor.id,
        data
      });
      setIsSheetOpen(false);
      setEditingDoctor(null);
      refreshDoctors();
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert(`Error: ${handleApiError(error)}`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeactivateDoctor = async (doctorId: string) => {
    if (!confirm("¿Estás seguro de que quieres desactivar este médico?")) {
      return;
    }

    try {
      await deactivateDoctor.trigger(doctorId);
      refreshDoctors();
    } catch (error) {
      console.error("Error deactivating doctor:", error);
      alert(`Error: ${handleApiError(error)}`);
    }
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setIsSheetOpen(true);
  };

  const handleNewDoctor = () => {
    setEditingDoctor(null);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setEditingDoctor(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Médicos</h1>
          <p className="text-gray-600 mt-1">Gestiona los médicos del sistema</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={refreshDoctors}
            disabled={doctors.isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${
                doctors.isLoading ? "animate-spin" : ""
              }`}
            />
            Actualizar
          </Button>
          <Button onClick={handleNewDoctor}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Médico
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Médicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {doctors.data?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Médicos Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {doctors.data?.filter((d) => d.isActive).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Médicos Inactivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {doctors.data?.filter((d) => !d.isActive).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doctors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Médicos</CardTitle>
        </CardHeader>
        <CardContent>
          {doctors.error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">
                Error al cargar médicos: {doctors.error.message}
              </p>
              <Button onClick={refreshDoctors} variant="outline">
                Reintentar
              </Button>
            </div>
          ) : (
            <DoctorsTable
              doctors={doctors.data || []}
              onEdit={handleEditDoctor}
              onDeactivate={handleDeactivateDoctor}
              isLoading={doctors.isLoading}
            />
          )}
        </CardContent>
      </Card>

      {/* Form Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>
              {editingDoctor ? "Editar Médico" : "Nuevo Médico"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <DoctorForm
              doctor={editingDoctor || undefined}
              onSubmit={editingDoctor ? handleUpdateDoctor : handleCreateDoctor}
              onCancel={handleCloseSheet}
              isLoading={formLoading}
              mode={editingDoctor ? "edit" : "create"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
