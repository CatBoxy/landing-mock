"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { Doctor } from "@/types/api";

interface DoctorsTableProps {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDeactivate: (doctorId: string) => void;
  isLoading?: boolean;
}

export function DoctorsTable({
  doctors,
  onEdit,
  onDeactivate,
  isLoading = false
}: DoctorsTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No hay médicos registrados</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">
              Especialización
            </TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell className="font-medium">
                <div>
                  <p className="font-semibold">{doctor.name}</p>
                  <p className="text-sm text-gray-500 sm:hidden">
                    {doctor.email}
                  </p>
                  <p className="text-sm text-gray-500 md:hidden sm:block">
                    {doctor.specialization}
                  </p>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {doctor.email}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {doctor.specialization}
              </TableCell>
              <TableCell>
                <Badge
                  variant={doctor.isActive ? "default" : "secondary"}
                  className={
                    doctor.isActive
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {doctor.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(doctor)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  {doctor.isActive && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeactivate(doctor.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Desactivar</span>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
