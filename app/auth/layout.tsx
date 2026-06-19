import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <nav className="w-full top-0 bg-surface shadow-sm relative z-50">
        <div className="flex justify-between items-center px-margin-page py-4 max-w-container-max mx-auto">
          <div className="text-headline-md font-headline-md font-bold text-primary">
            BrainSync
          </div>
          <div className="hidden md:flex gap-gutter items-center">
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Features</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Pricing</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">About</a>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
