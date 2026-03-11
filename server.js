const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const DISCOGS_API_URL = 'https://api.discogs.com';

// 搜尋唱片
app.get('/api/search', async (req, res) => {
    try {
        const { q } = req.query;
        const response = await axios.get(`${DISCOGS_API_URL}/database/search`, {
            params: {
                q: q,
                type: 'release',
                per_page: 10
            },
            headers: {
                'User-Agent': 'XFoundryVinyl/1.0'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Discogs API Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 取得唱片詳細資訊
app.get('/api/release/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${DISCOGS_API_URL}/releases/${id}`, {
            headers: {
                'User-Agent': 'XFoundryVinyl/1.0'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Discogs API Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// AI 圖片辨識 (使用 Google Cloud Vision 或 OpenAI)
app.post('/api/recognize', async (req, res) => {
    try {
        const { image } = req.body;
        
        // 這裡可以整合 Google Cloud Vision 或 OpenAI Vision API
        // 先用簡單的方式 - 讓用戶輸入關鍵字搜尋
        
        res.json({ 
            message: '請輸入專輯名稱或藝術家名稱進行搜尋',
            suggestSearch: true 
        });
    } catch (error) {
        console.error('Recognition Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});