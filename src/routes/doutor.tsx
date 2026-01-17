import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/navbar'

export const Route = createFileRoute('/doutor')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Navbar version="doutor" />
      <Outlet />
    </>
  )
}
