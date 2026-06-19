import { describe, it, expect, vi } from 'vitest';
import { FetchAllNotesUseCase } from './FetchAllNotesUseCase';
import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { Note } from '../../domain/entities/Note';

describe('FetchAllNotesUseCase', () => {
  it('should fetch all notes from the repository', async () => {
    // Arrange
    const mockNotes: Note[] = [
      { id: '1', title: 'Note 1', content: 'Content 1', isFavorite: false, categoryId: null, userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
      { id: '2', title: 'Note 2', content: 'Content 2', isFavorite: true, categoryId: null, userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
    ];
    
    const mockNoteRepository: NoteRepository = {
      getRecentNotes: vi.fn(),
      getNotesCount: vi.fn(),
      getNoteById: vi.fn(),
      createNote: vi.fn(),
      updateNote: vi.fn(),
      deleteNote: vi.fn(),
      getAllNotes: vi.fn().mockResolvedValue(mockNotes),
    };

    const useCase = new FetchAllNotesUseCase(mockNoteRepository);

    // Act
    const result = await useCase.execute('user1');

    // Assert
    expect(mockNoteRepository.getAllNotes).toHaveBeenCalledWith('user1');
    expect(result).toEqual(mockNotes);
  });
});
