import { useState, useEffect, useCallback } from "react";
import React from "react";

const InputField = React.memo(({ label, name, type, placeholder, value, error, onChange }) => (
  <div className="flex flex-col">
    <label className="text-base font-semibold text-gray-900 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded-lg text-gray-900 p-3 focus:ring-2 focus:ring-black outline-none ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
));

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvc: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email address";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.address1.trim()) newErrors.address1 = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.postalCode.match(/^\d{5,6}$/)) newErrors.postalCode = "Invalid postal code";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = "Card number must be 16 digits";
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expiryDate = "Invalid expiry date (MM/YY)";
    if (!formData.cvc.match(/^\d{3}$/)) newErrors.cvc = "CVC must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (prev[name] === value) return prev; // Prevent unnecessary state updates
      return { ...prev, [name]: value };
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cart,
          subtotal,
          tax,
          shipping,
          total
        })
      });

      if (res.ok) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        setCart([]);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          cardNumber: "",
          expiryDate: "",
          cvc: ""
        });
      } else {
        alert("Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">🛍 Checkout</h1>
      <div className="grid md:grid-cols-3 gap-10">
        {/* Checkout Form */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-2xl p-8 space-y-8">
          {/* Billing Info */}
          <div>
            <h2 className="text-xl font-bold border-b pb-2 mb-4">Billing Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" name="firstName" type="text" placeholder="John" value={formData.firstName} error={errors.firstName} onChange={handleChange} />
              <InputField label="Last Name" name="lastName" type="text" placeholder="Doe" value={formData.lastName} error={errors.lastName} onChange={handleChange} />
              <InputField label="Email Address" name="email" type="email" placeholder="you@example.com" value={formData.email} error={errors.email} onChange={handleChange} />
              <InputField label="Phone Number" name="phone" type="tel" placeholder="1234567890" value={formData.phone} error={errors.phone} onChange={handleChange} />
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h2 className="text-xl font-bold border-b pb-2 mb-4">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Address Line 1" name="address1" type="text" placeholder="123 Main St" value={formData.address1} error={errors.address1} onChange={handleChange} />
              <InputField label="Address Line 2" name="address2" type="text" placeholder="Apartment, suite, etc." value={formData.address2} error={errors.address2} onChange={handleChange} />
              <InputField label="City" name="city" type="text" placeholder="New York" value={formData.city} error={errors.city} onChange={handleChange} />
              <InputField label="State" name="state" type="text" placeholder="NY" value={formData.state} error={errors.state} onChange={handleChange} />
              <InputField label="Postal Code" name="postalCode" type="text" placeholder="10001" value={formData.postalCode} error={errors.postalCode} onChange={handleChange} />
              <InputField label="Country" name="country" type="text" placeholder="USA" value={formData.country} error={errors.country} onChange={handleChange} />
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h2 className="text-xl font-bold border-b pb-2 mb-4">Payment Details</h2>
            <div className="space-y-4">
              <InputField label="Card Number" name="cardNumber" type="text" placeholder="1234567812345678" value={formData.cardNumber} error={errors.cardNumber} onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Expiry Date" name="expiryDate" type="text" placeholder="MM/YY" value={formData.expiryDate} error={errors.expiryDate} onChange={handleChange} />
                <InputField label="CVC" name="cvc" type="text" placeholder="123" value={formData.cvc} error={errors.cvc} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-300 shadow-lg rounded-2xl p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <div className="mb-4 max-h-48 overflow-auto">
                {cart.map((item, index) => (
                  <div key={index} className="border-b py-2 last:border-none">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm">
                      Color: <span className="font-medium">{item.color}</span>, Size: <span className="font-medium">{item.size}</span>
                    </p>
                    <p className="text-sm">
                      Price: ${parseFloat(item.price.replace("$", "")).toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-gray-700">
                <p className="flex justify-between"><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></p>
                <p className="flex justify-between"><span>Tax (8%):</span> <span>${tax.toFixed(2)}</span></p>
                <p className="flex justify-between"><span>Shipping:</span> <span>${shipping.toFixed(2)}</span></p>
                <hr />
                <p className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total:</span> <span>${total.toFixed(2)}</span>
                </p>
              </div>
              <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
