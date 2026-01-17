import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <div className="max-w-4xl mx-auto mt-12 text-center space-y-6">
      <h1 className="text-3xl font-bold text-primary">Bem-vindo ao VivaBem</h1>
      <p className="text-muted-foreground">
        Acompanhe seus sintomas e compartilhe atualizações com seu médico em
        tempo real.
      </p>

      <div className="flex justify-center gap-4">
        <Button>
          <Link to="/paciente">Entrar como Paciente</Link>
        </Button>
        <Button variant="outline">
          <Link to="/doutor">Entrar como Médico</Link>
        </Button>
      </div>
    </div>
  )
}
