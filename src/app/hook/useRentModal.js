
import { create } from 'zustand';

const useRentModal = create((set) => ({
  isOpen: false, // Estado inicial (modal cerrado)
  onOpen: () => set({ isOpen: true }), // Función para abrir el modal
  onClose: () => set({ isOpen: false }), // Función para cerrar el modal
}));

export default useRentModal;
