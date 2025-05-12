"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
    cotizacion,
    provincias,
    departamentos,
    localidades,
    error,
    handleCotizar
  } = useCotizador()

  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader className="bg-primary/5 rounded-t-lg">
        <CardTitle className="text-primary">Cotizador de Envíos</CardTitle>
        <CardDescription>Completa el formulario para obtener el costo de tu envío</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="envio" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="envio" className="data-[state=active]:bg-primary">Datos de envío</TabsTrigger>
            <TabsTrigger value="paquete" className="data-[state=active]:bg-primary">Datos del paquete</TabsTrigger>
          </TabsList>
          <TabsContent value="envio" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origen">Sucursal de origen</Label>
                <Select value={origen} onValueChange={setOrigen}>
                  <SelectTrigger id="origen" className="border-secondary/20 focus:ring-primary/20">
                    <SelectValue placeholder="Selecciona una sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    {sucursales.map((sucursal) => (
                      <SelectItem key={sucursal.id} value={sucursal.id}>
                        {sucursal.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="provincia">Provincia de destino</Label>
                <Select value={provincia} onValueChange={setProvincia}>
                  <SelectTrigger id="provincia" className="border-secondary/20 focus:ring-primary/20">
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provincias.map((prov) => (
                      <SelectItem key={prov.id} value={prov.nombre}>
                        {prov.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Select value={departamento} onValueChange={setDepartamento} disabled={!provincia}>
                  <SelectTrigger id="departamento" className="border-secondary/20 focus:ring-primary/20">
                    <SelectValue placeholder="Selecciona un departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departamentos.map((depto) => (
                      <SelectItem key={depto.id} value={depto.id}>
                        {depto.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="localidad">Localidad</Label>
                <Select value={localidad} onValueChange={setLocalidad} disabled={!departamento}>
                  <SelectTrigger id="localidad" className="border-secondary/20 focus:ring-primary/20">
                    <SelectValue placeholder="Selecciona una localidad" />
                  </SelectTrigger>
                  <SelectContent>
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
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </TabsContent>
          <TabsContent value="paquete" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="tipoPaquete">Tipo de paquete</Label>
              <Select value={tipoPaquete} onValueChange={setTipoPaquete}>
                <SelectTrigger id="tipoPaquete" className="border-secondary/20 focus:ring-primary/20">
                  <SelectValue placeholder="Selecciona un tipo de paquete" />
                </SelectTrigger>
                <SelectContent>
                  {tiposPaquete.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="largo">Largo (cm)</Label>
                <Input
                  id="largo"
                  type="number"
                  placeholder="0"
                  value={largo}
                  onChange={(e) => setLargo(e.target.value)}
                  className="border-secondary/20 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ancho">Ancho (cm)</Label>
                <Input
                  id="ancho"
                  type="number"
                  placeholder="0"
                  value={ancho}
                  onChange={(e) => setAncho(e.target.value)}
                  className="border-secondary/20 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alto">Alto (cm)</Label>
                <Input 
                  id="alto" 
                  type="number" 
                  placeholder="0" 
                  value={alto} 
                  onChange={(e) => setAlto(e.target.value)}
                  className="border-secondary/20 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input 
                  id="peso" 
                  type="number" 
                  placeholder="0" 
                  value={peso} 
                  onChange={(e) => setPeso(e.target.value)}
                  className="border-secondary/20 focus:ring-primary/20"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {cotizacion !== null && (
          <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <h3 className="font-semibold text-lg mb-2 text-secondary">Cotización estimada</h3>
            <p className="text-2xl font-bold text-primary">${cotizacion.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Este es un valor estimado. El precio final puede variar.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-primary/5 rounded-b-lg">
        <Button onClick={handleCotizar} className="w-full bg-primary hover:bg-primary/90">
          Cotizar envío
        </Button>
      </CardFooter>
    </Card>
  )
} 