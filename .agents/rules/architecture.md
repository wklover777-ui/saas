---
trigger: always_on
---

# Next.js 프로젝트 클린 아키텍처 가이드

본 가이드는 현재 Next.js(App Router) 프로젝트에 클린 아키텍처(Clean Architecture)를 도입하기 위한 구체적인 폴더 구조와 각 계층의 역할을 정의합니다.

## 1. 아키텍처 목표
* **프레임워크 독립성**: 비즈니스 로직을 Next.js나 특정 UI/DB 기술로부터 분리합니다.
* **테스트 용이성**: 비즈니스 규칙(도메인 및 유스케이스)을 외부 의존성 없이 독립적으로 테스트 가능하게 만듭니다.
* **관심사 분리**: 데이터 흐름과 의존성 방향을 한 방향(외부 ➔ 내부)으로 유지합니다.

---

## 2. 권장 폴더 구조

```text
📦 프로젝트 루트
 ┣ 📂 app                  # 프레임워크 계층 (Next.js App Router)
 ┃ ┣ 📂 api                # API 라우트 (외부 클라이언트와의 통신)
 ┃ ┣ 📜 layout.tsx         # 글로벌/공통 레이아웃
 ┃ ┗ 📜 page.tsx           # 화면 진입점 (UI)
 ┃
 ┣ 📂 src                  # 핵심 비즈니스 로직 계층
 ┃ ┣ 📂 domain             # [1. 도메인 계층]
 ┃ ┃ ┣ 📂 entities         # 핵심 비즈니스 객체 및 타입 (예: User, Product)
 ┃ ┃ ┗ 📂 repositories     # 데이터 접근을 위한 추상화 인터페이스 (Ports)
 ┃ ┃
 ┃ ┣ 📂 application        # [2. 유스케이스 계층]
 ┃ ┃ ┣ 📂 use-cases        # 애플리케이션 서비스/기능 (예: CreateUser, FetchProducts)
 ┃ ┃ ┗ 📂 dtos             # 계층 간 데이터 전송을 위한 객체 (Data Transfer Objects)
 ┃ ┃
 ┃ ┣ 📂 infrastructure     # [3. 인프라 계층]
 ┃ ┃ ┣ 📂 database         # DB 설정, ORM 모델 및 스키마 (Prisma, TypeORM 등)
 ┃ ┃ ┣ 📂 repositories     # domain/repositories의 실제 구현체
 ┃ ┃ ┗ 📂 external         # 외부 서비스 연동 (AWS, 결제 API, 이메일 등)
 ┃ ┃
 ┃ ┗ 📂 presentation       # [4. 프레젠테이션 계층]
 ┃   ┣ 📂 components       # 재사용 가능한 순수 React 컴포넌트
 ┃   ┣ 📂 hooks            # 커스텀 훅 (상태 관리, 유스케이스 호출 연결)
 ┃   ┗ 📂 stores           # 클라이언트 전역 상태 관리 (Zustand, Redux)
 ┃
 ┣ 📜 next.config.ts
 ┣ 📜 package.json
 ┗ 📜 ... 기타 설정 파일들
```

---

## 3. 계층별 상세 역할 및 규칙

### 1) Domain (도메인 계층)
* **역할**: 애플리케이션의 핵심 비즈니스 개념과 규칙을 정의합니다.
* **의존성**: **아무것도 의존하지 않습니다.** (오직 순수 TypeScript/JavaScript)
* **예시 코드 (`src/domain/entities/User.ts`)**:
  ```typescript
  export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
  }
  ```

### 2) Application (애플리케이션 / 유스케이스 계층)
* **역할**: 사용자의 요청(유스케이스)을 처리하는 흐름을 담당합니다.
* **의존성**: `Domain` 계층에만 의존합니다. UI나 DB의 존재를 알지 못합니다.
* **예시 코드 (`src/application/use-cases/CreateUserUseCase.ts`)**:
  ```typescript
  import { UserRepository } from '../../domain/repositories/UserRepository';
  import { User } from '../../domain/entities/User';

  export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string, name: string): Promise<User> {
      // 비즈니스 로직 (예: 이메일 중복 체크 등)
      return await this.userRepository.save({ email, name });
    }
  }
  ```

### 3) Infrastructure (인프라 계층)
* **역할**: 애플리케이션이 외부 세계(DB, 파일시스템, 외부 API 등)와 소통하는 실제 구현 코드를 둡니다.
* **의존성**: `Application`, `Domain` 계층을 의존합니다.
* **특징**: 도메인 계층에서 정의한 인터페이스(Repository)를 implements 하여 구현합니다.

### 4) Presentation & App (프레젠테이션 & 프레임워크 계층)
* **역할**: 사용자에게 화면을 보여주고 입력을 받는 영역입니다. (Next.js Pages, React Components)
* **의존성**: `Application` 계층의 유스케이스를 호출하여 결과를 화면에 렌더링합니다. 직접 DB에 접근하지 않습니다.

---

## 4. 데이터 흐름 (Data Flow)

사용자 인터랙션 발생 시 데이터 흐름은 다음과 같습니다:

1. **[App/Presentation]** 사용자가 화면(UI)에서 버튼을 클릭 (예: 회원가입)
2. **[Presentation]** 컴포넌트나 훅에서 `Application` 계층의 `CreateUserUseCase` 호출
3. **[Application]** `CreateUserUseCase`에서 비즈니스 로직 실행 및 `Domain`의 Repository 인터페이스 호출
4. **[Infrastructure]** 실제 DB와 연결된 Repository 구현체가 데이터를 저장/조회하여 반환
5. 다시 역순으로 결과를 받아 **[App/Presentation]**에서 화면 업데이트

---

## 5. 실무 도입 팁

* 처음부터 모든 인터페이스를 분리하면 개발 속도가 느려질 수 있습니다. 처음엔 `domain` 모델과 `use-cases`를 분리하는 것만으로도 큰 효과를 볼 수 있습니다.
* 데이터베이스 ORM(예: Prisma) 모델을 그대로 도메인 모델로 사용하는 것은 클린 아키텍처 원칙에 어긋나지만, 실무(특히 소규모 프로젝트)에서는 타협하여 함께 사용하는 경우도 많습니다. 프로젝트 규모에 맞게 유연하게 적용하세요.
