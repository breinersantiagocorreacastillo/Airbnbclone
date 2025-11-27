import { supabase } from "@/libs/supabase";


export const favoriteService = {
  // Agregar a favoritos
  async addFavorite(userId, listingId) {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, listing_id: listingId }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Remover de favoritos
  async removeFavorite(userId, listingId) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('listing_id', listingId);
    
    if (error) throw error;
  },

  // Obtener mis favoritos
  async getMyFavorites(userId) {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        listings (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Verificar si es favorito
  async isFavorite(userId, listingId) {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('listing_id', listingId)
      .single();
    
    return !!data;
  }
};