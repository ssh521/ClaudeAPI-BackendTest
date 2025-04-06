# Claude API 프론트엔드 클라이언트

이 프로젝트는 Anthropic Claude API를 활용하는 React 기반 프론트엔드 클라이언트입니다. 사용자가 프롬프트를 입력하면 백엔드 서버를 통해 Claude API에 요청을 보내고 응답을 표시합니다.

## 기능

- 사용자 프롬프트 입력 인터페이스 제공
- 백엔드 서버를 통한 Claude API 통신
- API 응답 표시 및 오류 처리

## 기술 스택

- React.js
- Axios (HTTP 요청)
- CSS (스타일링)

## 프로젝트 구조

```
client/
├── public/         # 정적 파일
├── src/            # 소스 코드
│   ├── components/ # React 컴포넌트
│   │   └── ClaudePrompt.js  # Claude API 통신 컴포넌트
│   ├── App.js      # 메인 애플리케이션 컴포넌트
│   ├── index.js    # 앱 진입점
│   └── index.css   # 전역 스타일
└── package.json    # 프로젝트 의존성 및 스크립트
```

## 시작하기

### 필수 요구사항

- Node.js (최신 LTS 버전 권장)
- 백엔드 서버 실행 (server 폴더의 README.md 참조)

### 설치

의존성 패키지 설치:

```bash
npm install
```

### 실행

개발 서버 시작:

```bash
npm start
```

기본적으로 개발 서버는 3000 포트에서 실행됩니다.
브라우저에서 http://localhost:3000 으로 접속하여 앱을 사용할 수 있습니다.

### 빌드

프로덕션용 빌드:

```bash
npm run build
```

빌드된 파일은 `build` 디렉토리에 생성됩니다.

## 사용 방법

1. 텍스트 영역에 Claude에게 보낼 프롬프트를 입력합니다.
2. "Claude에게 보내기" 버튼을 클릭합니다.
3. API 응답이 텍스트 영역 아래에 표시됩니다.
4. 오류가 발생한 경우, 오류 메시지가 빨간색으로 표시됩니다.

## 백엔드 연결

클라이언트는 기본적으로 `http://localhost:5001/api/anthropic` 엔드포인트로 요청을 보냅니다. 백엔드 서버의 URL이 다른 경우 `ClaudePrompt.js` 파일에서 URL을 수정해야 합니다. 