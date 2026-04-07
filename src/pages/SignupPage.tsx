import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';
import { sendOtp } from '../services/authService';

const SignupPage: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Signup form, 2: OTP verification
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    otp?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const validateSignupForm = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtpForm = () => {
    const newErrors: { otp?: string } = {};

    if (!otp) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSignupForm()) return;

    setIsSubmitting(true);

    try {
      // Send OTP to user's email
      const { success, error } = await sendOtp(email);

      if (success) {
        setStep(2); // Move to OTP verification step
      } else {
        setErrors({ general: (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') ? (error as any).message : 'Failed to send OTP. Please try again.' });
      }
    } catch (error: any) {
      setErrors({ general: (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') ? (error as any).message : 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateOtpForm()) return;

    setIsSubmitting(true);

    try {
      // In a real app, you would verify the OTP and then create the user account
      // For this demo, we'll simulate a successful verification

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if OTP matches (for demo purposes, any 6-digit OTP is valid)
      if (/^\d{6}$/.test(otp)) {
        // Redirect to login page after successful signup
        navigate('/login', {
          state: {
            message: 'Account created successfully! Please login with your credentials.'
          }
        });
      } else {
        setErrors({ otp: 'Invalid OTP. Please try again.' });
      }
    } catch (error: any) {
      setErrors({ general: error.message || 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOtp = async () => {
    setIsSubmitting(true);

    try {
      const { success, error } = await sendOtp(email);

      if (success) {
        setErrors({ general: 'OTP has been resent to your email.' });
      } else {
        setErrors({ general: (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') ? (error as any).message : 'Failed to resend OTP. Please try again.' });
      }
    } catch (error: any) {
      setErrors({ general: error.message || 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-secondary-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">NovaTrust</h1>
            <p className="text-sm text-gray-600 mt-1">Chit Fund Services</p>
          </div>

          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>

              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSignupSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      className={`input pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      className={`input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      className={`input pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className={`input pl-10 ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-gray-400" />
                      ) : (
                        <FiEye className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="form-error">{errors.password}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`input pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="text-gray-400" />
                      ) : (
                        <FiEye className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
                </div>

                <div className="form-group">
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <a href="#" className="text-primary-600 hover:text-primary-700">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a 6-digit verification code to {email}
              </p>

              {errors.general && (
                <div className={`px-4 py-3 rounded-md mb-6 ${
                  errors.general.includes('resent')
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleOtpSubmit}>
                <div className="form-group">
                  <label htmlFor="otp" className="form-label">
                    Verification Code
                  </label>
                  <input
                    id="otp"
                    type="text"
                    className={`input text-center text-xl tracking-widest ${errors.otp ? 'border-red-500' : ''}`}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                  {errors.otp && <p className="form-error">{errors.otp}</p>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Verifying...' : 'Verify'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                    onClick={resendOtp}
                    disabled={isSubmitting}
                  >
                    Resend
                  </button>
                </p>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                >
                  ← Back to signup
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
