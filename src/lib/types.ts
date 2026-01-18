export interface Patient {
  id: string
  name: string
  email: string
  dateOfBirth: string
  phone: string
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  email: string
}

export type Severity = 'Leve' | 'Moderada' | 'Grave'

export interface SymptomReport {
  id: string
  patientId: string
  patientName: string
  createdAt: string
  symptoms: Array<string>
  severity: Severity
  description: string
  duration: string
  status: 'pending' | 'reviewed' | 'follow-up'
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  type: 'checkup' | 'follow-up' | 'consultation'
  status: 'scheduled' | 'completed' | 'cancelled'
}
