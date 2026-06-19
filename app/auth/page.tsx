import AuthForm from './_components/AuthForm';

export default function AuthPage() {
  return (
    <main className="flex-1 flex overflow-hidden">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Left Side (Image & Copy) */}
        <div className="hidden md:flex relative flex-col justify-end p-margin-page bg-surface-container-low">
          <div className="absolute inset-0 z-0">
            {/* Using img for raw mapping based on design. In production next/image should be considered. */}
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpSuVlbugO6UNTtdJs5WBW8xGXhvCrPlJVX-Tx7elreeHq_ymoYLW-EWox76RECr17OIavEVy069j-eKVkkpsGbK6uC6Mlmt6KqFUrHPwXekCpG2kCGggZrW5MifwbvFSDpGX7Sexk8G94HepCNNWbHEXMbqdpw1DlNFUmjr1hK08Ob-18FoHIWFPZNN6QswmXxnqwhufR97OnALxKpMVjQ06fUcfT4OxTtuyKPrmeFWMKRPpt8LtG4JTPu1NEPNC-de2FFv1cPeTD" 
              alt="Digital installation art"
              className="object-cover w-full h-full opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/40 to-transparent mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 max-w-md">
            <h1 className="font-display-lg text-display-lg text-on-primary mb-stack-md">
              생각을 정리하고,<br/>명확하게.
            </h1>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim">
              생각, 작업, 지식을 정리하기 위해 BrainSync를 디지털 두 번째 뇌로 사용하는 전 세계 전문가들과 함께하세요.
            </p>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="flex flex-col justify-center items-center p-gutter bg-surface overflow-y-auto">
          <AuthForm />
        </div>
      </div>
    </main>
  );
}
