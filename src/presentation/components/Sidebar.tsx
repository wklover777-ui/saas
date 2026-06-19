import Link from 'next/link';
import { createNewNote } from '@/app/(app)/notes/actions';

export function Sidebar() {
  return (
    <nav className="w-sidebar-width h-screen fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col p-stack-md z-20 sidebar-transition" id="left-sidebar">
      <div className="mb-stack-lg px-stack-sm flex items-center gap-stack-sm">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_sync</span>
        </div>
        <div>
          <h1 className="text-headline-md font-headline-md font-bold text-primary">Second Brain</h1>
          <p className="text-label-md font-label-md text-on-surface-variant">Personal Workspace</p>
        </div>
      </div>

      <form action={createNewNote}>
        <button type="submit" className="w-full bg-primary text-on-primary py-stack-sm rounded-xl font-label-md text-label-md mb-stack-lg hover:scale-[0.98] transition-transform duration-200 shadow-[0_4px_6px_-1px_rgba(20,33,117,0.1)] flex items-center justify-center gap-stack-sm">
          <span className="material-symbols-outlined">add</span>
          새 노트 작성
        </button>
      </form>

      <ul className="flex-1 flex flex-col gap-unit">
        <li>
          <Link href="/notes" className="bg-primary-fixed text-on-primary-fixed font-bold rounded-xl flex items-center gap-stack-md px-stack-md py-stack-sm scale-95 transition-all shadow-sm">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
            <span className="font-label-md text-label-md">모든 노트</span>
          </Link>
        </li>
        <li>
          <a href="#" className="text-on-surface-variant hover:bg-surface-variant rounded-xl flex items-center gap-stack-md px-stack-md py-stack-sm transition-colors group">
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">star</span>
            <span className="font-label-md text-label-md">즐겨찾기</span>
          </a>
        </li>
        <li>
          <a href="#" className="text-on-surface-variant hover:bg-surface-variant rounded-xl flex items-center gap-stack-md px-stack-md py-stack-sm transition-colors group">
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">folder</span>
            <span className="font-label-md text-label-md">카테고리</span>
          </a>
        </li>
        <li>
          <a href="#" className="text-on-surface-variant hover:bg-surface-variant rounded-xl flex items-center gap-stack-md px-stack-md py-stack-sm transition-colors group">
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">archive</span>
            <span className="font-label-md text-label-md">보관함</span>
          </a>
        </li>
      </ul>

      <ul className="flex flex-col gap-unit pt-stack-md border-t border-outline-variant mt-auto">
        <li>
          <Link href="/payment" className="bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim rounded-xl flex items-center gap-stack-md px-stack-md py-stack-sm transition-colors group shadow-sm mb-2">
            <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            <span className="font-label-md text-label-md font-bold">Pro로 업그레이드</span>
          </Link>
        </li>
        <li>
          <a href="#" className="text-on-surface-variant hover:bg-surface-variant rounded-xl flex items-center gap-stack-md px-stack-md py-stack-sm transition-colors group">
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">settings</span>
            <span className="font-label-md text-label-md">설정</span>
          </a>
        </li>
        <li>
          <a href="#" className="text-on-surface-variant hover:bg-surface-variant rounded-xl flex items-center gap-stack-md px-stack-md py-stack-sm transition-colors group">
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">help</span>
            <span className="font-label-md text-label-md">고객 지원</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
