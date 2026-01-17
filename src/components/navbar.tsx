import { Link } from '@tanstack/react-router'
import { RiHeartAdd2Fill, RiUser2Fill } from '@remixicon/react'
import { Button } from './ui/button'

type Props = {
  version: 'paciente' | 'doutor'
}

export function Navbar({ version = 'paciente' }: Props) {
  const isPaciente = version === 'paciente'

  const linkLabel = isPaciente ? 'Visão do Médico' : 'Visão do Paciente'
  const linkTo = isPaciente ? '/doutor' : '/paciente'
  const userLabel = isPaciente ? 'Paciente' : 'Médico'

  return (
    <header className="sticky top-0 z-10 border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <RiHeartAdd2Fill className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">VivaBem</span>
        </div>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Link to={linkTo}>{linkLabel}</Link>
          </Button>

          <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-3 py-1.5">
            <RiUser2Fill className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{userLabel}</span>
          </div>
        </nav>
      </div>
    </header>
  )
}
