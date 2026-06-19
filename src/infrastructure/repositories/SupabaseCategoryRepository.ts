import { SupabaseClient } from '@supabase/supabase-js';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';

export class SupabaseCategoryRepository implements CategoryRepository {
  constructor(private supabase: SupabaseClient<any, "public", any>) {}

  async getActiveCategoriesCount(userId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return count || 0;
  }
}
