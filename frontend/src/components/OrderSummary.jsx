import { useState } from "react";
import { CheckCircle2, Truck, CreditCard, ShoppingBag } from "lucide-react";

export default function OrderSummary() {
  const [order] = useState({
    id: "ORD-2025-0001",
    date: "Aug 10, 2025",
    status: "Shipped",
    items: [
      {
        id: 1,
        name: "Italian Leather Shoe",
        description: "Premium handcrafted leather shoe with cushioned sole.",
        qty: 1,
        price: 199,
        img: "/shoe1.jpeg"
      },
      {
        id: 2,
        name: "Classic Sneakers",
        description: "Comfortable sneakers for everyday wear, breathable fabric.",
        qty: 2,
        price: 89,
        img: "/shoe2.jpeg"
      },
    ],
    shipping: 10,
    discount: 20,
    address: "123 Luxury Street, Milan, Italy",
    paymentMethod: "Credit Card",
    totalPaid: 377,
  });

  return (
    <div className="bg-gray-300 min-h-screen p-6">
      {/* Order Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 border-t-4 border-red-500">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order Summary</h1>
            <p className="text-gray-500">Order ID: {order.id}</p>
            <p className="text-gray-500">Placed on {order.date}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              order.status === "Shipped"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.status}
          </span>
        </div>

        {/* Order Progress */}
        <div className="mt-6 flex justify-around items-center">
          <div className="flex flex-col items-center">
            <CheckCircle2 className="text-green-500" size={28} />
            <p className="text-sm mt-1">Confirmed</p>
          </div>
          <div className="h-1 bg-green-500 w-16"></div>
          <div className="flex flex-col items-center">
            <Truck className="text-green-500" size={28} />
            <p className="text-sm mt-1">Shipped</p>
          </div>
          <div className="h-1 bg-gray-300 w-16"></div>
          <div className="flex flex-col items-center">
            <ShoppingBag className="text-gray-400" size={28} />
            <p className="text-sm mt-1">Delivered</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Items</h2>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
              </div>
              <p className="font-semibold">${item.price * item.qty}</p>
            </div>
          ))}
        </div>

        {/* Order Summary Details */}
        <div className="mt-6 bg-gray-300 p-4 rounded-lg">
          <div className="flex justify-between py-1">
            <span>Subtotal</span>
            <span>
              $
              {order.items.reduce((sum, i) => sum + i.price * i.qty, 0)}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span>Shipping</span>
            <span>${order.shipping}</span>
          </div>
          <div className="flex justify-between py-1 text-red-500">
            <span>Discount</span>
            <span>- ${order.discount}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
            <span>Total Paid</span>
            <span>${order.totalPaid}</span>
          </div>
        </div>

        {/* Shipping & Payment */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-300 p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p className="text-gray-600">{order.address}</p>
          </div>
          <div className="bg-gray-300 p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="flex items-center gap-2">
              <CreditCard size={20} className="text-gray-600" />
              <p className="text-gray-600">{order.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
