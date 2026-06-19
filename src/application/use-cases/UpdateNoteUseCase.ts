import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { Note } from '../../domain/entities/Note';

export class UpdateNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note> {
    return await this.noteRepository.updateNote(id, {
      ...updates,
      updatedAt: new Date()
    });
  }
}
