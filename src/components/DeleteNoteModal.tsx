"use client";

import { useState } from "react";
import { NotesService, NotesError } from "@/lib/notes";
import type { Note } from "@/types/notes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteNoteModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteNoteModal({
  note,
  isOpen,
  onClose,
  onSuccess
}: DeleteNoteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!note) return;

    try {
      setIsDeleting(true);
      await NotesService.deleteNote(note.id);
      toast.success("Nota eliminada correctamente");
      onSuccess();
      onClose();
    } catch (error) {
      if (error instanceof NotesError) {
        toast.error(error.message);
      } else {
        toast.error("Error al eliminar la nota");
      }
      console.error("Error deleting note:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Eliminación
          </DialogTitle>
          <DialogDescription className="text-left">
            ¿Estás seguro de que deseas eliminar esta nota? Esta acción no se
            puede deshacer.
          </DialogDescription>
        </DialogHeader>

        {note && (
          <div className="my-4 p-4 bg-gray-50 rounded-lg border">
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-600">ID:</span>
                <span className="ml-2 font-mono text-sm">#{note.id}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Título:
                </span>
                <span className="ml-2 text-sm">{note.title}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Descripción:
                </span>
                <span className="ml-2 text-sm text-gray-700">
                  {note.description.length > 100
                    ? `${note.description.substring(0, 100)}...`
                    : note.description}
                </span>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Eliminar Nota
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
