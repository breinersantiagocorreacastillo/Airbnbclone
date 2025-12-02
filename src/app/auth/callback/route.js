import { createClient } from '@/libs/supabase/serber'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Redirigir al home después de confirmar email
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Redirigir al home si hay error o no hay código
  return NextResponse.redirect(new URL('/', request.url))
}