'use client';
 

import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Logo() {

    const handleClick = () => {
    router.push("/")
  };


    const router = useRouter();

    
    return (
        <div className="hidden md:block cursor-pointer"
        onClick={handleClick}
        >
         <Image
            alt="Logo"
            height={100}
            width={100}
            src="/imagen/logo2.png"
            className="h-auto w-auto"
            priority
        />
    
        </div>
    ) 
}
