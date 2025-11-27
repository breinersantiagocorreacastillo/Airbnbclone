
'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { supabaseBrowser } from '@/libs/supabase/browser-client'; 

export default function useFavorite({ listingId }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [hasFavorited, setHasFavorited] = useState(false);

  // 1. USUARIO DESDE SUPABASE
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabaseBrowser.auth.getUser();
      setCurrentUser(data.user);
    };
    getUser();
  }, []);

  // 2. CARGAMOS SI YA ESTÁ EN FAVORITOS 
  useEffect(() => {
    if (!currentUser || !listingId) {
      setHasFavorited(false);
      return;
    }

    const key = `favorites_${currentUser.id}`;
    const saved = localStorage.getItem(key);
    const list = saved ? JSON.parse(saved) : [];
    setHasFavorited(list.includes(listingId));
  }, [currentUser, listingId]);

  // 3. TOGGLE FAVORITO
  const toggleFavorite = useCallback(async (e) => {
    e?.stopPropagation();

    if (!currentUser) {
      toast.error('Inicia sesión para guardar favoritos');
      return;
    }

    const key = `favorites_${currentUser.id}`;
    const saved = localStorage.getItem(key);
    let list = saved ? JSON.parse(saved) : [];

    if (hasFavorited) {
      list = list.filter(id => id !== listingId);
      toast.success('Eliminado de favoritos');
    } else {
      list.push(listingId);
      toast.success('¡Añadido a favoritos!');
    }

    localStorage.setItem(key, JSON.stringify(list));
    setHasFavorited(!hasFavorited);
    router.refresh();
  }, [currentUser, listingId, hasFavorited, router]);

  return {
    hasFavorited,
    toggleFavorite,
  };
}