# BrainSync 서비스 상세 명세서 (Context Document)

이 문서는 `@design` (실제 폴더명: `degign`) 폴더에 포함된 목업 HTML 파일들을 분석하여 도출한 **BrainSync** 서비스의 상세 콘텍스트 및 요구사항입니다.

## 1. 서비스 개요
* **서비스명**: BrainSync
* **서비스 유형**: 클라우드 기반 메모 및 개인 지식 관리 시스템 (Cloud Note Service / Second Brain)
* **슬로건**: "Sync Your Thoughts, Simplify Your Life", "Your mind, clarified."
* **타겟 고객**: 생산성 향상, 아이디어 스케치 및 체계적인 지식 관리가 필요한 전문가 (기획자, 디자이너, 개발자 등)

## 2. 핵심 가치 및 디자인 철학 (Design System)
* **미니멀리즘 & 포커스**: 시각적 노이즈를 최소화하고 글쓰기와 생각 정리에 집중할 수 있는 'Distraction-Free' 환경 제공.
* **디자인 테마**: 
  * 깔끔하고 현대적인 Light 모드 기반 (Tailwind 다크모드 대응 구조 포함).
  * 주조색: Deep Indigo (Primary, 신뢰감 및 전문성)
  * 보조색: Soft Teal (Secondary, 강조 및 활력)
  * UI 요소: 유리 질감(Glassmorphism), 은은한 그림자(Ambient shadows), 곡선 테두리(Rounded UI)를 통한 부드럽고 촉각적인(Tactile) 느낌 강조.
* **타이포그래피**: `Inter` 폰트를 사용하여 가독성과 모던함을 극대화.
* **아이콘**: Google Material Symbols Outlined 활용.

## 3. 핵심 기능 (Key Features)
1. **인스턴트 동기화 (Instant Sync)**: 모바일과 데스크톱 간 실시간 동기화 지원.
2. **리치 텍스트 에디터 (Rich Text Editor)**: 마크다운 지원, 코드 블록, 미디어 임베드, 아름다운 타이포그래피를 제공하는 방해 없는 글쓰기 캔버스.
3. **보안 클라우드 스토리지 (Secure Cloud Storage)**: 엔터프라이즈급 암호화 및 글로벌 서버를 통한 안전한 데이터 보관.
4. **스마트 태그 및 분류 (Smart Tags & Categories)**: 노트들을 체계적으로 인덱싱하고 빠르게 필터링할 수 있는 강력한 분류 시스템.

## 4. 화면별 상세 컨텍스트 (Page Flow)

### 4.1. 랜딩 페이지 (`landing.html`)
* **목적**: 서비스 소개 및 신규 가입 유도 (Marketing & Conversion).
* **구성 요소**:
  * **Hero Section**: 서비스 슬로건, 'Start Free Trial' CTA, 'Watch Demo' 버튼, 서비스 UI 목업 이미지.
  * **Features Section**: 3가지 핵심 기능(Instant Sync, Rich Text Editor, Secure Cloud Storage) 소개.
  * **Testimonials**: 전문가(Product Manager, Lead Designer 등)들의 사용 후기 (별점 5점 리뷰).
  * **Footer**: 이용약관, 개인정보처리방침, 연락처 링크.

### 4.2. 인증 페이지 (`auth.html`)
* **목적**: 로그인 및 회원가입.
* **구성 요소**:
  * **소셜 로그인 (SSO)**: Google 및 Apple 계정을 통한 빠른 로그인/가입 지원.
  * **이메일 기반 인증**: 이메일과 비밀번호를 통한 전통적인 방식 지원 (비밀번호 찾기 기능 포함).
  * **UI 특징**: 좌측에는 서비스의 미적 가치를 보여주는 추상적 이미지, 우측에는 깔끔한 입력 폼 렌더링.

### 4.3. 대시보드 (`dashboard.html`)
* **목적**: 사용자의 개인 지식 생태계를 한눈에 보여주는 메인 허브.
* **구성 요소**:
  * **Side Navigation (사이드바)**: 새 노트 작성(CTA), All Notes, Favorites, Categories, Archive, Settings, Support 메뉴 이동.
  * **Header**: 글로벌 검색(Search), 알림(Notifications), 사용자 프로필.
  * **Overview & Statistics (Bento Grid)**: 총 인덱싱된 노트 수, 활성화된 태그/카테고리 수 표시.
  * **Quick Jump (빠른 필터)**: Work, Personal, Ideas 등 자주 쓰는 태그로 빠르게 필터링.
  * **Recent Notes Grid**: 최근 작성한 노트 목록을 카드 형태로 제공 (제목, 본문 미리보기, 태그, 작성 시간).

### 4.4. 에디터 / 노트 상세 (`note.html`)
* **목적**: 실제 글을 작성하고 메타데이터를 관리하는 핵심 공간.
* **구성 요소**:
  * **Top Utility Bar**: 제목(경로) 표시, 저장 상태 표시, Distraction Free Mode(전체화면 모드) 토글, Share(공유) 버튼, Save(저장) 버튼.
  * **Editor Canvas**: 
    * 제목 입력 필드.
    * 텍스트를 선택했을 때 나타나는 플로팅 포맷팅 툴바(Floating Formatting Toolbar - Bold, Italic, H1, H2, List, Quote 등 지원).
    * 방해 없는 넓은 글쓰기 영역.
  * **Right Metadata Sidebar (우측 메타데이터 패널)**:
    * **Status**: 진행 상태 (예: Draft in Progress).
    * **Category**: 노트가 속한 폴더/분류.
    * **Tags**: 노트에 부여된 태그 관리 (추가/삭제 칩 UI).
    * **Meta Info**: 생성일, 최종 수정일, 단어 수(Word Count) 정보.

### 4.5. 결제 및 구독 (`payment.html` & `payment-done.html`)
* **목적**: 부분 유료화(Freemium) 모델을 위한 구독 플랜 선택 및 결제 처리.
* **플랜 구성**:
  * **Pro 플랜**: $12/월 (개인용 고급 도구).
  * **Business 플랜**: $29/월 (팀 협업용).
  * 월간/연간(20% 할인) 결제 토글.
* **결제 폼 (`payment.html`)**: Stripe 스타일의 신용카드 정보 입력 폼 (이름, 카드 번호, 만료일, CVC, 국가, 우편번호), 실시간 결제 요약(Order Summary) 제공.
* **결제 완료 (`payment-done.html`)**: 결제 성공 메시지, 축하 효과(Confetti), 영수증 요약, 대시보드로 이동 및 영수증 출력 기능 제공.

## 5. 향후 개발 시 참고 사항
* 컴포넌트 개발 시 `tailwind.config`에 정의된 커스텀 컬러(예: `primary`, `surface`, `on-surface` 등)와 타이포그래피 변수를 엄격하게 준수하여 일관성 있는 디자인을 유지해야 합니다.
* TDD(Test-Driven Development) 원칙과 Next.js App Router의 클린 아키텍처 규칙을 적용하여 도메인 중심의 견고한 시스템으로 구현해야 합니다.
