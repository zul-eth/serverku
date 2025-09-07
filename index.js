const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let latestToken = null;

// ========== POST Token ==========
app.post('/api/token', (req, res) => {
  const token = req.body.token;

  if (typeof token !== 'string' || !token.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Token harus berupa string dan tidak kosong'
    });
  }

  latestToken = token;
  console.log("📥 TOKEN MASUK:", token);

  res.json({
    success: true,
    message: 'Token diterima dan siap digunakan',
    token: latestToken
  });
});

// ========== GET Token (Once-Only) ==========
app.get('/api/token', (req, res) => {
  if (!latestToken) {
    return res.status(200).json({
      success: false,
      token: null,
      message: 'Token telah digunakan atau belum tersedia. Silakan kirim token baru.'
    });
  }

  const tokenToSend = latestToken;
  latestToken = null; // Hapus token setelah dikirim
  console.log("📤 TOKEN DIAMBIL:", tokenToSend);

  res.json({
    success: true,
    token: tokenToSend,
    message: 'Token berhasil diambil dan akan dihapus dari server.'
  });
});

// ========== Jalankan Server ==========
//const PORT = 8080;
//app.listen(PORT, () => {
//  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
//});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
