## [1.4.1](https://github.com/MASKUN2/quiet-chatter-front-end/compare/v1.4.0...v1.4.1) (2026-03-07)


### Bug Fixes

* **onboarding:** Adjust tooltip display durations [skip ci] ([87b1c25](https://github.com/MASKUN2/quiet-chatter-front-end/commit/87b1c25ca11fe1da1e35db77808f8e0936bb3128))

# [1.4.0](https://github.com/MASKUN2/quiet-chatter-front-end/compare/v1.3.0...v1.4.0) (2026-03-03)


### Features

* **book:** Add character limit and Toast notifications ([9d8c83e](https://github.com/MASKUN2/quiet-chatter-front-end/commit/9d8c83ee191445c3b4353be42c6ec62688815ccd))
* **core:** Add React Error Boundary and GlobalErrorFallback ([a835d35](https://github.com/MASKUN2/quiet-chatter-front-end/commit/a835d35fda2384ac9bd38750d8f373588da7838f))
* **onboarding:** Add first-visit tooltip system for homepage and book detail ([a646b68](https://github.com/MASKUN2/quiet-chatter-front-end/commit/a646b6822a5e50fb00cf61ff3287d48073ea30e1))
* update search input placeholder to suggest searching for books or authors. [skip ci] ([2424485](https://github.com/MASKUN2/quiet-chatter-front-end/commit/2424485d3fa490ab19a01204c01a545d96543db5))

# [1.3.0](https://github.com/MASKUN2/quiet-chatter-front-end/compare/v1.2.0...v1.3.0) (2026-02-27)


### Bug Fixes

* show full nickname on mobile header instead of truncating ([d758ac6](https://github.com/MASKUN2/quiet-chatter-front-end/commit/d758ac60dc6b29b55593f5fbade3e42997fb8a1d))
* use conditional rendering for SignupModal to sync tempNickname ([408c3e3](https://github.com/MASKUN2/quiet-chatter-front-end/commit/408c3e360eca116d65b21fc6c3ef63fac342734b))


### Features

* add ScrollToTop component to reset scroll position on navigation ([f7f4560](https://github.com/MASKUN2/quiet-chatter-front-end/commit/f7f456082740f2bc632d9faaf02c1d4921df1bd6))
* implement reusable nickname validation rules (1-12 chars, alphanumeric/Korean, spaces/symbols in middle only) ([ccf939b](https://github.com/MASKUN2/quiet-chatter-front-end/commit/ccf939b8b2ea1ed00931dbc52c87b25fa980c1e9))

# [1.2.0](https://github.com/MASKUN2/quiet-chatter-front-end/compare/v1.1.0...v1.2.0) (2026-02-25)


### Bug Fixes

* **mypage:** fetch book details to display cover images correctly ([0ce8d4c](https://github.com/MASKUN2/quiet-chatter-front-end/commit/0ce8d4c2298a01d50becd8c8e04c593a1fa65c02))


### Features

* Add My Page UI and Account Management features ([534189e](https://github.com/MASKUN2/quiet-chatter-front-end/commit/534189e96082c831476458565c47a8f086b510b2))

# [1.1.0](https://github.com/MASKUN2/quiet-chatter-front-end/compare/v1.0.1...v1.1.0) (2026-02-21)


### Bug Fixes

* **ci:** .releaserc.json 커밋 메시지 줄바꿈 이스케이프 수정 ([32d63b9](https://github.com/MASKUN2/quiet-chatter-front-end/commit/32d63b9b248bc4b5807471b41c0487da515b536e))
* move Header inside Stack on ServiceHistory page to fix missing gap ([119ca2e](https://github.com/MASKUN2/quiet-chatter-front-end/commit/119ca2e7b7d40fcf4b247f9639b2c828a585b134))


### Features

* **about:** redesign About Service page with philosophy, typography, and layout ([95c1a5e](https://github.com/MASKUN2/quiet-chatter-front-end/commit/95c1a5e6c6a1dc8b73ebc83ba2a66adedea78426))
* add service history page and footer link ([1848420](https://github.com/MASKUN2/quiet-chatter-front-end/commit/18484202f1d73c6abac2bb2945049765ecd3d645))
* complete About Service page with feature descriptions and reordered footer ([7b4eac0](https://github.com/MASKUN2/quiet-chatter-front-end/commit/7b4eac02eaa196811ba197c37834cc9166b2e30c))
* enhance About Service page with philosophy and story ([76aa3f6](https://github.com/MASKUN2/quiet-chatter-front-end/commit/76aa3f6db628c9f21c207c261b38f4241ad93440))
* enhance Home dashboard with auto-refresh and curated updates ([0a7abb6](https://github.com/MASKUN2/quiet-chatter-front-end/commit/0a7abb6407e77a77a935744e9aaf2fc2526ca738))
* implement versioned Terms of Service and mandatory signup agreement ([c37c1db](https://github.com/MASKUN2/quiet-chatter-front-end/commit/c37c1db509ebdf00116deff5231ebc5c1fa75169))
* improve authentication flow and component navigation ([aca1d69](https://github.com/MASKUN2/quiet-chatter-front-end/commit/aca1d697af6c84d7aa91d64dba9f167dea7df7dd))
* 북톡 시계 아이콘 툴팁 추가 및 프록시 설정 수정 [skip ci] ([7c9c666](https://github.com/MASKUN2/quiet-chatter-front-end/commit/7c9c666b8899b6d3ab986f1b8746184e3b2d711e))

## [1.0.1](https://github.com/MASKUN2/quiet-chatter-front-end/compare/v1.0.0...v1.0.1) (2026-02-20)


### Bug Fixes

* **ci:** .releaserc.json의 잘못된 JSON 문법 수정 (이스케이프 문자) ([a6bc3cc](https://github.com/MASKUN2/quiet-chatter-front-end/commit/a6bc3cc18b0dbf327f77a0e24c7c5a98ac2a30a9))
* **ci:** semantic-release를 위한 Node.js 요구 버전 수정 (v22) ([5bd7a91](https://github.com/MASKUN2/quiet-chatter-front-end/commit/5bd7a91d3f04c800c04969d36f8951c449616fae))

# Changelog

## 1.0.0 (2026-02-20)


### Features

* Add AI development and API integration guides under `.gemini/` directory ([dfbcca4](https://github.com/MASKUN2/quiet-chatter-front-end/commit/dfbcca40b6d25f74470ba05b40b5a362989dd12f))
* Add API proxy configuration to Vite server for local development ([d4e37c8](https://github.com/MASKUN2/quiet-chatter-front-end/commit/d4e37c8dcf103e5b954bcb84813041de7e15a458))
* Add edit and delete functionality for Talk items; adjust components and hooks for user-based actions ([de6f6cb](https://github.com/MASKUN2/quiet-chatter-front-end/commit/de6f6cb5771a5641a19d6f242bd5837722d9e881))
* Add GitHub Actions workflow for Lightsail deployment ([3edc28e](https://github.com/MASKUN2/quiet-chatter-front-end/commit/3edc28eaa573647ff30ed8883eb9e444e4c77751))
* Add navigation bar with user info display and responsive mobile menu ([cd12450](https://github.com/MASKUN2/quiet-chatter-front-end/commit/cd124503d630ef2f0fc6685ee7f65877d8e91705))
* Add OpenAPI TypeScript integration for automatic type generation and API synchronization ([3c53ae5](https://github.com/MASKUN2/quiet-chatter-front-end/commit/3c53ae5d41ec028fea9528d0e76ad89d0b527f39))
* Add responsive design enhancements across components; downgrade MUI dependency for compatibility ([818f115](https://github.com/MASKUN2/quiet-chatter-front-end/commit/818f11594429120d1270428b7973e0558034090b))
* **auth:** migrate to Naver Login SDK and improve guest visibility ([0bd1043](https://github.com/MASKUN2/quiet-chatter-front-end/commit/0bd10438d8a5b11c6f43c04b8a87c08ae4f31e66))
* **auth:** 네이버 OAUTH2 로그인 기능 반영 및 API 경로 수정 ([cdbf9a9](https://github.com/MASKUN2/quiet-chatter-front-end/commit/cdbf9a9724866563a1d727419d6b77ddc4d04cc0))
* Enhance TalkItem UI with metadata and layout improvements ([5046008](https://github.com/MASKUN2/quiet-chatter-front-end/commit/50460087611592cef504d194a5546a959a0886bf))
* Implement talk update and delete functionality ([960f006](https://github.com/MASKUN2/quiet-chatter-front-end/commit/960f006d4e296f716872c8700d33bc75a210e1e3))
* improve user info visibility and handle auth loading state in Header ([bb8074b](https://github.com/MASKUN2/quiet-chatter-front-end/commit/bb8074b309aa544749a9e850b11ada39c4efd52e))
* Introduce AuthContext for user authentication and access management ([49122e3](https://github.com/MASKUN2/quiet-chatter-front-end/commit/49122e3ac71dcb6affac0ce0b8c9e3ce02612f5f))
* Load Pretendard font via CDN in index.html and clean up App.tsx styles ([a858c22](https://github.com/MASKUN2/quiet-chatter-front-end/commit/a858c223c5e8bed66ba79bdd95cd5aaa5390edac))
* Persist user state in localStorage and improve authentication flow ([da8fd75](https://github.com/MASKUN2/quiet-chatter-front-end/commit/da8fd75ea49bd1d77f5029091b8197a762ace57d))
* Update workflow to build and push Docker image to Docker Hub ([75f5a95](https://github.com/MASKUN2/quiet-chatter-front-end/commit/75f5a95aeebe1e38966700d63e1c4fab04644cf7))
* 네이버 로그인 후 회원가입 모달 및 닉네임 설정 기능 추가 ([dea91c4](https://github.com/MASKUN2/quiet-chatter-front-end/commit/dea91c41f9fe8adb0a38441731a14b25e8d8f3bb))
* 로그아웃 기능 추가 및 UI 연동 ([4669a83](https://github.com/MASKUN2/quiet-chatter-front-end/commit/4669a837f0ac72ca1dcde36ee79fa72e7fee73eb))
* 백엔드 dev 스테이지 분리 및 GUEST 제거 반영 ([382d235](https://github.com/MASKUN2/quiet-chatter-front-end/commit/382d2352ccf4ecddbcc63e71037626ea06bb1fc4))


### Bug Fixes

* Naver SDK 대신 수동 OAuth2 URL 요청 방식으로 변경 (인가 코드 흐름 보장) ([acaaa8e](https://github.com/MASKUN2/quiet-chatter-front-end/commit/acaaa8e1f6ffee909e3adc587020b8d0df33401a))
* 네이버 로그인 방식을 Authorization Code Flow로 변경 및 콜백 로깅 강화 ([99612e4](https://github.com/MASKUN2/quiet-chatter-front-end/commit/99612e4114defba0ed8aa26f9abd445ceba9c15d))
* 네이버 로그인 버튼 이미지 URL 수정 ([04fcc43](https://github.com/MASKUN2/quiet-chatter-front-end/commit/04fcc43124f47548d82e3112ec7ca786e4e576ed))
* 네이버 로그인 버튼 이미지 수정 및 HTML 언어 설정(ko) 변경 ([dd35c9a](https://github.com/MASKUN2/quiet-chatter-front-end/commit/dd35c9ad5c96ed7aec38ea098f9c1c568c887ce8))
* 네이버 로그인 화면 한글 강제 설정을 위한 locale 파라미터 추가 ([546075c](https://github.com/MASKUN2/quiet-chatter-front-end/commit/546075cb88a726f4e20b390a0b678881d5fc10eb))
