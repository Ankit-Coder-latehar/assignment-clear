import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = {
    id,
    name: "Classic Italian Loafers",
    price: "$120",
    description:
      "Crafted from premium Italian leather, these loafers offer timeless style and exceptional comfort for all-day wear.",
    images: [
      "https://m.media-amazon.com/images/I/91m-gohknHS._UY1000_.jpg",
      "https://images.unsplash.com/photo-1606813902916-f5b7b8c5bb2d?q=80&w=600",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=600",
    ],
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Brown", "Tan"],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left: Product Images */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                selectedImage === img ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        {/* Main Image */}
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded"
        />
      </div>

      {/* Right: Product Details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl text-gray-700 mb-4">{product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Size Selection */}
        <h2 className="text-lg font-semibold mb-2">Select Size:</h2>
        <div className="flex gap-3 mb-6">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`px-4 py-2 border rounded ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Color Selection */}
        <h2 className="text-lg font-semibold mb-2">Select Color:</h2>
        <div className="flex gap-3 mb-6">
          {product.colors.map((color) => (
            <button
              key={color}
              className={`px-4 py-2 border rounded ${
                selectedColor === color
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>

        {/* Add to Cart */}
        <button
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 disabled:bg-gray-400"
          disabled={!selectedSize || !selectedColor}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
