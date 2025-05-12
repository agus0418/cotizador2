"use client"

import { useState, useEffect } from "react"
import { Provincia, Departamento, Localidad } from "./types"

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
  const [cotizacion, setCotizacion] = useState<number | null>(null)
  
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

  const handleCotizar = () => {
    // Simulación de cálculo de cotización
    // En un caso real, esto podría ser una llamada a una API
    const largoNum = Number.parseFloat(largo) || 0
    const anchoNum = Number.parseFloat(ancho) || 0
    const altoNum = Number.parseFloat(alto) || 0
    const pesoNum = Number.parseFloat(peso) || 0

    // Fórmula simple para calcular el costo
    const volumen = largoNum * anchoNum * altoNum
    const factorDistancia = origen !== destino ? 1.5 : 1
    const factorTipoPaquete = Number.parseInt(tipoPaquete) || 1

    const costo = (volumen * 0.01 + pesoNum * 2) * factorDistancia * factorTipoPaquete
    setCotizacion(Math.max(costo, 10)) // Mínimo $10
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
    cotizacion,
    
    // Datos
    provincias,
    departamentos,
    localidades,
    error,
    
    // Funciones
    handleCotizar
  }
} 