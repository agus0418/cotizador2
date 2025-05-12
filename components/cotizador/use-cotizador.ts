"use client"

import { useState, useEffect } from "react"
import { 
  Provincia, 
  Departamento, 
  Localidad, 
  tarifaBase, 
  tarifasBaseSucursal,
  tarifasRutas, 
  tiposPaquete
} from "./types"

export function useCotizador() {
  const [origen, setOrigen] = useState("")
  const [destino, setDestino] = useState("")
  const [provincia, setProvincia] = useState("")
  const [departamento, setDepartamento] = useState("")
  const [localidad, setLocalidad] = useState("")
  const [tipoPaquete, setTipoPaquete] = useState("")
  const [largo, setLargo] = useState("")
  const [ancho, setAncho] = useState("")
  const [alto, setAlto] = useState("")
  const [peso, setPeso] = useState("")
  const [cantidadBultos, setCantidadBultos] = useState("1")
  const [cotizacion, setCotizacion] = useState<number | null>(null)
  const [detallesCotizacion, setDetallesCotizacion] = useState<{
    subtotal: number;
    cargoPeso: number;
    cargoDistancia: number;
    cargoBultos: number;
    cargoTipoPaquete: number;
    total: number;
  } | null>(null)
  
  // Estados para almacenar los datos geográficos
  const [provincias, setProvincias] = useState<Provincia[]>([])
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [localidades, setLocalidades] = useState<Localidad[]>([])
  const [error, setError] = useState<string | null>(null)

  // Cargar provincias al inicio
  useEffect(() => {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        setProvincias(json.provincias)
        setError(null)
      })
      .catch(error => {
        const message = error.statusText || "Ocurrió un error al cargar las provincias"
        setError(`Error: ${error.status || ''}: ${message}`)
      })
  }, [])

  // Cargar departamentos cuando se selecciona una provincia
  useEffect(() => {
    if (!provincia) return

    setDepartamento("")
    setLocalidad("")
    setDepartamentos([])
    setLocalidades([])

    fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${provincia}&max=100`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        setDepartamentos(json.departamentos)
        setError(null)
      })
      .catch(error => {
        const message = error.statusText || "Ocurrió un error al cargar los departamentos"
        setError(`Error: ${error.status || ''}: ${message}`)
      })
  }, [provincia])

  // Cargar localidades cuando se selecciona un departamento
  useEffect(() => {
    if (!departamento) return

    setLocalidad("")
    setLocalidades([])

    fetch(`https://apis.datos.gob.ar/georef/api/localidades?departamento=${departamento}&max=100`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        setLocalidades(json.localidades)
        setError(null)
      })
      .catch(error => {
        const message = error.statusText || "Ocurrió un error al cargar las localidades"
        setError(`Error: ${error.status || ''}: ${message}`)
      })
  }, [departamento])

  // Obtener la tarifa base para la sucursal seleccionada
  const obtenerTarifaBaseSucursal = () => {
    if (!origen) return tarifaBase;
    
    const tarifaSucursal = tarifasBaseSucursal.find(
      tarifa => tarifa.sucursalId === origen
    );
    
    return tarifaSucursal || tarifaBase;
  }

  // Obtener el factor de distancia según origen y destino
  const obtenerFactorDistancia = () => {
    if (!origen || !provincia) return 1.0;
    
    // Buscar primero si hay una tarifa específica por departamento
    if (departamento) {
      const tarifaEspecifica = tarifasRutas.find(
        tarifa => tarifa.origen === origen && 
                 tarifa.provinciaDestino === provincia && 
                 tarifa.departamentoDestino === departamento
      );
      
      if (tarifaEspecifica) return tarifaEspecifica.factorDistancia;
    }
    
    // Si no hay tarifa específica, buscar por provincia
    const tarifaGeneral = tarifasRutas.find(
      tarifa => tarifa.origen === origen && 
               tarifa.provinciaDestino === provincia && 
               !tarifa.departamentoDestino
    );
    
    return tarifaGeneral?.factorDistancia || 1.5; // Factor por defecto si no se encuentra
  }
  
  // Obtener el factor por tipo de paquete
  const obtenerFactorTipoPaquete = () => {
    if (!tipoPaquete) return 1.0;
    
    const tipo = tiposPaquete.find(tipo => tipo.id === tipoPaquete);
    return tipo?.factorPrecio || 1.0;
  }

  const handleCotizar = () => {
    // Validar que se hayan completado los campos necesarios
    if (!origen || !provincia || !tipoPaquete || !peso) {
      setError("Por favor, completa los campos obligatorios: sucursal de origen, provincia de destino, tipo de paquete y peso");
      return;
    }
    
    // Obtener la tarifa base específica para la sucursal seleccionada
    const tarifaSucursal = obtenerTarifaBaseSucursal();
    
    // Convertir valores a números
    const pesoNum = Number.parseFloat(peso) || 0;
    const cantidadBultosNum = Number.parseInt(cantidadBultos) || 1;
    
    // Calcular volumen si se proporcionan dimensiones
    const largoNum = Number.parseFloat(largo) || 0;
    const anchoNum = Number.parseFloat(ancho) || 0;
    const altoNum = Number.parseFloat(alto) || 0;
    const volumen = largoNum * anchoNum * altoNum;
    
    // Obtener factores para el cálculo
    const factorDistancia = obtenerFactorDistancia();
    const factorTipoPaquete = obtenerFactorTipoPaquete();
    
    // Cálculo de los componentes del precio usando la tarifa específica de la sucursal
    const subtotal = tarifaSucursal.precioBase;
    const cargoPeso = pesoNum * tarifaSucursal.precioPorKg;
    const cargoDistancia = subtotal * (factorDistancia - 1); // Solo el adicional por distancia
    const cargoBultos = Math.max(0, cantidadBultosNum - 1) * tarifaSucursal.precioPorBulto;
    const cargoTipoPaquete = subtotal * (factorTipoPaquete - 1); // Solo el adicional por tipo
    
    // Fórmula final: factores multiplicados + adiciones
    const total = (subtotal + cargoPeso) * factorDistancia * factorTipoPaquete + cargoBultos;
    
    // Guardar la cotización
    setCotizacion(Math.max(total, tarifaSucursal.precioBase)); // Nunca menos que el precio base
    
    // Guardar detalles para mostrar desglose
    setDetallesCotizacion({
      subtotal,
      cargoPeso,
      cargoDistancia,
      cargoBultos,
      cargoTipoPaquete,
      total: Math.max(total, tarifaSucursal.precioBase)
    });
    
    // Limpiar cualquier error previo
    setError(null);
  }

  return {
    // Estados
    origen,
    setOrigen,
    destino,
    setDestino,
    provincia,
    setProvincia,
    departamento,
    setDepartamento,
    localidad,
    setLocalidad,
    tipoPaquete,
    setTipoPaquete,
    largo,
    setLargo,
    ancho,
    setAncho,
    alto,
    setAlto,
    peso,
    setPeso,
    cantidadBultos,
    setCantidadBultos,
    cotizacion,
    detallesCotizacion,
    
    // Datos
    provincias,
    departamentos,
    localidades,
    error,
    
    // Funciones
    handleCotizar
  }
} 