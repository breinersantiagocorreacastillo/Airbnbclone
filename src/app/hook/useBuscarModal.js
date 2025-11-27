import create from 'zustand';

// Definición de la tienda (store) para el modal
const useBuscarModal = create((set) => ({
  isOpen: false,   // Estado inicial
  onOpen: () => set({ isOpen: true }), // Función para abrir el modal
  onClose: () => set({ isOpen: false }), // Función para cerrar el modal
}));

export default useBuscarModal;
