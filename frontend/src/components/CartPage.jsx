import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, quantity) => {
    const updated = [...cart];
    updated[index].quantity = quantity;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-6 bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <p className="text-gray-900 font-bold">{item.price}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(index, parseInt(e.target.value))
                      }
                      className="w-16 border rounded-lg p-2 text-center"
                    />
                    <button
                      onClick={() => removeItem(index)}
                      className="px-3 py-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 shadow-md rounded-xl p-6 h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-gray-700">
              <p className="flex justify-between">
                <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (8%):</span> <span>${tax.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping:</span> <span>${shipping.toFixed(2)}</span>
              </p>
              <hr />
              <p className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total:</span> <span>${total.toFixed(2)}</span>
              </p>
            </div>
            <Link to={'/checkout'}><button
              className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </button></Link>
          </div>
        </div>
      )}
    </div>
  );
}
