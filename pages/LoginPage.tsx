import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, User, CheckCircle2, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isParulMember, setIsParulMember] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleMemberSelection = (isMember: boolean) => {
    setIsParulMember(isMember);
    setStep(2);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isParulMember && !email.endsWith('@paruluniversity.ac.in')) {
         throw new Error("Parul University members must use an official email ID.");
      }
      await login(email, name, isParulMember || false);
      navigate('/booking');
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4 py-12 pt-24">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-brand-wine p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-brand-peach text-sm mt-1">Please authenticate to continue</p>
        </div>

        <div className="p-8">
          {step === 1 ? (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-center text-gray-700">Are you a member of Parul University?</h3>
              
              <button 
                onClick={() => handleMemberSelection(true)}
                className="w-full group relative flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-brand-wine hover:bg-brand-wine hover:bg-opacity-5 transition-all"
              >
                <div className="bg-brand-wine bg-opacity-10 p-3 rounded-full mr-4 group-hover:bg-brand-wine group-hover:text-white transition-colors text-brand-wine">
                    <Building2 size={24} />
                </div>
                <div className="text-left">
                    <span className="block font-bold text-gray-900">Yes, I am from PU</span>
                    <span className="text-xs text-gray-500">Faculty, Staff, or Student</span>
                </div>
                <CheckCircle2 className="absolute right-4 text-brand-wine opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button 
                onClick={() => handleMemberSelection(false)}
                className="w-full group relative flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-brand-peach hover:bg-brand-peach hover:bg-opacity-5 transition-all"
              >
                <div className="bg-brand-peach bg-opacity-20 p-3 rounded-full mr-4 group-hover:bg-brand-peach group-hover:text-white transition-colors text-brand-peach">
                    <User size={24} className="text-brand-wine" />
                </div>
                <div className="text-left">
                    <span className="block font-bold text-gray-900">No, I am a Guest</span>
                    <span className="text-xs text-gray-500">Visitor, Parent, or Other</span>
                </div>
                <CheckCircle2 className="absolute right-4 text-brand-peach opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <button 
                type="button" 
                onClick={() => { setStep(1); setError(''); }}
                className="text-xs text-gray-500 hover:text-brand-wine mb-2 flex items-center"
              >
                &larr; Change Selection
              </button>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                 <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-peach focus:border-transparent outline-none transition-shadow"
                    placeholder="Enter your full name"
                 />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isParulMember ? 'University Email ID' : 'Email Address'}
                 </label>
                 <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-shadow ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-brand-peach focus:border-transparent'}`}
                    placeholder={isParulMember ? 'example@paruluniversity.ac.in' : 'you@example.com'}
                 />
                 {isParulMember && (
                    <p className="text-xs text-gray-500 mt-1">Must end with @paruluniversity.ac.in</p>
                 )}
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand-wine text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating...' : 'Continue to Booking'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
