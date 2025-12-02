// src/components/input/ImageUpload.jsx
'use client';

import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";


import { supabaseBrowser } from "@/libs/supabase/browser-client";

export default function ImageUpload({ onChange, value }) {
  const handleUpload = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExtension = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExtension}`;

      try {
        const { data, error } = await supabaseBrowser.storage
          .from("property-images")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) throw error;

        // URL pública correcta
        const { data: urlData } = supabaseBrowser.storage
          .from("property-images")
          .getPublicUrl(fileName);

        const publicUrl = urlData.publicUrl;

        // ESTO ES LO QUE HACE QUE FUNCIONE
        onChange(publicUrl);
        toast.success("¡Foto subida correctamente!");
      } catch (error) {
        console.error("Error al subir imagen:", error);
        toast.error("Error al subir la imagen");
      }
    },
    [onChange]
  );

  return (
    <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center text-neutral-600">
      <TbPhotoPlus size={50} />
      <p className="font-semibold text-lg">Haz clic para subir</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      {value && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={value}
            alt="Subida"
            className="w-full h-full object-cover"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
}