import { createClient } from '@/libs/supabase/serber';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/container';
import Mapa from '@/components/mapa';

import { 
  FaMapMarkerAlt, 
  FaHome, 
  FaTag,
  FaUsers,
  FaBed,
  FaShower,
  FaReceipt,
  FaUser,
  FaShield
} from 'react-icons/fa';
import ListingReserva from '@/components/listings/listingReserva';

export default async function ListingDetailPage({ params }) {
  const supabase = await createClient();
  const { Id: id } = await params;

  // Obtener el listing
  const { data: listing, error: listingError } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single();

  if (listingError || !listing) {
    notFound();
  }

  // Obtener solo el NOMBRE del usuario (no email)
  let userName = null;
  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('name')  // ← Solo nombre
      .eq('id', listing.user_id)
      .single();
    
    if (!userError && user) {
      userName = user.name;
    }
  } catch (error) {
    console.log('No se pudo obtener nombre del usuario');
  }

  return (
    <Container>
      <div className="max-w-6xl mx-auto py-8 px-4">
        
        {/* Imagen principal */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <Image
            src={listing.image_url}
            alt={listing.title}
            width={1200}
            height={600}
            className="w-full h-96 object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Información principal */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
            
            {/* Información del anfitrión - SOLO NOMBRE */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                <FaUser className="text-rose-500" />
              </div>
              <div>
                <p className="font-semibold">Anfitrión</p>
                <p className="text-gray-700">
                  {userName || 'Anfitrión verificado'}
                </p>
                {!userName && (
                  <p className="text-xs text-gray-500">
                    Miembro desde {new Date(listing.created_at).getFullYear()}
                  </p>
                )}
              </div>

            <hr className="my-6" />
            </div>
             
            {/* Resto del código... */}
            <div className="flex items-center gap-4 mb-6 text-gray-600">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-rose-500" />
                {listing.country}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <FaHome className="text-rose-500" />
                {listing.property_type}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <FaTag className="text-rose-500" />
                {listing.category}
              </span>
            </div>
                {/* Componente Mapa */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
              <Mapa 
                center={listing.latitude && listing.longitude 
                  ? [listing.latitude, listing.longitude] 
                  : null
                }
              />
            </div>

            {/* Características */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 border rounded-lg">
                <FaUsers className="w-6 h-6 mx-auto mb-2 text-rose-500" />
                <div className="font-semibold">{listing.guest_count}</div>
                <div className="text-sm text-gray-600">Huéspedes</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <FaBed className="w-6 h-6 mx-auto mb-2 text-rose-500" />
                <div className="font-semibold">{listing.room_count}</div>
                <div className="text-sm text-gray-600">Habitaciones</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <FaShower className="w-6 h-6 mx-auto mb-2 text-rose-500" />
                <div className="font-semibold">{listing.bathroom_count}</div>
                <div className="text-sm text-gray-600">Baños</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <FaReceipt className="w-6 h-6 mx-auto mb-2 text-rose-500" />
                <div className="font-semibold">{listing.category}</div>
                <div className="text-sm text-gray-600">Categoría</div>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

          </div>

          {/* Panel de reserva */}
          <div className="lg:col-span-1">
            <ListingReserva pricePerNight={listing.price_per_night} />
          </div>

        </div>
      </div>
    </Container>
  );
}