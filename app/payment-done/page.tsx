'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GlobalHeader } from '@/src/presentation/components/GlobalHeader'
import { GlobalFooter } from '@/src/presentation/components/GlobalFooter'

export default function PaymentDonePage() {
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    setDateStr(new Date().toLocaleDateString('en-US', options));

    // Simple confetti effect
    const colors = ['#142175', '#006a63', '#79f7ea', '#dfe0ff']; // Primary, Secondary, Secondary Container, Primary Fixed
    const container = document.getElementById('confetti-container');
    if (container) {
      container.innerHTML = '';
      const numConfetti = 50;

      for (let i = 0; i < numConfetti; i++) {
          const confetti = document.createElement('div');
          confetti.classList.add('confetti-piece');
          
          const color = colors[Math.floor(Math.random() * colors.length)];
          const left = Math.random() * 100 + 'vw';
          const fallDuration = Math.random() * 3 + 2 + 's';
          const fallDelay = Math.random() * 5 + 's';
          const swayDuration = Math.random() * 2 + 1 + 's';

          confetti.style.setProperty('--confetti-color', color);
          confetti.style.left = left;
          confetti.style.setProperty('--fall-duration', fallDuration);
          confetti.style.setProperty('--fall-delay', fallDelay);
          confetti.style.setProperty('--sway-duration', swayDuration);

          container.appendChild(confetti);
      }
    }
  }, [])

  return (
    <>
      <GlobalHeader />
      <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden relative">
        <style dangerouslySetInnerHTML={{__html: `
          .confetti-piece {
              position: absolute;
              width: 10px;
              height: 20px;
              background: var(--confetti-color);
              top: -20px;
              opacity: 0;
              animation: fall var(--fall-duration) linear infinite,
                        sway var(--sway-duration) ease-in-out infinite alternate;
              animation-delay: var(--fall-delay);
          }

          @keyframes fall {
              0% { top: -20px; opacity: 1; transform: rotate(0deg); }
              100% { top: 100vh; opacity: 0; transform: rotate(720deg); }
          }

          @keyframes sway {
              0% { margin-left: -20px; }
              100% { margin-left: 20px; }
          }
        `}} />
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" id="confetti-container"></div>
        <main className="flex-grow flex items-center justify-center p-margin-page relative z-10 mt-12 mb-24">
          <div className="max-w-[600px] w-full bg-surface-container-lowest rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] border border-outline-variant p-margin-page flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-primary-fixed rounded-full flex items-center justify-center mb-stack-lg shadow-[0_0_20px_rgba(223,224,255,0.6)]">
              <span className="material-symbols-outlined text-display-lg text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">Payment Successful!</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">Thank you for upgrading. Your Second Brain workspace is now supercharged.</p>

            <div className="w-full bg-surface-container-low rounded-lg p-stack-md border border-outline-variant mb-stack-lg text-left">
              <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-stack-md border-b border-outline-variant pb-stack-sm">Order Summary</h2>
              <div className="flex justify-between items-center mb-stack-sm">
                <span className="font-body-md text-body-md text-on-surface">Plan</span>
                <span className="font-body-md text-body-md text-on-surface font-semibold">Pro Annual</span>
              </div>
              <div className="flex justify-between items-center mb-stack-sm">
                <span className="font-body-md text-body-md text-on-surface">Date</span>
                <span className="font-body-md text-body-md text-on-surface">{dateStr}</span>
              </div>
              <div className="flex justify-between items-center mb-stack-md">
                <span className="font-body-md text-body-md text-on-surface">Order Number</span>
                <span className="font-body-sm text-body-sm text-outline font-mono">#BS-{Math.floor(Math.random() * 9000) + 1000}-XT</span>
              </div>
              <div className="flex justify-between items-center border-t border-outline-variant pt-stack-sm mt-stack-sm">
                <span className="font-headline-md text-headline-md text-on-surface">Total Paid</span>
                <span className="font-headline-md text-headline-md text-primary">$144.00</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-stack-md w-full justify-center">
              <Link href="/dashboard" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:scale-[0.98] transition-transform duration-200 shadow-sm">
                Go to Dashboard
              </Link>
              <button onClick={() => window.print()} className="inline-flex items-center justify-center px-6 py-3 border border-secondary text-secondary font-label-md text-label-md rounded-lg hover:bg-secondary-container hover:text-on-secondary-container transition-colors duration-200">
                <span className="material-symbols-outlined mr-2 text-body-md">print</span>
                Print Receipt
              </button>
            </div>
          </div>
        </main>
      </div>
      <GlobalFooter />
    </>
  )
}
