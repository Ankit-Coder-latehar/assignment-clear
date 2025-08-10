import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import { useState } from "react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#FFC5D3] shadow p-4 flex justify-between items-center relative z-50">
      {/* Left section: Logo + Categories */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          Italian Shoes
        </Link>

        {/* Categories Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="flex items-center gap-1 hover:text-gray-600">
            Categories <span className="text-xs">▼</span>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded transition-all duration-300 ease-in-out overflow-hidden z-50 ${
              isDropdownOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <Link
              to="/category/mens"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Men’s Collection
            </Link>
            <Link
              to="/category/womens"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Women’s Collection
            </Link>
            <Link
              to="/category/kids"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Kids Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex gap-4 items-center">
        <Link to="/cart" className="hover:text-gray-600">
          Cart
        </Link>

        <SignedIn>
          <Link to="/order-summary/:id" className="hover:text-gray-600">
            My Orders
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-black text-white rounded">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
