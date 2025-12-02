'use client';

import { useState } from 'react';
import Calendario from '@/components/input/Calendario';

export default function ListingReserva({ pricePerNight }) {
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const handleDateChange = (dateRange) => {
    console.log('Fechas seleccionadas:', dateRange);
    setSelectedDates(dateRange);
    // Aquí puedes agregar lógica para calcular el total, etc.
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 sticky top-8 shadow-sm">
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl font-bold">
          ${pricePerNight.toLocaleString()}
        </span>
        <span className="text-gray-600">por noche</span>
      </div>
      
      {/* Componente Calendario */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Selecciona tus fechas</h3>
        <Calendario
          value={selectedDates}
          onChange={handleDateChange}
          disabledDates={[]}
        />
      </div>
      
      <button className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-semibold mb-4">
        Reservar
      </button>
      
      <div className="text-center text-sm text-gray-600 space-y-2">
        <p>No se cobrará nada aún</p>
        <div className="flex justify-center gap-4 text-xs">
          <span>💳 Pago seguro</span>
          <span>🛡️ Protección</span>
        </div>
      </div>
    </div>
  );
}