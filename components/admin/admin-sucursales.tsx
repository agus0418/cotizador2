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
import { Plus, Building, Pencil, Save, X, Trash2 } from "lucide-react"
import { sucursales as sucursalesIniciales, Sucursal } from "@/components/cotizador/types"

export function AdminSucursales() {
  const [sucursales, setSucursales] = useState<Sucursal[]>([])
  const [editando, setEditando] = useState<string | null>(null)
  const [nuevaSucursal, setNuevaSucursal] = useState<{ id: string, nombre: string }>({ id: "", nombre: "" })
  
  // Cargar datos de localStorage o usar los iniciales
  useEffect(() => {
    const sucursalesGuardadas = localStorage.getItem("sucursales")
    if (sucursalesGuardadas) {
      setSucursales(JSON.parse(sucursalesGuardadas))
    } else {
      setSucursales(sucursalesIniciales)
    }
  }, [])
  
  // Guardar en localStorage cuando cambian
  useEffect(() => {
    if (sucursales.length > 0) {
      localStorage.setItem("sucursales", JSON.stringify(sucursales))
    }
  }, [sucursales])
  
  const handleEditarSucursal = (id: string, campo: string, valor: string) => {
    setSucursales(prev => 
      prev.map(sucursal => 
        sucursal.id === id ? { ...sucursal, [campo]: valor } : sucursal
      )
    )
  }
  
  const handleGuardarEdicion = () => {
    setEditando(null)
  }
  
  const handleCancelarEdicion = () => {
    // Recargar desde localStorage para descartar cambios
    const sucursalesGuardadas = localStorage.getItem("sucursales")
    if (sucursalesGuardadas) {
      setSucursales(JSON.parse(sucursalesGuardadas))
    } else {
      setSucursales(sucursalesIniciales)
    }
    setEditando(null)
  }
  
  const handleAgregarSucursal = () => {
    if (nuevaSucursal.id && nuevaSucursal.nombre) {
      // Verificar que el ID no exista
      if (sucursales.some(s => s.id === nuevaSucursal.id)) {
        alert("Ya existe una sucursal con ese ID")
        return
      }
      
      setSucursales(prev => [...prev, { ...nuevaSucursal }])
      setNuevaSucursal({ id: "", nombre: "" })
    }
  }
  
  const handleEliminarSucursal = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta sucursal?")) {
      setSucursales(prev => prev.filter(sucursal => sucursal.id !== id))
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Administrar Sucursales
        </CardTitle>
        <CardDescription>
          Agrega, edita o elimina sucursales disponibles para el cotizador
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Formulario para agregar nueva sucursal */}
          <div className="grid gap-4 py-4 border-b">
            <h3 className="font-medium">Agregar nueva sucursal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-3">
                <Label htmlFor="sucursal-id">ID</Label>
                <Input 
                  id="sucursal-id" 
                  value={nuevaSucursal.id}
                  onChange={(e) => setNuevaSucursal(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="ID único"
                />
              </div>
              <div className="sm:col-span-7">
                <Label htmlFor="sucursal-nombre">Nombre</Label>
                <Input 
                  id="sucursal-nombre" 
                  value={nuevaSucursal.nombre}
                  onChange={(e) => setNuevaSucursal(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Nombre de la sucursal"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end sm:justify-start">
                <Button 
                  onClick={handleAgregarSucursal}
                  className="bg-[#2C588F] hover:bg-[#2C588F]/90 w-full max-w-[120px] sm:max-w-none"
                  disabled={!nuevaSucursal.id || !nuevaSucursal.nombre}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tabla de sucursales existentes */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="min-w-[100px]">ID</TableHead>
                  <TableHead className="min-w-[200px]">Nombre</TableHead>
                  <TableHead className="text-right min-w-[120px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sucursales.map((sucursal) => (
                  <TableRow key={sucursal.id}>
                    <TableCell className="font-medium">
                      {editando === sucursal.id ? (
                        <Input 
                          value={sucursal.id}
                          onChange={(e) => handleEditarSucursal(sucursal.id, "id", e.target.value)}
                          className="h-8 min-h-8 w-full"
                        />
                      ) : (
                        sucursal.id
                      )}
                    </TableCell>
                    <TableCell>
                      {editando === sucursal.id ? (
                        <Input 
                          value={sucursal.nombre}
                          onChange={(e) => handleEditarSucursal(sucursal.id, "nombre", e.target.value)}
                          className="h-8 min-h-8 w-full"
                        />
                      ) : (
                        sucursal.nombre
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editando === sucursal.id ? (
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
                            onClick={() => setEditando(sucursal.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 text-red-600"
                            onClick={() => handleEliminarSucursal(sucursal.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {sucursales.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                      No hay sucursales configuradas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Los cambios se guardan automáticamente en el navegador.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 