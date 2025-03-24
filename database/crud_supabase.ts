import  supabase from './supabase'; // Ensure this is the correct path to your Supabase client
import { User } from '@supabase/supabase-js'; // Importing User type for response

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

type AuthResponse = {
  success: boolean;
  error?: string;
  user?: User | null;
};

// Register a user 
export async function registerUser(userData: UserData): Promise<AuthResponse> {
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

//login a user
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (authError) {
        console.error("Error during login:", authError.message);
        return { success: false, error: authError.message };
      }
      return { success: true, user: authData?.user || null };
    } catch (error) {
      console.error("Unexpected error during login:", error);
      return { success: false, error: 'Unexpected error' };
    }
  }
  