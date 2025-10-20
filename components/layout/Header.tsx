'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/features/auth/authSlice';
import { useLogoutMutation } from '@/store/features/auth/authApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '/public/Amana Tour & Travels Logo.png'; // ✅ use your logo image

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      router.push('/');
    }
  };

    const getInitial = (name?: string) => {
    if (!name) return 'U';
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logo} alt="Amana Tours & Travels" width={140} height={40} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-800 hover:text-[#0B2149] font-medium">
              Home
            </Link>
            <Link href="/main/tours" className="text-gray-800 hover:text-[#0B2149] font-medium">
              Tours
            </Link>
            <Link href="/main/hajj" className="text-gray-800 hover:text-[#0B2149] font-medium">
              Hajj
            </Link>
            <Link href="/main/umrah" className="text-gray-800 hover:text-[#0B2149] font-medium">
              Umrah
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-[#0B2149] font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-[#0B2149] font-medium">
              Contact
            </Link>
          </nav>

          {/* User / Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {/* <img
                    src={user?.avatar || '/default-avatar.png'}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-[#F49C23] object-cover"
                  /> */}
                    <div className="w-8 h-8 rounded-full bg-[#F49C23] flex items-center justify-center text-white font-semibold">
                    {getInitial(user?.name)}
                  </div>
                  <span className="text-gray-800 font-medium">{user?.name || 'User'}</span>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 border border-gray-100">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" /> Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" /> Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-[#F49C23] hover:bg-[#E38A1E] text-white px-5 py-2 rounded-md font-medium transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 mt-2 pb-4 shadow-sm">
            <nav className="flex flex-col space-y-3 px-4">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-[#0B2149]">
                Home
              </Link>
              <Link href="/main/tours" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-[#0B2149]">
                Tours
              </Link>
              <Link href="/main/hajj" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-[#0B2149]">
                Hajj
              </Link>
              <Link href="/main/umrah" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-[#0B2149]">
                Umrah
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-[#0B2149]">
                About
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-[#0B2149]">
                Contact
              </Link>

              <div className="pt-3 border-t border-gray-100">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <img
                        src={'/default-avatar.png'}
                        alt="User"
                        className="w-8 h-8 rounded-full border border-[#F49C23]"
                      />
                      <span className="text-gray-800 font-medium">{user?.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center mt-2 text-gray-800 hover:text-red-600"
                    >
                      <LogOut className="h-5 w-5 mr-1" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-[#F49C23] hover:bg-[#E38A1E] text-white px-4 py-2 rounded-md text-center mt-2"
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
