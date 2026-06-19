import Link from 'next/link';

export function GlobalHeader() {
  return (
    <nav className="w-full top-0 bg-surface dark:bg-surface-dim shadow-sm sticky z-50">
      <div className="flex justify-between items-center px-margin-page py-4 max-w-container-max mx-auto">
        <Link className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed flex items-center gap-2 transition-transform hover:scale-95" href="/">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
          Second Brain
        </Link>
        <div className="hidden md:flex items-center gap-gutter">
          <Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-body-md text-body-md" href="/#features">주요 기능</Link>
          <Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-body-md text-body-md" href="/#pricing">요금제</Link>
          <Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-body-md text-body-md" href="/#about">소개</Link>
        </div>
        <div className="flex items-center gap-stack-md">
          <Link href="/auth" className="hidden sm:block text-primary dark:text-primary-fixed hover:bg-surface-variant px-4 py-2 rounded-xl transition-colors font-label-md text-label-md">
            로그인
          </Link>
          <Link href="/auth" className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-6 py-2 rounded-xl hover:scale-[0.98] transition-transform duration-200 shadow-sm font-label-md text-label-md">
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
}
