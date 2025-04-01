const jwt = require('jsonwebtoken');

// 驗證用戶身份的中介軟體
const protect = (req, res, next) => {
  // 從 Authorization 標頭中提取 token (使用 Bearer 格式)
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // 驗證 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 將解碼後的資料附加到 req.user
    next(); // 繼續執行路由處理函式
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;
