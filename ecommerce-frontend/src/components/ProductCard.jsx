import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const liked = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="bg-white rounded-2xl border hover:shadow-md transition overflow-hidden relative flex flex-col">
      
      {/* Wishlist Icon (KEEP AS IS LOGICALLY) */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 text-xl cursor-pointer"
        aria-label="Wishlist"
      >
        {liked ? "❤️" : "🤍"}
      </button>

      {/* IMAGE */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-44 sm:h-48 w-full overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* INFO ROW */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <h3 className="text-sm sm:text-base font-medium line-clamp-2">
          {product.title}
        </h3>
        <span className="font-bold text-gray-900 whitespace-nowrap">
          ₹{product.price}
        </span>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        {inCart ? (
          <button
            disabled
            className="w-full border border-green-600 text-green-600 py-2 rounded-lg cursor-not-allowed"
          >
            In Cart
          </button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
