import { describe, it, expect, vi } from 'vitest';
import { UpdateNoteUseCase } from './UpdateNoteUseCase';
import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { Note } from '../../domain/entities/Note';

describe('UpdateNoteUseCase', () => {
  it('should update a note and set the updatedAt timestamp', async () => {
    const mockNote: Note = {
      id: '123', userId: 'user1', title: 'Updated Title', content: 'Updated content', isFavorite: false, categoryId: null, createdAt: new Date(), updatedAt: new Date()
    };
    
    const mockRepo = {
      updateNote: vi.fn().mockResolvedValue(mockNote)
    } as unknown as NoteRepository;

    const useCase = new UpdateNoteUseCase(mockRepo);
    const result = await useCase.execute('123', { title: 'Updated Title', content: 'Updated content' });

    expect(mockRepo.updateNote).toHaveBeenCalledWith('123', expect.objectContaining({
      title: 'Updated Title',
      content: 'Updated content',
      updatedAt: expect.any(Date)
    }));
    expect(result).toEqual(mockNote);
  });
});
