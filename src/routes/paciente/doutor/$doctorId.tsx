import { useState } from 'react'
import { createFileRoute, useParams } from '@tanstack/react-router'

import { RiHeartAdd2Fill } from '@remixicon/react'

import type { SymptomReport } from '@/lib/types'
import { mockSymptomReports } from '@/lib/mock-data'

import { SymptomForm } from '@/components/patient/symptom-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export const Route = createFileRoute('/paciente/doutor/$doctorId')({
  component: DoutorPage,
})

function DoutorPage() {
  const { doctorId } = useParams({ from: '/paciente/doutor/$doctorId' })
  const patientId = 'p1'

  const doctorData: Record<
    string,
    { name: string; specialty: string; bio: string }
  > = {
    d1: {
      name: 'Dr. João Pereira',
      specialty: 'Clínico Geral',
      bio: 'Médico clínico com 10 anos de experiência no acompanhamento de pacientes crônicos.',
    },
    d2: {
      name: 'Dra. Beatriz Silva',
      specialty: 'Cardiologista',
      bio: 'Especialista em cardiologia preventiva e reabilitação cardiovascular.',
    },
  }

  const doctor = doctorData[doctorId]
  const [reports, setReports] = useState<Array<SymptomReport>>(
    mockSymptomReports.filter((r) => r.patientId === patientId),
  )

  function handleSubmit(
    data: Omit<
      SymptomReport,
      'id' | 'patientName' | 'patientId' | 'createdAt' | 'status'
    >,
  ) {
    const newReport: SymptomReport = {
      id: `r-${Date.now()}`,
      patientId,
      patientName: 'Ana Souza',
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...data,
    }

    mockSymptomReports.push(newReport)
    setReports((prev) => [newReport, ...prev])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 pb-2 mt-10">
      {/* Left/Main column */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{doctor.name}</CardTitle>
            <p className="text-md text-muted-foreground">{doctor.specialty}</p>
          </CardHeader>
          <CardContent>
            <p>{doctor.bio}</p>
          </CardContent>
        </Card>

        {/* Previous Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Seus Relatórios Anteriores</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {reports.map((r) => (
                <li key={r.id} className="border p-3 rounded-md">
                  <p className="font-medium">
                    {new Date(r.createdAt).toLocaleDateString()} — Gravidade:{' '}
                    {r.severity}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {r.symptoms.join(', ')}
                  </p>
                  <p className="text-sm">{r.description}</p>
                </li>
              ))}

              {reports.length === 0 && (
                <p className="text-muted-foreground">
                  Nenhum sintoma reportado ainda.
                </p>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Right column: Symptom Form */}
      <div className="hidden lg:block">
        <SymptomForm onSubmit={handleSubmit} />
      </div>

      {/* Mobile Dialog for Form */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <Dialog>
          <DialogTrigger>
            <Button className="rounded-full shadow-lg">
              <RiHeartAdd2Fill className="size-4" />
              Reportar Sintoma
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0">
            <SymptomForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
