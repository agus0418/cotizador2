import { Button } from "@/components/ui/button"
import { Truck, Package, ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Fondo con degradado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C588F]/5 via-muted to-muted/70 z-0"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-16 right-[10%] w-64 h-64 rounded-full bg-[#2C588F]/10 blur-3xl"></div>
      <div className="absolute bottom-16 left-[10%] w-96 h-96 rounded-full bg-[#2C588F]/5 blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 bg-[#2C588F]/10 rounded-full">
          <span className="text-[#2C588F] font-medium text-sm flex items-center gap-2">
            <Truck className="w-4 h-4" /> 
            Servicio de envíos premium
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#2C588F] to-slate-800">
          Envíos rápidos y seguros
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Cotiza y gestiona tus envíos de manera fácil y rápida. Llegamos a todo el país con las mejores tarifas del
          mercado.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-[#2C588F] hover:bg-[#2C588F]/90 transition-all h-14 px-8 rounded-xl font-medium text-base flex items-center gap-2"
          >
            Cotizar ahora
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="text-[#2C588F] border-[#2C588F] hover:bg-[#2C588F]/10 transition-all h-14 px-8 rounded-xl font-medium text-base flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            Conocer más
          </Button>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#2C588F]/20 flex items-center justify-center">
              <CheckIcon className="w-3 h-3 text-[#2C588F]" />
            </div>
            <span>Entregas en 24-48hs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#2C588F]/20 flex items-center justify-center">
              <CheckIcon className="w-3 h-3 text-[#2C588F]" />
            </div>
            <span>Seguimiento en tiempo real</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#2C588F]/20 flex items-center justify-center">
              <CheckIcon className="w-3 h-3 text-[#2C588F]" />
            </div>
            <span>Cobertura nacional</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Componente simple para el ícono de check
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3"
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
