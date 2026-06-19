'use client';

import { useState } from 'react';
import { loginAction, signUpAction } from '../actions';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const action = isLogin ? loginAction : signUpAction;
    
    const result = await action(formData);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Authentication failed');
    }
    
    setIsLoading(false);
  };

  const activeTabClass = 'bg-surface shadow-sm text-primary';
  const inactiveTabClass = 'text-on-surface-variant hover:text-primary bg-transparent shadow-none';

  return (
    <div className="w-full max-w-[400px]">
      <div className="flex bg-surface-container-low p-1 rounded-xl mb-stack-lg">
        <button 
          className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all ${isLogin ? activeTabClass : inactiveTabClass}`}
          onClick={() => { setIsLogin(true); setError(null); }}
        >
          로그인
        </button>
        <button 
          className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all ${!isLogin ? activeTabClass : inactiveTabClass}`}
          onClick={() => { setIsLogin(false); setError(null); }}
        >
          회원가입
        </button>
      </div>

      <div className="text-center mb-stack-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">
          {isLogin ? '환영합니다' : '계정 만들기'}
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {isLogin ? '계정 정보를 입력해 로그인해 주세요.' : '나만의 두 번째 뇌, 지금 바로 시작하세요.'}
        </p>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-3 rounded-lg mb-stack-md font-body-sm text-body-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-stack-md mb-stack-lg">
        <button className="w-full flex items-center justify-center gap-2 bg-surface border border-outline-variant rounded-lg py-3 px-4 custom-shadow-hover transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          <span className="font-label-md text-label-md text-on-surface">Google 계정으로 계속하기</span>
        </button>
      </div>

      <div className="flex items-center gap-4 mb-stack-lg">
        <div className="flex-1 h-px bg-outline-variant"></div>
        <span className="font-label-md text-label-md text-on-surface-variant">또는</span>
        <div className="flex-1 h-px bg-outline-variant"></div>
      </div>

      <form className="flex flex-col gap-stack-md" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-stack-sm">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="email">이메일</label>
          <input 
            name="email"
            className="bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface outline-none focus:border-primary input-focus-glow transition-all" 
            id="email" 
            placeholder="name@company.com" 
            required 
            type="email"
          />
        </div>
        
        <div className="flex flex-col gap-stack-sm">
          <div className="flex justify-between items-center">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="password">비밀번호</label>
            {isLogin && <a className="font-label-md text-label-md text-secondary hover:text-secondary-fixed-dim transition-colors" href="#">비밀번호 찾기</a>}
          </div>
          <input 
            name="password"
            className="bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface outline-none focus:border-primary input-focus-glow transition-all" 
            id="password" 
            placeholder="••••••••" 
            required 
            type="password"
          />
        </div>

        <button 
          disabled={isLoading}
          className="mt-stack-sm w-full bg-primary text-on-primary rounded-lg py-3 px-4 font-label-md text-label-md flex justify-center items-center hover:scale-[0.98] transition-transform duration-200 shadow-sm disabled:opacity-50" 
          type="submit"
        >
          {isLoading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
        </button>
      </form>

      <p className="mt-stack-lg text-center font-body-sm text-body-sm text-on-surface-variant">
        계속 진행하시면 당사의 <a className="text-primary hover:underline" href="#">이용약관</a> 및 <a className="text-primary hover:underline" href="#">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
      </p>
    </div>
  );
}
