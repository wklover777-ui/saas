import Link from 'next/link';

export function GlobalFooter() {
  return (
    <footer className="w-full py-stack-lg bg-surface-container-highest dark:bg-inverse-surface border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-page max-w-container-max mx-auto gap-stack-md">
        <div className="flex items-center gap-2 text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
          Second Brain
        </div>
        <div className="flex gap-stack-lg">
          <Link className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</Link>
          <Link className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</Link>
          <Link className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Contact</Link>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface opacity-80">
          © 2024 Second Brain Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
