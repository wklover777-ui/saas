import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { Note } from '../../domain/entities/Note';

export class FetchAllNotesUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute(userId: string): Promise<Note[]> {
    return await this.noteRepository.getAllNotes(userId);
  }
}
