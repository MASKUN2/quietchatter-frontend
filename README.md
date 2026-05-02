# microservice-frontend

QuietChatter 서비스의 웹 프론트엔드 프로젝트. 익명성과 휘발성을 결합한 저자극 독서 나눔 SNS 가치를 전달하기 위한 UI/UX를 제공한다.

## 기술 스택

- 코어: React 19, TypeScript, Vite
- 상태 관리: Zustand
- UI 프레임워크: Material UI (MUI) v6
- 라우팅: React Router DOM v7
- HTTP 클라이언트: Axios
- 모킹: Mock Service Worker (MSW)
- 배포: Cloudflare Pages

## 패키지 구조

src/ 디렉토리 구조:
- api/: API 요청 정의 (Axios)
- assets/: 로컬 자산 (SVG, 이미지)
- components/: 재사용 UI 컴포넌트 (book, common, home 등)
- constants/: 정적 문자열, 설정값, 경로
- context/: React Context (Auth, Onboarding)
- hooks/: 커스텀 훅 (비즈니스 로직 캡슐화)
- mocks/: MSW 설정 및 핸들러
- pages/: 페이지 컴포넌트 (라우터 로드)
- types/: TypeScript 정의 (api-schema.d.ts 자동 생성)
- utils/: 공용 유틸리티 함수

## 아키텍처 및 설계 원칙

레이아웃 구조:
- App.tsx에서 전체 레이아웃을 중앙 집중 관리한다.
- 개별 페이지는 Container나 Header를 포함하지 않고 PagePaper 컴포넌트로 본문만 감싼다.
- 새로운 레이아웃 블록 사이의 간격은 spacing={xs: 2, md: 4} 규격을 사용한다.

상태 관리 전략:
- UI 전용 상태는 useState를 우선 사용한다.
- 전역 데이터(로그인 등)는 Context API 또는 Zustand를 사용한다.
- 공유 가능한 내비게이션 상태는 URL 파라미터(useSearchParams)를 진실의 근거로 삼는다.

API 및 데이터 로직:
- 컴포넌트 내부에 fetch 로직을 직접 작성하지 않는다.
- 모든 API 호출은 src/api/api.ts에 정의된 함수를 사용한다.
- 복잡한 데이터 처리(무한 스크롤, 페이징 등)는 개별 커스텀 훅으로 분리한다.
- 모든 사용자 메시지는 src/constants/index.ts의 MESSAGES 객체에 정의한다.
- 에러 처리는 useToast 훅을 통한 전역 토스트 시스템을 사용한다.

## 디자인 및 UI 가이드

색상 팔레트:
- Deep Violet: #5c2d91 (주요 버튼, 하이라이트)
- Deep Indigo: #4b0082 (호버, 강조)
- Default Background: #f8f9fa
- Paper Background: #ffffff

타이포그래피 및 섹션 헤더:
- 기본 폰트는 Pretendard를 사용한다.
- 섹션 제목은 2줄 패턴(Overline 라벨 + h5 타이포그래피)을 준수한다.

컴포넌트 패턴:
- 버튼의 자동 대문자 변환을 방지하기 위해 textTransform: 'none'을 설정한다.
- 로딩 상태의 Skeleton UI는 실제 데이터 렌더링 시의 레이아웃과 크기가 일치해야 한다.
- 레이아웃 수정 시 MUI의 sx prop과 Breakpoint 객체를 우선 활용한다.

## 인증 시스템

동작 방식:
- AuthContext를 통해 로그인 상태를 전역 관리한다.
- 네이버 OAuth 로그인 흐름을 따르며, 백엔드에서 설정한 쿠키를 통해 세션을 유지한다.
- 초기화 시 /api/auth/me를 호출하여 세션 유효성을 확인한다.
- UI 권한 제어는 useAuth 훅에서 제공하는 member 상태를 기반으로 수행한다.

## 개발 워크플로우

API 연동:
- 타입을 수동으로 수정하지 않는다. 백엔드 변경 시 npm run gen:types를 실행한다.
- src/api/api.ts를 업데이트할 때 자동 생성된 타입을 엄격히 적용한다.

검증 체크리스트:
- 빌드 테스트: npm run build 실행 시 에러가 없어야 한다.
- 코드 퀄리티: npm run lint 실행 시 경고가 없어야 한다.
- 런타임 테스트: 브라우저 콘솔에 React 경고나 에러가 없는지 확인한다.

## 실행 방법

사전 요구사항: Node.js v18 이상

1. 의존성 설치: npm install
2. 로컬 서버 실행 (백엔드 프록시): npm run dev
3. 모킹 서버 실행 (MSW): npm run dev:mock
