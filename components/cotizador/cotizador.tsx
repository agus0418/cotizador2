"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ArrowRight, ArrowLeft, Package, MapPin, Truck, Calculator, 
  Weight, DollarSign, PackageOpen, CheckCircle2, ClipboardList 
} from "lucide-react"

import { useCotizador } from "./use-cotizador"
import { sucursales, tiposPaquete } from "./types"

export function Cotizador() {
  // Estado para controlar el paso actual
  const [paso, setPaso] = useState<1 | 2 | 3>(1)
  
  const {
    origen, setOrigen,
    provincia, setProvincia,
    departamento, setDepartamento,
    localidad, setLocalidad,
    tipoPaquete, setTipoPaquete,
    largo, setLargo,
    ancho, setAncho,
    alto, setAlto,
    peso, setPeso,
    cantidadBultos, setCantidadBultos,
    cotizacion,
    detallesCotizacion,
    provincias,
    departamentos,
    localidades,
    error,
    handleCotizar
  } = useCotizador()
  
  // Validación para avanzar al siguiente paso
  const puedeAvanzarPaso1 = origen && provincia
  const puedeAvanzarPaso2 = tipoPaquete && peso && cantidadBultos
  
  // Manejadores de navegación entre pasos
  const avanzarPaso = () => {
    if (paso === 1 && puedeAvanzarPaso1) {
      setPaso(2)
    } else if (paso === 2 && puedeAvanzarPaso2) {
      // Al avanzar del paso 2, realizamos la cotización
      handleCotizar()
      setPaso(3)
    }
  }
  
  const retrocederPaso = () => {
    if (paso === 2) {
      setPaso(1)
    } else if (paso === 3) {
      setPaso(2)
    }
  }
  
  // Reiniciar el proceso de cotización
  const nuevaCotizacion = () => {
    setPaso(1)
  }

  return (
    <Card className="shadow-xl border-primary/20 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/5 rounded-t-xl">
        <CardTitle className="text-primary text-2xl font-bold tracking-tight flex items-center gap-2">
          <Truck className="w-6 h-6" />
          Cotizador de Envíos
        </CardTitle>
        <CardDescription className="text-base">
          Completa el formulario para obtener el costo de tu envío
        </CardDescription>
        
        {/* Indicador de progreso */}
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paso >= 1 ? 'bg-[#2C588F] text-white' : 'bg-muted'}`}>
              <Truck className="w-5 h-5" />
            </div>
            <span className={`text-xs mt-1 ${paso >= 1 ? 'text-[#2C588F] font-medium' : 'text-muted-foreground'}`}>Origen</span>
          </div>
          
          <div className={`h-0.5 flex-1 mx-2 ${paso >= 2 ? 'bg-[#2C588F]' : 'bg-muted'}`} />
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paso >= 2 ? 'bg-[#2C588F] text-white' : 'bg-muted'}`}>
              <Package className="w-5 h-5" />
            </div>
            <span className={`text-xs mt-1 ${paso >= 2 ? 'text-[#2C588F] font-medium' : 'text-muted-foreground'}`}>Paquete</span>
          </div>
          
          <div className={`h-0.5 flex-1 mx-2 ${paso >= 3 ? 'bg-[#2C588F]' : 'bg-muted'}`} />
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paso >= 3 ? 'bg-[#2C588F] text-white' : 'bg-muted'}`}>
              <Calculator className="w-5 h-5" />
            </div>
            <span className={`text-xs mt-1 ${paso >= 3 ? 'text-[#2C588F] font-medium' : 'text-muted-foreground'}`}>Resultado</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Paso 1: Datos de envío */}
        {paso === 1 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <MapPin className="text-primary w-5 h-5" />
              Datos de envío
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="origen" className="text-sm font-medium flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  Sucursal de origen <span className="text-red-500">*</span>
                </Label>
                <Select value={origen} onValueChange={setOrigen}>
                  <SelectTrigger 
                    id="origen" 
                    className="border-secondary/20 focus:ring-primary/20 rounded-lg transition-all h-11"
                  >
                    <SelectValue placeholder="Selecciona una sucursal" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {sucursales.map((sucursal) => (
                      <SelectItem key={sucursal.id} value={sucursal.id}>
                        {sucursal.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="provincia" className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Provincia de destino <span className="text-red-500">*</span>
                </Label>
                <Select value={provincia} onValueChange={setProvincia}>
                  <SelectTrigger 
                    id="provincia" 
                    className="border-secondary/20 focus:ring-primary/20 rounded-lg transition-all h-11"
                  >
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {provincias.map((prov) => (
                      <SelectItem key={prov.id} value={prov.nombre}>
                        {prov.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-3">
                <Label htmlFor="departamento" className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Departamento
                </Label>
                <Select value={departamento} onValueChange={setDepartamento} disabled={!provincia}>
                  <SelectTrigger 
                    id="departamento" 
                    className="border-secondary/20 focus:ring-primary/20 rounded-lg transition-all h-11 disabled:opacity-60"
                  >
                    <SelectValue placeholder="Selecciona un departamento" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {departamentos.map((depto) => (
                      <SelectItem key={depto.id} value={depto.id}>
                        {depto.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="localidad" className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Localidad
                </Label>
                <Select value={localidad} onValueChange={setLocalidad} disabled={!departamento}>
                  <SelectTrigger 
                    id="localidad" 
                    className="border-secondary/20 focus:ring-primary/20 rounded-lg transition-all h-11 disabled:opacity-60"
                  >
                    <SelectValue placeholder="Selecciona una localidad" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {localidades.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id}>
                        {loc.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mt-5 rounded-lg">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-end mt-6">
              <Button 
                onClick={avanzarPaso} 
                disabled={!puedeAvanzarPaso1}
                className="bg-[#2C588F] hover:bg-[#2C588F]/90 rounded-lg h-11 text-base font-medium transition-all hover:shadow-md flex items-center justify-center gap-2"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Paso 2: Datos del paquete */}
        {paso === 2 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Package className="text-primary w-5 h-5" />
              Datos del paquete
            </h2>
            
            <div className="space-y-3">
              <Label htmlFor="tipoPaquete" className="text-sm font-medium flex items-center gap-1">
                <Package className="w-4 h-4" />
                Tipo de paquete <span className="text-red-500">*</span>
              </Label>
              <Select value={tipoPaquete} onValueChange={setTipoPaquete}>
                <SelectTrigger 
                  id="tipoPaquete" 
                  className="border-secondary/20 focus:ring-primary/20 rounded-lg transition-all h-11"
                >
                  <SelectValue placeholder="Selecciona un tipo de paquete" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {tiposPaquete.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="space-y-3">
                <Label htmlFor="peso" className="text-sm font-medium flex items-center gap-1">
                  <Weight className="w-4 h-4" />
                  Peso (kg) <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="peso" 
                  type="number"
                  min="0.1"
                  step="0.1"
                  placeholder="0" 
                  value={peso} 
                  onChange={(e) => setPeso(e.target.value)}
                  className="border-secondary/20 focus:ring-primary/20 focus-visible:ring-primary/40 rounded-lg h-11"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="cantidadBultos" className="text-sm font-medium flex items-center gap-1">
                  <PackageOpen className="w-4 h-4" />
                  Cantidad de bultos <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="cantidadBultos" 
                  type="number"
                  min="1"
                  step="1"
                  placeholder="1" 
                  value={cantidadBultos} 
                  onChange={(e) => setCantidadBultos(e.target.value)}
                  className="border-secondary/20 focus:ring-primary/20 focus-visible:ring-primary/40 rounded-lg h-11"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              <div className="space-y-3">
                <Label htmlFor="largo" className="text-sm font-medium">Largo (cm)</Label>
                <Input
                  id="largo"
                  type="number"
                  placeholder="0"
                  value={largo}
                  onChange={(e) => setLargo(e.target.value)}
                  className="border-secondary/20 focus:ring-primary/20 focus-visible:ring-primary/40 rounded-lg h-11"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="ancho" className="text-sm font-medium">Ancho (cm)</Label>
                <Input
                  id="ancho"
                  type="number"
                  placeholder="0"
                  value={ancho}
                  onChange={(e) => setAncho(e.target.value)}
                  className="border-secondary/20 focus:ring-primary/20 focus-visible:ring-primary/40 rounded-lg h-11"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="alto" className="text-sm font-medium">Alto (cm)</Label>
                <Input 
                  id="alto" 
                  type="number" 
                  placeholder="0" 
                  value={alto} 
                  onChange={(e) => setAlto(e.target.value)}
                  className="border-secondary/20 focus:ring-primary/20 focus-visible:ring-primary/40 rounded-lg h-11"
                />
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mt-5 rounded-lg">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-between mt-6">
              <Button 
                onClick={retrocederPaso} 
                variant="outline"
                className="rounded-lg h-11 text-base font-medium transition-all hover:shadow-md flex items-center justify-center gap-2 text-[#2C588F] border-[#2C588F] hover:bg-[#2C588F]/10"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver
              </Button>
              
              <Button 
                onClick={avanzarPaso} 
                disabled={!puedeAvanzarPaso2}
                className="bg-[#2C588F] hover:bg-[#2C588F]/90 rounded-lg h-11 text-base font-medium transition-all hover:shadow-md flex items-center justify-center gap-2"
              >
                Cotizar ahora
                <Calculator className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Paso 3: Resultado de la cotización */}
        {paso === 3 && detallesCotizacion && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-green-50 rounded-lg p-3 border border-green-200 flex items-center gap-3 mb-6">
              <CheckCircle2 className="text-green-500 w-6 h-6" />
              <div>
                <h3 className="font-medium text-green-800">¡Cotización completada!</h3>
                <p className="text-sm text-green-700">Tu envío ha sido cotizado correctamente.</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <ClipboardList className="text-primary w-5 h-5" />
              Resumen de tu envío
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-4 border-dashed border-muted-foreground/30">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Datos de envío</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sucursal de origen:</span>
                    <span className="font-medium">{sucursales.find(s => s.id === origen)?.nombre || "-"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Provincia destino:</span>
                    <span className="font-medium">{provincia}</span>
                  </div>
                  {departamento && (
                    <div className="flex justify-between text-sm">
                      <span>Departamento:</span>
                      <span className="font-medium">
                        {departamentos.find(d => d.id === departamento)?.nombre || "-"}
                      </span>
                    </div>
                  )}
                  {localidad && (
                    <div className="flex justify-between text-sm">
                      <span>Localidad:</span>
                      <span className="font-medium">
                        {localidades.find(l => l.id === localidad)?.nombre || "-"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Datos del paquete</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tipo de paquete:</span>
                    <span className="font-medium">{tiposPaquete.find(t => t.id === tipoPaquete)?.nombre || "-"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Peso:</span>
                    <span className="font-medium">{peso} kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cantidad de bultos:</span>
                    <span className="font-medium">{cantidadBultos}</span>
                  </div>
                  {largo && ancho && alto && (
                    <div className="flex justify-between text-sm">
                      <span>Dimensiones:</span>
                      <span className="font-medium">{largo} × {ancho} × {alto} cm</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-5 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
              <h3 className="font-semibold text-lg mb-4 text-secondary flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Detalle de la cotización
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm border-b pb-2 border-secondary/10">
                  <span className="text-muted-foreground">Precio base del servicio:</span>
                  <span className="font-medium">${detallesCotizacion.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm border-b pb-2 border-secondary/10">
                  <span className="text-muted-foreground">Cargo por peso ({peso} kg):</span>
                  <span className="font-medium">${detallesCotizacion.cargoPeso.toFixed(2)}</span>
                </div>
                
                {detallesCotizacion.cargoDistancia > 0 && (
                  <div className="flex justify-between items-center text-sm border-b pb-2 border-secondary/10">
                    <span className="text-muted-foreground">Cargo por distancia:</span>
                    <span className="font-medium">${detallesCotizacion.cargoDistancia.toFixed(2)}</span>
                  </div>
                )}
                
                {detallesCotizacion.cargoBultos > 0 && (
                  <div className="flex justify-between items-center text-sm border-b pb-2 border-secondary/10">
                    <span className="text-muted-foreground">Cargo por bultos adicionales:</span>
                    <span className="font-medium">${detallesCotizacion.cargoBultos.toFixed(2)}</span>
                  </div>
                )}
                
                {detallesCotizacion.cargoTipoPaquete > 0 && (
                  <div className="flex justify-between items-center text-sm border-b pb-2 border-secondary/10">
                    <span className="text-muted-foreground">Cargo por tipo de paquete:</span>
                    <span className="font-medium">${detallesCotizacion.cargoTipoPaquete.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-2 font-semibold">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Total estimado:
                  </span>
                  <span className="text-2xl font-bold text-primary">${detallesCotizacion.total.toFixed(2)}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                Este es un valor estimado. El precio final puede variar según condiciones específicas del envío.
              </p>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button 
                onClick={retrocederPaso} 
                variant="outline"
                className="rounded-lg h-11 text-base font-medium transition-all hover:shadow-md flex items-center justify-center gap-2 text-[#2C588F] border-[#2C588F] hover:bg-[#2C588F]/10"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver
              </Button>
              
              <Button 
                onClick={nuevaCotizacion}
                className="bg-[#2C588F] hover:bg-[#2C588F]/90 rounded-lg h-11 text-base font-medium transition-all hover:shadow-md flex items-center justify-center gap-2"
              >
                Nueva cotización
                <Truck className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-xs text-muted-foreground">
          <p>Los campos marcados con <span className="text-red-500">*</span> son obligatorios</p>
        </div>
      </CardContent>
    </Card>
  )
} 