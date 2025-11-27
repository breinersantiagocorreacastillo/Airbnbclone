'use client'
 

import Image from "next/image";


export default function Logo() {
    
    return (
        <div className="hidden md:block cursor-pointer">
         <Image
            alt="Logo"
            height={100}
            width={100}
            src="/imagen/logo2.png"
        />
    
        </div>
    ) 
}
