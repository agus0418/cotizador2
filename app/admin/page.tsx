"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Settings, 
  Building, 
  Package, 
  MapPin, 
  TruckIcon, 
  Calculator,
  LockIcon,
  LogOut
} from "lucide-react"

import { AdminSucursales } from "@/components/admin/admin-sucursales"
import { AdminTarifas } from "@/components/admin/admin-tarifas"
import { AdminTiposPaquete } from "@/components/admin/admin-tipos-paquete"
import { AdminRutas } from "@/components/admin/admin-rutas"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  // Contraseña simple para demo - en producción usar sistema de autenticación real
  const handleLogin = () => {
    if (password === "admin123") {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Contraseña incorrecta")
    }
  }
  
  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword("")
  }
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-6 md:py-10 px-4 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md shadow-lg border-[#2C588F]/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl md:text-2xl font-bold text-center flex items-center justify-center gap-2">
              <LockIcon className="h-5 w-5 md:h-6 md:w-6 text-[#2C588F]" />
              Acceso Administrador
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder al panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#2C588F]/20 focus:ring-[#2C588F]/20 focus-visible:ring-[#2C588F]/20"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            
            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Button 
              className="w-full bg-[#2C588F] hover:bg-[#2C588F]/90" 
              onClick={handleLogin}
            >
              Ingresar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-6 md:py-10 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2C588F] flex items-center gap-2">
            <Settings className="h-6 w-6 md:h-8 md:w-8" />
            Panel de Administración
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Configura los parámetros del cotizador de envíos
          </p>
        </div>
        <Button 
          variant="outline" 
          className="text-red-500 border-red-200 hover:bg-red-50 self-start"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar sesión
        </Button>
      </div>
      
      <Tabs defaultValue="sucursales" className="space-y-6">
        <div className="overflow-x-auto pb-2">
          <TabsList className="grid grid-cols-4 w-full min-w-[400px] gap-2 bg-muted/50 p-1">
            <TabsTrigger value="sucursales" className="flex items-center justify-center gap-2 data-[state=active]:bg-[#2C588F] data-[state=active]:text-white">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Sucursales</span>
            </TabsTrigger>
            <TabsTrigger value="tipos-paquete" className="flex items-center justify-center gap-2 data-[state=active]:bg-[#2C588F] data-[state=active]:text-white">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Tipos de Paquete</span>
            </TabsTrigger>
            <TabsTrigger value="tarifas" className="flex items-center justify-center gap-2 data-[state=active]:bg-[#2C588F] data-[state=active]:text-white">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Tarifas</span>
            </TabsTrigger>
            <TabsTrigger value="rutas" className="flex items-center justify-center gap-2 data-[state=active]:bg-[#2C588F] data-[state=active]:text-white">
              <TruckIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Rutas</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="sucursales" className="space-y-4 mt-4">
          <AdminSucursales />
        </TabsContent>
        
        <TabsContent value="tipos-paquete" className="space-y-4 mt-4">
          <AdminTiposPaquete />
        </TabsContent>
        
        <TabsContent value="tarifas" className="space-y-4 mt-4">
          <AdminTarifas />
        </TabsContent>
        
        <TabsContent value="rutas" className="space-y-4 mt-4">
          <AdminRutas />
        </TabsContent>
      </Tabs>
    </div>
  )
} 