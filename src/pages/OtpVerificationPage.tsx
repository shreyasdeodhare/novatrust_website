import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { verifyOtp, sendOtp } from '../services/authService';

const OtpVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Get email from location state
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      // Redirect to signup if no email is provided
      navigate('/signup');
    }
  }, [location, navigate]);
  
  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);
  
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Check if pasted data is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      
      // Focus the last input
      const lastInput = document.getElementById('otp-5');
      if (lastInput) lastInput.focus();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const { success, error } = await verifyOtp({ email, otp: otpString });
      
      if (success) {
        setSuccessMessage('OTP verified successfully! Redirecting to login...');
        
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login', {
            state: {
              message: 'Account created successfully! Please login with your credentials.'
            }
          });
        }, 2000);
      } else {
        setError(typeof error === 'string' && error ? error : 'Invalid OTP. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during verification');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleResendOtp = async () => {
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const { success, error } = await sendOtp(email);
      
      if (success) {
        setSuccessMessage('OTP has been resent to your email');
        setResendDisabled(true);
        setCountdown(60); // Disable resend for 60 seconds
      } else {
        setError(typeof error === 'string' && error ? error : 'Failed to resend OTP. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while resending OTP');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-secondary-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-3xl font-bold text-primary-600">NovaTrust</h1>
              <p className="text-sm text-gray-600 mt-1">Chit Fund Services</p>
            </Link>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
          </p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="otp-0" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <div 
                className="flex justify-between gap-2" 
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    autoComplete="off"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Enter the 6-digit code sent to your email
              </p>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              {resendDisabled ? (
                <span className="text-gray-400">
                  Resend in {countdown}s
                </span>
              ) : (
                <button
                  type="button"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                  onClick={handleResendOtp}
                  disabled={isSubmitting || resendDisabled}
                >
                  Resend
                </button>
              )}
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <Link
              to="/signup"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
