import Link from 'next/link';

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  updatedAt: Date | string;
  isFavorite: boolean;
}

export function NoteCard({ id, title, content, updatedAt, isFavorite }: NoteCardProps) {
  return (
    <Link href={`/notes/${id}`} className="block group">
      <article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] hover:-translate-y-[2px] transition-all cursor-pointer relative overflow-hidden flex flex-col h-64">
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${isFavorite ? 'bg-secondary' : 'bg-primary'} scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300`}></div>
        <div className="flex justify-between items-start mb-stack-sm">
          <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
            {new Date(updatedAt).toLocaleDateString()}
          </span>
          {isFavorite ? (
            <span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
          ) : (
            <button className="text-outline-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          )}
        </div>
        <h4 className="text-headline-md font-headline-md text-on-surface mb-stack-sm line-clamp-2 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-body-sm font-body-sm text-on-surface-variant line-clamp-3 mb-stack-md flex-1">
          {content || 'Empty note'}
        </p>
      </article>
    </Link>
  );
}
