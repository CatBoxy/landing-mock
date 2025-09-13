"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NotesService, NotesError } from "@/lib/notes";
import { DeleteNoteModal } from "@/components/DeleteNoteModal";
import type { Note, NotesResponse } from "@/types/notes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Image,
  FileText,
  Plus,
  Edit3,
  Trash2
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface NotesTableProps {
  className?: string;
}

export function NotesTable({ className = "" }: NotesTableProps) {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [deleteNote, setDeleteNote] = useState<Note | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const pageSize = 10;

  const fetchNotes = async (page: number = 0) => {
    try {
      setLoading(true);
      const response: NotesResponse = await NotesService.getAllNotes({
        page,
        size: pageSize
      });

      setNotes(response.content);
      setCurrentPage(response.number);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error) {
      if (error instanceof NotesError) {
        toast.error(error.message);
      } else {
        toast.error("Error al cargar las notas");
      }
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(0);
  }, []);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      fetchNotes(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      fetchNotes(currentPage + 1);
    }
  };

  const handleDeleteClick = (note: Note) => {
    setDeleteNote(note);
    setShowDeleteModal(true);
  };

  const handleDeleteSuccess = () => {
    fetchNotes(currentPage);
    setDeleteNote(null);
  };

  const handleEditClick = (noteId: number) => {
    router.push(`/admin/notes/${noteId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Notas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Cargando notas...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle>Notas</CardTitle>
            <Badge variant="secondary">{totalElements} total</Badge>
          </div>
          <Link href="/admin/notes/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Nota
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>No hay notas disponibles</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Subtítulo</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Creado</TableHead>
                    <TableHead>Actualizado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell className="font-mono text-sm">
                        #{note.id}
                      </TableCell>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={note.title}>
                          {note.title}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={note.subtitle}>
                          {note.subtitle}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={note.category}>
                          {note.category}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div
                          className="text-sm text-gray-600"
                          title={note.description}
                        >
                          {truncateText(note.description)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {note.username || `Usuario ${note.userId}`}
                          </span>
                          <span className="text-xs text-gray-500">
                            ID: {note.userId}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {note.imageUrl || note.imageFilename ? (
                          <Badge variant="outline" className="text-green-600">
                            <Image className="w-3 h-3 mr-1" />
                            Sí
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            No
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(note.createdAt)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(note.updatedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(note.id)}
                            className="h-8 w-8 p-0"
                            title="Editar nota"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(note)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Eliminar nota"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">
                  Mostrando {currentPage * pageSize + 1} -{" "}
                  {Math.min((currentPage + 1) * pageSize, totalElements)} de{" "}
                  {totalElements} notas
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Anterior
                  </Button>
                  <span className="text-sm font-medium">
                    Página {currentPage + 1} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages - 1}
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>

      {/* Delete Modal */}
      <DeleteNoteModal
        note={deleteNote}
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteNote(null);
        }}
        onSuccess={handleDeleteSuccess}
      />
    </Card>
  );
}
