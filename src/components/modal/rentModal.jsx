
'use client';

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import useRentModal from "@/app/hook/useRentModal";
import Modal from "./Modal";
import Titulo from "../Titulo";
import { categorias } from "../navbar/categorias";
import CategoriaInput from "../input/CategoriaInput";
import PaisSeleccion from "../input/PaisSeleccion";
import Mostrador from "../input/Mostrador";
import ImageUpload from "../input/ImageUpload";
import Input from "../input/Input";
import Mapa from "../mapa";

import { supabaseBrowser } from "@/libs/supabase/browser-client";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

export default function RentModal() {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const [category, setCategory] = useState("");
  const [locationValue, setLocationValue] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [imageSrc, setImageSrc] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (rentModal.isOpen) {
      supabaseBrowser.auth.getUser().then(({ data }) => setUser(data.user));
    }
  }, [rentModal.isOpen]);

  const onBack = () => setStep((prev) => Math.max(prev - 1, 0));
  const onNext = () => setStep((prev) => Math.min(prev + 1, STEPS.PRICE));

  const onSubmit = async () => {
    if (step !== STEPS.PRICE) return onNext();

    if (!user) {
      toast.error("Debes iniciar sesión");
      rentModal.onClose();
      return;
    }
    if (!imageSrc) return toast.error("Sube al menos una foto");
    if (!category || !locationValue || !title || !description || !price) {
      toast.error("Completa todos los campos");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/listings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          image_url: imageSrc,
          country: locationValue.label,
          property_type: category,
          room_count: Number(roomCount),
          bathroom_count: Number(bathroomCount),
          guest_count: Number(guestCount),
          price_per_night: Number(price),
          category,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al publicar");

      toast.success("¡Tu propiedad ha sido publicada con éxito!");
      router.refresh();

      // Resetear TODO
      setStep(STEPS.CATEGORY);
      setCategory("");
      setLocationValue(null);
      setGuestCount(1);
      setRoomCount(1);
      setBathroomCount(1);
      setImageSrc("");
      setTitle("");
      setDescription("");
      setPrice("");

      rentModal.onClose();

    } catch (error) {
      toast.error(error.message || "Error al publicar");
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = useMemo(() => (step === STEPS.PRICE ? "Publicar anuncio" : "Siguiente"), [step]);
  const secondaryActionLabel = useMemo(() => (step === STEPS.CATEGORY ? undefined : "Atrás"), [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Titulo title="¿Qué tipo de lugar tienes?" subtitle="Elige una categoría" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto">
        {categorias.map((item) => (
          <CategoriaInput
            key={item.label}
            onClick={(cat) => setCategory(cat)}
            selected={category === item.label}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Titulo title="¿Dónde está ubicado tu alojamiento?" subtitle="Ayuda a los viajeros a encontrarlo" />
        <PaisSeleccion value={locationValue} onChange={setLocationValue} />
        {locationValue?.latlng && <Mapa center={locationValue.latlng} />}
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Titulo title="Comparte algunos detalles" subtitle="¿Cuántos pueden quedarse?" />
        <Mostrador title="Huéspedes" value={guestCount} onChange={setGuestCount} />
        <Mostrador title="Habitaciones" value={roomCount} onChange={setRoomCount} />
        <Mostrador title="Baños" value={bathroomCount} onChange={setBathroomCount} />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Titulo title="Sube una foto atractiva" subtitle="¡Muestra tu lugar!" />
        <ImageUpload value={imageSrc} onChange={setImageSrc} />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Titulo title="¿Cómo describirías tu lugar?" subtitle="Título y descripción atractiva" />
        <Input id="title" label="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <hr />
        <Input id="description" label="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Titulo title="Establece tu precio por noche" subtitle="¿Cuánto quieres cobrar?" />
        <Input
          id="price"
          label="Precio"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          formatPrice
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onSubmit}
      title="Alquila tu hogar en Airbnb"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
      disabled={isLoading}
      body={bodyContent}
    />
  );
}