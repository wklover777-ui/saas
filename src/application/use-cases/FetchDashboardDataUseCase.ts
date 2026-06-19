import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { Note } from '../../domain/entities/Note';

export interface DashboardData {
  totalNotes: number;
  activeCategoriesCount: number;
  recentNotes: Note[];
}

export class FetchDashboardDataUseCase {
  constructor(
    private noteRepository: NoteRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute(userId: string): Promise<DashboardData> {
    const [totalNotes, activeCategoriesCount, recentNotes] = await Promise.all([
      this.noteRepository.getNotesCount(userId),
      this.categoryRepository.getActiveCategoriesCount(userId),
      this.noteRepository.getRecentNotes(userId, 6)
    ]);

    return {
      totalNotes,
      activeCategoriesCount,
      recentNotes
    };
  }
}
