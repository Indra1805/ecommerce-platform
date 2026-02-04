import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-center justify-between bg-white border rounded-xl p-4">

      {/* CLICKABLE PRODUCT INFO */}
      <Link
        to={`/product/${product.id}`}
        className="flex items-center gap-4 hover:opacity-90"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-16 h-16 object-contain"
        />

        <div>
          <p className="font-medium">{product.title}</p>
          <p className="text-sm text-gray-500">
            ₹{product.price}
          </p>
        </div>
      </Link>

      {/* ACTIONS */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => updateQty(item.id, quantity - 1)}
          className="px-3 py-1 border rounded cursor-pointer"
          disabled={quantity <= 1}
        >
          −
        </button>

        <span>{quantity}</span>

        <button
          onClick={() => updateQty(item.id, quantity + 1)}
          className="px-3 py-1 border rounded cursor-pointer"
        >
          +
        </button>

        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-4 text-red-500 cursor-pointer"
        >
          Remove
        </button>

      </div>
    </div>
  );
}
