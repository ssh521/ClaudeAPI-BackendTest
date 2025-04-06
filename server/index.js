// server/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // React 요청 허용
app.use(express.json());

// API 키 로깅 (보안상 일부만 표시)
const apiKey = process.env.ANTHROPIC_API_KEY;
console.log('API 키 상태:', apiKey ? `설정됨 (${apiKey.substring(0, 10)}...)` : '설정되지 않음');

app.post('/api/anthropic', async (req, res) => {
  try {
    console.log('요청 받음:', req.body);
    const userPrompt = req.body.prompt;
    
    if (!userPrompt || userPrompt.trim() === '') {
      return res.status(400).json({ error: '유효한 프롬프트를 입력해주세요.' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.log('API 키가 설정되지 않았습니다.');
      return res.status(500).json({ error: 'API 키가 설정되지 않았습니다. 환경 변수를 확인하세요.' });
    }

    console.log('Anthropic API 호출 시작...');
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        temperature: 0.7,
        messages: [{ role: 'user', content: userPrompt }]
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        timeout: 30000 // 30초 타임아웃 설정
      }
    );

    console.log('Anthropic API 응답 받음');
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    
    // 상세한 오류 유형별 처리
    if (error.response) {
      // 서버에서 응답이 왔지만 오류 상태 코드를 반환한 경우
      const status = error.response.status;
      const errorData = error.response.data;
      console.log(`API 오류 응답: ${status}`, errorData);
      
      switch (status) {
        case 400:
          return res.status(400).json({ 
            error: '잘못된 요청 형식입니다', 
            details: errorData
          });
        case 401:
          return res.status(401).json({ 
            error: 'API 키가 유효하지 않습니다. 인증에 실패했습니다.', 
            details: errorData 
          });
        case 403:
          return res.status(403).json({ 
            error: 'API 접근 권한이 없습니다.', 
            details: errorData 
          });
        case 404:
          return res.status(404).json({ 
            error: '요청한 리소스를 찾을 수 없습니다.', 
            details: errorData 
          });
        case 429:
          return res.status(429).json({ 
            error: '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.', 
            details: errorData 
          });
        case 500:
        case 502:
        case 503:
        case 504:
          return res.status(500).json({ 
            error: 'Anthropic 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 
            details: errorData 
          });
        default:
          return res.status(status).json({ 
            error: `Anthropic API 오류 (상태 코드: ${status})`, 
            details: errorData 
          });
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우 (타임아웃 등)
      console.log('응답 없음 (타임아웃)');
      return res.status(504).json({ 
        error: 'Anthropic API 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.' 
      });
    } else {
      // 요청 설정 중 오류가 발생한 경우
      console.log('요청 준비 중 오류:', error.message);
      return res.status(500).json({ 
        error: `요청 준비 중 오류가 발생했습니다: ${error.message}` 
      });
    }
  }
});

// 포트 5001 강제 설정
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
