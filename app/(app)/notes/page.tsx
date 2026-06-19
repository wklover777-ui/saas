import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SupabaseNoteRepository } from '@/src/infrastructure/repositories/SupabaseNoteRepository';
import { FetchAllNotesUseCase } from '@/src/application/use-cases/FetchAllNotesUseCase';
import { NoteCard } from '@/src/presentation/components/NoteCard';

export default async function NotesPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const noteRepo = new SupabaseNoteRepository(supabase);
  const useCase = new FetchAllNotesUseCase(noteRepo);

  const notes = await useCase.execute(user.id);

  return (
    <div className="max-w-container-max mx-auto w-full px-margin-page pb-stack-lg flex flex-col gap-stack-lg min-h-screen pt-stack-md">
      <section className="flex flex-col gap-stack-md">
        <div className="flex justify-between items-end border-b border-outline-variant pb-stack-sm">
          <h1 className="text-display-md font-display-md text-on-surface">All Notes</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mt-stack-sm">
          {notes.length === 0 ? (
            <div className="col-span-full text-center py-10 text-on-surface-variant">No notes found. Create your first note!</div>
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content || ''}
                updatedAt={note.updatedAt}
                isFavorite={note.isFavorite || false}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
