import { supabase } from "@/utils/supabase";

export const rentalService = {
  // Crear reserva
  async createRental(rentalData) {
    const { data, error } = await supabase
      .from('rentals')
      .insert([rentalData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Obtener mis reservas
  async getMyRentals(userId) {
    const { data, error } = await supabase
      .from('rentals')
      .select(`
        *,
        listings (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Cancelar reserva
  async cancelRental(rentalId) {
    const { data, error } = await supabase
      .from('rentals')
      .update({ status: 'cancelled' })
      .eq('id', rentalId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};