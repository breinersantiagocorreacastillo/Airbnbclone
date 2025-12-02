import { createClient } from '@/libs/supabase/serber';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const supabase = await createClient();

    // 1. Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // 2. Obtener datos del body
    const body = await request.json();
    
    // 3. Insertar listing DIRECTAMENTE - ¡SIN SINCRONIZACIÓN!
    const { data, error } = await supabase
      .from('listings')
      .insert({
        title: body.title?.trim(),
        description: body.description?.trim(),
        image_url: body.image_url,
        country: body.country,
        property_type: body.property_type || body.category,
        room_count: Number(body.room_count) || 1,
        bathroom_count: Number(body.bathroom_count) || 1,
        guest_count: Number(body.guest_count) || 1,
        price_per_night: Number(body.price_per_night),
        category: body.category,
        user_id: user.id, // ← Ahora referencia auth.users directamente
        night_count: 1
      })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data[0] });

  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}