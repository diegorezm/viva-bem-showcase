import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/paciente/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/paciente/"!</div>
}
