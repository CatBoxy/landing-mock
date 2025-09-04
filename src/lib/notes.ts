import { AuthService } from "./auth";
import type {
  Note,
  CreateNoteRequest,
  UpdateNoteRequest,
  NotesResponse,
  PaginationParams
} from "@/types/notes";

const API_BASE_URL = "http://72.60.58.137/api";

export class NotesError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "NotesError";
  }
}

/**
 * Notes service for CRUD operations
 */
export class NotesService {
  /**
   * Get all notes (admin view)
   */
  static async getAllNotes(
    params: PaginationParams = {}
  ): Promise<NotesResponse> {
    try {
      const { page = 0, size = 10 } = params;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString()
      });

      const response = await AuthService.authenticatedFetch(
        `${API_BASE_URL}/notes?${queryParams}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new NotesError(
          errorData.message || "Error al obtener las notas",
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof NotesError) {
        throw error;
      }
      throw new NotesError("Error de conexión al obtener las notas");
    }
  }

  /**
   * Get user's own notes
   */
  static async getMyNotes(
    params: PaginationParams = {}
  ): Promise<NotesResponse> {
    try {
      const { page = 0, size = 10 } = params;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString()
      });

      const response = await AuthService.authenticatedFetch(
        `${API_BASE_URL}/notes/my?${queryParams}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new NotesError(
          errorData.message || "Error al obtener tus notas",
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof NotesError) {
        throw error;
      }
      throw new NotesError("Error de conexión al obtener tus notas");
    }
  }

  /**
   * Get a single note by ID
   */
  static async getNoteById(id: number): Promise<Note> {
    try {
      const response = await AuthService.authenticatedFetch(
        `${API_BASE_URL}/notes/${id}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 404) {
          throw new NotesError("Nota no encontrada", response.status);
        }
        throw new NotesError(
          errorData.message || "Error al obtener la nota",
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof NotesError) {
        throw error;
      }
      throw new NotesError("Error de conexión al obtener la nota");
    }
  }

  /**
   * Create a new note
   */
  static async createNote(data: CreateNoteRequest): Promise<Note> {
    try {
      const formData = new FormData();

      // Add note data as JSON
      const noteData = {
        title: data.title,
        description: data.description
      };

      const noteBlob = new Blob([JSON.stringify(noteData)], {
        type: "application/json"
      });
      formData.append("note", noteBlob);

      // Add image if provided
      if (data.image) {
        formData.append("image", data.image);
      }

      const authHeaders = AuthService.getAuthHeader();
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: "POST",
        headers: {
          ...authHeaders
          // Don't set Content-Type, let browser set it for FormData
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new NotesError(
          errorData.message || "Error al crear la nota",
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof NotesError) {
        throw error;
      }
      throw new NotesError("Error de conexión al crear la nota");
    }
  }

  /**
   * Update an existing note
   */
  static async updateNote(id: number, data: UpdateNoteRequest): Promise<Note> {
    try {
      const formData = new FormData();

      // Add note data as JSON
      const noteData = {
        title: data.title,
        description: data.description
      };

      const noteBlob = new Blob([JSON.stringify(noteData)], {
        type: "application/json"
      });
      formData.append("note", noteBlob);

      // Add image if provided
      if (data.image) {
        formData.append("image", data.image);
      }

      const authHeaders = AuthService.getAuthHeader();
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
          ...authHeaders
          // Don't set Content-Type, let browser set it for FormData
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new NotesError(
          errorData.message || "Error al actualizar la nota",
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof NotesError) {
        throw error;
      }
      throw new NotesError("Error de conexión al actualizar la nota");
    }
  }

  /**
   * Delete a note
   */
  static async deleteNote(id: number): Promise<void> {
    try {
      const response = await AuthService.authenticatedFetch(
        `${API_BASE_URL}/notes/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new NotesError(
          errorData.message || "Error al eliminar la nota",
          response.status
        );
      }
    } catch (error) {
      if (error instanceof NotesError) {
        throw error;
      }
      throw new NotesError("Error de conexión al eliminar la nota");
    }
  }

  /**
   * Get image URL for a filename or normalize existing URL
   */
  static getImageUrl(imageUrlOrFilename: string): string {
    // If it's already a full URL, return as is
    if (
      imageUrlOrFilename.startsWith("http://") ||
      imageUrlOrFilename.startsWith("https://")
    ) {
      return imageUrlOrFilename;
    }

    // If it's a relative API path, construct full URL
    if (imageUrlOrFilename.startsWith("/api/notes/image/")) {
      return `http://72.60.58.137${imageUrlOrFilename}`;
    }

    // If it's just a filename, construct the full URL
    return `${API_BASE_URL}/notes/image/${imageUrlOrFilename}`;
  }

  /**
   * Fetch image blob from server
   */
  static async getImage(filename: string): Promise<Blob> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/image/${filename}`);

      if (!response.ok) {
        throw new NotesError("Error al cargar la imagen", response.status);
      }

      return await response.blob();
    } catch (error) {
      if (error instanceof NotesError) {
        throw error;
      }
      throw new NotesError("Error de conexión al cargar la imagen");
    }
  }

  /**
   * Get image as data URL for display
   */
  static async getImageDataUrl(filename: string): Promise<string> {
    try {
      const blob = await this.getImage(filename);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () =>
          reject(new NotesError("Error al procesar la imagen"));
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      if (error instanceof NotesError) {
        throw error;
      }
      throw new NotesError("Error al obtener la imagen");
    }
  }

  /**
   * Extract filename from image URL
   */
  static extractFilenameFromUrl(imageUrl: string): string | null {
    try {
      // Extract filename from URL like: http://72.60.58.137/api/notes/image/imagen_20250831_123456.jpg
      const urlParts = imageUrl.split("/");
      const filename = urlParts[urlParts.length - 1];
      return filename || null;
    } catch {
      return null;
    }
  }

  /**
   * Validate image file
   */
  static validateImage(file: File): string | null {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!allowedTypes.includes(file.type)) {
      return "Solo se permiten archivos JPG y PNG";
    }

    if (file.size > maxSize) {
      return "El archivo no puede superar los 50MB";
    }

    return null;
  }
}
