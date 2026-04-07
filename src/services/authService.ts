import { supabase } from './supabaseClient';

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface OtpVerificationData {
  email: string;
  otp: string;
}

// Sign up a new user
export const signUp = async (data: SignupData) => {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;

    // 2. Store additional user data in the users table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: data.email,
            full_name: data.fullName,
            phone: data.phone,
            created_at: new Date(),
          },
        ]);

      if (profileError) throw profileError;
    }

    return { success: true, user: authData.user };
  } catch (error) {
    console.error('Error signing up:', error);
    return { success: false, error };
  }
};

// Login a user
export const login = async (data: LoginData) => {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;

    return { success: true, user: authData.user, session: authData.session };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error };
  }
};

// Send OTP to user's email
export const sendOtp = async (email: string) => {
  try {
    // In a real implementation, you would:
    // 1. Generate a random OTP
    // 2. Store it in your database with an expiration time
    // 3. Send it to the user's email

    // For demo purposes, we'll simulate sending an OTP
    // In a real app, you would use Supabase's email service or a third-party service
    
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in localStorage (for demo only - in production use secure storage)
    localStorage.setItem(`otp_${email}`, otp);
    
    console.log(`OTP for ${email}: ${otp}`);
    
    // Simulate API call to send email
    return { success: true, message: 'OTP sent to email' };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error };
  }
};

// Verify OTP
export const verifyOtp = async (data: OtpVerificationData) => {
  try {
    // In a real implementation, you would verify against your database
    
    // For demo purposes, we'll check against localStorage
    const storedOtp = localStorage.getItem(`otp_${data.email}`);
    
    if (storedOtp === data.otp) {
      // OTP is valid, clear it from storage
      localStorage.removeItem(`otp_${data.email}`);
      return { success: true, message: 'OTP verified successfully' };
    } else {
      return { success: false, error: 'Invalid OTP' };
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, error };
  }
};

// Logout a user
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false, error };
  }
};

// Get the current logged in user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    
    if (data.user) {
      // Get additional user data from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (userError) throw userError;
      
      return { success: true, user: { ...data.user, ...userData } };
    }
    
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { success: false, error };
  }
};

// Reset password
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { success: false, error };
  }
};
