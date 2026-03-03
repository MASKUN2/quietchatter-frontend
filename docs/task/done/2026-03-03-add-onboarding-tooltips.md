# Agent Work Procedure

1. Review the codebase and prepare for the task based on the `## Developer Requirements` section below.
2. If the last section is a developer's section such as `## Developer Requirement Revision` or `## Developer Review Response`, skip the middle and work from that part.
3. If there is content requiring developer decision-making, add a section called `## Agent Review Request` at the end of this file with the inquiry and terminate the task.
4. Upon task completion, add a `## Agent Work Execution Details: {yyyy-MM-dd HH:MM}` section at the end of this file and document the detailed work performed.
5. For other general work guidelines, please refer to [ai_agent_guide.md](/docs/guide/ai_agent_guide.md) before starting work.

## Developer Requirements

- 홈페이지에 최초 방문자 여부를 확인해 주요 UI에 자동으로 사라지는 설명 툴팁(한국어)을 플로팅으로 보여줄 것.
- 메인 로고 아이콘을 누르면 홈으로 돌아간다는 것도 툴팁으로 안내.
- 책 상세 페이지 및 북톡 작성 영역에 "작성한 북톡은 1년 후 자동 숨김" 안내 툴팁 추가 (전체 통틀어 1회).
- 홈 화면 추천 북톡 카드를 클릭해보도록 권유하는 툴팁도 추가.

## Agent Work Execution Details: 2026-03-03 21:18

### 1. `useFirstVisit` 훅 설계 및 구현
- `src/hooks/useFirstVisit.ts` 신규 생성.
- `localStorage` 키 기반으로 페이지별 최초 방문 여부를 독립적으로 추적.
- `VISIT_KEYS` 상수(`HOME`, `BOOK_DETAIL`)를 같은 파일에 정의해 키 문자열을 한곳에서 관리.

### 2. `OnboardingTooltip` 컴포넌트 구현
- `src/components/common/OnboardingTooltip.tsx` 신규 생성.
- MUI `Popper` + `Fade` + `Paper` 조합으로 플로팅 말풍선 구현.
- `pointer-events: none`으로 사용자 인터랙션 방해 없음.
- `placement` prop으로 화살표 방향 동적 계산 (CSS `::before` 삼각형).
- 배경색은 프로젝트 팔레트 `primary.main(#5c2d91)` 사용.

### 3. `OnboardingContext` 설계
- `src/context/OnboardingContext.tsx` 신규 생성.
- 컴포넌트 트리를 가로지르는 DOM ref 공유가 필요하여 Context API 활용.
- `OnboardingRefs` 인터페이스: `logoRef`, `searchRef`, `vocRef`, `loginRef`, `timerRef`, `recommendedTalkRef`.
- `useOnboardingRefsState` 훅으로 ref 생성 로직 캡슐화, `App.tsx`에서 호출.

### 4. `HomeOnboarding` 오케스트레이터 구현
- `src/components/home/HomeOnboarding.tsx` 신규 생성.
- `TOOLTIP_STEPS` 배열을 설정 영역으로 분리 — 메시지·순서·방향을 이 배열만 수정하면 유지보수 가능.
- 툴팁 표시 시간: **4000ms**, 다음 툴팁 간 간격: **500ms**.
- 순서: 로고 → 검색창 → VOC 버튼 → 로그인 → 타이머 → 추천 북톡 카드 (총 6개).
- 모든 툴팁 완료 후 `VISIT_KEYS.HOME`으로 localStorage 방문 기록 저장.

### 5. 기존 컴포넌트 수정
- **`App.tsx`**: `useOnboardingRefsState`로 ref를 생성하고 `OnboardingProvider`로 `AppContent` 래핑.
- **`Header.tsx`**: Context에서 `logoRef`, `searchRef`, `vocRef`, `loginRef` 읽어 각 요소에 부착. `<HomeOnboarding />` 삽입.
- **`Home.tsx`**: Context에서 `timerRef` 읽어 `RecommendedTalksTimer` 컨테이너 `Box`에 부착.
- **`RecommendedTalks.tsx`**: Context에서 `recommendedTalkRef` 읽어 첫 번째 카드의 `Box` 래퍼에 부착 (MUI 타입 제약 회피).
- **`TalkForm.tsx`**: `VISIT_KEYS.BOOK_DETAIL` 키로 최초 방문 감지, 시계 아이콘 행에 4초짜리 플로팅 툴팁 추가. callback ref 패턴으로 DOM 마운트 후 anchor 위치 정확히 계산.

### 6. 가이드 문서 현행화
- `docs/guide/project_structure.md`: 새 파일 4개(`OnboardingTooltip.tsx`, `HomeOnboarding.tsx`, `OnboardingContext.tsx`, `useFirstVisit.ts`) 및 설명 추가.
- `docs/guide/architecture_guide.md`: State Management 섹션에 `OnboardingContext` 사용 사례(DOM ref 공유) 추가.
