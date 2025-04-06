// client/src/components/ClaudePrompt.js
import React, { useState } from 'react';
import axios from 'axios';

function ClaudePrompt() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');

  const handleSend = async () => {
    try {
      setError('');
      const res = await axios.post('http://localhost:5001/api/anthropic', {
        prompt: input
      });
      setReply(res.data?.content?.[0]?.text || '응답 없음');
    } catch (err) {
      console.error('API 호출 중 오류 발생:', err);
      setError(`오류 발생: ${err.message || '알 수 없는 오류'}`);
      setReply('');
    }
  };

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Claude에게 보내기</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <pre>{reply}</pre>
    </div>
  );
}

export default ClaudePrompt;
