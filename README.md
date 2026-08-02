# BetVision ⚽

Web app prediksi pertandingan sepak bola — lihat jadwal dan dapatkan prediksi skor + confidence score berdasarkan statistik tim (form, head-to-head, kandang/tandang).

## Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Vercel Serverless Functions (Node.js)
- **Data:** API-Football

## Struktur
```
BetVision/
├── api/                     # Backend (serverless functions)
│   ├── leagues.js
│   ├── fixtures/[leagueId].js
│   └── predict.js
├── lib/
│   └── apiFootball.js       # Fetch + cache ke API-Football
├── src/                     # Frontend
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vercel.json
├── tailwind.config.js
└── package.json
```

## Setup Lokal
```bash
npm install
cp .env.example .env
# isi API_FOOTBALL_KEY di .env
npm run dev
```

## Deploy ke Vercel
1. Push repo ini ke GitHub
2. Import di vercel.com → pilih repo
3. Tambahin Environment Variable: `API_FOOTBALL_KEY`
4. Deploy

## Status
Landing page: selesai (data masih dummy, tinggal disambungin ke /api/predict)
Halaman detail pertandingan: belum dibuat, menyusul.

## Disclaimer
Prediksi dibuat dari kalkulasi statistik sederhana, bukan jaminan hasil pertandingan.
