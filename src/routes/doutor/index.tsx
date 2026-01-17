import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/doutor/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/doutor/"!</div>
}
