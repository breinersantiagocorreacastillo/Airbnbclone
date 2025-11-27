'use client'

import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

export default function Mapa({ center }) {
  const [MapComponents, setMapComponents] = useState(null);

  useEffect(() => {
    // Cargar Leaflet y react-leaflet solo en el cliente
    const loadMap = async () => {
      const L = await import('leaflet');
      const { MapContainer, TileLayer, Marker } = await import('react-leaflet');

      // Configurar iconos
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });

      setMapComponents({ MapContainer, TileLayer, Marker, L }); // Guardar los componentes cargados en el estado
    };

    loadMap();
  }, []);

  if (!MapComponents) {
    return (
      <div className="h-[35vh] rounded-lg bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, L } = MapComponents;

  return (
    <MapContainer
      center={center || [51.505, -0.09]} // Valor predeterminado si no hay centro
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {center && <Marker position={center} />} {/* Si hay centro, mostramos el marcador */}
    </MapContainer>
  );
}
