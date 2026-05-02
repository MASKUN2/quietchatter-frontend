# CLAUDE.md - microservice-frontend

작업 전 README.md를 읽으십시오. 프로젝트 개요, 기술 스택, 컴포넌트 구조, 디자인 가이드는 README.md에 있습니다.

루트 프로젝트의 CLAUDE.md에 정의된 공통 원칙도 확인하십시오.

## 작업 지침

### A. 코드 작성 규칙

- 모든 신규 로직 및 컴포넌트는 TypeScript(.ts, .tsx)로 작성하며 any 타입 사용을 금지한다.
- ESLint 경고 및 에러는 반드시 해결해야 하며, disable 주석 사용을 지양한다.
- 컴포넌트 파일명은 PascalCase, 일반 로직 파일명은 camelCase를 사용한다.
- 복잡한 비즈니스 로직은 반드시 hooks/ 디렉토리에 커텀 훅으로 분리한다.

### B. UI/UX 구현 규칙

- MUI v6 시스템을 사용하며 스타일링은 sx prop 활용을 권장한다.
- 하드코딩된 색상값 대신 테마 팔레트(color="primary.main" 등)를 참조한다.
- 텍스트 절약(Truncation) 시 수동 substring 대신 CSS textOverflow: 'ellipsis'를 사용한다.
- 모든 버튼 컴포넌트는 textTransform: 'none' 속성을 포함해야 한다.

### C. API 통합 규칙

- api-schema.d.ts 파일을 절대 수동으로 수정하지 않는다.
- API 호출 결과에 대해 항상 useToast를 통한 적절한 사용자 피드백을 제공한다.
- 데이터 로직 훅에서 반환하는 핸들러 함수는 반드시 useCallback으로 감싼다.

### D. 보안 및 인증

- 권한이 필요한 액션 수행 전 반드시 useAuth의 member 상태를 체크한다.
- 민감한 정보는 소스 코드에 직접 기재하지 않고 환경변수를 활용한다.
