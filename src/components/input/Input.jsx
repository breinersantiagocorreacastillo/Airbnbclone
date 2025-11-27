'use client'

import { BiDollar } from "react-icons/bi";

export default function Input({ 
    id, 
    label, 
    type, 
    disabled, 
    formatPrice, 
    required, 
    value,
    onChange,
    errors 
}) {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar className="text-neutral-700 absolute top-5 left-2" />
            )}
            <input
                id={id}
                disabled={disabled}
                value={value}
                onChange={onChange}
                placeholder=" "
                type={type}
                className={`peer w-full p-4 pt-6 font-light bg-white
                    border-2 rounded-md outline-none transition
                    disabled:opacity-70 disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-7' : 'pl-3'}
                    ${errors && errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors && errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
            />
            <label 
                className={`absolute text-md duration-150 transform -translate-y-3 top-4 z-1
                    origin-[0]
                ${formatPrice ? "left-7" : "left-3"}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-2
                ${errors && errors[id] ? "text-rose-500" : "text-zinc-400"}
                `}>
                {label}
            </label>
        </div>
    );
}

