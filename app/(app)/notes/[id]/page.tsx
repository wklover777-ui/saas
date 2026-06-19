import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { SupabaseNoteRepository } from '@/src/infrastructure/repositories/SupabaseNoteRepository'
import { NoteEditor } from '@/src/presentation/components/NoteEditor'

export default async function NotePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
  if (!user) return null

  const noteRepo = new SupabaseNoteRepository(supabase)
  
  try {
    const note = await noteRepo.getNoteById(params.id)
    if (!note || note.userId !== user.id) {
      return notFound()
    }
    
    return <NoteEditor initialNote={note} />
  } catch (error) {
    return notFound()
  }
}
