import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/navbar'

export const Route = createFileRoute('/paciente')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Navbar version="paciente" />
      <Outlet />
    </>
  )
}
