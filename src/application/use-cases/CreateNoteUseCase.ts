import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { Note } from '../../domain/entities/Note';

export class CreateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(userId: string, title: string, content: string | null = null, categoryId: string | null = null): Promise<Note> {
    if (!title.trim()) {
      title = 'Untitled Note';
    }
    
    return await this.noteRepository.createNote({
      userId,
      title,
      content,
      isFavorite: false,
      categoryId
    });
  }
}
