"use client"

import { useState, useEffect } from "react"
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, DollarSign, Pencil, Save, X, Package, Building } from "lucide-react"
import { 
  tarifaBase as tarifaBaseInicial, 
  tarifasBaseSucursal as tarifasSucursalIniciales,
  sucursales, 
  TarifaBase,
  TarifaBaseSucursal 
} from "@/components/cotizador/types"

export function AdminTarifas() {
  const [tarifaBase, setTarifaBase] = useState<TarifaBase>({
    precioBase: 0,
    precioPorKg: 0,
    precioPorBulto: 0,
  })
  
  const [tarifasSucursal, setTarifasSucursal] = useState<TarifaBaseSucursal[]>([])
  const [editandoTarifaBase, setEditandoTarifaBase] = useState(false)
  const [editandoSucursal, setEditandoSucursal] = useState<string | null>(null)
  
  // Cargar datos iniciales
  useEffect(() => {
    const tarifaBaseGuardada = localStorage.getItem("tarifaBase")
    if (tarifaBaseGuardada) {
      setTarifaBase(JSON.parse(tarifaBaseGuardada))
    } else {
      setTarifaBase(tarifaBaseInicial)
    }
    
    const tarifasSucursalGuardadas = localStorage.getItem("tarifasSucursal")
    if (tarifasSucursalGuardadas) {
      setTarifasSucursal(JSON.parse(tarifasSucursalGuardadas))
    } else {
      setTarifasSucursal(tarifasSucursalIniciales)
    }
  }, [])
  
  // Guardar cambios en localStorage
  useEffect(() => {
    if (tarifaBase.precioBase > 0) {
      localStorage.setItem("tarifaBase", JSON.stringify(tarifaBase))
    }
  }, [tarifaBase])
  
  useEffect(() => {
    if (tarifasSucursal.length > 0) {
      localStorage.setItem("tarifasSucursal", JSON.stringify(tarifasSucursal))
    }
  }, [tarifasSucursal])
  
  // Manejadores para tarifa base
  const handleEditarTarifaBase = (campo: keyof TarifaBase, valor: string) => {
    setTarifaBase(prev => ({
      ...prev,
      [campo]: parseFloat(valor) || 0
    }))
  }
  
  const handleGuardarTarifaBase = () => {
    setEditandoTarifaBase(false)
  }
  
  const handleCancelarEdicionTarifaBase = () => {
    const tarifaBaseGuardada = localStorage.getItem("tarifaBase")
    if (tarifaBaseGuardada) {
      setTarifaBase(JSON.parse(tarifaBaseGuardada))
    } else {
      setTarifaBase(tarifaBaseInicial)
    }
    setEditandoTarifaBase(false)
  }
  
  // Manejadores para tarifas de sucursales
  const handleEditarTarifaSucursal = (sucursalId: string, campo: keyof Omit<TarifaBaseSucursal, 'sucursalId'>, valor: string) => {
    setTarifasSucursal(prev => 
      prev.map(tarifa => 
        tarifa.sucursalId === sucursalId 
          ? { ...tarifa, [campo]: parseFloat(valor) || 0 } 
          : tarifa
      )
    )
  }
  
  const handleGuardarTarifaSucursal = () => {
    setEditandoSucursal(null)
  }
  
  const handleCancelarEdicionTarifaSucursal = () => {
    const tarifasSucursalGuardadas = localStorage.getItem("tarifasSucursal")
    if (tarifasSucursalGuardadas) {
      setTarifasSucursal(JSON.parse(tarifasSucursalGuardadas))
    } else {
      setTarifasSucursal(tarifasSucursalIniciales)
    }
    setEditandoSucursal(null)
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Administrar Tarifas
        </CardTitle>
        <CardDescription>
          Configura las tarifas base y específicas por sucursal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="general" className="data-[state=active]:bg-[#2C588F] data-[state=active]:text-white">
              Tarifa General
            </TabsTrigger>
            <TabsTrigger value="sucursales" className="data-[state=active]:bg-[#2C588F] data-[state=active]:text-white">
              Tarifas por Sucursal
            </TabsTrigger>
          </TabsList>
          
          {/* Tarifa base general */}
          <TabsContent value="general" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#2C588F]" />
                Tarifa Base General
              </h3>
              {!editandoTarifaBase ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-[#2C588F] border-[#2C588F]"
                  onClick={() => setEditandoTarifaBase(true)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-green-600"
                    onClick={handleGuardarTarifaBase}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600"
                    onClick={handleCancelarEdicionTarifaBase}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
            
            <div className="grid gap-4 p-6 border rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground mb-4">
                Esta es la tarifa base que se aplica cuando no hay una tarifa específica para la sucursal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="precio-base">Precio Base ($)</Label>
                  {editandoTarifaBase ? (
                    <Input 
                      id="precio-base"
                      type="number"
                      min="0"
                      step="10"
                      value={tarifaBase.precioBase}
                      onChange={(e) => handleEditarTarifaBase("precioBase", e.target.value)}
                      className="h-10"
                    />
                  ) : (
                    <div className="bg-blue-50 text-blue-800 font-semibold py-2 px-3 rounded-md flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {tarifaBase.precioBase.toFixed(2)}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">Precio mínimo por envío</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precio-kg">Precio por Kg ($)</Label>
                  {editandoTarifaBase ? (
                    <Input 
                      id="precio-kg"
                      type="number"
                      min="0"
                      step="10"
                      value={tarifaBase.precioPorKg}
                      onChange={(e) => handleEditarTarifaBase("precioPorKg", e.target.value)}
                      className="h-10"
                    />
                  ) : (
                    <div className="bg-blue-50 text-blue-800 font-semibold py-2 px-3 rounded-md flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {tarifaBase.precioPorKg.toFixed(2)}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">Precio adicional por cada kg</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precio-bulto">Precio por Bulto ($)</Label>
                  {editandoTarifaBase ? (
                    <Input 
                      id="precio-bulto"
                      type="number"
                      min="0"
                      step="10"
                      value={tarifaBase.precioPorBulto}
                      onChange={(e) => handleEditarTarifaBase("precioPorBulto", e.target.value)}
                      className="h-10"
                    />
                  ) : (
                    <div className="bg-blue-50 text-blue-800 font-semibold py-2 px-3 rounded-md flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {tarifaBase.precioPorBulto.toFixed(2)}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">Precio adicional por cada bulto extra</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Tarifas por sucursal */}
          <TabsContent value="sucursales" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Building className="h-5 w-5 text-[#2C588F]" />
                Tarifas por Sucursal
              </h3>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[250px]">Sucursal</TableHead>
                    <TableHead>Precio Base ($)</TableHead>
                    <TableHead>Precio por Kg ($)</TableHead>
                    <TableHead>Precio por Bulto ($)</TableHead>
                    <TableHead className="text-right w-[120px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tarifasSucursal.map((tarifa) => {
                    const sucursal = sucursales.find(s => s.id === tarifa.sucursalId)
                    
                    return (
                      <TableRow key={tarifa.sucursalId}>
                        <TableCell className="font-medium">
                          {sucursal?.nombre || `Sucursal ID ${tarifa.sucursalId}`}
                        </TableCell>
                        <TableCell>
                          {editandoSucursal === tarifa.sucursalId ? (
                            <Input 
                              type="number"
                              min="0"
                              step="10"
                              value={tarifa.precioBase}
                              onChange={(e) => handleEditarTarifaSucursal(tarifa.sucursalId, "precioBase", e.target.value)}
                              className="h-8 min-h-8"
                            />
                          ) : (
                            <span className="font-semibold">${tarifa.precioBase.toFixed(2)}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editandoSucursal === tarifa.sucursalId ? (
                            <Input 
                              type="number"
                              min="0"
                              step="5"
                              value={tarifa.precioPorKg}
                              onChange={(e) => handleEditarTarifaSucursal(tarifa.sucursalId, "precioPorKg", e.target.value)}
                              className="h-8 min-h-8"
                            />
                          ) : (
                            <span className="font-semibold">${tarifa.precioPorKg.toFixed(2)}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editandoSucursal === tarifa.sucursalId ? (
                            <Input 
                              type="number"
                              min="0"
                              step="5"
                              value={tarifa.precioPorBulto}
                              onChange={(e) => handleEditarTarifaSucursal(tarifa.sucursalId, "precioPorBulto", e.target.value)}
                              className="h-8 min-h-8"
                            />
                          ) : (
                            <span className="font-semibold">${tarifa.precioPorBulto.toFixed(2)}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editandoSucursal === tarifa.sucursalId ? (
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 w-8 p-0 text-green-600"
                                onClick={handleGuardarTarifaSucursal}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 w-8 p-0 text-red-600"
                                onClick={handleCancelarEdicionTarifaSucursal}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0"
                              onClick={() => setEditandoSucursal(tarifa.sucursalId)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Las tarifas específicas por sucursal sobrescriben la tarifa base general.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 