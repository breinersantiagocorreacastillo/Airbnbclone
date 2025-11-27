// lib/getListings.js
import supabase from './supabase';

export async function getListings(searchParams = {}) {
  try {
    // Consulta básica para obtener todas las propiedades (listings)
    const { data, error } = await supabase
      .from('listings') // Nombre de la tabla en tu base de datos Supabase
      .select('*'); // Seleccionar todas las columnas

    if (error) throw new Error(error.message);

    // Si tienes parámetros de búsqueda, puedes agregarlos aquí
    if (searchParams.location) {
      data = data.filter((listing) =>
        listing.location.toLowerCase().includes(searchParams.location.toLowerCase())
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}
