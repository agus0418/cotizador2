import { Cotizador } from "@/components/cotizador"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"

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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
