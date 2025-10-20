import Link from "next/link";
import Image from "next/image";
import Footer_logo from "/public/logo.jpg";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 pb-2 py-1">
              <Image src={Footer_logo} alt="Amana Tours & Travels" width={140} height={40} />
            </Link>
            {/* <h3 className="text-xl font-bold mb-4">Amana Tours & Travel</h3> */}
            <p className="text-primary-100">Your trusted partner for discovering amazing tours and planning unforgettable adventures.</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-primary-100 hover:text-white transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-primary-100 hover:text-white transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-primary-100">
              <li>Amana Saleha Garden, 90 Sagorpara</li>
              <li>Boalia, Rajshahi, Bangladesh</li>
              <li>Phone: +880 1324-418968</li>
              <li>Email: amanatoursandtravels2023@gmail.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Subscribe</h4>
            <p className="text-primary-100 mb-2">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="px-4 py-2 w-full rounded-l-md focus:outline-none text-text" />
              <button type="submit" className="bg-secondary hover:bg-secondary-700 px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-6 pt-6 text-center text-primary-200">
          <p>&copy; {new Date().getFullYear()} Amana Tours & Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}