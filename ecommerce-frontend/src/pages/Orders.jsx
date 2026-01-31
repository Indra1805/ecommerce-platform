import { useEffect, useState } from "react";
import { fetchMyOrders } from "../services/api";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500">
        Loading orders...
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-center py-20 text-gray-500">
        You have no orders yet.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="block border rounded-xl p-4 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex justify-between mb-3">
              <span className="font-medium text-blue-600">
                Order #{order.id}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-1">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.product_title} × {item.quantity}
                  </span>
                  <span>₹{item.product_price}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="font-bold">
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
              </div>

              <div className="font-bold">
                Total: ₹{order.total_amount}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
