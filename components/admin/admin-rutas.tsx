"use client"

import { useState, useEffect } from "react"
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, MapPin, Pencil, Save, X, Trash2, FileDown, FileUp } from "lucide-react"
import { tarifasRutas as rutasIniciales, TarifaRuta, sucursales } from "@/components/cotizador/types"

export function AdminRutas() {
  const [rutas, setRutas] = useState<TarifaRuta[]>([])
  const [editando, setEditando] = useState<number | null>(null)
  const [nuevaRuta, setNuevaRuta] = useState<TarifaRuta>({
    origen: "",
    provinciaDestino: "",
    departamentoDestino: undefined,
    factorDistancia: 1.0
  })
  
  // Provincias de Argentina
  const provincias = [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Ciudad Autónoma de Buenos Aires",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán"
  ]
  
  // Cargar datos de localStorage o usar los iniciales
  useEffect(() => {
    const rutasGuardadas = localStorage.getItem("tarifasRutas")
    if (rutasGuardadas) {
      setRutas(JSON.parse(rutasGuardadas))
    } else {
      setRutas(rutasIniciales)
    }
  }, [])
  
  // Guardar en localStorage cuando cambian
  useEffect(() => {
    if (rutas.length > 0) {
      localStorage.setItem("tarifasRutas", JSON.stringify(rutas))
    }
  }, [rutas])
  
  const handleEditarRuta = (index: number, campo: keyof TarifaRuta, valor: string | number | undefined) => {
    setRutas(prev => 
      prev.map((ruta, i) => 
        i === index ? { ...ruta, [campo]: valor } : ruta
      )
    )
  }
  
  const handleGuardarEdicion = () => {
    setEditando(null)
  }
  
  const handleCancelarEdicion = () => {
    const rutasGuardadas = localStorage.getItem("tarifasRutas")
    if (rutasGuardadas) {
      setRutas(JSON.parse(rutasGuardadas))
    } else {
      setRutas(rutasIniciales)
    }
    setEditando(null)
  }
  
  const handleAgregarRuta = () => {
    if (nuevaRuta.origen && nuevaRuta.provinciaDestino) {
      setRutas(prev => [...prev, { ...nuevaRuta }])
      setNuevaRuta({
        origen: "",
        provinciaDestino: "",
        departamentoDestino: undefined,
        factorDistancia: 1.0
      })
    }
  }
  
  const handleEliminarRuta = (index: number) => {
    if (confirm("¿Estás seguro de eliminar esta ruta?")) {
      setRutas(prev => prev.filter((_, i) => i !== index))
    }
  }
  
  // Exportar configuración a JSON
  const handleExportarConfig = () => {
    const config = {
      tarifasRutas: rutas
    }
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "configuracion_rutas.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }
  
  // Importar configuración desde archivo JSON
  const handleImportarConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    fileReader.readAsText(event.target.files?.[0] as File, "UTF-8")
    fileReader.onload = e => {
      try {
        const content = JSON.parse(e.target?.result as string)
        if (content.tarifasRutas && Array.isArray(content.tarifasRutas)) {
          setRutas(content.tarifasRutas)
          localStorage.setItem("tarifasRutas", JSON.stringify(content.tarifasRutas))
          alert("Configuración importada correctamente")
        } else {
          alert("El archivo no contiene una configuración válida")
        }
      } catch (error) {
        console.error("Error al importar la configuración:", error)
        alert("Error al procesar el archivo")
      }
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Administrar Rutas
            </CardTitle>
            <CardDescription>
              Configura los factores de distancia según origen y destino
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-[#2C588F] border-[#2C588F]"
              onClick={handleExportarConfig}
            >
              <FileDown className="h-4 w-4" />
              <span className="hidden sm:inline">Exportar</span>
            </Button>
            
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-[#2C588F] border-[#2C588F]"
                onClick={() => document.getElementById('importar-config')?.click()}
              >
                <FileUp className="h-4 w-4" />
                <span className="hidden sm:inline">Importar</span>
              </Button>
              <input
                type="file"
                id="importar-config"
                accept=".json"
                onChange={handleImportarConfig}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Formulario para agregar nueva ruta */}
          <div className="grid gap-4 py-4 border-b">
            <h3 className="font-medium">Agregar nueva ruta</h3>
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-12 sm:col-span-3">
                <Label htmlFor="origen">Sucursal origen</Label>
                <Select 
                  value={nuevaRuta.origen} 
                  onValueChange={(value) => setNuevaRuta(prev => ({ ...prev, origen: value }))}
                >
                  <SelectTrigger id="origen" className="h-10">
                    <SelectValue placeholder="Selecciona una sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    {sucursales.map((sucursal) => (
                      <SelectItem key={sucursal.id} value={sucursal.id}>{sucursal.nombre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-12 sm:col-span-3">
                <Label htmlFor="provincia">Provincia destino</Label>
                <Select 
                  value={nuevaRuta.provinciaDestino} 
                  onValueChange={(value) => setNuevaRuta(prev => ({ ...prev, provinciaDestino: value }))}
                >
                  <SelectTrigger id="provincia" className="h-10">
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provincias.map((provincia) => (
                      <SelectItem key={provincia} value={provincia}>{provincia}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-12 sm:col-span-3">
                <Label htmlFor="departamento">Departamento (opcional)</Label>
                <Input 
                  id="departamento" 
                  value={nuevaRuta.departamentoDestino || ""}
                  onChange={(e) => setNuevaRuta(prev => ({ 
                    ...prev, 
                    departamentoDestino: e.target.value ? e.target.value : undefined 
                  }))}
                  placeholder="ID del departamento"
                  className="h-10"
                />
              </div>
              
              <div className="col-span-12 sm:col-span-2">
                <Label htmlFor="factor">Factor de distancia</Label>
                <Input 
                  id="factor" 
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={nuevaRuta.factorDistancia}
                  onChange={(e) => setNuevaRuta(prev => ({ 
                    ...prev, 
                    factorDistancia: parseFloat(e.target.value) || 1.0 
                  }))}
                  placeholder="1.0"
                  className="h-10"
                />
              </div>
              
              <div className="col-span-12 sm:col-span-1">
                <Button 
                  onClick={handleAgregarRuta}
                  className="w-full bg-[#2C588F] hover:bg-[#2C588F]/90 h-10"
                  disabled={!nuevaRuta.origen || !nuevaRuta.provinciaDestino}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tabla de rutas existentes */}
          <div className="rounded-md border overflow-auto max-h-[500px]">
            <Table>
              <TableHeader className="sticky top-0 bg-white">
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[200px]">Sucursal Origen</TableHead>
                  <TableHead className="w-[200px]">Provincia Destino</TableHead>
                  <TableHead className="w-[150px]">Departamento</TableHead>
                  <TableHead className="w-[150px]">Factor Distancia</TableHead>
                  <TableHead className="text-right w-[120px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rutas.map((ruta, index) => {
                  const sucursal = sucursales.find(s => s.id === ruta.origen)
                  
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {editando === index ? (
                          <Select 
                            value={ruta.origen} 
                            onValueChange={(value) => handleEditarRuta(index, "origen", value)}
                          >
                            <SelectTrigger className="h-8 min-h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {sucursales.map((sucursal) => (
                                <SelectItem key={sucursal.id} value={sucursal.id}>{sucursal.nombre}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="font-medium">{sucursal?.nombre || `Sucursal ${ruta.origen}`}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editando === index ? (
                          <Select 
                            value={ruta.provinciaDestino} 
                            onValueChange={(value) => handleEditarRuta(index, "provinciaDestino", value)}
                          >
                            <SelectTrigger className="h-8 min-h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {provincias.map((provincia) => (
                                <SelectItem key={provincia} value={provincia}>{provincia}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          ruta.provinciaDestino
                        )}
                      </TableCell>
                      <TableCell>
                        {editando === index ? (
                          <Input 
                            value={ruta.departamentoDestino || ""}
                            onChange={(e) => handleEditarRuta(
                              index, 
                              "departamentoDestino", 
                              e.target.value ? e.target.value : undefined
                            )}
                            className="h-8 min-h-8"
                            placeholder="Opcional"
                          />
                        ) : (
                          ruta.departamentoDestino || <span className="text-muted-foreground text-xs">No especificado</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editando === index ? (
                          <Input 
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={ruta.factorDistancia}
                            onChange={(e) => handleEditarRuta(index, "factorDistancia", parseFloat(e.target.value) || 1.0)}
                            className="h-8 min-h-8"
                          />
                        ) : (
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                            ×{ruta.factorDistancia.toFixed(1)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {editando === index ? (
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-green-600"
                              onClick={handleGuardarEdicion}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={handleCancelarEdicion}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0"
                              onClick={() => setEditando(index)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={() => handleEliminarRuta(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
                {rutas.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                      No hay rutas configuradas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>El factor de distancia multiplica el precio base según la ruta seleccionada.</p>
            <p>Puedes definir rutas generales (por provincia) o específicas (por departamento).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 