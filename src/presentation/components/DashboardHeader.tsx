import React from 'react';
import { createClient } from '@/src/infrastructure/supabase/server';
import { logoutAction } from '@/app/auth/actions';
import { redirect } from 'next/navigation';

export async function DashboardHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md pt-stack-md">
      <div className="relative w-full md:max-w-md group">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">search</span>
        <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2 pl-10 pr-4 text-body-md font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm" placeholder="Search your second brain..." type="text"/>
      </div>
      <div className="flex items-center gap-stack-md">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors relative border border-transparent hover:border-outline-variant">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant shadow-sm hidden md:block">
            <img alt="User Profile" className="w-full h-full object-cover" src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.email}`}/>
          </div>
          <span className="text-body-sm font-body-sm text-on-surface-variant hidden md:inline-block max-w-[150px] truncate">{user.email}</span>
          <form action={logoutAction} className="ml-2">
            <button type="submit" className="text-label-md font-label-md text-error hover:text-error hover:bg-error-container/50 px-3 py-1.5 rounded-lg border border-error/30 transition-colors">
              Logout
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
