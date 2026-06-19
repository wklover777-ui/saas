'use client'

import { useState, useEffect } from 'react'
import { updateNoteAction } from '@/app/(app)/notes/actions'
import { Note } from '@/src/domain/entities/Note'

export function NoteEditor({ initialNote }: { initialNote: Note }) {
  const [title, setTitle] = useState(initialNote.title)
  const [content, setContent] = useState(initialNote.content || '')
  const [dfMode, setDfMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Use body class for distraction free mode
  useEffect(() => {
    if (dfMode) {
      document.body.classList.add('df-mode-active')
    } else {
      document.body.classList.remove('df-mode-active')
    }
    return () => document.body.classList.remove('df-mode-active')
  }, [dfMode])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateNoteAction(initialNote.id, { title, content })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex-1 flex h-screen overflow-hidden transition-all duration-300 w-full" id="main-content">
      <main className="flex-1 overflow-y-auto bg-surface relative flex flex-col items-center pb-32">
        {/* Top Utility Bar */}
        <div className="w-full max-w-container-max flex justify-between items-center px-8 py-4 sticky top-0 bg-surface/90 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4 text-on-surface-variant font-label-md text-label-md">
            <span className="flex items-center gap-1 text-outline">
              <span className="material-symbols-outlined text-[18px]">folder_open</span>
              {initialNote.categoryId ? '카테고리' : '미분류'}
            </span>
            <span className="text-outline-variant">•</span>
            <span className="text-outline">{isSaving ? '저장 중...' : '저장됨'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDfMode(!dfMode)}
              className={`p-2 rounded-lg transition-colors flex items-center justify-center tooltip-trigger ${dfMode ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`} 
              title="집중 모드"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: dfMode ? "'FILL' 1" : "'FILL' 0" }}>
                {dfMode ? 'fullscreen_exit' : 'fullscreen'}
              </span>
            </button>
            <button className="px-4 py-2 text-secondary border border-secondary rounded-lg font-label-md text-label-md hover:bg-secondary/5 transition-colors active:scale-98 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">share</span>
              공유
            </button>
            <button onClick={handleSave} className="px-5 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary-container transition-colors active:scale-98 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              저장
            </button>
          </div>
        </div>

        {/* Editor Core Constraints */}
        <article className="w-full max-w-[840px] px-8 flex flex-col mt-stack-lg">
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="ghost-input font-display-lg text-display-lg text-on-surface bg-transparent border-none outline-none placeholder:text-outline-variant w-full mb-stack-md" 
            placeholder="제목 없는 노트" 
            type="text" 
          />

          {/* Floating Formatting Toolbar */}
          <div className="sticky top-[72px] z-20 flex self-start bg-surface-container-lowest border border-outline-variant rounded-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] p-1 gap-1 mb-stack-lg">
            <button className="p-2 rounded-full text-on-surface hover:bg-surface-variant hover:text-primary transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
            <button className="p-2 rounded-full text-on-surface hover:bg-surface-variant hover:text-primary transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
            <button className="p-2 rounded-full text-on-surface hover:bg-surface-variant hover:text-primary transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">format_underlined</span></button>
            <div className="w-px h-6 bg-outline-variant mx-1 self-center"></div>
            <button className="p-2 rounded-full text-on-surface hover:bg-surface-variant hover:text-primary transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">format_h1</span></button>
            <button className="p-2 rounded-full text-on-surface hover:bg-surface-variant hover:text-primary transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">format_h2</span></button>
            <div className="w-px h-6 bg-outline-variant mx-1 self-center"></div>
            <button className="p-2 rounded-full text-on-surface hover:bg-surface-variant hover:text-primary transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">format_list_bulleted</span></button>
            <button className="p-2 rounded-full text-on-surface hover:bg-surface-variant hover:text-primary transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">format_quote</span></button>
          </div>

          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="ghost-input font-body-lg text-body-lg text-on-surface leading-relaxed min-h-[500px] w-full bg-transparent border-none outline-none resize-none" 
            placeholder="내용을 입력하세요..."
          />
        </article>
      </main>

      {/* Right Metadata Sidebar */}
      <aside className="w-[300px] border-l border-outline-variant bg-surface-container-lowest h-full overflow-y-auto shrink-0 sidebar-transition flex flex-col" id="right-sidebar">
        <div className="p-6 border-b border-outline-variant flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
          <h3 className="font-headline-md text-[18px] font-semibold text-on-surface">노트 상세 정보</h3>
        </div>
        <div className="p-6 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">상태</label>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="font-body-sm text-body-sm text-on-surface">작성 중</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">카테고리</label>
            <div className="relative mt-1">
              <select className="w-full appearance-none bg-surface border border-outline-variant rounded-lg py-2 pl-3 pr-10 font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow cursor-pointer">
                <option>리서치</option>
                <option>회의</option>
                <option>개인 아이디어</option>
                <option>일기</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline pointer-events-none text-[20px]">expand_more</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-6 border-t border-outline-variant">
            <div className="flex justify-between items-center font-body-sm text-[13px]">
              <span className="text-outline text-body-sm">작성일</span>
              <span className="text-on-surface font-medium">{new Date(initialNote.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center font-body-sm text-[13px]">
              <span className="text-outline text-body-sm">최근 수정일</span>
              <span className="text-on-surface font-medium">{new Date(initialNote.updatedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center font-body-sm text-[13px]">
              <span className="text-outline text-body-sm">단어 수</span>
              <span className="text-on-surface font-medium">{content.split(/\s+/).filter(Boolean).length} 단어</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
