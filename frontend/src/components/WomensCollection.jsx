import { useState, useEffect } from "react";
import axios from "axios";

export default function WomensCollection() {
  const slides = [
    { id: 1, img: "/women1.jpg", text: "Luxury Italian Craftsmanship" },
    { id: 2, img: "/women2.jpg", text: "Elegant Comfort" },
    { id: 3, img: "/women3.jpg", text: "Step into Style" },
  ];

  const [current, setCurrent] = useState(0);
  const [bestPicks, setBestPicks] = useState([]);
  const [trending, setTrending] = useState([]);

  // Auto slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        // Filter for women's category
        const womensProducts = data.filter((p) => p.category?.toLowerCase() === "womens");
        setBestPicks(womensProducts.slice(0, 4));
        setTrending(womensProducts.slice(4, 10));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.img}
              alt={slide.text}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-4xl md:text-5xl font-bold">
                {slide.text}
              </h2>
            </div>
          </div>
        ))}
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl bg-black/40 rounded-full p-2"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl bg-black/40 rounded-full p-2"
        >
          ›
        </button>
      </div>

      {/* OUR BEST PICKS */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Our Best Picks
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestPicks.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  ${item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING NOW */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Trending Now
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trending.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  ${item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            About Our Collection
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our Women's Collection celebrates elegance, comfort, and Italian
            craftsmanship. Every pair is designed with precision and care,
            using premium materials to ensure both style and durability. Step
            confidently into any occasion with our curated selection of
            footwear.
          </p>
        </div>
      </section>
    </div>
  );
}
