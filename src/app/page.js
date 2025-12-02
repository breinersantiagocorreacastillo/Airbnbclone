import Container from "@/components/container";
import ListingCard from "@/components/listings/listingCard";
import { createClient } from "@/libs/supabase/serber";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  
 const supabase = await createClient();


 

  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <>
      <Container>
        <section className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          
          {!listings || listings.length === 0 ? (
            <div className="col-span-full text-center text-2xl text-gray-500 py-20">
              No hay anuncios aún. ¡Sé el primero en publicar uno!
            </div>
          ) : (
            listings.map((listing) => (
              <ListingCard key={listing.id} data={listing} />
            ))
          )}

        </section>
      </Container>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Información legal e idioma */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
              <span>© 2025 Airbnb, Inc.</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:underline">Privacidad</a>
                <a href="#" className="hover:underline">Términos</a>
                <a href="#" className="hover:underline">Datos de la empresa</a>
              </div>
              <div className="flex items-center space-x-2">
                <span>Español (CO)</span>
                <span className="font-medium">$ COP</span>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}

