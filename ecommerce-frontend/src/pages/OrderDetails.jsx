import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchOrderById, cancelOrderAPI } from "../services/api";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrderById(id);
        setOrder(data);
      } catch {
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id, navigate]);

  const handleCancel = async () => {
    if (!window.confirm("Cancel this order?")) return;

    setCancelling(true);
    try {
      await cancelOrderAPI(id);
      setOrder({ ...order, status: "CANCELLED" });
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500">
        Loading order...
      </p>
    );
  }

  if (!order) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* BACK */}
      <button
        onClick={() => navigate("/orders")}
        className="mb-4 bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
      >
        ← Back to Orders
      </button>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Order #{order.id}
        </h1>

        <p className="text-gray-500">
          Status:{" "}
          <span
            className={`font-medium ${
              order.status === "PLACED"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {order.status}
          </span>
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="space-y-6">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border rounded-xl p-6"
          >

            {/* IMAGE */}
            <Link to={`/product/${item.product_id}`}>
              <img
                src={item.product_image}
                alt={item.product_title}
                className="max-h-[300px] object-contain mx-auto"
              />
            </Link>

            {/* DETAILS */}
            <div>
              <h2 className="text-xl font-bold mb-2">
                {item.product_title}
              </h2>

              <p className="text-gray-600 mb-4">
                {item.product_description}
              </p>

              <p className="font-medium">
                Price: ₹{item.product_price}
              </p>

              <p className="font-medium">
                Quantity: {item.quantity}
              </p>

              <p className="font-bold mt-2">
                Subtotal: ₹
                {(item.product_price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="text-right font-bold text-xl mt-8">
        Total: ₹{order.total_amount}
      </div>

      {/* CANCEL */}
      {order.status === "PLACED" && (
        <button
          onClick={handleCancel}
          disabled={cancelling}
          className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 cursor-pointer"
        >
          {cancelling ? "Cancelling..." : "Cancel Order"}
        </button>
      )}
    </div>
  );
}
