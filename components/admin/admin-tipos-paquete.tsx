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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Package, Pencil, Save, X, Trash2 } from "lucide-react"
import { tiposPaquete as tiposPaqueteIniciales, TipoPaquete } from "@/components/cotizador/types"

export function AdminTiposPaquete() {
  const [tiposPaquete, setTiposPaquete] = useState<TipoPaquete[]>([])
  const [editando, setEditando] = useState<string | null>(null)
  const [nuevoTipo, setNuevoTipo] = useState<{ id: string, nombre: string, factorPrecio: number }>({ 
    id: "", 
    nombre: "", 
    factorPrecio: 1.0 
  })
  
  // Cargar datos de localStorage o usar los iniciales
  useEffect(() => {
    const tiposGuardados = localStorage.getItem("tiposPaquete")
    if (tiposGuardados) {
      setTiposPaquete(JSON.parse(tiposGuardados))
    } else {
      setTiposPaquete(tiposPaqueteIniciales)
    }
  }, [])
  
  // Guardar en localStorage cuando cambian
  useEffect(() => {
    if (tiposPaquete.length > 0) {
      localStorage.setItem("tiposPaquete", JSON.stringify(tiposPaquete))
    }
  }, [tiposPaquete])
  
  const handleEditarTipo = (id: string, campo: string, valor: string | number) => {
    setTiposPaquete(prev => 
      prev.map(tipo => 
        tipo.id === id ? { ...tipo, [campo]: valor } : tipo
      )
    )
  }
  
  const handleGuardarEdicion = () => {
    setEditando(null)
  }
  
  const handleCancelarEdicion = () => {
    const tiposGuardados = localStorage.getItem("tiposPaquete")
    if (tiposGuardados) {
      setTiposPaquete(JSON.parse(tiposGuardados))
    } else {
      setTiposPaquete(tiposPaqueteIniciales)
    }
    setEditando(null)
  }
  
  const handleAgregarTipo = () => {
    if (nuevoTipo.id && nuevoTipo.nombre) {
      // Verificar que el ID no exista
      if (tiposPaquete.some(t => t.id === nuevoTipo.id)) {
        alert("Ya existe un tipo de paquete con ese ID")
        return
      }
      
      setTiposPaquete(prev => [...prev, { ...nuevoTipo }])
      setNuevoTipo({ id: "", nombre: "", factorPrecio: 1.0 })
    }
  }
  
  const handleEliminarTipo = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este tipo de paquete?")) {
      setTiposPaquete(prev => prev.filter(tipo => tipo.id !== id))
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Administrar Tipos de Paquete
        </CardTitle>
        <CardDescription>
          Define los diferentes tipos de paquete y sus factores de precio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Formulario para agregar nuevo tipo */}
          <div className="grid gap-4 py-4 border-b">
            <h3 className="font-medium">Agregar nuevo tipo de paquete</h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-2">
                <Label htmlFor="tipo-id">ID</Label>
                <Input 
                  id="tipo-id" 
                  value={nuevoTipo.id}
                  onChange={(e) => setNuevoTipo(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="ID único"
                />
              </div>
              <div className="sm:col-span-6">
                <Label htmlFor="tipo-nombre">Nombre</Label>
                <Input 
                  id="tipo-nombre" 
                  value={nuevoTipo.nombre}
                  onChange={(e) => setNuevoTipo(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Nombre del tipo de paquete"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="tipo-factor">Factor Precio</Label>
                <Input 
                  id="tipo-factor" 
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={nuevoTipo.factorPrecio}
                  onChange={(e) => setNuevoTipo(prev => ({ ...prev, factorPrecio: parseFloat(e.target.value) }))}
                  placeholder="Factor multiplicador"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end sm:justify-start">
                <Button 
                  onClick={handleAgregarTipo}
                  className="bg-[#2C588F] hover:bg-[#2C588F]/90 w-full max-w-[120px] sm:max-w-none"
                  disabled={!nuevoTipo.id || !nuevoTipo.nombre}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tabla de tipos existentes */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="min-w-[80px]">ID</TableHead>
                  <TableHead className="min-w-[180px]">Nombre</TableHead>
                  <TableHead className="min-w-[120px]">Factor de Precio</TableHead>
                  <TableHead className="text-right min-w-[120px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tiposPaquete.map((tipo) => (
                  <TableRow key={tipo.id}>
                    <TableCell className="font-medium">
                      {editando === tipo.id ? (
                        <Input 
                          value={tipo.id}
                          onChange={(e) => handleEditarTipo(tipo.id, "id", e.target.value)}
                          className="h-8 min-h-8 w-full"
                        />
                      ) : (
                        tipo.id
                      )}
                    </TableCell>
                    <TableCell>
                      {editando === tipo.id ? (
                        <Input 
                          value={tipo.nombre}
                          onChange={(e) => handleEditarTipo(tipo.id, "nombre", e.target.value)}
                          className="h-8 min-h-8 w-full"
                        />
                      ) : (
                        tipo.nombre
                      )}
                    </TableCell>
                    <TableCell>
                      {editando === tipo.id ? (
                        <Input 
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={tipo.factorPrecio}
                          onChange={(e) => handleEditarTipo(tipo.id, "factorPrecio", parseFloat(e.target.value))}
                          className="h-8 min-h-8 w-full"
                        />
                      ) : (
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          ×{tipo.factorPrecio.toFixed(1)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editando === tipo.id ? (
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
                            onClick={() => setEditando(tipo.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 text-red-600"
                            onClick={() => handleEliminarTipo(tipo.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {tiposPaquete.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      No hay tipos de paquete configurados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>El factor de precio es un multiplicador que se aplica al precio base del envío.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 