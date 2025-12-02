// components/CategoriaBox.jsx - VERSIÓN CORREGIDA
'use client';

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function CategoriaBox({ 
  icon: Icon, 
  label, 
  selected: initialSelected,
  description 
}) {
  const router = useRouter();
  const [selected, setSelected] = useState(initialSelected);
  
  // Sincronizar con URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const categoria = searchParams.get('categoria');
      setSelected(categoria === label);
    };
    
    handleUrlChange(); // Initial check
    window.addEventListener('popstate', handleUrlChange);
    
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [label]);

  const handleClick = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentCategoria = searchParams.get('categoria');
    
    if (currentCategoria === label) {
      // Remove categoria parameter
      searchParams.delete('categoria');
    } else {
      // Set categoria parameter
      searchParams.set('categoria', label);
    }
    
    router.push(`/?${searchParams.toString()}`);
  }, [label, router]);

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