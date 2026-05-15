import { supabase } from "../lib/supabase";
import type { LoginRequest, RegisterRequest } from "../types/auth";

export async function login({ email, password }: LoginRequest) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);

    if (error.message.includes("Invalid login credentials")) {
      throw { message: "Incorrect email or password." };
    }

    if (error.message.includes("Email not confirmed")) {
      throw { message: "Please verify your email before logging in." };
    }

    if (error.message.includes("Too many requests")) {
      throw { message: "Too many attempts. Please wait a moment." };
    }

    throw { message: "Unable to log in." };
  }

  return {
    token: data.session!.access_token,
    user: {
      id: data.user!.id,
      name: data.user!.user_metadata?.name ?? "",
      email: data.user!.email!,
    },
  };
}

export async function register({
  name,
  email,
  password,
}: RegisterRequest) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    console.error("Register error:", error);

    if (
      error.message.includes("already registered") ||
      error.message.includes("already been registered")
    ) {
      throw {
        status: 409,
        message: "An account with this email already exists.",
      };
    }

    if (error.message.includes("Password should be")) {
      throw {
        message: "Password must be at least 6 characters.",
      };
    }

    throw { message: "Unable to create account." };
  }

  if (data.session) {
    return {
      token: data.session.access_token,
      user: {
        id: data.user!.id,
        name: data.user!.user_metadata?.name ?? name,
        email: data.user!.email!,
      },
    };
  }

  throw {
    confirmed: false,
    message:
      "Account created! Check your email to confirm your account before logging in.",
  };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    throw { message: "Unable to log out." };
  }
}

// ── Profile ──────────────────────────────────────────

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, username, avatar_url, updated_at")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Get profile error:", error);
    throw { message: "Unable to load profile." };
  }

  return data;
}

export async function updateProfile(
  userId: string,
  updates: {
    full_name?: string;
    username?: string;
  }
) {
  const { error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    console.error("Update profile error:", error);
    throw { message: "Unable to update profile." };
  }
}

// ── Password ─────────────────────────────────────────

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("Update password error:", error);
    throw { message: "Unable to update password." };
  }
}

// ── Avatar ───────────────────────────────────────────

export async function uploadAvatar(userId: string, file: File) {
  const ext = file.name.split(".").pop();
  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true });

  if (uploadError) {
    console.error("Avatar upload error:", uploadError);
    throw { message: "Unable to upload avatar." };
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(path);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      avatar_url: data.publicUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (updateError) {
    console.error("Avatar update error:", updateError);
    throw { message: "Unable to update avatar." };
  }

  return data.publicUrl;
}