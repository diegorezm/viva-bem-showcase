import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Severity, SymptomReport } from '@/lib/types'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

const commonSymptoms = [
  'Dor de cabeça',
  'Febre',
  'Tosse',
  'Fadiga',
  'Náusea',
  'Tontura',
  'Dor nas costas',
  'Dor de garganta',
  'Dor muscular',
  'Falta de ar',
  'Outros (descreva)',
]

interface SymptomFormProps {
  onSubmit: (
    report: Omit<
      SymptomReport,
      'id' | 'patientId' | 'patientName' | 'createdAt' | 'status'
    >,
  ) => void
}

export function SymptomForm({ onSubmit }: SymptomFormProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Array<string>>([])
  const [severity, setSeverity] = useState<Severity>('leve')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom],
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (selectedSymptoms.length === 0) return

    onSubmit({
      symptoms: selectedSymptoms,
      severity,
      description,
      duration,
    })

    // Resetar o formulário
    setSelectedSymptoms([])
    setSeverity('leve')
    setDescription('')
    setDuration('')
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-xl">Reportar Novo Sintoma</CardTitle>
        <CardDescription>
          Selecione seus sintomas e forneça detalhes para o seu médico
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Selecione os Sintomas</Label>
            <div className="grid grid-cols-2 gap-3">
              {commonSymptoms.map((symptom) => (
                <div key={symptom} className="flex items-center gap-2">
                  <Checkbox
                    id={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onCheckedChange={() => handleSymptomToggle(symptom)}
                  />
                  <Label
                    htmlFor={symptom}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {symptom}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="severity">Gravidade</Label>
              <Select
                value={severity}
                onValueChange={(v) => setSeverity(v as typeof severity)}
              >
                <SelectTrigger id="severity">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leve">Leve</SelectItem>
                  <SelectItem value="moderada">Moderada</SelectItem>
                  <SelectItem value="grave">Grave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duração</Label>
              <Input
                id="duration"
                placeholder="ex: 3 dias, 1 semana"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detalhes Adicionais</Label>
            <Textarea
              id="description"
              placeholder="Descreva seus sintomas com mais detalhes..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={selectedSymptoms.length === 0}
          >
            Enviar Relatório
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
