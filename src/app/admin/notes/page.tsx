"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { NotesTable } from "@/components/NotesTable";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminNotesPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Notas
            </h1>
            <p className="text-gray-600">
              Administra todas las notas del sistema, {user?.username}
            </p>
          </div>

          {/* Notes Table */}
          <NotesTable />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
