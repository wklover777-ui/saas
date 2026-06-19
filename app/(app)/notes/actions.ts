'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SupabaseNoteRepository } from '@/src/infrastructure/repositories/SupabaseNoteRepository'
import { CreateNoteUseCase } from '@/src/application/use-cases/CreateNoteUseCase'
import { UpdateNoteUseCase } from '@/src/application/use-cases/UpdateNoteUseCase'

export async function createNewNote() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const noteRepo = new SupabaseNoteRepository(supabase)
  const createNoteUseCase = new CreateNoteUseCase(noteRepo)

  try {
    const note = await createNoteUseCase.execute(user.id, 'Untitled Note', '')
    redirect(`/notes/${note.id}`)
  } catch (error: any) {
    if (error.message?.includes('violates row-level security policy')) {
      // 결제(Pro 권한)가 되지 않아 발생한 RLS 에러 처리
      redirect('/payment?error=upgrade_required')
    }
    throw error
  }
}

export async function updateNoteAction(id: string, updates: any) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const noteRepo = new SupabaseNoteRepository(supabase)
  const updateNoteUseCase = new UpdateNoteUseCase(noteRepo)

  await updateNoteUseCase.execute(id, updates)
}
