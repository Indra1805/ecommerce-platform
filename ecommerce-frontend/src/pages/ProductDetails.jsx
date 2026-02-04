import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="mb-4">Product not found.</p>
        <Link to="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const liked = isWishlisted(product.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-white rounded-xl border p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[420px] object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col">

          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {product.title}
          </h1>

          <p className="text-xl font-semibold text-gray-900 mb-4">
            ₹{product.price}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4">

            {inCart ? (
              <button
                disabled
                className="flex-1 border border-green-600 text-green-600 py-3 rounded-lg font-medium cursor-not-allowed"
              >
                In Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 cursor-pointer"
              >
                Add to Cart
              </button>
            )}

            <button
              onClick={() => toggleWishlist(product)}
              className={`flex-1 border py-3 rounded-lg font-medium cursor-pointer
                ${
                  liked
                    ? "border-red-500 text-red-500"
                    : "border-gray-300 text-gray-700"
                }
              `}
            >
              {liked ? "Wishlisted ❤️" : "Add to Wishlist 🤍"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
