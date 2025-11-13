import { useState } from "react";
import { BiHeart } from "react-icons/bi";

export default function ProductCard({ product, onAddToCart, onToggleFavorite }) {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    setIsFav(!isFav);
    onToggleFavorite?.(product.id);
  };

  return (
    <div className="relative w-full h-full rounded-xl bg-[#f5f5f5] text-black p-4 flex flex-col shadow-md border border-gray-300">
      {/* Favorite Button */}
      <button
        type="button"
        onClick={handleFavorite}
        className="absolute right-4 top-4 p-2 rounded-full bg-white/90 backdrop-blur shadow hover:scale-105 transition"
      >
        <BiHeart
          size={18}
          className={isFav ? "fill-red-500 text-red-500" : "text-gray-700"}
        />
      </button>

      {/* Image */}
      <div className="w-full h-48 rounded-lg  overflow-hidden mb-4 bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-fill object-center"
        />
      </div>

      <h3 className="text-lg font-semibold">{product.name}</h3>

      <p className="text-sm text-gray-600 line-clamp-2 mb-1">
        {product.description}
      </p>

      <p className="text-base font-semibold mb-1">${product.price}</p>

      <p className="text-xs text-gray-500 mb-3">
        Sold by: <span className="font-medium text-black">{product.storeName}</span>
      </p>

      <div className="flex-1" />

      <button
        type="button"
        onClick={() => product.inStock && onAddToCart?.(product.id)}
        disabled={!product.inStock}
        className={`w-full py-2 rounded-lg font-semibold transition ${
          product.inStock
            ? "bg-[#007f6b] text-white hover:brightness-110"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
