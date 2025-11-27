
'use client';

import useFavorite from "@/app/hook/useFavorite";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function HeartButton({ listingId, userId }) {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    userId,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}