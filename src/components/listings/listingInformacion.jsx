'use client';


import { IconType } from "react-icons";

import dynamic from "next/dynamic";
import usePais from "@/app/hook/usePais";
import ListingCategory from "./listingCategory";
import { useSession } from "next-auth/react";

const Map = dynamic(() => import('../mapa'), {
  ssr: false
});

export default function ListingInformacion({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue
}) {
  const { getByValue } = usePais();
  const { data: session, status } = useSession(); // Usamos useSession para obtener la sesión

  const coordenadas = getByValue(locationValue)?.latlng;

  return (
    <main className="col-span-4 flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <p>Hospedaje de {user?.name}</p>
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <p>{guestCount} invitado(s)</p>
          <p>{roomCount} habitación(es)</p>
          <p>{bathroomCount} baño(s)</p>
        </div>
      </section>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordenadas} />
    </main>
  );
}
