import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then(setProduct);
  }, [id]);

  if (!product) return null;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={product.image} className="h-80 mx-auto object-contain" />
      <div>
        <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
        <p className="mb-4">{product.description}</p>
        <p className="font-bold text-xl mb-4">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-gray-900 text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
