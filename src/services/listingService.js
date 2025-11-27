import { supabase } from "@/utils/supabase";


export const listingService = {
  // Obtener todos los listings
  async getListings() {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Obtener listing por ID
  async getListingById(id) {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Crear nuevo listing
  async createListing(listingData) {
    const { data, error } = await supabase
      .from('listings')
      .insert([listingData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Obtener mis propiedades
  async getMyListings(userId) {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};