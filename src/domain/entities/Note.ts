export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string | null;
  isFavorite: boolean;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
