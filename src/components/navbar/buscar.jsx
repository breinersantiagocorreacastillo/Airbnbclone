
'use client'

import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Calendario from "../input/Calendario";

export default function Buscar() {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
        key: 'selection'
    });
    const calendarRef = useRef(null);

   
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setIsCalendarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDateChange = (newDate) => {
        setDateRange(newDate);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('es-CO', {
            day: 'numeric',
            month: 'short'
        });
    };

    const getDateDisplayText = () => {
        if (dateRange.startDate && dateRange.endDate) {
            const start = formatDate(dateRange.startDate);
            const end = formatDate(dateRange.endDate);
            
            if (dateRange.startDate.getTime() === dateRange.endDate.getTime()) {
                return start; // Misma fecha
            }
            return `${start} - ${end}`;
        }
        return "Agrega fechas";
    };

    return (
        <div className="relative">
            {/* Botón de búsqueda */}
            <div 
                className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
                <div className="flex flex-row items-center justify-between">
                    <div className="text-sm font-semibold px-6">
                        Explora destinos
                    </div>
                    <div 
                        className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center"
                    >
                        {getDateDisplayText()}
                    </div>
                    <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                        <div className="hidden sm:block">¿Cuántos?</div>
                        <div className="p-2 bg-rose-500 rounded-full text-white">
                            <FiSearch size={18} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Calendario desplegable */}
            {isCalendarOpen && (
                <div 
                    ref={calendarRef}
                    className="absolute top-14 left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-4 min-w-[300px]"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Selecciona tus fechas</h3>
                        <button 
                            onClick={() => setIsCalendarOpen(false)}
                            className="text-gray-500 hover:text-gray-700 text-lg font-bold"
                        >
                            
                        </button>
                    </div>
                    
                    <Calendario
                        value={dateRange}
                        onChange={handleDateChange}
                    />
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <button 
                            onClick={() => setIsCalendarOpen(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={() => setIsCalendarOpen(false)}
                            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 font-medium"
                        >
                            Aplicar fechas
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}