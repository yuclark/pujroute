import { supabase } from "../lib/supabase";
import type { LoginRequest, RegisterRequest } from "../types/auth";

export async function login({ email, password }: LoginRequest) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Map Supabase error messages to user-friendly ones
    if (error.message.includes("Invalid login credentials")) {
      throw { message: "Incorrect email or password." };
    }
    if (error.message.includes("Email not confirmed")) {
      throw { message: "Please verify your email before logging in." };
    }
    if (error.message.includes("Too many requests")) {
      throw { message: "Too many attempts. Please wait a moment." };
    }
    throw { message: error.message };
  }

  return {
    token: data.session!.access_token,
    user: {
      id:    data.user!.id,
      name:  data.user!.user_metadata?.name ?? "",
      email: data.user!.email!,
    },
  };
}

export async function register({ name, email, password }: RegisterRequest) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }, // stores name in user_metadata
    },
  });

  if (error) {
    if (error.message.includes("already registered") || error.message.includes("already been registered")) {
      throw { status: 409, message: "An account with this email already exists." };
    }
    if (error.message.includes("Password should be")) {
      throw { message: "Password must be at least 6 characters." };
    }
    throw { message: error.message };
  }

  // Supabase sends a confirmation email by default
  // data.user exists but session may be null until email is confirmed
  if (data.session) {
    return {
      token: data.session.access_token,
      user: {
        id:    data.user!.id,
        name:  data.user!.user_metadata?.name ?? name,
        email: data.user!.email!,
      },
    };
  }

  // Email confirmation required — signal the page to show a message
  throw {
    confirmed: false,
    message: "Account created! Check your email to confirm your account before logging in.",
  };
}

export async function logout() {
  await supabase.auth.signOut();
}
