import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  // EMPTY STATE
  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Save items you like to view them later.
        </p>
        <Link
          to="/"
          className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-0">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((product) => {
          const inCart = isInCart(product.id);

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border hover:shadow-md transition overflow-hidden flex flex-col"
            >
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

              {/* ACTIONS */}
              <div className="px-4 pb-4 flex gap-2">
                {inCart ? (
                  <button
                    disabled
                    className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg cursor-not-allowed"
                  >
                    In Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  onClick={() => toggleWishlist(product)}
                  className="px-4 border rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  title="Remove from wishlist"
                  aria-label="Remove from wishlist"
                >
                  ❌
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
