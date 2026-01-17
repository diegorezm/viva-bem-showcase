import { Link, createFileRoute } from '@tanstack/react-router'
import { mockAppointments } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/paciente/')({
  component: PacientePage,
})

function PacientePage() {
  const patientId = 'p1' // mock current patient
  const upcoming = mockAppointments.filter(
    (a) => a.patientId === patientId && a.status === 'scheduled',
  )
  const previous = mockAppointments.filter(
    (a) => a.patientId === patientId && a.status !== 'scheduled',
  )

  const doctors = [
    { id: 'd1', name: 'Dr. João Pereira', specialty: 'Clínico Geral' },
    { id: 'd2', name: 'Dra. Beatriz Silva', specialty: 'Cardiologista' },
  ]

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      {/* Left/Main Content */}
      <div className="space-y-10">
        {/* Doctors Section */}
        <section>
          <h1 className="text-2xl font-bold mb-4">Meus Médicos</h1>
          <div className="grid md:grid-cols-2 gap-4">
            {doctors.map((doc) => (
              <Card
                key={doc.id}
                className="hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <CardTitle>{doc.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {doc.specialty}
                  </p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Link
                      to={'/paciente/doutor/$doctorId'}
                      params={{
                        doctorId: doc.id,
                      }}
                    >
                      Ver Detalhes
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Past Appointments */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Consultas Anteriores</h2>
          <div className="space-y-3">
            {previous.map((a) => (
              <Card key={a.id} className="p-3">
                <p>
                  <strong>{a.date}</strong> às {a.time} — {a.type}
                </p>
                <p className="text-sm text-muted-foreground">
                  {a.doctorName} —{' '}
                  {a.status === 'completed' ? 'Concluída' : 'Cancelada'}
                </p>
              </Card>
            ))}
            {previous.length === 0 && (
              <p className="text-muted-foreground">
                Nenhum histórico disponível.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Right Sidebar */}
      <aside className="lg:sticky lg:top-38 self-start">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            {upcoming.length > 0 ? (
              <ul className="space-y-3">
                {upcoming.map((a) => (
                  <li key={a.id} className="border rounded-md p-3">
                    <p className="font-medium">
                      {a.date} às {a.time}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {a.doctorName} — {a.type}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">
                Nenhuma consulta marcada.
              </p>
            )}
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
