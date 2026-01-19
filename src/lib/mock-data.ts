import type { Appointment, SymptomReport } from './types'

export const mockSymptomReports: Array<SymptomReport> = [
  {
    id: 's1',
    patientId: 'p1',
    patientName: 'Ana Souza',
    createdAt: '2026-01-16T09:30:00Z',
    symptoms: ['Dor de cabeça', 'Tontura', 'Febre'],
    severity: 'Moderada',
    description:
      'Senti dor de cabeça o dia todo e um pouco de tontura pela manhã.',
    duration: '2 dias',
    status: 'pending',
  },
  {
    id: 's2',
    patientId: 'p2',
    patientName: 'Carlos Lima',
    createdAt: '2026-01-15T14:10:00Z',
    symptoms: ['Febre', 'Fadiga'],
    severity: 'Grave',
    description: 'Febre alta desde ontem à noite e cansaço extremo.',
    duration: '1 dia',
    status: 'reviewed',
  },
  {
    id: 's3',
    patientId: 'p3',
    patientName: 'Mariana Torres',
    createdAt: '2026-01-14T08:45:00Z',
    symptoms: ['Tosse', 'Dor de garganta'],
    severity: 'Leve',
    description: 'Tosse leve e irritação na garganta durante a manhã.',
    duration: '3 dias',
    status: 'follow-up',
  },
]

export const mockAppointments: Array<Appointment> = [
  {
    id: 'a1',
    patientId: 'p1',
    doctorId: 'd1',
    doctorName: 'Dr. João Pereira',
    date: '2026-01-18',
    time: '10:00',
    type: 'consultation',
    status: 'scheduled',
  },
  {
    id: 'a2',
    patientId: 'p2',
    doctorId: 'd1',
    doctorName: 'Dr. João Pereira',
    date: '2026-01-10',
    time: '15:30',
    type: 'follow-up',
    status: 'completed',
  },
  {
    id: 'a3',
    patientId: 'p3',
    doctorId: 'd2',
    doctorName: 'Dra. Beatriz Silva',
    date: '2026-01-20',
    time: '09:15',
    type: 'checkup',
    status: 'scheduled',
  },
]
