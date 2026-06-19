import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { SupabaseNoteRepository } from '@/src/infrastructure/repositories/SupabaseNoteRepository'
import { SupabaseCategoryRepository } from '@/src/infrastructure/repositories/SupabaseCategoryRepository'
import { FetchDashboardDataUseCase } from '@/src/application/use-cases/FetchDashboardDataUseCase'
import { DashboardHeader } from '@/src/presentation/components/DashboardHeader'
import { NoteCard } from '@/src/presentation/components/NoteCard'
import { SupabaseUserRepository } from '@/src/infrastructure/external/SupabaseUserRepository'
import { SubscriptionManager } from '@/src/presentation/components/SubscriptionManager'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const noteRepo = new SupabaseNoteRepository(supabase)
  const categoryRepo = new SupabaseCategoryRepository(supabase)
  const userRepo = new SupabaseUserRepository(supabase)
  
  const useCase = new FetchDashboardDataUseCase(noteRepo, categoryRepo)

  const [data, userInfo] = await Promise.all([
    useCase.execute(user.id),
    userRepo.getUser(user.id)
  ])

  return (
    <div className="max-w-container-max mx-auto w-full px-margin-page pb-stack-lg flex flex-col gap-stack-lg min-h-screen">

      <section className="mt-stack-sm">
        <h2 className="text-display-lg font-display-lg text-on-surface tracking-tight mb-stack-sm">개요</h2>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          한눈에 보는 나의 작업 공간. 총 {data.totalNotes}개의 노트가 보관되어 있습니다.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-stack-md shadow-sm hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-all flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-stack-lg">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>library_books</span>
            </div>
          </div>
          <div>
            <p className="text-headline-md font-headline-md text-on-surface mb-1">{data.totalNotes.toLocaleString()}</p>
            <p className="text-body-sm font-body-sm text-on-surface-variant">전체 노트 수</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-stack-md shadow-sm hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-all flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-stack-lg">
            <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_offer</span>
            </div>
          </div>
          <div>
            <p className="text-headline-md font-headline-md text-on-surface mb-1">{data.activeCategoriesCount.toLocaleString()}</p>
            <p className="text-body-sm font-body-sm text-on-surface-variant">활성 카테고리</p>
          </div>
        </div>

        <div className="bg-surface-container-highest border border-outline-variant rounded-2xl p-stack-md shadow-sm relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at top right, #dfe0ff, transparent 70%)" }}></div>
          <div className="relative z-10 mb-stack-md flex items-center justify-between">
            <h3 className="text-body-md font-body-md font-bold text-on-surface">빠른 이동</h3>
            <span className="material-symbols-outlined text-outline">tune</span>
          </div>
          <div className="relative z-10 flex flex-wrap gap-stack-sm mt-auto">
            <button className="bg-surface-container-lowest border border-outline-variant text-on-surface-variant px-3 py-1.5 rounded-lg text-label-md font-label-md hover:bg-primary-fixed hover:text-on-primary-fixed hover:border-primary-fixed-dim transition-colors flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[14px]">work</span> 업무
            </button>
            <button className="bg-surface-container-lowest border border-outline-variant text-on-surface-variant px-3 py-1.5 rounded-lg text-label-md font-label-md hover:bg-secondary-container hover:text-on-secondary-container hover:border-secondary-fixed-dim transition-colors flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[14px]">person</span> 개인
            </button>
            <button className="bg-surface-container-lowest border border-outline-variant text-on-surface-variant px-3 py-1.5 rounded-lg text-label-md font-label-md hover:bg-tertiary-fixed hover:text-on-tertiary-fixed hover:border-tertiary-fixed-dim transition-colors flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[14px]">lightbulb</span> 아이디어
            </button>
          </div>
        </div>
      </section>

      {userInfo && (
        <section>
          <SubscriptionManager 
            userName={userInfo.name || userInfo.email.split('@')[0]}
            plan={userInfo.plan || 'free'} 
            hasBillingKey={!!userInfo.billingKey}
            nextBillingDate={userInfo.nextBillingDate ? userInfo.nextBillingDate.toISOString() : undefined}
          />
        </section>
      )}

      <section className="flex flex-col gap-stack-md pb-stack-lg">
        <div className="flex justify-between items-end border-b border-outline-variant pb-stack-sm">
          <h3 className="text-headline-md font-headline-md text-on-surface">최근 노트</h3>
          <button className="text-primary hover:text-primary-container font-label-md text-label-md flex items-center gap-1 transition-colors">
            타임라인 보기 <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mt-stack-sm">
          {data.recentNotes.length === 0 ? (
            <div className="col-span-full text-center py-10 text-on-surface-variant">작성된 노트가 없습니다. 첫 번째 노트를 작성해 보세요!</div>
          ) : (
            data.recentNotes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content || ''}
                updatedAt={note.updatedAt}
                isFavorite={note.isFavorite || false}
              />
            ))
          )}
        </div>
      </section>
    </div>
  )
}
