'use server';

import { SupabaseAuthRepository } from '@/src/infrastructure/repositories/SupabaseAuthRepository';
import { LoginWithEmailUseCase } from '@/src/application/use-cases/LoginWithEmailUseCase';
import { SignUpWithEmailUseCase } from '@/src/application/use-cases/SignUpWithEmailUseCase';
import { revalidatePath } from 'next/cache';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const authRepo = new SupabaseAuthRepository();
    const useCase = new LoginWithEmailUseCase(authRepo);
    await useCase.execute(email, password);
    
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function signUpAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const authRepo = new SupabaseAuthRepository();
    const useCase = new SignUpWithEmailUseCase(authRepo);
    await useCase.execute(email, password);
    
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logoutAction() {
  const { createClient } = await import('@/src/infrastructure/supabase/server');
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
}
