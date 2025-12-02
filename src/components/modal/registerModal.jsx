'use client';

import { useState } from "react";
import toast from "react-hot-toast";
import useRegisterModal from "@/app/hook/useRegisterModal";
import useLoginModal from "@/app/hook/useLoginModal";
import Modal from "./Modal";
import Input from "../input/Input";
import Titulo from "../Titulo";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { supabaseBrowser } from "@/libs/supabase/browser-client";

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      console.log('🔍 Intentando registro con:', formData.email);

      // ✅ SIMPLIFICAR - Remover emailRedirectTo temporalmente
      const { data, error } = await supabaseBrowser.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          }
          // ❌ REMOVER temporalmente: emailRedirectTo
        },
      });

      if (error) {
        console.error('🔍 Error registro:', error);
        
        if (error.message.includes('already registered') || error.message.includes('already exists')) {
          toast.error("Este email ya está registrado");
        } else if (error.message.includes('session') || error.name === 'AuthSessionMissingError') {
          toast.error("Error de sesión. Por favor recarga la página.");
        } else {
          toast.error(error.message || "Error al crear la cuenta");
        }
        return;
      }

      console.log('🔍 Respuesta registro:', data);

      // Manejar respuesta
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        toast.error("Este email ya está registrado");
        return;
      }

      // Éxito
      toast.success("¡Cuenta creada! Revisa tu correo para confirmar.");
      registerModal.onClose();
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });

    } catch (err) {
      console.error('🔍 Error inesperado:', err);
      toast.error("Error al crear la cuenta. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Google OAuth simplificado
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabaseBrowser.auth.signInWithOAuth({
        provider: 'google'
        // ❌ Remover redirectTo temporalmente
      });

      if (error) throw error;
      
    } catch (error) {
      console.error('Error Google OAuth:', error);
      toast.error("Error al iniciar con Google");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Titulo title="¡Bienvenido a Airbnb!" subtitle="Crea tu cuenta" />
      <Input id="name" label="Nombre" value={formData.name} onChange={handleChange} disabled={isLoading} required />
      <Input id="email" label="Email" type="email" value={formData.email} onChange={handleChange} disabled={isLoading} required />
      <Input id="password" label="Contraseña" type="password" value={formData.password} onChange={handleChange} disabled={isLoading} required />
      <Input id="confirmPassword" label="Confirmar contraseña" type="password" value={formData.confirmPassword} onChange={handleChange} disabled={isLoading} required />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continuar con Google"
        icon={FcGoogle}
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <span>¿Ya tienes una cuenta? </span>
        <span
          onClick={() => {
            registerModal.onClose();
            loginModal.onOpen();
          }}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Iniciar sesión
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Registrarse"
      actionLabel={isLoading ? "Creando cuenta..." : "Registrarse"}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}