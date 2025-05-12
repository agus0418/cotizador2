"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, Package, MapPin, Truck, Calculator, Weight, DollarSign, PackageOpen } from "lucide-react"

import { useCotizador } from "./use-cotizador"
import { sucursales, tiposPaquete } from "./types"

export function Cotizador() {
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
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="envio" className="w-full mt-2">
          <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg p-1 bg-muted/30">
            <TabsTrigger 
              value="envio" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Datos de envío
            </TabsTrigger>
            <TabsTrigger 
              value="paquete" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Datos del paquete
            </TabsTrigger>
          </TabsList>
          <TabsContent value="envio" className="space-y-5 pt-2">
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
          </TabsContent>
          <TabsContent value="paquete" className="space-y-5 pt-2">
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
          </TabsContent>
        </Tabs>

        {detallesCotizacion && (
          <div className="mt-8 p-5 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="font-semibold text-lg mb-4 text-secondary flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Cotización detallada
            </h3>
            
            <div className="space-y-3">
              {/* Desglose de la cotización */}
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
        )}
        
        <div className="mt-6 text-xs text-muted-foreground">
          <p>Los campos marcados con <span className="text-red-500">*</span> son obligatorios</p>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-primary/10 to-secondary/5 rounded-b-xl p-6">
        <Button 
          onClick={handleCotizar} 
          className="w-full bg-primary hover:bg-primary/90 rounded-lg h-12 text-base font-medium transition-all hover:shadow-md flex items-center justify-center gap-2"
        >
          Cotizar envío
          <ArrowRight className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  )
} 