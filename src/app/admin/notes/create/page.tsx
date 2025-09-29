"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { NotesService, NotesError } from "@/lib/notes";
import {
  createNoteSchema,
  type CreateNoteFormData
} from "@/lib/validations/notes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { ArrowLeft, Plus, Upload, X } from "lucide-react";
import Link from "next/link";

export default function CreateNotePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError
  } = useForm<CreateNoteFormData>({
    resolver: zodResolver(createNoteSchema)
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      setValue("image", file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setValue("image", undefined);
    // Reset file input
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data: CreateNoteFormData) => {
    try {
      setIsSubmitting(true);

      console.log("Form submission data:", {
        title: data.title,
        subtitle: data.subtitle,
        category: data.category,
        description: data.description,
        hasImage: !!data.image
      });

      await NotesService.createNote({
        title: data.title,
        description: data.description,
        image: data.image,
        subtitle: data.subtitle,
        category: data.category
      });

      toast.success("Nota creada correctamente");
      router.push("/admin/notes");
    } catch (error) {
      if (error instanceof NotesError) {
        setError("root", { message: error.message });
        toast.error(error.message);
      } else {
        setError("root", { message: "Error inesperado al crear la nota" });
        toast.error("Error inesperado al crear la nota");
      }
      console.error("Error creating note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/admin/notes">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a Notas
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Crear Nueva Nota
              </h1>
              <p className="text-gray-600">
                Completa los campos para crear una nueva nota
              </p>
            </div>
          </div>

          {/* Form */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Nueva Nota
              </CardTitle>
              <CardDescription>
                Ingresa la información de la nota
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* General Error */}
                {errors.root && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.root.message}</AlertDescription>
                  </Alert>
                )}

                {/* Title Field */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Título <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="Ingresa el título de la nota"
                    disabled={isSubmitting}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Subtitle Field */}

                <div className="space-y-2">
                  <Label htmlFor="subtitle">
                    Subtítulo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subtitle"
                    {...register("subtitle")}
                    placeholder="Ingresa el subtítulo de la nota"
                    disabled={isSubmitting}
                    className={errors.subtitle ? "border-red-500" : ""}
                  />
                  {errors.subtitle && (
                    <p className="text-sm text-red-500">
                      {errors.subtitle.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    Categoría <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="category"
                    {...register("category")}
                    placeholder="Ingresa la categoría de la nota"
                    disabled={isSubmitting}
                    className={errors.category ? "border-red-500" : ""}
                  />
                  {errors.category && (
                    <p className="text-sm text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Descripción <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="description"
                    {...register("description")}
                    placeholder="Ingresa la descripción de la nota"
                    disabled={isSubmitting}
                    rows={6}
                    className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
                      errors.description ? "border-red-500" : ""
                    }`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Imagen (opcional)</Label>
                  <div className="space-y-4">
                    {!selectedImage ? (
                      <div className="flex items-center gap-4">
                        <Input
                          id="image"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={handleImageChange}
                          disabled={isSubmitting}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            document.getElementById("image")?.click()
                          }
                          disabled={isSubmitting}
                          className="gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Seleccionar
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Upload className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">
                              {selectedImage.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({(selectedImage.size / 1024 / 1024).toFixed(2)}{" "}
                              MB)
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={removeImage}
                            disabled={isSubmitting}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {imagePreview && (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="max-w-full h-48 object-cover rounded-lg border"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.image && (
                    <p className="text-sm text-red-500">
                      {errors.image.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Formatos permitidos: JPG, PNG. Tamaño máximo: 50MB.
                  </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Creando...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Crear Nota
                      </>
                    )}
                  </Button>
                  <Link href="/admin/notes">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
