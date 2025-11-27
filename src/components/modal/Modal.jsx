"use client";

import { useCallback } from "react";
import { IoMdClose } from "react-icons/io";

export default function Modal({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) {

    // Cerrar modal
    const handleClose = useCallback(() => {
        if (disabled) return;
        onClose();
    }, [disabled, onClose]);

    // Acción principal
    const handleSubmit = useCallback(() => {
        if (disabled) return;
        onSubmit(); // NO enviamos "event"
    }, [disabled, onSubmit]);

    // Acción secundaria
    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;
        secondaryAction(); // También sin event
    }, [disabled, secondaryAction]);

    if (!isOpen) return null;

    return (
        <>
            <div className="
                justify-center 
                items-center 
                flex 
                overflow-x-hidden 
                overflow-y-auto 
                fixed 
                inset-0 
                z-50 
                outline-none 
                focus:outline-none
                bg-neutral-800/70
            ">
                <div className="
                    relative 
                    w-full 
                    md:w-4/6 
                    lg:w-3/6 
                    xl:w-2/5 
                    my-6 
                    mx-auto 
                    h-auto
                ">
                    <div className="
                        translate 
                        duration-300 
                        h-full 
                        transition
                        bg-white 
                        rounded-lg 
                        shadow-lg
                    ">
                        {/* Header */}
                        <div className="flex items-center justify-center p-6 border-b relative">
                            <button
                                className="absolute left-4 p-1 hover:opacity-70 transition"
                                onClick={handleClose}
                            >
                                <IoMdClose size={24} />
                            </button>
                            <h3 className="text-lg font-semibold">
                                {title}
                            </h3>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {body}
                        </div>

                        {/* Footer */}
                        <div className="p-6 flex flex-col gap-2">
                            <div className="flex items-center gap-4 w-full">

                                {secondaryAction && secondaryActionLabel && (
                                    <button
                                        disabled={disabled}
                                        onClick={handleSecondaryAction}
                                        className="
                                            w-full 
                                            py-3 
                                            border 
                                            rounded-lg 
                                            hover:bg-neutral-100 
                                            transition
                                        "
                                    >
                                        {secondaryActionLabel}
                                    </button>
                                )}

                                <button
                                    disabled={disabled}
                                    onClick={handleSubmit}
                                    className="
                                        w-full 
                                        py-3 
                                        bg-rose-500 
                                        text-white 
                                        rounded-lg 
                                        hover:bg-rose-600 
                                        transition
                                    "
                                >
                                    {actionLabel}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
