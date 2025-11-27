'use client';

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";

import { MdOutlineVilla } from "react-icons/md";

import { usePathname, useSearchParams } from "next/navigation";
import { GiBoatFishing, GiCactus, GiCaveEntrance, GiForestCamp } from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import CategoriaBox from "../categoriaBox";
import Container from "../container";

export const categorias = [
    {
        label: 'Playa',
        icon: TbBeach,
        description: 'Esta propiedad se encuentra cerca de la playa',
    },
    {
        label: 'Moderna',
        icon: MdOutlineVilla,
        description: 'Esta propiedad tiene un diseño moderno',
    },
    {
        label: 'Campo',
        icon: TbMountain,
        description: 'Esta propiedad se encuentra en el campo',
    },
    {
        label: 'Piscina',
        icon: TbPool,
        description: 'Esta propiedad tiene una piscina',
    },
    {
        label: 'Lago',
        icon: GiBoatFishing,
        description: 'Esta propiedad está cerca de un lago',
    },
    {
        label: 'Esquiar',
        icon: FaSkiing,
        description: 'Esta propiedad está cerca de una estación de esquí',
    },
    {
        label: 'Campamento',
        icon: GiForestCamp,
        description: 'Esta propiedad está cerca de un campamento',
    },
    {
        label: 'Cuevas',
        icon: GiCaveEntrance,
        description: 'Esta propiedad está cerca de cuevas',
    },
    {
        label: 'Desierto',
        icon: GiCactus,
        description: 'Esta propiedad está cerca de un desierto',
    },
];

export default function Categorias() {
    const params = useSearchParams();
    const categoriaActual = params?.get('categoria');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto">
                {categorias.map((item) => (
                    <CategoriaBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={categoriaActual === item.label}
                    />
                ))}
            </div>
        </Container>
    );
}
