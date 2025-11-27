'use client';

import usePais from "@/app/hook/usePais";

import Titulo from "../Titulo";
import CorazonButton from "../CorazonButton";





export default function ListingHead({ title, locationValue, imageSrc, id }) {
  const { getByValue } = usePais();
  const { data: session, status } = useSession(); // Usamos el hook useSession para obtener la sesión

  const location = getByValue(locationValue);

  return (
    <>
      <Titulo
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <CorazonButton
            listingId={id}
            currentUser={status === 'authenticated' ? session.user : null} // Pasamos session.user si el usuario está autenticado
          />
        </div>
      </div>
    </>
  );
}
