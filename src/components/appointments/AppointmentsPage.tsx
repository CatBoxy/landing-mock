"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Calendar, Clock, Users } from "lucide-react";
import { AppointmentFilters, FilterPeriod } from "./AppointmentFilters";
import { AppointmentsTable } from "./AppointmentsTable";
import { useAdminApi, useAdminAppointmentsByRange } from "@/hooks/api/useAdmin";
import { getDateRange, isToday } from "@/lib/utils/date";
import { handleApiError } from "@/lib/api-client";

export function AppointmentsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod>("today");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [currentDateRange, setCurrentDateRange] = useState(
    getDateRange("today")
  );

  const { appointments, refreshAppointments } = useAdminApi();

  // Load appointments with current date range
  const appointmentsWithRange = useAdminAppointmentsByRange(currentDateRange);

  const handlePeriodChange = (period: FilterPeriod) => {
    setSelectedPeriod(period);
    if (period !== "custom") {
      const range = getDateRange(period);
      setCurrentDateRange(range);
    }
  };

  const handleApplyFilters = () => {
    if (selectedPeriod === "custom") {
      if (customStartDate && customEndDate) {
        setCurrentDateRange({
          startDate: customStartDate,
          endDate: customEndDate
        });
      }
    } else {
      const range = getDateRange(selectedPeriod);
      setCurrentDateRange(range);
    }
  };

  // Initialize custom dates with today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCustomStartDate(today);
    setCustomEndDate(today);
  }, []);

  const appointmentsData = appointmentsWithRange.data || [];
  const isLoading = appointmentsWithRange.isLoading;
  const error = appointmentsWithRange.error;

  // Calculate stats
  const todayAppointments = appointmentsData.filter((apt) => isToday(apt.date));
  const confirmedAppointments = appointmentsData.filter(
    (apt) => apt.status === "confirmed"
  );
  const pendingAppointments = appointmentsData.filter(
    (apt) => apt.status === "pending"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Citas Médicas</h1>
          <p className="text-gray-600 mt-1">
            Visualiza y gestiona las citas del sistema
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => appointmentsWithRange.mutate()}
          disabled={isLoading}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Actualizar
        </Button>
      </div>

      {/* Filters */}
      <AppointmentFilters
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
        customStartDate={customStartDate}
        customEndDate={customEndDate}
        onCustomStartDateChange={setCustomStartDate}
        onCustomEndDateChange={setCustomEndDate}
        onApplyFilters={handleApplyFilters}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {todayAppointments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Período</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentsData.length}</div>
            <p className="text-xs text-muted-foreground">
              {selectedPeriod === "today" && "Hoy"}
              {selectedPeriod === "week" && "Esta semana"}
              {selectedPeriod === "month" && "Este mes"}
              {selectedPeriod === "custom" && "Período personalizado"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {confirmedAppointments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {appointmentsData.length > 0
                ? Math.round(
                    (confirmedAppointments.length / appointmentsData.length) *
                      100
                  )
                : 0}
              % del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingAppointments.length}
            </div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Citas</CardTitle>
          <p className="text-sm text-gray-600">
            Mostrando citas desde {currentDateRange.startDate} hasta{" "}
            {currentDateRange.endDate}
          </p>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">
                Error al cargar citas: {error.message}
              </p>
              <Button
                onClick={() => appointmentsWithRange.mutate()}
                variant="outline"
              >
                Reintentar
              </Button>
            </div>
          ) : (
            <AppointmentsTable
              appointments={appointmentsData}
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
