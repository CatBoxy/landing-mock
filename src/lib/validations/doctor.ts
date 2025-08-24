import { z } from "zod";

export const createDoctorSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z
    .string()
    .email("Ingrese un email válido")
    .max(255, "El email no puede exceder 255 caracteres"),
  specialization: z
    .string()
    .min(2, "La especialización debe tener al menos 2 caracteres")
    .max(100, "La especialización no puede exceder 100 caracteres")
});

export const updateDoctorSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .optional(),
  email: z
    .string()
    .email("Ingrese un email válido")
    .max(255, "El email no puede exceder 255 caracteres")
    .optional(),
  specialization: z
    .string()
    .min(2, "La especialización debe tener al menos 2 caracteres")
    .max(100, "La especialización no puede exceder 100 caracteres")
    .optional(),
  isActive: z.boolean().optional()
});

export type CreateDoctorFormData = z.infer<typeof createDoctorSchema>;
export type UpdateDoctorFormData = z.infer<typeof updateDoctorSchema>;
