import { z } from "zod";

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(200, "El título no puede superar los 200 caracteres"),
  subtitle: z
    .string()
    .min(1, "El subtítulo es requerido")
    .max(200, "El subtítulo no puede superar los 200 caracteres"),
  category: z
    .string()
    .min(1, "La categoría es requerida")
    .max(200, "La categoría no puede superar los 200 caracteres"),
  description: z.string().min(1, "La descripción es requerida"),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        return allowedTypes.includes(file.type);
      },
      { message: "Solo se permiten archivos JPG y PNG" }
    )
    .refine(
      (file) => {
        if (!file) return true;
        const maxSize = 50 * 1024 * 1024; // 50MB
        return file.size <= maxSize;
      },
      { message: "El archivo no puede superar los 50MB" }
    )
});

export const updateNoteSchema = createNoteSchema.extend({
  removeImage: z.boolean().optional()
});

export type CreateNoteFormData = z.infer<typeof createNoteSchema>;
export type UpdateNoteFormData = z.infer<typeof updateNoteSchema>;
