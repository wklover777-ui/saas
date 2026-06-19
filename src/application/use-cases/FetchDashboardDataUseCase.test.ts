import { describe, it, expect, vi } from 'vitest';
import { FetchDashboardDataUseCase } from './FetchDashboardDataUseCase';
import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { Note } from '../../domain/entities/Note';

describe('FetchDashboardDataUseCase', () => {
  it('should return dashboard data including total notes, categories count, and recent notes', async () => {
    // Arrange
    const mockNotes: Note[] = [
      { id: '1', userId: 'user1', title: 'Note 1', content: 'C1', isFavorite: false, categoryId: null, createdAt: new Date(), updatedAt: new Date() },
      { id: '2', userId: 'user1', title: 'Note 2', content: 'C2', isFavorite: true, categoryId: null, createdAt: new Date(), updatedAt: new Date() }
    ];

    const mockNoteRepo = {
      getNotesCount: vi.fn().mockResolvedValue(10),
      getRecentNotes: vi.fn().mockResolvedValue(mockNotes)
    } as unknown as NoteRepository;

    const mockCategoryRepo: CategoryRepository = {
      getActiveCategoriesCount: vi.fn().mockResolvedValue(5)
    };

    const useCase = new FetchDashboardDataUseCase(mockNoteRepo, mockCategoryRepo);

    // Act
    const result = await useCase.execute('user1');

    // Assert
    expect(mockNoteRepo.getNotesCount).toHaveBeenCalledWith('user1');
    expect(mockCategoryRepo.getActiveCategoriesCount).toHaveBeenCalledWith('user1');
    expect(mockNoteRepo.getRecentNotes).toHaveBeenCalledWith('user1', 6);
    
    expect(result).toEqual({
      totalNotes: 10,
      activeCategoriesCount: 5,
      recentNotes: mockNotes
    });
  });
});
