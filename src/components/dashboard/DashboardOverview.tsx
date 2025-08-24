"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  Clock,
  Activity,
  Stethoscope,
  CalendarCheck
} from "lucide-react";
import Link from "next/link";
import { useAdminApi } from "@/hooks/api/useAdmin";
import { isToday } from "@/lib/utils/date";

export function DashboardOverview() {
  const { doctors, appointments } = useAdminApi();

  const doctorsData = doctors.data || [];
  const appointmentsData = appointments.data || [];

  // Calculate stats
  const activeDoctors = doctorsData.filter((d) => d.isActive).length;
  const todayAppointments = appointmentsData.filter((apt) =>
    isToday(apt.date)
  ).length;
  const pendingAppointments = appointmentsData.filter(
    (apt) => apt.status === "pending"
  ).length;
  const confirmedAppointments = appointmentsData.filter(
    (apt) => apt.status === "confirmed"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Panel de Administración
        </h1>
        <p className="text-gray-600 mt-1">
          Resumen general del sistema de citas médicas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Médicos Activos
            </CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {activeDoctors}
            </div>
            <p className="text-xs text-muted-foreground">
              de {doctorsData.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {todayAppointments}
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long"
              })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Citas Pendientes
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingAppointments}
            </div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Citas Confirmadas
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">
              {confirmedAppointments}
            </div>
            <p className="text-xs text-muted-foreground">Listas para atender</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Stethoscope className="h-5 w-5 mr-2" />
              Gestión de Médicos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Administra los médicos del sistema, crea nuevos perfiles y
              gestiona su estado.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild>
                <Link href="/admin/doctors">Ver Médicos</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/doctors">Nuevo Médico</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Gestión de Citas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Visualiza y administra todas las citas médicas del sistema.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild>
                <Link href="/admin/appointments">Ver Citas</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/appointments">Citas de Hoy</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {doctors.isLoading || appointments.isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-100 rounded animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {appointmentsData.slice(0, 5).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                >
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Cita: {appointment.patient?.name || "Paciente"} con Dr.{" "}
                      {appointment.doctor?.name || "Médico"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString("es-ES")} a
                      las {appointment.time}
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 text-xs rounded-full ${
                      appointment.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : appointment.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {appointment.status === "confirmed"
                      ? "Confirmada"
                      : appointment.status === "pending"
                      ? "Pendiente"
                      : appointment.status === "cancelled"
                      ? "Cancelada"
                      : "Completada"}
                  </div>
                </div>
              ))}
              {appointmentsData.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No hay actividad reciente
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
