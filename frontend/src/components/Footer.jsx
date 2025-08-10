// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-black text-white px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Location */}
        <div>
          <div className="flex items-center mb-4">
            <span className="mr-2">📍</span>
            <div>
              <p className="font-semibold">USA & GLOBAL</p>
              <a href="#" className="text-gray-400 text-sm hover:underline">
                Change your location
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mb-6">
            {["facebook", "instagram", "threads", "twitter", "pinterest", "youtube", "linkedin"].map((icon) => (
              <a key={icon} href="#" className="text-white hover:text-gray-400">
                <i className={`fab fa-${icon} text-xl`} />
              </a>
            ))}
          </div>

          {/* Subscribe */}
          <div className="flex border border-gray-600">
            <input
              type="email"
              placeholder="ENTER EMAIL FOR PRIVATE ACCESS"
              className="bg-transparent px-4 py-2 flex-1 outline-none text-sm"
            />
            <button className="px-6 bg-transparent border-l border-gray-600 hover:bg-gray-800">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* New In */}
        <div>
          <h3 className="font-bold mb-3 border-b border-gray-600 inline-block pb-1">NEW IN</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#">Men - Syros</a></li>
            <li><a href="#">Women - Zori</a></li>
            <li><a href="#">Men - Zori</a></li>
          </ul>
        </div>

        {/* Men */}
        <div>
          <h3 className="font-bold mb-3 border-b border-gray-600 inline-block pb-1">MEN</h3>
          <ul className="space-y-2 text-gray-400">
            {["Oxford & Derby", "Loafers", "Sneakers", "Hybrid Dress", "Monk Straps", "Boots", "Sandals", "Slippers", "View All"].map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Women */}
        <div>
          <h3 className="font-bold mb-3 border-b border-gray-600 inline-block pb-1">WOMEN</h3>
          <ul className="space-y-2 text-gray-400">
            {["Loafers & Flats", "Mules & Slingbacks", "Sneakers", "Pumps", "Boots", "Oxford & Derby", "Monk Straps", "Slippers", "View All"].map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="max-w-7xl mx-auto mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row md:justify-between text-gray-400 text-sm space-y-4 md:space-y-0">
        <div className="flex flex-wrap gap-6">
          {["FAQ", "Returns", "Contact", "Gift Cards", "Accessibility", "Privacy & Legal", "Cookies Settings"].map((link) => (
            <a key={link} href="#">{link}</a>
          ))}
        </div>
        <p className="text-gray-500">
          Copyright © 2025 Magnanni, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
