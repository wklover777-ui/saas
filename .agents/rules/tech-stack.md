---
trigger: always_on
---

<!-- BEGIN:tech-stack-rules -->
# Tech Stack & Implementation Rules

이 프로젝트에서 사용하는 주요 기술 스택과 그에 따른 준수해야 할 구현 규칙입니다.
AI와 팀원 모두 기술 스택을 활용할 때 아래의 규칙을 준수해야 합니다.

## 1. Core Tech Stack
* **Framework**: Next.js (App Router 기반)
* **Backend as a Service (BaaS) / DB**: Supabase (PostgreSQL 기반)
* **Language**: TypeScript

---

## 2. Supabase 연동 및 구현 규칙 (Supabase Rules)

### 2.1. 최신 SSR 패키지 사용 (`@supabase/ssr`)
* Next.js App Router 환경에서는 과거의 `@supabase/auth-helpers-nextjs` 패키지는 사용하지 않습니다. 
* 쿠키 기반의 인증 및 서버 컴포넌트 호환성을 위해 반드시 최신의 **`@supabase/ssr`** 패키지를 사용하여 Supabase 클라이언트(Browser, Server, Middleware 용)를 생성해야 합니다.

### 2.2. 완벽한 타입 안정성 (Type-Safety) 유지
* Supabase CLI를 이용해 데이터베이스 스키마로부터 TypeScript 타입(`types/supabase.ts` 등)을 자동 생성하여 유지해야 합니다.
* Supabase 클라이언트를 생성할 때 반드시 이 타입을 제네릭으로 주입(`createClient<Database>(...)`)하여, 쿼리 작성 시 오타를 방지하고 자동완성을 지원받아야 합니다.

### 2.3. 클린 아키텍처 준수 (Infrastructure 계층 격리)
* UI 컴포넌트(`page.tsx` 등) 내부에서 직접 `supabase.from('table').select()`와 같은 쿼리를 작성하는 것을 **엄격히 금지**합니다.
* Supabase 데이터 페칭 로직은 클린 아키텍처 규칙에 따라 **Infrastructure 계층의 Repository 구현체** 내부에만 위치해야 합니다. (예: `src/infrastructure/repositories/SupabaseUserRepository.ts`)

### 2.4. 보안 및 인증 (Middleware & RLS)
* **Middleware를 통한 라우트 보호**: 사용자의 로그인 여부나 권한 체크를 통한 리다이렉트 처리는 개별 페이지 컴포넌트가 아닌 Next.js의 `middleware.ts`에서 Supabase 세션 검증을 통해 중앙 집중식으로 처리합니다.
* **Row Level Security (RLS)**: 데이터베이스의 모든 테이블은 RLS 정책을 활성화해야 합니다. 서버 런타임에서 데이터를 가져올 때도 서비스 키(Service Role Key)의 남용을 피하고, 가급적 사용자 세션이 담긴 클라이언트를 사용하여 권한 없는 데이터 접근을 차단해야 합니다.

### 2.5 마이그레이션 (Migrations)
- supabase/migrations 폴더에 위치
- 마이그레이션을 수정하거나 삭제하거나 새로 생성할 때는 항상 사용자의 허가 받기.

---

## 3. 언어 및 타입스크립트 규칙 (TypeScript Rules)
* **Any 지양**: `any` 타입의 사용을 극도로 지양합니다. 응답 데이터의 형태를 모를 경우 `unknown`을 사용하고, 타입 가드(Type Guard)나 Zod 등의 라이브러리를 통해 런타임 검증을 거칩니다.
* **도메인 모델 맵핑**: Supabase DB 타입(DTO 개념)과 애플리케이션의 핵심 Domain Entity 타입이 일치하지 않을 수 있습니다. Infrastructure 계층에서 DB 데이터를 가져온 후, 이를 순수한 Domain Entity로 변환(Mapping)하여 Application 계층으로 전달해야 합니다.
<!-- END:tech-stack-rules -->
