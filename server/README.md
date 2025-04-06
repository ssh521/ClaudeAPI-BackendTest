# Claude API 백엔드 서버

이 서버는 Anthropic Claude API를 활용하여 프론트엔드에서 보낸 요청을 처리하고 AI 응답을 반환하는 Express 기반 백엔드입니다.

## 기능

- Claude API와의 통신을 위한 REST API 엔드포인트 제공
- 상세한 오류 처리 및 로깅
- CORS 설정으로 React 프론트엔드와 통신 가능

## 기술 스택

- Node.js
- Express.js
- Axios (HTTP 요청)
- dotenv (환경변수 관리)
- CORS (교차 출처 리소스 공유)

## 시작하기

### 필수 요구사항

- Node.js (최신 LTS 버전 권장)
- Anthropic API 키

### 설치

1. 의존성 패키지 설치:
```bash
npm install
```

2. `.env` 파일 설정:
```bash
cp .env.example .env
```
그리고 `.env` 파일에서 API 키를 설정합니다:
```
ANTHROPIC_API_KEY=your_api_key_here
PORT=5001
```

### 실행

서버 시작:
```bash
node index.js
```

기본적으로 서버는 5001 포트에서 실행됩니다.

## API 엔드포인트

### POST /api/anthropic

Claude API와 통신하여 사용자 입력에 대한 응답을 생성합니다.

#### 요청 형식
```json
{
  "prompt": "사용자 입력 텍스트"
}
```

#### 응답
Claude API의 응답을 그대로 반환합니다.

## 오류 처리

서버는 다음과 같은 오류 상황을 처리합니다:
- 잘못된 요청 형식 (400)
- API 키 인증 실패 (401)
- 접근 권한 부족 (403)
- 리소스 없음 (404)
- 요청 한도 초과 (429)
- 서버 오류 (500, 502, 503, 504)
- 타임아웃

## 로그

서버 로그는 `server.log` 파일에 기록됩니다. 