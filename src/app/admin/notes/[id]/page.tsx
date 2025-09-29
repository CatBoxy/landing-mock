"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DeleteNoteModal } from "@/components/DeleteNoteModal";
import { NoteImage } from "@/components/NoteImage";
import { NotesService, NotesError } from "@/lib/notes";
import {
  updateNoteSchema,
  type UpdateNoteFormData
} from "@/lib/validations/notes";
import type { Note } from "@/types/notes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  ArrowLeft,
  Edit3,
  Save,
  X,
  Upload,
  Trash2,
  Eye,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";

export default function NoteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const noteId = parseInt(params.id as string);

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
    watch
  } = useForm<UpdateNoteFormData>({
    resolver: zodResolver(updateNoteSchema)
  });

  const removeImage = watch("removeImage");

  // Fetch note data
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const foundNote = await NotesService.getNoteById(noteId);
        console.log(foundNote);
        setNote(foundNote);
        reset({
          title: foundNote.title,
          description: foundNote.description,
          removeImage: false,
          subtitle: foundNote.subtitle,
          category: foundNote.category
        });
      } catch (error) {
        if (error instanceof NotesError) {
          toast.error(error.message);
        } else {
          toast.error("Error al cargar la nota");
        }
        router.push("/admin/notes");
      } finally {
        setLoading(false);
      }
    };

    if (noteId && !isNaN(noteId)) {
      fetchNote();
    } else {
      toast.error("ID de nota inválido");
      router.push("/admin/notes");
    }
  }, [noteId, router, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      setValue("image", file);
      setValue("removeImage", false);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setValue("image", undefined);
    // Reset file input
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleRemoveImageChange = (checked: boolean) => {
    setValue("removeImage", checked);
    if (checked) {
      clearSelectedImage();
    }
  };

  const onSubmit = async (data: UpdateNoteFormData) => {
    if (!note) return;

    try {
      setIsSubmitting(true);

      console.log("Form submission data for update:", {
        id: note.id,
        title: data.title,
        subtitle: data.subtitle,
        category: data.category,
        description: data.description,
        hasImage: !!data.image,
        removeImage: data.removeImage
      });

      await NotesService.updateNote(note.id, {
        title: data.title,
        description: data.description,
        subtitle: data.subtitle,
        category: data.category,
        image: data.image
      });

      toast.success("Nota actualizada correctamente");
      setIsEditing(false);
      router.push("/admin/notes");
    } catch (error) {
      if (error instanceof NotesError) {
        setError("root", { message: error.message });
        toast.error(error.message);
      } else {
        setError("root", { message: "Error inesperado al actualizar la nota" });
        toast.error("Error inesperado al actualizar la nota");
      }
      console.error("Error updating note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSuccess = () => {
    router.push("/admin/notes");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <ProtectedRoute requireAdmin={true}>
        <AdminLayout>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando nota...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/notes">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver a Notas
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditing ? "Editar Nota" : "Detalle de Nota"}
                </h1>
                <p className="text-gray-600">
                  {isEditing
                    ? "Modifica los campos que desees actualizar"
                    : `Nota creada el ${formatDate(note.createdAt)}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(true)} className="gap-2">
                    <Edit3 className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteModal(true)}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    clearSelectedImage();
                    reset({
                      title: note.title,
                      description: note.description,
                      removeImage: false,
                      subtitle: note.subtitle,
                      category: note.category
                    });
                  }}
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
              )}
            </div>
          </div>

          {/* Note Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {isEditing ? (
                        <Edit3 className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                      {isEditing
                        ? "Editar Información"
                        : "Información de la Nota"}
                    </CardTitle>
                    <Badge variant="secondary">ID: #{note.id}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* General Error */}
                      {errors.root && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.root.message}
                          </AlertDescription>
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
                          disabled={isSubmitting}
                          className={errors.subtitle ? "border-red-500" : ""}
                        />
                      </div>

                      {/* Category Field */}

                      <div className="space-y-2">
                        <Label htmlFor="category">
                          Categoría <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="category"
                          {...register("category")}
                          disabled={isSubmitting}
                          className={errors.category ? "border-red-500" : ""}
                        />
                      </div>

                      {/* Description Field */}
                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Descripción <span className="text-red-500">*</span>
                        </Label>
                        <textarea
                          id="description"
                          {...register("description")}
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

                      {/* Image Management */}
                      <div className="space-y-4">
                        <Label>Imagen</Label>

                        {/* Current Image */}
                        {(note.imageUrl || note.imageFilename) &&
                          !removeImage && (
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">
                                Imagen actual:
                              </p>
                              <NoteImage
                                imageUrl={note.imageUrl}
                                imageFilename={note.imageFilename}
                                alt={note.title}
                                className="max-w-full h-48 object-cover rounded-lg border"
                              />
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="removeImage"
                                  checked={removeImage}
                                  onCheckedChange={handleRemoveImageChange}
                                  disabled={isSubmitting}
                                />
                                <Label
                                  htmlFor="removeImage"
                                  className="text-sm"
                                >
                                  Eliminar imagen actual
                                </Label>
                              </div>
                            </div>
                          )}

                        {/* New Image Upload */}
                        {!removeImage && (
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              {note.imageUrl || note.imageFilename
                                ? "Reemplazar con nueva imagen:"
                                : "Agregar imagen:"}
                            </p>

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
                                      (
                                      {(
                                        selectedImage.size /
                                        1024 /
                                        1024
                                      ).toFixed(2)}{" "}
                                      MB)
                                    </span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearSelectedImage}
                                    disabled={isSubmitting}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                {imagePreview && (
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-w-full h-48 object-cover rounded-lg border"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {errors.image && (
                          <p className="text-sm text-red-500">
                            {errors.image.message}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Formatos permitidos: JPG, PNG. Tamaño máximo: 50MB.
                        </p>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex items-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Guardando...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4" />
                              Guardar Cambios
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    /* View Mode */
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Título
                        </Label>
                        <p className="mt-1 text-lg font-semibold">
                          {note.title}
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Descripción
                        </Label>
                        <p className="mt-1 text-gray-900 whitespace-pre-wrap">
                          {note.description}
                        </p>
                      </div>

                      {(note.imageUrl || note.imageFilename) && (
                        <div>
                          <Label className="text-sm font-medium text-gray-600">
                            Imagen
                          </Label>
                          <div className="mt-2">
                            <NoteImage
                              imageUrl={note.imageUrl}
                              imageFilename={note.imageFilename}
                              alt={note.title}
                              className="max-w-full h-64 object-cover rounded-lg border"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Información</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Usuario
                    </Label>
                    <p className="mt-1">
                      {note.username || `Usuario ${note.userId}`}
                    </p>
                    <p className="text-xs text-gray-500">ID: {note.userId}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Imagen
                    </Label>
                    <div className="mt-1">
                      {note.imageUrl || note.imageFilename ? (
                        <Badge variant="outline" className="text-green-600">
                          <ImageIcon className="w-3 h-3 mr-1" />
                          Sí
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">
                          No
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Creado
                    </Label>
                    <p className="mt-1 text-sm">{formatDate(note.createdAt)}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Actualizado
                    </Label>
                    <p className="mt-1 text-sm">{formatDate(note.updatedAt)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        <DeleteNoteModal
          note={note}
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={handleDeleteSuccess}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
}
