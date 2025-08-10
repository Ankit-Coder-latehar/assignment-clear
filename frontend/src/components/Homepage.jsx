import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  // Slideshow images
  const slides = [
    "https://www.omnisend.com/blog/wp-content/uploads/2021/04/Footwear-Ecommerce.jpg",
    "https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Professional-E-Commerce-Shoes-Banner-Design.jpg",
    "https://www.pymnts.com/wp-content/uploads/2019/08/The-Custom-Movement-sneakers-retail-marketplace.jpg"
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Countdown Sale
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 5);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ expired: true });
      } else {
        setTimeLeft({
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Product Data
  const trendingProducts = [
    { id: 1, name: "Italian Shoe 1", price: "$299", img: "/shoe1.jpeg" },
    { id: 2, name: "Italian Shoe 2", price: "$299", img: "/shoe2.jpeg" },
    { id: 3, name: "Italian Shoe 3", price: "$299", img: "/shoe3.jpeg" },
    { id: 4, name: "Italian Shoe 4", price: "$299", img: "/shoe4.jpeg" },
  ];

  const saleProducts = [
    { id: 5, name: "Italian Shoe 5", price: "$299", salePrice: "$199", img: "/shoe5.jpeg" },
    { id: 6, name: "Italian Shoe 6", price: "$299", salePrice: "$199", img: "/shoe6.webp" },
    { id: 7, name: "Italian Shoe 7", price: "$299", salePrice: "$199", img: "/shoe7.jpg" },
    { id: 8, name: "Italian Shoe 8", price: "$299", salePrice: "$199", img: "/shoe8.jpg" },
  ];

  return (
    <div>
      {/* Hero Slideshow */}
      <section
        className="h-[500px] flex items-center justify-center text-white relative"
        style={{
          backgroundImage: `url(${slides[currentSlide]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="bg-black/50 p-6 rounded-lg text-center">
          <h1 className="text-5xl font-bold">Handmade in Italy</h1>
          <p className="mt-2 text-lg">Luxury you can feel in every step</p>
        </div>
      </section>

      {/* Trending Products */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-400">🔥 Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <Link to="/category/mens" key={product.id}>
              <div className="bg-white rounded shadow hover:shadow-lg transition flex flex-col cursor-pointer">
                <img
                  src={product.img}
                  alt={product.name}
                  className="rounded-t mx-auto max-h-48 object-contain"
                />
                <div className="p-4 text-center flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-500">{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sale Countdown */}
      <section className="bg-red-100 py-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-red-600">⚡ Sale Ends Soon!</h2>
          {timeLeft.expired ? (
            <p className="text-lg font-semibold">Sale has ended</p>
          ) : (
            <p className="text-lg font-semibold">
              {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-8">
          {saleProducts.map((product) => (
            <Link to="/mens-collection" key={product.id}>
              <div className="bg-white rounded shadow hover:shadow-lg transition flex flex-col cursor-pointer">
                <img
                  src={product.img}
                  alt={product.name}
                  className="rounded-t mx-auto max-h-48 object-contain"
                />
                <div className="p-4 text-center flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-red-500 font-bold">
                    {product.salePrice}{" "}
                    <span className="line-through text-gray-400">{product.price}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-600">
          We craft shoes with passion, using traditional Italian techniques and
          the finest materials. Every pair tells a story of elegance and
          craftsmanship passed down through generations.
        </p>
      </section>
    </div>
  );
}
