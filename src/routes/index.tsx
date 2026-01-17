import { createFileRoute } from '@tanstack/react-router'

import { SymptomForm } from '@/components/patient/symptom-form'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <SymptomForm
        onSubmit={(v) => {
          console.log(v)
        }}
      />
    </div>
  )
}
