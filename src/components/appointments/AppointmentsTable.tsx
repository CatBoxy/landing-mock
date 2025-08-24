"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "@/types/api";

interface AppointmentsTableProps {
  appointments: Appointment[];
  isLoading?: boolean;
}

const statusConfig = {
  pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmada", className: "bg-green-100 text-green-800" },
  completed: { label: "Completada", className: "bg-blue-100 text-blue-800" },
  cancelled: { label: "Cancelada", className: "bg-red-100 text-red-800" }
};

export function AppointmentsTable({
  appointments,
  isLoading = false
}: AppointmentsTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No hay citas para el período seleccionado</p>
        <p className="text-sm mt-2">Prueba con un rango de fechas diferente</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paciente</TableHead>
            <TableHead className="hidden sm:table-cell">Médico</TableHead>
            <TableHead>Fecha y Hora</TableHead>
            <TableHead className="hidden md:table-cell">Estado</TableHead>
            <TableHead className="hidden lg:table-cell">Notas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">
                <div>
                  <p className="font-semibold">
                    {appointment.patient?.name || "Paciente sin nombre"}
                  </p>
                  <p className="text-sm text-gray-500 sm:hidden">
                    Dr. {appointment.doctor?.name || "Médico sin nombre"}
                  </p>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div>
                  <p className="font-medium">
                    Dr. {appointment.doctor?.name || "Médico sin nombre"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {appointment.doctor?.specialization}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">
                    {new Date(appointment.date).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    })}
                  </p>
                  <p className="text-sm text-gray-500">{appointment.time}</p>
                  <div className="md:hidden mt-1">
                    <Badge
                      className={statusConfig[appointment.status].className}
                    >
                      {statusConfig[appointment.status].label}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge className={statusConfig[appointment.status].className}>
                  {statusConfig[appointment.status].label}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell max-w-xs">
                <p className="text-sm text-gray-600 truncate">
                  {appointment.notes || "Sin notas"}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
