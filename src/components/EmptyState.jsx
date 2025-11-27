'use client'


import { useRouter } from 'next/navigation';
import Button from './Button';
import Titulo from './Titulo';

export default function EmptyState({
    title = "No hay coincidencias exactas",
    subtitle = "Prueba a cambiar o quitar algunos de tus filtros.",
    showReset
}) {
    const router = useRouter();

    return (
        <main className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Titulo
                center
                title={title}
                subtitle={subtitle}
            />
            <section className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label="Remover los filtros"
                        onClick={() => router.push('/')}
                    />
                )}
            </section>
        </main>
    );
}