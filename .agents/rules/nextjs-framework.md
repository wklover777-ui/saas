---
trigger: always_on
---

<!-- BEGIN:nextjs-framework-rules -->
# Next.js Framework Rules

이 프로젝트에서 Next.js(App Router) 기반 개발을 할 때 반드시 지켜야 할 코드 작성 및 설계 컨벤션입니다.
AI(Antigravity)와 팀원 모두가 코드를 작성할 때 이 규칙을 최우선으로 고려해야 합니다.

## 1. 기본 원칙 (General Principles)
* **알아보기 쉽고 간결한 코드 작성하기**: 복잡한 로직은 피하고, 가독성을 최우선으로 합니다. 변수 및 함수명은 그 역할을 명확히 드러내도록 작성합니다.
* **파일 분할 원칙**: 하나의 파일(코드베이스)이 너무 커지면(예: 200~300줄 이상) 관심사에 따라 여러 파일로 작게 나눕니다. 컴포넌트는 단일 책임 원칙을 따르도록 분리합니다.

## 2. 컴포넌트 렌더링 전략 (Rendering Strategy)
* **Server Component 선호하기**: Next.js App Router의 기본값인 서버 컴포넌트(Server Component)를 기본으로 사용합니다. 번들 사이즈를 줄이고, 초기 로딩 속도를 향상시킬 수 있습니다.
* **Client Component는 최소화 및 하위 배치 (Push 'use client' down)**: 상호작용(onClick, onChange 등)이나 브라우저 API(window, localStorage 등), 상태(useState, useEffect)가 반드시 필요한 경우에만 최상단에 `'use client'`를 선언하여 사용합니다. 클라이언트 컴포넌트는 컴포넌트 트리의 최대한 말단(Leaf Node)에 배치하여 클라이언트 번들에 포함되는 코드량을 최소화합니다.

## 3. 데이터 패칭 및 상태 관리 (Data Fetching & State)
* **서버에서 데이터 패칭하기**: 데이터는 가능한 서버 컴포넌트 계층에서 비동기(`async/await`)로 직접 패칭합니다. 클라이언트에서의 불필요한 네트워크 요청을 줄입니다.
* **URL 상태(Search Params) 적극 활용**: 필터, 정렬, 탭 전환, 페이지네이션 같은 UI 상태는 `useState` 대신 URL의 `searchParams`를 활용합니다. 이는 공유 가능한 URL을 만들고 SSR과 더 잘 동작하게 합니다.
* **데이터 변경은 Server Actions 활용**: 단순한 폼 제출이나 데이터 변경(Mutation)에는 API 라우트(`app/api/...`)를 새로 만들기보다 **Server Actions**를 우선적으로 사용합니다. (외부 클라이언트가 접근해야 하는 웹훅이나 Public API의 경우에만 API Route 사용)

## 4. 성능 및 UX 최적화 (Performance & UX)
* **정적 렌더링(Static Rendering) 극대화**: 변경이 잦지 않은 페이지는 빌드 타임에 정적으로 생성되도록 유지합니다. 동적 함수(`cookies()`, `headers()`) 사용 시 주의합니다.
* **Suspense를 이용한 부분 렌더링 (Streaming)**: 데이터를 불러오는데 시간이 걸리는 부분적인 UI 컴포넌트는 `React.Suspense`로 감싸서(`fallback` UI 제공), 페이지의 나머지 부분이 먼저 렌더링(Streaming)될 수 있도록 처리합니다.
* **Next.js 내장 최적화 컴포넌트 사용**: 이미지, 링크, 스크립트 등은 반드시 Next.js가 제공하는 `<Image>`, `<Link>`, `<Script>` 컴포넌트를 사용하여 프레임워크 수준의 최적화 이점을 얻습니다.
<!-- END:nextjs-framework-rules -->
