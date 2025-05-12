import Link from "next/link"
import { Package } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <span className="font-bold text-xl">EnvíosExpress</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Inicio
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Servicios
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Sucursales
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Contacto
          </Link>
        </nav>
        <Button>Iniciar sesión</Button>
      </div>
    </header>
  )
}
