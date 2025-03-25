import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from './supabase';
import { AuthError, Session, User } from '@supabase/supabase-js';


type AuthResponse = {
  success: boolean;
  error?: string;
  user?: User | null;
};

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (userData: UserData) => Promise<AuthResponse>;
  getUserInfo : () => Promise<{ success: boolean; data?: { first_name: string; last_name: string }; error?: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Refresh the session
  const refreshSession = async () => {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error fetching session:', error.message);
      setSession(null);
    } else {
      setSession(session);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Get the initial session
    refreshSession();

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Error during login:", error.message);
      setLoading(false);
      return {success: false, error: error.message};
    }
    setSession(data.session);
    setLoading(false);
    return {success: true};
  };

  const register = async (userData: UserData): Promise<AuthResponse> => {
    try {
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) {
        console.error("Error during sign-up:", authError.message);
        return { success: false, error: authError.message };
      }

      const { error: dbError } = await supabase
        .from('users') 
        .insert([
          {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            password: userData.password, 
          },
        ]);
      
        //should probably delete auth users when a failure happens with the db.
      if (dbError) {
        console.error("Error adding user to the database:", dbError.message);
        return { success: false, error: dbError.message };
      }


      return { success: true, user: authData?.user || null };
    } catch (error) {
      console.error("Unexpected error during registration:", error);
      return { success: false, error: 'Unexpected error' };
    }
  }

  const getUserInfo = async (): Promise<{ success: boolean; data?: { first_name: string; last_name: string }; error?: string }> => {
    try {
      const email = session?.user.email;
      const uid = session?.user.id;

      console.log(uid);
      if (!email) {
        return { success: false, error: 'No email found in session' };
      }

      const { data, error } = await supabase
        .from('users') 
        .select('first_name, last_name') 
        .eq('email', email)
        .single(); 
  
      if (error) {
        console.error('Error fetching user info:', error.message);
        return { success: false, error: error.message };
      }
  
      if (!data) {
        return { success: false, error: 'User not found' };
      }
  
      return { success: true, data: { first_name: data.first_name, last_name: data.last_name } };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { success: false, error: 'Unexpected error' };
    }
  };

  return (
    <AuthContext.Provider value={{ session, loading, refreshSession, login, register, getUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};