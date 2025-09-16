import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PlanMyTrip</h3>
            <p className="text-gray-300">
              Your trusted partner for discovering amazing tours and planning unforgettable adventures.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-300 hover:text-white">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-gray-300 hover:text-white">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>123 Travel Street</li>
              <li>Dhaka, Bangladesh</li>
              <li>Phone: +880 1234-567890</li>
              <li>Email: info@planmytrip.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Subscribe</h4>
            <p className="text-gray-300 mb-2">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-900"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PlanMyTrip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}