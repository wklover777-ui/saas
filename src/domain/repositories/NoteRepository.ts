import { Note } from '../entities/Note';

export interface NoteRepository {
  getRecentNotes(userId: string, limit?: number): Promise<Note[]>;
  getAllNotes(userId: string): Promise<Note[]>;
  getNotesCount(userId: string): Promise<number>;
  getNoteById(id: string): Promise<Note | null>;
  createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note>;
  updateNote(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note>;
  deleteNote(id: string): Promise<void>;
}
