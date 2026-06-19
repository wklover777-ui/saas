import { Sidebar } from '@/src/presentation/components/Sidebar'
import { DashboardHeader } from '@/src/presentation/components/DashboardHeader'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface flex min-h-screen">
      <Sidebar />
      <main className="ml-sidebar-width flex-1 w-full flex flex-col">
        <div className="px-margin-page">
          <DashboardHeader />
        </div>
        {children}
      </main>
    </div>
  )
}
