import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 shadow-lg py-4 px-8 h-15 fixed top-0 left-0 right-0 z-50">
      <ul className="flex gap-8 justify-center items-center">
        <li>
          <Link
            href="/"
            className="text-white font-semibold text-lg hover:text-blue-200 transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/display"
            className="text-white font-semibold text-lg hover:text-purple-200 transition-colors duration-200"
          >
            Display
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;