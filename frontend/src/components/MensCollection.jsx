import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MensCollection() {
  const heroSlides = [
    "https://theshoeparlour.ie/cdn/shop/collections/mens_collection.png?v=1695814970",
    "https://banjaaran.in/cdn/shop/files/vannbanner_2_1.jpg?v=1736200661&width=3840",
    "https://img.pikbest.com/origin/06/39/82/47ppIkbEsT7dJ.jpg!w700wp",
  ];

  const products = [
    { id: 1, name: "Classic Italian Loafers", price: "$120", image: "https://m.media-amazon.com/images/I/91m-gohknHS._UY1000_.jpg" },
    { id: 2, name: "Brown Leather Boots", price: "$150", image: "https://costosoitaliano.com/cdn/shop/files/Timberlandbrown2_300x300.jpg?v=1736589493" },
    { id: 3, name: "Casual Sneakers", price: "$90", image: "https://rukminim2.flixcart.com/image/704/844/xif0q/shoe/g/s/5/-original-imahd2zhr7ztk6vw.jpeg?q=90&crop=false" },
    { id: 4, name: "Formal Derby Shoes", price: "$140", image: "https://imagescdn.louisphilippe.com/img/app/product/3/39620728-19754683.jpg?auto=format&w=390" },
  ];

  const trendingProducts = [
    { id: 5, name: "Sporty Runners", price: "$110", image: "https://redtape.com/cdn/shop/files/RSO3902_1_284691d1-8ec9-4cfa-9425-52e91b3200a8.jpg?v=1754294538" },
    { id: 6, name: "Leather Slip-ons", price: "$130", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600" },
    { id: 7, name: "High-top Sneakers", price: "$100", image: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=600" },
    { id: 8, name: "Suede Loafers", price: "$140", image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=600" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Slideshow */}
      <div className="relative h-96 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Men’s Collection
              </h1>
              <p className="text-lg">
                Premium Italian shoes for the modern gentleman
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Best Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {product.name}
                </h3>
                <p className="text-gray-500">{product.price}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="mt-3 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Trending Now</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-[250px] bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {product.name}
                  </h3>
                  <p className="text-gray-500">{product.price}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="mt-3 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-black text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Step into Luxury — Shop Now
        </h2>
        <p className="mb-6">
          Crafted with precision, designed for comfort, and styled for elegance.
        </p>
        <Link
          to="/cart"
          className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200"
        >
          Add to Cart
        </Link>
      </div>
    </div>
  );
}
