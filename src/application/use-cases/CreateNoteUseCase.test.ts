import { describe, it, expect, vi } from 'vitest';
import { CreateNoteUseCase } from './CreateNoteUseCase';
import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { Note } from '../../domain/entities/Note';

describe('CreateNoteUseCase', () => {
  it('should create a new note with a title and content', async () => {
    const mockNote: Note = {
      id: '123', userId: 'user1', title: 'New Idea', content: 'Some content', isFavorite: false, categoryId: null, createdAt: new Date(), updatedAt: new Date()
    };
    
    const mockRepo = {
      createNote: vi.fn().mockResolvedValue(mockNote)
    } as unknown as NoteRepository;

    const useCase = new CreateNoteUseCase(mockRepo);
    const result = await useCase.execute('user1', 'New Idea', 'Some content');

    expect(mockRepo.createNote).toHaveBeenCalledWith({
      userId: 'user1',
      title: 'New Idea',
      content: 'Some content',
      isFavorite: false,
      categoryId: null
    });
    expect(result).toEqual(mockNote);
  });

  it('should default title to "Untitled Note" if empty', async () => {
    const mockRepo = {
      createNote: vi.fn().mockResolvedValue({ id: '123' })
    } as unknown as NoteRepository;

    const useCase = new CreateNoteUseCase(mockRepo);
    await useCase.execute('user1', '   ', null);

    expect(mockRepo.createNote).toHaveBeenCalledWith(expect.objectContaining({ title: 'Untitled Note' }));
  });
});
