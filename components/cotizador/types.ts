// Interfaces para los datos geográficos
export interface Provincia {
  id: string;
  nombre: string;
}

export interface Departamento {
  id: string;
  nombre: string;
}

export interface Localidad {
  id: string;
  nombre: string;
}

// Interfaz para las sucursales y tipos de paquete
export interface Sucursal {
  id: string;
  nombre: string;
}

export interface TipoPaquete {
  id: string;
  nombre: string;
  factorPrecio: number; // Multiplicador de precio según tipo de paquete
}

// Interfaces para el sistema de tarifas
export interface TarifaBase {
  precioBase: number;        // Precio mínimo de cualquier envío
  precioPorKg: number;       // Precio por kg
  precioPorBulto: number;    // Precio adicional por bulto extra
}

export interface TarifaRuta {
  origen: string;            // ID de la sucursal de origen
  provinciaDestino: string;  // Nombre de la provincia de destino
  departamentoDestino?: string; // ID del departamento (opcional)
  factorDistancia: number;   // Multiplicador según la distancia
}

// Datos de ejemplo
export const sucursales: Sucursal[] = [
  { id: "1", nombre: "Sucursal Reconquista" },
  { id: "2", nombre: "Sucursal GBA" },
  { id: "3", nombre: "Sucursal CABA" },
  { id: "4", nombre: "Sucursal Chaco" },
  { id: "5", nombre: "Sucursal Cordoba" },
  { id: "6", nombre: "Sucursal Santa Fe" },
  { id: "7", nombre: "Sucursal Corrientes" },
  { id: "8", nombre: "Sucursal Formosa" },
]

export const tiposPaquete: TipoPaquete[] = [
  { id: "1", nombre: "Sobre", factorPrecio: 0.8 },
  { id: "2", nombre: "Paquete pequeño", factorPrecio: 1.0 },
  { id: "3", nombre: "Paquete mediano", factorPrecio: 1.5 },
  { id: "4", nombre: "Paquete grande", factorPrecio: 2.0 },
  { id: "5", nombre: "Carga especial", factorPrecio: 3.0 },
]

// Configuración de tarifas base
export const tarifaBase: TarifaBase = {
  precioBase: 500,       // $500 precio mínimo
  precioPorKg: 200,      // $200 por kg
  precioPorBulto: 300,   // $300 por cada bulto adicional
}

// Tarifas según rutas (modificar según necesidades)
export const tarifasRutas: TarifaRuta[] = [
  // Desde Reconquista
  { origen: "1", provinciaDestino: "Santa Fe", factorDistancia: 1.0 },
  { origen: "1", provinciaDestino: "Chaco", factorDistancia: 1.2 },
  { origen: "1", provinciaDestino: "Corrientes", factorDistancia: 1.3 },
  { origen: "1", provinciaDestino: "Buenos Aires", factorDistancia: 1.5 },
  { origen: "1", provinciaDestino: "Cordoba", factorDistancia: 1.4 },
  { origen: "1", provinciaDestino: "Formosa", factorDistancia: 1.6 },
  
  // Desde GBA
  { origen: "2", provinciaDestino: "Buenos Aires", factorDistancia: 1.0 },
  { origen: "2", provinciaDestino: "Santa Fe", factorDistancia: 1.4 },
  { origen: "2", provinciaDestino: "Cordoba", factorDistancia: 1.3 },
  { origen: "2", provinciaDestino: "Chaco", factorDistancia: 1.7 },
  { origen: "2", provinciaDestino: "Corrientes", factorDistancia: 1.8 },
  { origen: "2", provinciaDestino: "Formosa", factorDistancia: 2.0 },
  
  // Puedes seguir agregando más rutas según necesidades
  
  // Ejemplo de tarifa específica por departamento
  { origen: "1", provinciaDestino: "Santa Fe", departamentoDestino: "3042", factorDistancia: 0.8 }, // Descuento para un departamento específico
] 