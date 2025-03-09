import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-gray-600 text-sm">
              We are dedicated to providing high-quality products and
              exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li>123 Main Street</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@example.com</li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Secure Payment Methods</p>
          <div className="grid grid-cols-6 gap-4">
            <img src="/visa.png" alt="Visa" className="h-8 object-contain" />
            <img
              src="/mastercard.png"
              alt="Mastercard"
              className="h-8 object-contain"
            />
            <img
              src="/amex.png"
              alt="American Express"
              className="h-8 object-contain"
            />
            <img
              src="/paypal.png"
              alt="PayPal"
              className="h-8 object-contain"
            />
            <img
              src="/discover.png"
              alt="Discover"
              className="h-8 object-contain"
            />
            <img
              src="/applepay.png"
              alt="Apple Pay"
              className="h-8 object-contain"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
