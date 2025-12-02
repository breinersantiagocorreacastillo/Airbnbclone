// src/components/navbar/userMenu.jsx
'use client';

import { useState, useEffect, useCallback } from "react";
import { IoMdMenu } from "react-icons/io";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import MenuItem from "../MenuItem";
import useRegisterModal from "@/app/hook/useRegisterModal";
import useLoginModal from "@/app/hook/useLoginModal";
import useRentModal from "@/app/hook/useRentModal";

// CLIENTE ÚNICO DEL NAVEGADOR (ESTO ES LO QUE HACÍA QUE NO FUNCIONARA)
import { supabaseBrowser } from "@/libs/supabase/browser-client";

export default function UserMenu() {
  const [estaAbierto, setEstaAbierto] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  // Cargar usuario y escuchar TODOS los cambios de sesión
  useEffect(() => {
    // Cargar usuario actual
    supabaseBrowser.auth.getUser().then(({ data }) => setUser(data.user));

    // ESCUCHAR CAMBIOS EN TIEMPO REAL (login, logout, refresh)
    const { data: listener } = supabaseBrowser.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      if (event === "SIGNED_OUT") {
        setEstaAbierto(false);
        router.refresh(); // ← ESTO ES CLAVE
        toast.success("Sesión cerrada");
      }
    });

    return () => listener?.subscription?.unsubscribe();
  }, [router]);

  const abrirPuerta = useCallback((e) => {
    e.stopPropagation();
    setEstaAbierto((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!user) {
      loginModal.onOpen();
      setEstaAbierto(false);
      return;
    }
    rentModal.onOpen();
    setEstaAbierto(false);
  }, [user, loginModal, rentModal]);

  // CIERRE DE SESIÓN FUNCIONANDO AL 100%
  const handleSignOut = async () => {
    setEstaAbierto(false);
    const { error } = await supabaseBrowser.auth.signOut();
    if (error) {
      toast.error("Error al cerrar sesión");
    } else {
      // El onAuthStateChange ya hace todo lo demás
    }
  };

  // Cerrar menú al clic fuera
  useEffect(() => {
    if (!estaAbierto) return;
    const close = () => setEstaAbierto(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [estaAbierto]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          <h2>Conviértete en anfitrión</h2>
        </div>

        <div
          onClick={abrirPuerta}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <IoMdMenu size={18} />
          <div className="hidden md:block">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold text-lg">
                {user?.email?.[0]?.toUpperCase() || "A"}
              </div>
            )}
          </div>
        </div>
      </div>

      {estaAbierto && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm z-50">
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <div className="px-4 py-3 border-b border-neutral-100">
                  <p className="font-semibold">
                    ¡Hola, {user.user_metadata?.full_name || user.email}!
                  </p>
                  <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                </div>

                <MenuItem label="Mis viajes" onClick={() => {}} />
                <hr />
                <MenuItem label="Mis favoritos" onClick={() => {}} />
                <hr />
                <MenuItem label="Mis reservas" onClick={() => {}} />
                <hr />
                <MenuItem label="Mis propiedades" onClick={() => {}} />
                <MenuItem label="Airbnb mi hogar" onClick={onRent} />
                <hr />
                <MenuItem
                  label="Cerrar sesión"
                  onClick={handleSignOut}
                  className="text-red-600 font-semibold hover:bg-red-50"
                />
              </>
            ) : (
              <>
                <MenuItem label="Iniciar sesión" onClick={() => { setEstaAbierto(false); loginModal.onOpen(); }} />
                <MenuItem label="Registrarse" onClick={() => { setEstaAbierto(false); registerModal.onOpen(); }} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}