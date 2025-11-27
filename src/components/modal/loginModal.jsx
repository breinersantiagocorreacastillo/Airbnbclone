
'use client';

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import useLoginModal from "@/app/hook/useLoginModal";
import useRegisterModal from "@/app/hook/useRegisterModal";
import Modal from "./Modal";
import Input from "../input/Input";
import Titulo from "../Titulo";

// CLIENTE ÚNICO DEL NAVEGADOR 
import { supabaseBrowser } from "@/libs/supabase/browser-client";

export default function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Si ya está logueado → cerrar modal automáticamente
  useEffect(() => {
    if (loginModal.isOpen) {
      supabaseBrowser.auth.getUser().then(({ data }) => {
        if (data.user) {
          loginModal.onClose();
          toast.success("¡Ya estás conectado!");
        }
      });
    }
  }, [loginModal.isOpen]);

  const cambiarARegistro = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (error) setError("");
  };

  const onSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    const { error: signInError } = await supabaseBrowser.auth.signInWithPassword({
      email: formData.email.trim(),
      password: formData.password,
    });

    if (signInError) {
      setError(signInError.message);
      toast.error("Credenciales incorrectas");
      setIsLoading(false);
      return;
    }

    toast.success("¡Bienvenido de nuevo!");
    loginModal.onClose();
    setFormData({ email: "", password: "" });
    router.refresh();
    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Titulo title="Te damos la bienvenida de nuevo" subtitle="Inicia sesión en tu cuenta" />

      <Input
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        disabled={isLoading}
        required
      />

      <Input
        id="password"
        label="Contraseña"
        type="password"
        value={formData.password}
        onChange={handleChange}
        disabled={isLoading}
        required
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );

  const footerContent = (
    <div className="text-center text-neutral-500 text-sm mt-4">
      ¿Primera vez usando Airbnb?{" "}
      <span
        onClick={cambiarARegistro}
        className="text-rose-500 cursor-pointer hover:underline font-medium"
      >
        Regístrate aquí
      </span>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Iniciar sesión"
      actionLabel="Continuar"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}