# Agent Work Procedure

1. Review the codebase and prepare for the task based on the `## Developer Requirements` section below.
2. If the last section is a developer's section such as `## Developer Requirement Revision` or `## Developer Review Response`, skip the middle and work from that part.
3. If there is content requiring developer decision-making, add a section called `## Agent Review Request` at the end of this file with the inquiry and terminate the task.
4. Upon task completion, add a `## Agent Work Execution Details: {yyyy-MM-dd HH:MM}` section at the end of this file and document the detailed work performed.
5. For other general work guidelines, please refer to [ai_agent_guide.md](/docs/guide/ai_agent_guide.md) before starting work.

## Developer Requirements

- 북톡 작성 및 수정 시 250자 글자수 제한에 대한 사용자 피드백 제공 ({현재 글자 수}/250자).
- 유지보수가 쉽도록 공통 컴포넌트로 분리하여 구현.
- 250자 초과 시 나타나는 `alert()` 창을 시스템의 공통 에러 처리 방식인 `Toast` (Snackbar) 메시지로 통일하여 변경.

## Agent Work Execution Details: 2026-03-03 11:10

### 1. 글자 수 텍스트 입력 공통 컴포넌트 추가
- `src/components/common/CharacterLimitedTextField.tsx` 생성.
- MUI의 `TextField`를 래핑하여 `maxLength`를 통해 글자 수가 모니터링되도록 제어.
- `{현재 글자 수}/{최대 글자 수}` 형태로 하단 우측에 표시.

### 2. Toast 기반 자체 알림 컨텍스트 (Global Error Handler) 구축
- `src/context/ToastContext.tsx` 및 `src/providers/ToastProvider.tsx` 신설 구축.
- `src/types/ToastTypes.ts` 별도 분리로 인한 Vite Fast Refresh 린트 회피 및 글로벌 타입 지원.
- `src/hooks/useToast.ts` 추가로 서비스 앱 어디에서나 `showToast(msg, error)` 형태로 호출할 수 있게 구성.
- `src/App.tsx` 최상단을 `ToastProvider`로 래핑.

### 3. 기능 반영 및 리팩토링 로직 수정 사항
- `src/components/book/TalkForm.tsx` 내부 일반 TextField를 `CharacterLimitedTextField` 컴포넌트로 교환.
- `src/components/book/TalkItem.tsx` 
  - 수정 필드 `CharacterLimitedTextField` 도입.
  - 내재되어 있던 `alert()` 팝업들을 일괄 `showToast()` Snackbar 알림으로 대체.
- `src/hooks/useBookDetail.ts` 
  - 북톡 반응 및 작성 등에서 터지는 `alert()`를 일괄적으로 `showToast()` Snackbar 알림으로 대체.

### 4. 검증 (Verification)
- `npm run lint` 수행 및 새로 만든 기능들에서 발생하는 Typescript/ESlint의 경고 완벽히 해결 (ReactNode/React Refresh Rules).
- 사용자가 컴포넌트를 테스트할 수 있도록 walkthrough.md 파일 정리 완료.
