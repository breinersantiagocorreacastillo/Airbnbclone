'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { supabaseBrowser } from '@/libs/supabase/browser-client'; 

export default function useFavorite({ listingId }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [hasFavorited, setHasFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const getUser = async () => {
    try {
      const { data, error } = await supabaseBrowser.auth.getUser();
      
      if (error) {
        console.log('🔍 Error getting user (manejado):', error.name, error.message);
        
        setCurrentUser(null);
        return;
      }
      
      setCurrentUser(data.user);
    } catch (error) {
      console.log('🔍 Error inesperado en getUser:', error);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  getUser();

  
  const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(
    async (event, session) => {
      console.log('🔍 Auth state changed:', event);
      setCurrentUser(session?.user || null);
      setLoading(false);
    }
  );

    return () => subscription.unsubscribe();
  }, []);

   
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

  
  const toggleFavorite = useCallback(async (e) => {
    e?.stopPropagation();

    
    const { data: { user } } = await supabaseBrowser.auth.getUser();
    
    if (!user) {
      toast.error('Inicia sesión para guardar favoritos');
      return;
    }

    const key = `favorites_${user.id}`;
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
  }, [listingId, hasFavorited, router]);

  return {
    hasFavorited,
    toggleFavorite,
    loading,
    currentUser 
  };
}