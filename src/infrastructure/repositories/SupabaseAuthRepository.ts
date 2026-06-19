import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { User } from '../../domain/entities/User';
import { createClient } from '../supabase/server';

export class SupabaseAuthRepository implements AuthRepository {
  async loginWithEmail(email: string, password: string): Promise<User> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      throw new Error(error?.message || 'Failed to login');
    }

    return {
      id: data.user.id,
      email: data.user.email!,
    };
  }

  async signUpWithEmail(email: string, password: string): Promise<User> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      throw new Error(error?.message || 'Failed to sign up');
    }

    return {
      id: data.user.id,
      email: data.user.email!,
    };
  }
}
