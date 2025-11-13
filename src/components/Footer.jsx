import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Book Haven</h1>
          <p className="text-gray-400 text-sm">
            Discover, manage, and share your favorite books with a growing community of readers.
          </p>
        </div>

        {/* Contact Section */}
        <div>
  <h2 className="text-lg font-semibold text-white mb-3">Contact Us</h2>

  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
    <FaMapMarkerAlt className="text-white" />
    <span>Dhaka, Bangladesh</span>
  </div>

  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
    <FaPhoneAlt className="text-white" />
    <span>+880 1234-567890</span>
  </div>

  <div className="flex items-center gap-2 text-gray-400 text-sm">
    <FaEnvelope className="text-white" />
    <span>support@bookhaven.com</span>
  </div>
</div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
          <div className="flex justify-center md:justify-start space-x-5 text-2xl">
            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-sky-400 transition">
              <FaTwitter />
            </a>
            <a href="mailto:support@bookhaven.com" className="hover:text-green-400 transition">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {currentYear} Book Haven — All rights reserved.
      </div>
    </footer>
  );
}
