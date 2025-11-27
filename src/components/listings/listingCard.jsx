
'use client'; 

import Image from "next/image";
import HeartButton from "./HeartButton";

export default function ListingCard({ data }) {
 

  return (
    <div className="group cursor-pointer transition hover:scale-105">
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        <Image
          fill
          src={data.image_url || "/placeholder.jpg"}
          alt={data.title}
          className="object-cover group-hover:scale-110 transition"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* CORAZÓN */}
        <div className="absolute top-3 right-3 z-10">
          <HeartButton listingId={data.id} />
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-lg truncate">{data.title}</h3>
        <p className="text-gray-500 text-sm">{data.country || "Sin ubicación"}</p>
        <div className="mt-2">
          <span className="font-bold text-lg">${data.price_per_night}</span>
          <span className="text-gray-600"> / noche</span>
        </div>
      </div>
    </div>
  );
}