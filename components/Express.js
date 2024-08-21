const express = require('express');
const cors = require('cors');
const app = express();

// CORS 미들웨어 추가
app.use(cors());

app.use(express.json());

// 라우트 설정
app.post('/tests/create', (req, res) => {
  // 테스트 데이터 처리
  console.log(req.body);
  res.status(200).send({ message: 'Test created successfully!' });
});

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
