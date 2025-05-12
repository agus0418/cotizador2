import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Envíos rápidos y seguros</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Cotiza y gestiona tus envíos de manera fácil y rápida. Llegamos a todo el país con las mejores tarifas del
          mercado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Cotizar ahora</Button>
          <Button size="lg" variant="outline">
            Conocer más
          </Button>
        </div>
      </div>
    </section>
  )
}
