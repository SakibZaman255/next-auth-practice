"use client";
import React, { useState } from 'react';
import { User, Lock, Mail, AlertCircle } from 'lucide-react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [submitError, setSubmitError] = useState('');

  // ... (keeping validation and handler functions the same)
  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!isLogin && !formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

interface FormData {
    name: string;
    email: string;
    password: string;
}

interface Errors {
    name?: string;
    email?: string;
    password?: string;
}

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
        ...prev,
        [name]: value
    }));
    if (errors[name as keyof Errors]) {
        setErrors((prev: Errors) => ({
            ...prev,
            [name]: ''
        }));
    }
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
        await new Promise<void>(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', formData);
        setFormData({ name: '', email: '', password: '' });
    } catch (error) {
        setSubmitError('An error occurred. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
};

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
    setSubmitError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 perspective-1000">
      <div className="relative w-full max-w-md">
        {/* Book Container */}
        <div className="relative h-[500px] [transform-style:preserve-3d]">
          {/* Login Page (Right Page) */}
          <div className={`
            absolute w-full p-8 bg-white rounded-lg shadow-2xl origin-left
            transition-all duration-1000 ease-in-out
            ${!isLogin ? '[transform:rotateY(-180deg)]' : '[transform:rotateY(0deg)]'}
            ${isLogin ? 'z-10' : 'z-0'}
            [backface-visibility:hidden]
          `}>
            <div className="h-full">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Login</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`
                      w-full p-3 border rounded-lg pl-12 transition-all duration-300
                      ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
                      focus:outline-none
                    `}
                    placeholder="Email"
                  />
                  <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  {errors.email && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`
                      w-full p-3 border rounded-lg pl-12 transition-all duration-300
                      ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
                      focus:outline-none
                    `}
                    placeholder="Password"
                  />
                  <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  {errors.password && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.password}
                    </div>
                  )}
                </div>
                {submitError && (
                  <div className="text-red-500 text-sm text-center">{submitError}</div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full p-3 bg-blue-600 text-white rounded-lg font-semibold
                    transform transition-all duration-300
                    hover:bg-blue-700 hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                    ${isSubmitting ? 'animate-pulse' : ''}
                  `}
                >
                  {isSubmitting ? 'Processing...' : 'Login'}
                </button>
              </form>
              <p className="mt-6 text-center text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={handleToggleForm}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          {/* Sign Up Page (Left Page) */}
          <div className={`
            absolute w-full p-8 bg-white rounded-lg shadow-2xl origin-left
            transition-all duration-1000 ease-in-out
            ${isLogin ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'}
            [backface-visibility:hidden]
          `}>
            <div className="h-full">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Sign Up</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`
                      w-full p-3 border rounded-lg pl-12 transition-all duration-300
                      ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
                      focus:outline-none
                    `}
                    placeholder="Full Name"
                  />
                  <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  {errors.name && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`
                      w-full p-3 border rounded-lg pl-12 transition-all duration-300
                      ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
                      focus:outline-none
                    `}
                    placeholder="Email"
                  />
                  <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  {errors.email && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`
                      w-full p-3 border rounded-lg pl-12 transition-all duration-300
                      ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
                      focus:outline-none
                    `}
                    placeholder="Password"
                  />
                  <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  {errors.password && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.password}
                    </div>
                  )}
                </div>
                {submitError && (
                  <div className="text-red-500 text-sm text-center">{submitError}</div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full p-3 bg-blue-600 text-white rounded-lg font-semibold
                    transform transition-all duration-300
                    hover:bg-blue-700 hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                    ${isSubmitting ? 'animate-pulse' : ''}
                  `}
                >
                  {isSubmitting ? 'Processing...' : 'Sign Up'}
                </button>
              </form>
              <p className="mt-6 text-center text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={handleToggleForm}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;