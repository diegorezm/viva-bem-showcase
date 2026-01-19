import { Link, createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { mockAppointments, mockSymptomReports } from '@/lib/mock-data'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/doutor/')({
  component: DoctorDashboard,
})

function DoctorDashboard() {
  const doctorId = 'd1'
  const [filter, setFilter] = useState('')

  // Get all patients with reports or appointments tied to this doctor
  const patientReports = mockSymptomReports.filter((r) =>
    mockAppointments.find(
      (a) => a.doctorId === doctorId && a.patientId === r.patientId,
    ),
  )
  const uniquePatients = useMemo(() => {
    const map = new Map<
      string,
      { name: string; lastDate: string; avgSeverity: string }
    >()
    for (const r of patientReports) {
      const prev = map.get(r.patientId)
      const currentSeverity =
        r.severity === 'Leve' ? 1 : r.severity === 'Moderada' ? 2 : 3
      if (!prev || new Date(r.createdAt) > new Date(prev.lastDate)) {
        map.set(r.patientId, {
          name: r.patientName,
          lastDate: r.createdAt,
          avgSeverity: currentSeverity.toString(),
        })
      }
    }
    return Array.from(map.entries()).map(([id, data]) => ({ id, ...data }))
  }, [patientReports])

  const filtered = uniquePatients.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      <h1 className="text-2xl font-bold">Painel do Médico</h1>

      {/* Filter bar */}
      <div>
        <Input
          placeholder="Filtrar pacientes por nome..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Patient list */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Último relatório: {p.lastDate.slice(0, 10)}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">
                Gravidade média: <strong>{p.avgSeverity}</strong>
              </p>
              <Link
                to={`/doutor/paciente/${p.id}`}
                className="text-sm text-primary hover:underline"
              >
                Ver detalhes →
              </Link>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <p className="text-muted-foreground">Nenhum paciente encontrado.</p>
        )}
      </div>
    </div>
  )
}
