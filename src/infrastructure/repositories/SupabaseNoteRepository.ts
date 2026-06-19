import { SupabaseClient } from '@supabase/supabase-js';
import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { Note } from '../../domain/entities/Note';

export class SupabaseNoteRepository implements NoteRepository {
  constructor(private supabase: SupabaseClient<any, "public", any>) {}

  private mapToNote(row: any): Note {
    return {
      id: row.id,
      userId: row.user_id,
      title: row.title,
      content: row.content,
      isFavorite: row.is_favorite,
      categoryId: row.category_id,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }

  async getRecentNotes(userId: string, limit: number = 6): Promise<Note[]> {
    const { data, error } = await this.supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);
    return (data || []).map(this.mapToNote);
  }

  async getAllNotes(userId: string): Promise<Note[]> {
    const { data, error } = await this.supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []).map(this.mapToNote);
  }

  async getNotesCount(userId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('notes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return count || 0;
  }

  async getNoteById(id: string): Promise<Note | null> {
    const { data, error } = await this.supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data ? this.mapToNote(data) : null;
  }

  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const { data, error } = await this.supabase
      .from('notes')
      .insert({
        user_id: note.userId,
        title: note.title,
        content: note.content,
        is_favorite: note.isFavorite,
        category_id: note.categoryId
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToNote(data);
  }

  async updateNote(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note> {
    const dbUpdates: any = { updated_at: new Date().toISOString() };
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.content !== undefined) dbUpdates.content = updates.content;
    if (updates.isFavorite !== undefined) dbUpdates.is_favorite = updates.isFavorite;
    if (updates.categoryId !== undefined) dbUpdates.category_id = updates.categoryId;

    const { data, error } = await this.supabase
      .from('notes')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToNote(data);
  }

  async deleteNote(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}
