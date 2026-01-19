import { Link, createFileRoute } from '@tanstack/react-router'
import { RiArrowLeftSLine } from '@remixicon/react'
import { mockAppointments, mockSymptomReports } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SymptomFrequencyChart } from '@/components/patient/symptom-frequency'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/doutor/paciente/$pacienteId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { pacienteId } = Route.useParams()
  const doctorId = 'd1'

  const patientReports = mockSymptomReports

  const patientAppointments = mockAppointments.filter(
    (a) => a.patientId === pacienteId && a.doctorId === doctorId,
  )

  const patientName = patientReports[0]?.patientName || 'Paciente'
  const lastReportDate =
    patientReports.length > 0
      ? new Date(patientReports[0].createdAt).toLocaleDateString()
      : 'Nenhum relatório'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mt-8">
      {/* Left – Patient Reports */}
      <div className="space-y-6">
        <Link to="/doutor">
          <Button className={'mb-2'}>
            <RiArrowLeftSLine />
            Voltar
          </Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>{patientName}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Último relatório: {lastReportDate}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Total de relatórios: {patientReports.length}
            </p>
          </CardContent>
        </Card>
        <SymptomFrequencyChart reports={patientReports} />
      </div>

      {/* Right – Appointments Sidebar */}
      <aside className="lg:sticky lg:top-20 self-start space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            {patientAppointments.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Nenhuma consulta marcada.
              </p>
            ) : (
              <ul className="space-y-2">
                {patientAppointments.map((a) => (
                  <li key={a.id} className="border p-2 rounded-md">
                    <p className="font-medium text-sm">
                      {a.date} às {a.time}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {a.type} — {a.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Relatórios de Sintomas</CardTitle>
          </CardHeader>
          <CardContent>
            {patientReports.length === 0 ? (
              <p className="text-muted-foreground">
                Nenhum relatório do paciente ainda.
              </p>
            ) : (
              <ul className="space-y-3">
                {patientReports.map((r) => (
                  <li key={r.id} className="border p-3 rounded-md">
                    <p className="font-medium flex justify-between">
                      <span>{r.createdAt.slice(0, 10)}</span>
                      <span
                        className={
                          r.severity === 'Grave'
                            ? 'text-red-600'
                            : r.severity === 'Moderada'
                              ? 'text-yellow-600'
                              : 'text-green-600'
                        }
                      >
                        {r.severity}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {r.symptoms.join(', ')}
                    </p>
                    <p className="text-sm">{r.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Status: {r.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
