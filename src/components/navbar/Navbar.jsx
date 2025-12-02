'use client';

import Container from "../container";
import Buscar from "./buscar";
import Categorias from "./categorias";
import Logo from "./logo";
import UserMenu from "./userMenu";



export default function Navbar ( )  {
       
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                       <Logo/>
                       <Buscar/>
                       <UserMenu/>
                    </div>
                </Container>
            </div>
           <Categorias/>
        </div>
    );
}