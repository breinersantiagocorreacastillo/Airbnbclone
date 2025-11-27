'use client'

import { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { es } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function Calendario({
  value,
  disabledDates = [],
  onChange
}) {

  // Configuramos una fecha por defecto si no se recibe un valor
  const defaultDate = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };

  // Estado local para la fecha
  const [date, setDate] = useState(value || defaultDate);

  // Actualizamos el estado si el valor cambia desde el componente padre
  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  // Manejador para cuando cambian las fechas
  const handleChange = (value) => {
    if (value.selection) {
      const newDate = value.selection;
      setDate(newDate);
      onChange(newDate); // Llamamos la función onChange pasada desde el componente padre
    }
  };

  return (
    <DateRange
      rangeColors={['#262626']}  // Color para el rango de fechas seleccionado
      ranges={[date]}  // Rango de fechas actual
      date={new Date()}  // Fecha actual
      onChange={handleChange}  // Manejador de cambios
      direction="vertical"  // Muestra el calendario en formato vertical
      showDateDisplay={false}  // No mostramos la fecha encima del calendario
      minDate={new Date()}  // No se pueden seleccionar fechas anteriores a hoy
      disabledDates={disabledDates}  // Fechas deshabilitadas
      locale={es}  // Usamos la localización en español
      fixedHeight={true}  // Fijamos la altura
      className="w-full border-none"  // Estilos adicionales
    />
  );
}
