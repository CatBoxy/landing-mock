"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  createDoctorSchema,
  updateDoctorSchema,
  CreateDoctorFormData,
  UpdateDoctorFormData
} from "@/lib/validations/doctor";
import { Doctor } from "@/types/api";

interface DoctorFormProps {
  doctor?: Doctor;
  onSubmit: (
    data: CreateDoctorFormData | UpdateDoctorFormData
  ) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

export function DoctorForm({
  doctor,
  onSubmit,
  onCancel,
  isLoading = false,
  mode
}: DoctorFormProps) {
  const isEdit = mode === "edit";
  const schema = isEdit ? updateDoctorSchema : createDoctorSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CreateDoctorFormData | UpdateDoctorFormData>({
    resolver: zodResolver(schema),
    defaultValues:
      isEdit && doctor
        ? {
            name: doctor.name,
            email: doctor.email,
            specialization: doctor.specialization,
            isActive: doctor.isActive
          }
        : {
            name: "",
            email: "",
            specialization: "",
            isActive: true
          }
  });

  const isActive = watch("isActive");

  const handleFormSubmit = async (
    data: CreateDoctorFormData | UpdateDoctorFormData
  ) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Dr. Juan Pérez"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="doctor@ejemplo.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialization">Especialización *</Label>
        <Input
          id="specialization"
          {...register("specialization")}
          placeholder="Cardiología"
          className={errors.specialization ? "border-red-500" : ""}
        />
        {errors.specialization && (
          <p className="text-sm text-red-500">
            {errors.specialization.message}
          </p>
        )}
      </div>

      {isEdit && (
        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={isActive}
            onCheckedChange={(checked) => setValue("isActive", checked)}
          />
          <Label htmlFor="isActive">Médico activo</Label>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : isEdit ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  );
}
