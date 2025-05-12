import { Hero } from "@/components/hero"
import { Cotizador } from "@/components/cotizador/cotizador"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import Link from "next/link"
import { Settings } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Cotiza tu envío</h2>
            <Cotizador />
            
            <div className="mt-16 text-center">
              <Link 
                href="/admin" 
                className="inline-flex items-center text-sm text-[#2C588F] hover:text-[#2C588F]/80 gap-1.5 font-medium"
              >
                <Settings className="w-4 h-4" />
                Panel de Administración
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
