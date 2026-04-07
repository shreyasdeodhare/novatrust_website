import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { getCurrentUser, login, logout, signUp, LoginData, SignupData } from '../services/authService';

interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: any;
  login: (data: LoginData) => Promise<{ success: boolean; error?: any }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: any }>;
  logout: () => Promise<{ success: boolean; error?: any }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  logout: async () => ({ success: false }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    // Check for user on initial load
    const getUser = async () => {
      try {
        setLoading(true);
        const { success, user, error } = await getCurrentUser();
        
        if (success && user) {
          setUser(user as User);
        } else if (error) {
          setError(error);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { success, user, error } = await getCurrentUser();
          
          if (success && user) {
            setUser(user as User);
          } else if (error) {
            setError(error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (data: LoginData) => {
    try {
      setLoading(true);
      setError(null);
      
      const { success, user, error } = await login(data);
      
      if (success && user) {
        setUser(user as User);
        return { success: true };
      } else {
        setError(error);
        return { success: false, error };
      }
    } catch (error) {
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (data: SignupData) => {
    try {
      setLoading(true);
      setError(null);
      
      const { success, user, error } = await signUp(data);
      
      if (success && user) {
        setUser(user as User);
        return { success: true };
      } else {
        setError(error);
        return { success: false, error };
      }
    } catch (error) {
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { success, error } = await logout();
      
      if (success) {
        setUser(null);
        return { success: true };
      } else {
        setError(error);
        return { success: false, error };
      }
    } catch (error) {
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
