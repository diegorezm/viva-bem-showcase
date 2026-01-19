import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SymptomFrequencyChartProps {
  reports: Array<{ symptoms: Array<string> }>
}

const COLORS = [
  '#3B82F6', // blue
  '#F59E0B', // amber
  '#10B981', // emerald
  '#EF4444', // red
  '#8B5CF6', // violet
  '#F97316', // orange
  '#06B6D4', // cyan
  '#A855F7', // purple
  '#84CC16', // lime
  '#EC4899', // pink
  '#22C55E', // green
  '#EAB308', // yellow
  '#0EA5E9', // sky
  '#6366F1', // indigo
  '#14B8A6', // teal
  '#F43F5E', // rose
  '#4ADE80', // light green
  '#FB923C', // soft orange
  '#2DD4BF', // aqua
  '#C084FC', // lilac
  '#F87171', // light red
  '#60A5FA', // light blue
  '#34D399', // light emerald
  '#FBBF24', // gold
  '#A78BFA', // soft violet
  '#E879F9', // fuchsia
  '#22D3EE', // bright cyan
  '#A3E635', // lime green
  '#FDE047', // light yellow
  '#FCA5A5', // salmon
  '#E5E7EB', // gray light (neutral)
]

function getSymptomFrequency(reports: SymptomFrequencyChartProps['reports']) {
  const freq: Record<string, number> = {}

  reports.forEach((r) => {
    r.symptoms.forEach((s) => {
      freq[s] = (freq[s] || 0) + 1
    })
  })

  return Object.entries(freq)
    .map(([symptom, count]) => ({ symptom, count }))
    .sort((a, b) => b.count - a.count)
}

export function SymptomFrequencyChart({ reports }: SymptomFrequencyChartProps) {
  const data = getSymptomFrequency(reports)

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resumo dos Sintomas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm text-center">
            Nenhum dado disponível ainda.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo dos Sintomas</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="symptom"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.375rem',
              }}
              labelStyle={{
                color: 'hsl(var(--foreground))',
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
