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

// Nueva interfaz para tarifa base por sucursal
export interface TarifaBaseSucursal {
  sucursalId: string;        // ID de la sucursal
  precioBase: number;        // Precio base para esta sucursal
  precioPorKg: number;       // Precio por kg para esta sucursal
  precioPorBulto: number;    // Precio por bulto para esta sucursal
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

// Tarifa base por defecto (cuando no se encuentra una específica)
export const tarifaBase: TarifaBase = {
  precioBase: 500,       // $500 precio mínimo
  precioPorKg: 200,      // $200 por kg
  precioPorBulto: 300,   // $300 por cada bulto adicional
}

// Tarifas base específicas por sucursal
export const tarifasBaseSucursal: TarifaBaseSucursal[] = [
  // Reconquista
  {
    sucursalId: "1",
    precioBase: 450,     // Precio base más económico en Reconquista
    precioPorKg: 180,
    precioPorBulto: 280
  },
  // GBA
  {
    sucursalId: "2",
    precioBase: 550,     // Precio base más alto en GBA
    precioPorKg: 210,
    precioPorBulto: 320
  },
  // CABA
  {
    sucursalId: "3",
    precioBase: 600,     // Precio base más alto en CABA
    precioPorKg: 220,
    precioPorBulto: 330
  },
  // Chaco
  {
    sucursalId: "4",
    precioBase: 480,
    precioPorKg: 190,
    precioPorBulto: 290
  },
  // Córdoba
  {
    sucursalId: "5",
    precioBase: 520,
    precioPorKg: 200,
    precioPorBulto: 310
  },
  // Santa Fe
  {
    sucursalId: "6",
    precioBase: 500,
    precioPorKg: 195,
    precioPorBulto: 300
  },
  // Corrientes
  {
    sucursalId: "7",
    precioBase: 470,
    precioPorKg: 185,
    precioPorBulto: 285
  },
  // Formosa
  {
    sucursalId: "8",
    precioBase: 460,
    precioPorKg: 175,
    precioPorBulto: 275
  }
]

// Tarifas según rutas (modificar según necesidades)
export const tarifasRutas: TarifaRuta[] = [
  // Desde Reconquista (ID "1") a todas las provincias de Argentina
  { origen: "1", provinciaDestino: "Buenos Aires", factorDistancia: 1.5 },
  { origen: "1", provinciaDestino: "Catamarca", factorDistancia: 1.8 },
  { origen: "1", provinciaDestino: "Chaco", factorDistancia: 1.2 },
  { origen: "1", provinciaDestino: "Chubut", factorDistancia: 2.5 },
  { origen: "1", provinciaDestino: "Ciudad Autónoma de Buenos Aires", factorDistancia: 1.5 },
  { origen: "1", provinciaDestino: "Córdoba", factorDistancia: 1.4 },
  { origen: "1", provinciaDestino: "Corrientes", factorDistancia: 1.3 },
  { origen: "1", provinciaDestino: "Entre Ríos", factorDistancia: 1.4 },
  { origen: "1", provinciaDestino: "Formosa", factorDistancia: 1.6 },
  { origen: "1", provinciaDestino: "Jujuy", factorDistancia: 2.0 },
  { origen: "1", provinciaDestino: "La Pampa", factorDistancia: 1.9 },
  { origen: "1", provinciaDestino: "La Rioja", factorDistancia: 1.9 },
  { origen: "1", provinciaDestino: "Mendoza", factorDistancia: 2.1 },
  { origen: "1", provinciaDestino: "Misiones", factorDistancia: 1.7 },
  { origen: "1", provinciaDestino: "Neuquén", factorDistancia: 2.3 },
  { origen: "1", provinciaDestino: "Río Negro", factorDistancia: 2.2 },
  { origen: "1", provinciaDestino: "Salta", factorDistancia: 1.9 },
  { origen: "1", provinciaDestino: "San Juan", factorDistancia: 2.0 },
  { origen: "1", provinciaDestino: "San Luis", factorDistancia: 1.8 },
  { origen: "1", provinciaDestino: "Santa Cruz", factorDistancia: 2.8 },
  { origen: "1", provinciaDestino: "Santa Fe", factorDistancia: 1.0 },
  { origen: "1", provinciaDestino: "Santiago del Estero", factorDistancia: 1.6 },
  { origen: "1", provinciaDestino: "Tierra del Fuego", factorDistancia: 3.0 },
  { origen: "1", provinciaDestino: "Tucumán", factorDistancia: 1.7 },
  
  // Tarifas específicas para departamentos dentro de Santa Fe
  { origen: "1", provinciaDestino: "Santa Fe", departamentoDestino: "3042", factorDistancia: 0.8 }, // General Obligado (donde está Reconquista)
  { origen: "1", provinciaDestino: "Santa Fe", departamentoDestino: "3045", factorDistancia: 0.9 }, // Vera (cercano a Reconquista)
  { origen: "1", provinciaDestino: "Santa Fe", departamentoDestino: "3077", factorDistancia: 1.1 }, // San Cristóbal
  { origen: "1", provinciaDestino: "Santa Fe", departamentoDestino: "3084", factorDistancia: 1.2 }, // San Justo
  { origen: "1", provinciaDestino: "Santa Fe", departamentoDestino: "3084", factorDistancia: 1.2 }, // Castellanos
  { origen: "1", provinciaDestino: "Santa Fe", departamentoDestino: "3098", factorDistancia: 1.3 }, // La Capital (Santa Fe capital)
  { origen: "1", provinciaDestino: "Santa Fe", departamentoDestino: "3119", factorDistancia: 1.4 }, // Rosario
  
  // Desde GBA
  { origen: "2", provinciaDestino: "Buenos Aires", factorDistancia: 1.0 },
  { origen: "2", provinciaDestino: "Santa Fe", factorDistancia: 1.4 },
  { origen: "2", provinciaDestino: "Cordoba", factorDistancia: 1.3 },
  { origen: "2", provinciaDestino: "Chaco", factorDistancia: 1.7 },
  { origen: "2", provinciaDestino: "Corrientes", factorDistancia: 1.8 },
  { origen: "2", provinciaDestino: "Formosa", factorDistancia: 2.0 },
  
  // Puedes seguir agregando más rutas según necesidades para otras sucursales
] 