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
}

// Datos de ejemplo
export const sucursales: Sucursal[] = [
  { id: "1", nombre: "Sucursal Central" },
  { id: "2", nombre: "Sucursal Norte" },
  { id: "3", nombre: "Sucursal Sur" },
  { id: "4", nombre: "Sucursal Este" },
  { id: "5", nombre: "Sucursal Oeste" },
]

export const tiposPaquete: TipoPaquete[] = [
  { id: "1", nombre: "Sobre" },
  { id: "2", nombre: "Paquete pequeño" },
  { id: "3", nombre: "Paquete mediano" },
  { id: "4", nombre: "Paquete grande" },
  { id: "5", nombre: "Carga especial" },
] 