import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star, Shield, Heart, Facebook, Instagram, Twitter, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/1920/1080?grayscale"
            alt="Parul University Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-wine bg-opacity-80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight leading-tight mb-6">
              Welcome to <span className="font-bold text-brand-peach">Swagat Nivas</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light italic border-l-4 border-brand-peach pl-6">
              "At Swagat Niwas, every guest isn’t just a visitor—they’re family."
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-brand-peach text-brand-wine px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Book Your Stay <ChevronRight size={20} />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-wine transition-all">
                  View Amenities
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-brand-wine mb-4">Why Choose Swagat Nivas?</h2>
                <div className="w-24 h-1 bg-brand-peach mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
                <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-brand-wine hover:-translate-y-2 transition-transform">
                    <div className="w-14 h-14 bg-brand-wine rounded-full flex items-center justify-center mb-6">
                        <Shield className="text-brand-peach" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Safe & Secure</h3>
                    <p className="text-gray-600">Located within the Parul University campus with 24/7 security and surveillance for your peace of mind.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-brand-peach hover:-translate-y-2 transition-transform">
                    <div className="w-14 h-14 bg-brand-peach rounded-full flex items-center justify-center mb-6">
                        <Heart className="text-brand-wine" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Parul Hospitality</h3>
                    <p className="text-gray-600">Experience the warmth of our dedicated staff ensuring your stay is comfortable and memorable.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-brand-wine hover:-translate-y-2 transition-transform">
                    <div className="w-14 h-14 bg-brand-wine rounded-full flex items-center justify-center mb-6">
                        <Star className="text-brand-peach" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Comfort</h3>
                    <p className="text-gray-600">Modern amenities including high-speed Wi-Fi, AC, and premium bedding in every room.</p>
                </div>
            </div>
        </div>
      </div>

      <footer className="bg-brand-wine text-white pt-16 pb-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid md:grid-cols-4 gap-8 mb-12">
                 <div className="col-span-1 md:col-span-2">
                     <h4 className="text-3xl font-light mb-4">Swagat<span className="font-bold text-brand-peach">Nivas</span></h4>
                     <p className="text-gray-300 max-w-sm mb-6">
                       Your home away from home within the heart of Parul University. Offering comfortable stays for faculty, parents, and guests.
                     </p>
                     <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-peach hover:text-brand-wine transition-all">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-peach hover:text-brand-wine transition-all">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-peach hover:text-brand-wine transition-all">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-peach hover:text-brand-wine transition-all">
                            <Linkedin size={20} />
                        </a>
                     </div>
                 </div>
                 
                 <div>
                     <h5 className="font-bold text-lg mb-4 text-brand-peach">Quick Links</h5>
                     <ul className="space-y-2 text-gray-300">
                         <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                         <li><a href="#" className="hover:text-white transition-colors">Room Types</a></li>
                         <li><a href="#" className="hover:text-white transition-colors">Amenities</a></li>
                         <li><a href="#" className="hover:text-white transition-colors">Campus Map</a></li>
                     </ul>
                 </div>

                 <div>
                     <h5 className="font-bold text-lg mb-4 text-brand-peach">Contact Us</h5>
                     <ul className="space-y-4 text-gray-300">
                         <li className="flex items-start gap-3">
                             <MapPin size={20} className="text-brand-peach shrink-0" />
                             <span>Parul University Campus,<br/>Vadodara, Gujarat 391760</span>
                         </li>
                         <li className="flex items-center gap-3">
                             <Phone size={20} className="text-brand-peach shrink-0" />
                             <span>+91 123 456 7890</span>
                         </li>
                         <li className="flex items-center gap-3">
                             <Mail size={20} className="text-brand-peach shrink-0" />
                             <span>guest.house@paruluniversity.ac.in</span>
                         </li>
                     </ul>
                 </div>
             </div>

             <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                 <p>&copy; 2023 Parul University. All rights reserved.</p>
                 <div className="flex gap-6 mt-4 md:mt-0">
                     <a href="#" className="hover:text-brand-peach transition-colors">Privacy Policy</a>
                     <a href="#" className="hover:text-brand-peach transition-colors">Terms of Service</a>
                     <a href="#" className="hover:text-brand-peach transition-colors">Cookie Policy</a>
                 </div>
             </div>
             
             {/* Tags/Keywords hidden for SEO mock */}
             <div className="mt-8 text-xs text-gray-600 flex flex-wrap gap-2 justify-center opacity-30">
                 <span>#SwagatNivas</span>
                 <span>#ParulUniversity</span>
                 <span>#GuestHouse</span>
                 <span>#VadodaraStay</span>
                 <span>#UniversityAccommodation</span>
                 <span>#CampusLife</span>
             </div>
          </div>
      </footer>
    </div>
  );
};