import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotesPage from './page';

// Mock dependencies
vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user-id' } } }),
    },
  })),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue({
    getAll: vi.fn().mockReturnValue([]),
  }),
}));

vi.mock('@/src/infrastructure/repositories/SupabaseNoteRepository', () => ({
  SupabaseNoteRepository: vi.fn().mockImplementation(function() { return {}; }),
}));

const mockNotes = [
  { id: '1', title: 'Test Note 1', content: 'Content 1', updatedAt: new Date(), isFavorite: false },
  { id: '2', title: 'Test Note 2', content: 'Content 2', updatedAt: new Date(), isFavorite: true },
];

vi.mock('@/src/application/use-cases/FetchAllNotesUseCase', () => ({
  FetchAllNotesUseCase: vi.fn().mockImplementation(function() {
    return {
      execute: vi.fn().mockResolvedValue(mockNotes),
    };
  }),
}));

describe('Notes Management Page', () => {
  it('should render a list of notes', async () => {
    // Act
    // Since NotesPage is an async Server Component, we await its execution
    const jsx = await NotesPage();
    render(jsx);

    // Assert
    expect(screen.getByText('All Notes')).toBeInTheDocument();
    expect(screen.getByText('Test Note 1')).toBeInTheDocument();
    expect(screen.getByText('Test Note 2')).toBeInTheDocument();
  });

  it('should render an empty state if no notes exist', async () => {
    // Arrange
    const { FetchAllNotesUseCase } = await import('@/src/application/use-cases/FetchAllNotesUseCase');
    vi.mocked(FetchAllNotesUseCase).mockImplementationOnce(function() {
      return { execute: vi.fn().mockResolvedValue([]) } as any;
    });

    // Act
    const jsx = await NotesPage();
    render(jsx);

    // Assert
    expect(screen.getByText('No notes found. Create your first note!')).toBeInTheDocument();
  });
});
