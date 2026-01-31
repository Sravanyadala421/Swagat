import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { UserType } from '../types';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLanding = location.pathname === '/';

  return (
    <nav className={`w-full z-50 transition-colors duration-300 ${isLanding && !isMenuOpen ? 'bg-transparent absolute top-0' : 'bg-brand-wine shadow-lg relative'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
             {/* Logo representation based on description */}
             <div className="flex items-center gap-3">
                <div className="h-10 w-10 border-2 border-brand-peach rounded-sm flex items-center justify-center relative overflow-hidden group">
                     <span className="text-brand-peach font-thin text-2xl relative z-10">S</span>
                     <div className="absolute inset-0 bg-brand-peach opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </div>
                <div className="flex flex-col">
                    <span className={`text-2xl font-light tracking-wide ${isLanding && !isMenuOpen ? 'text-white' : 'text-white'}`}>
                    Swagat<span className="font-semibold text-brand-peach">Nivas</span>
                    </span>
                </div>
             </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              {isAuthenticated ? (
                <>
                   {user?.type === UserType.ADMIN ? (
                       <Link to="/admin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                   ) : (
                       <Link to="/booking" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Book Room</Link>
                   )}
                   <div className="flex items-center ml-4 gap-2">
                      <span className="text-brand-peach text-sm">Welcome, {user?.name}</span>
                      <button onClick={handleLogout} className="bg-brand-peach text-brand-wine hover:bg-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2">
                        <LogOut size={16} /> Logout
                      </button>
                   </div>
                </>
              ) : (
                <Link to="/login" className="bg-brand-peach text-brand-wine hover:bg-white hover:scale-105 transform transition-all px-6 py-2 rounded-full text-sm font-bold shadow-md">
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-brand-wine focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} className={isLanding ? 'text-white' : 'text-gray-300'} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-brand-wine pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            {isAuthenticated ? (
               <>
                {user?.type === UserType.ADMIN ? (
                    <Link to="/admin" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                ) : (
                    <Link to="/booking" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Book Room</Link>
                )}
                 <button onClick={handleLogout} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Logout</button>
               </>
            ) : (
               <Link to="/login" className="text-brand-peach hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
