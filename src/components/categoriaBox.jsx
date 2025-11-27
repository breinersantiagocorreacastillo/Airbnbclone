'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function CategoriaBox({ icon: Icon, label, selected, description }) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    // Obtenemos los parámetros actuales de la URL
    const currentQuery = Object.fromEntries(params.entries());

    // Agregamos o eliminamos el parámetro "categoria" según corresponda
    const updatedQuery = {
      ...currentQuery,
      categoria: label,
    };

    // Si el valor de "categoria" ya es el que se ha seleccionado, lo eliminamos
    if (params.get('categoria') === label) {
      delete updatedQuery.categoria;
    }

    // Construimos la nueva URL con los parámetros actualizados
    const searchParams = new URLSearchParams(updatedQuery);
    
    // Redirigimos al usuario a la nueva URL con los parámetros actualizados
    router.push(`/?${searchParams.toString()}`);
  }, [label, params, router]);

  return (
    <div 
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  );
}
