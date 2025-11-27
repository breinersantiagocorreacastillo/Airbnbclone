'use client';

import { create } from 'zustand';

const useRegisterModal = create((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log('useRegisterModal - Abriendo modal');
    set({ isOpen: true });
  },
  onClose: () => {
    console.log(' useRegisterModal - Cerrando modal');
    set({ isOpen: false });
  },
}));

export default useRegisterModal;