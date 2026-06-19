import Link from 'next/link';
import { GlobalHeader } from '@/src/presentation/components/GlobalHeader';
import { GlobalFooter } from '@/src/presentation/components/GlobalFooter';

export default function LandingPage() {
  return (
    <>
      <GlobalHeader />
      
      <main className="flex-grow flex flex-col">
        <section className="relative pt-24 pb-32 px-margin-page overflow-hidden flex flex-col items-center text-center max-w-container-max mx-auto w-full">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-fixed-dim/40 via-surface to-background"></div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary border border-secondary/20 font-label-md text-label-md mb-stack-lg">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            Introducing Smart Tags 2.0
          </span>
          <h1 className="font-display-lg text-display-lg text-on-surface max-w-4xl mb-stack-md tracking-tight">
            Sync Your Thoughts,<br/> <span className="text-primary">Simplify Your Life.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-stack-lg">
            The minimalist, high-performance digital workspace designed for professionals. Capture ideas, organize instantly, and access your second brain from anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-stack-md justify-center items-center">
            <Link href="/auth" className="bg-primary text-on-primary hover:scale-[0.95] transition-transform duration-200 px-8 py-4 rounded-xl shadow-[0_4px_14px_0_rgba(20,33,117,0.39)] font-label-md text-label-md flex items-center gap-2">
              Start Free Trial
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <button className="bg-surface text-on-surface-variant border border-outline-variant hover:bg-surface-variant transition-colors px-8 py-4 rounded-xl font-label-md text-label-md flex items-center gap-2">
              <span className="material-symbols-outlined">play_circle</span>
              Watch Demo
            </button>
          </div>
          <div className="mt-24 w-full max-w-5xl rounded-xl shadow-2xl border border-surface-container-highest overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-surface/50 to-transparent z-10 pointer-events-none"></div>
            {/* Using img to match design precisely without configuring remote patterns for Next/Image yet */}
            <img 
              className="w-full h-auto object-cover rounded-t-xl" 
              alt="Dashboard Mockup" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkaM28btmOgr-59EVBZl2mByA9bhAHwiuWJ8J20rsw8vAYEOBMMo63-gNams_cAbYzohzdtNlgnGPYwp6UOhAYuPET-YL7cFBtPgaUtGvkJS5df9URAPIv2awszNHkCD-1JbBnE8LvHqFS7culZ6Y0gYqfuxVmrY9B3jIihfEWQJBpj7xhGE0mo-QtTtE7Bz8YGip4Hi5ZBYrM1asn_khbh8qxZeuT8rn6h6d_-7eUu1nfGctumlcpdRuDMyalVwf5ghedFYb2qAuN"
            />
          </div>
        </section>
        
        <section className="py-24 px-margin-page bg-surface-container-lowest w-full" id="features">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">Engineered for Focus</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Everything you need to build your personal knowledge base, without the visual clutter.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="bg-surface p-8 rounded-xl border border-surface-container-high hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center mb-stack-lg text-on-primary-fixed group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>sync</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">Instant Sync</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Your notes flow seamlessly across all your devices in real-time. Start on your phone, finish on your desktop without missing a beat.</p>
              </div>
              <div className="bg-surface p-8 rounded-xl border border-surface-container-high hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center mb-stack-lg text-on-secondary-fixed group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>edit_document</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">Rich Text Editor</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">A distraction-free canvas supporting markdown, code blocks, embedded media, and fluid typography that feels like writing on air.</p>
              </div>
              <div className="bg-surface p-8 rounded-xl border border-surface-container-high hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center mb-stack-lg text-on-primary-container group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">Secure Cloud Storage</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Enterprise-grade encryption ensures your private thoughts remain strictly yours. Backed by reliable, redundant global servers.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-margin-page bg-surface-container-low relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-secondary-container/20 blur-[100px] -z-10 rounded-full"></div>
          <div className="max-w-container-max mx-auto">
            <h2 className="font-headline-lg text-headline-lg text-center text-on-surface mb-16">Trusted by Professionals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              <div className="glass-panel p-8 rounded-xl shadow-sm">
                <div className="flex gap-1 mb-4 text-tertiary-container">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface mb-stack-lg italic">"BrainSync entirely replaced my messy system of physical notebooks and scattered docs. The tactile feel of the UI makes organizing actually enjoyable."</p>
                <div className="flex items-center gap-4">
                  <img className="w-12 h-12 rounded-full object-cover border border-outline-variant" alt="Elena Rostova" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg3cS1c-Cgfy1O57WhZIuZkEbI7FHhGThhuD-qYsozvXT5FBl41VmArT2PSGfNGVUJpiN1lfGuf2DKDLdqbxOx1bXtCE2J3yER1l2WCUT4eM27XUYsKGPaEqEqavblCEoBVukJKVxfHNTyNSaSU1rrhxaWQbWS1_VXLUkw8UkvhuyLKzMnNPf16FClwJfJLFT81s7VBfNBNTjzpnFNaY-nD_12rlAyIsiG4NzBD2ej4gsf2vryT4bO0OYJ9VOct2BIhlnes7CHqmDA"/>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Elena Rostova</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Product Manager</p>
                  </div>
                </div>
              </div>
              <div className="glass-panel p-8 rounded-xl shadow-sm">
                <div className="flex gap-1 mb-4 text-tertiary-container">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface mb-stack-lg italic">"The speed of the instant sync is unmatched. I draft ideas on my commute and they are instantly ready on my desktop when I arrive at the studio."</p>
                <div className="flex items-center gap-4">
                  <img className="w-12 h-12 rounded-full object-cover border border-outline-variant" alt="Marcus Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8vg4p50d1kh7cX6WlXdmXjU2Nu11GNhAall7_p2RaC-lbom723BAjKLnVPfMumOmNE5J7W98cVeGtO5FNi40mqGmIEfyjANH-7sHNLYq1znT0BgqbkhSsY5oAbj8LDzissAUPXQLj5Czu7siYsg29PlTQT3c3LMpXVEh1n2eLhZszV-EQgDxaBAMIpMgtf5WEhujDC4OFP96jFZ1zRf5GyJTb2lGhCM3d-3sKeBH7yEL78hQ7zTkaBX4ZDeTsOr5nvFpXmHl-Umol"/>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Marcus Chen</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Lead Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <GlobalFooter />
    </>
  );
}
