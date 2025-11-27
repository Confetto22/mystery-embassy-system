"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DepartmentsPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
        <p className="text-gray-600">Manage church departments and their members</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Departments page content will be implemented here.</p>
        </CardContent>
      </Card>
    </main>
  );
}