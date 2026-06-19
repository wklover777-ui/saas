import { Category } from '../entities/Category';

export interface CategoryRepository {
  getActiveCategoriesCount(userId: string): Promise<number>;
}
