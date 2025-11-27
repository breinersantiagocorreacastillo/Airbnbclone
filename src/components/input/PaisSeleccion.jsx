'use client';
import usePais from "@/app/hook/usePais";

 // Asegúrate de que este componente se ejecute en el cliente

// Componente PaisSeleccion
export default function PaisSeleccion({ value, onChange }) {
  const { getAll } = usePais(); // Llamada al hook para obtener todos los países

  return (
    <div>
      <label htmlFor="pais-select" className="block text-lg font-medium text-neutral-700">
        Selecciona un país
      </label>
      <select
        id="pais-select"
        value={value?.value} // El valor seleccionado es el código del país (value)
        onChange={(e) => {
          const selectedValue = e.target.value;
          const selectedCountry = getAll().find(country => country.value === selectedValue); // Buscar el país seleccionado
          onChange(selectedCountry); // Llamar al onChange con el país seleccionado
        }}
        className="w-full p-3 border-2 border-neutral-300 rounded-md text-lg"
      >
        <option value="" disabled>
          Selecciona un país
        </option>
        {getAll().map((pais) => (
          <option key={pais.value} value={pais.value}>
            {pais.flag} {pais.label} - {pais.region}
          </option>
        ))}
      </select>
    </div>
  );
}
