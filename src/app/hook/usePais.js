'use client';

// Importar los datos de países
import countries from "world-countries";

// Formato de países
const formatoPaises = countries.map((country) => ({
  value: country.cca2, // Código del país
  label: country.name.common, // Nombre del país
  latlng: country.latlng, // Coordenadas geográficas
  region: country.region, // Región geográfica
  flag: country.flag, // Bandera del país
}));

export default function usePais() {
  // Función para obtener todos los países
  const getAll = () => formatoPaises;

  // Función para obtener un país por su código (value)
  const getByValue = (value) => {
    return formatoPaises.find((item) => item.value === value); // Buscar país por su código
  };

  return {
    getAll,    // Retorna todos los países
    getByValue, // Retorna un país por su código
  };
}
