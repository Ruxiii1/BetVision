import React from 'react';
import { Search, Moon, ChevronRight, TrendingUp } from 'lucide-react';

// ============================================
// DUMMY DATA — nanti diganti fetch dari /api/fixtures & /api/predict
// ============================================
const NAV_ITEMS = ['Beranda', 'Jadwal', 'Prediksi', 'Statistik', 'Liga'];

const TODAY_MATCHES = [
  {
    id: 1,
    league: 'Premier League',
    time: '22:00 WIB',
    home: { name: 'Liverpool', code: 'LIV' },
    away: { name: 'Arsenal', code: 'ARS' },
    pick: 'home',
    pickLabel: 'Liverpool menang',
    score: '2-1',
    confidence: 78,
  },
  {
    id: 2,
    league: 'La Liga',
    time: '02:00 WIB',
    home: { name: 'Barcelona', code: 'BAR' },
    away: { name: 'Real Madrid', code: 'RMA' },
    pick: 'draw',
    pickLabel: 'Seri',
    score: '1-1',
    confidence: 54,
  },
  {
    id: 3,
    league: 'Serie A',
    time: '01:45 WIB',
    home: { name: 'Juventus', code: 'JUV' },
    away: { name: 'AC Milan', code: 'ACM' },
    pick: 'home',
    pickLabel: 'Juventus menang',
    score: '2-0',
    confidence: 63,
  },
  {
    id: 4,
    league: 'Bundesliga',
    time: '20:30 WIB',
    home: { name: 'Bayern', code: 'BAY' },
    away: { name: 'Dortmund', code: 'BVB' },
    pick: 'home',
    pickLabel: 'Bayern menang',
    score: '3-1',
    confidence: 81,
  },
];

const TICKER_ITEMS = [
  'LIV 2-1 ARS · 78% CONF',
  'BAR 1-1 RMA · SERI',
  'JUV 2-0 ACM · 63% CONF',
  'BAY 3-1 BVB · 81% CONF',
  'MCI 2-1 CHE · 74% CONF',
  'PSG 2-0 MAR · 69% CONF',
];

const FEATURES = [
  {
    title: 'Statistik nyata',
    desc: 'Form, head-to-head, dan catatan kandang-tandang jadi dasar tiap prediksi.',
  },
  {
    title: 'Data harian',
    desc: 'Jadwal dan hasil pertandingan diperbarui tiap hari dari sumber data langsung.',
  },
  {
    title: 'Transparan',
    desc: 'Confidence score nunjukin seberapa kuat sinyal data, bukan janji kepastian.',
  },
];

// ============================================
// SUB KOMPONEN
// ============================================
function TeamBadge({ code }) {
  return (
    <div className="w-11 h-11 rounded-lg bg-pitch-700 border border-pitch-600 flex items-center justify-center font-display font-semibold text-xs text-ink-300">
      {code}
    </div>
  );
}

function PickPill({ pick, label }) {
  const styles = {
    home: 'bg-grass-500/10 text-grass-400 border-grass-500/30',
    draw: 'bg-amber-400/10 text-amber-400 border-amber-400/30',
    away: 'bg-coral-400/10 text-coral-400 border-coral-400/30',
  };
  return (
    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${styles[pick]}`}>
      {label}
    </span>
  );
}

function MatchCard({ match }) {
  const barColor =
    match.pick === 'home' ? 'bg-grass-500' : match.pick === 'draw' ? 'bg-amber-400' : 'bg-coral-400';

  return (
    <div
      className="relative bg-pitch-800 border border-pitch-600 rounded-2xl p-5 hover:border-grass-500/40 transition-colors"
      style={{
        clipPath:
          'polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] uppercase tracking-wider text-ink-500 font-medium">
          {match.league}
        </span>
        <span className="font-mono text-[11px] text-ink-500">{match.time}</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center gap-2 flex-1">
          <TeamBadge code={match.home.code} />
          <span className="text-sm text-ink-100 font-medium">{match.home.name}</span>
        </div>
        <span className="text-ink-700 font-display text-sm px-2">VS</span>
        <div className="flex flex-col items-center gap-2 flex-1">
          <TeamBadge code={match.away.code} />
          <span className="text-sm text-ink-100 font-medium">{match.away.name}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <PickPill pick={match.pick} label={match.pickLabel} />
        <span className="font-mono text-lg font-semibold text-ink-100 tracking-wide">
          {match.score}
        </span>
      </div>

      <div>
        <div className="flex justify-between text-[11px] text-ink-500 mb-1.5">
          <span>Confidence</span>
          <span className="font-mono text-ink-300">{match.confidence}%</span>
        </div>
        <div className="w-full h-1.5 bg-pitch-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${barColor} rounded-full`}
            style={{ width: `${match.confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================
// APP
// ============================================
export default function App() {
  return (
    <div className="min-h-screen bg-pitch-950 text-ink-100 font-body bg-pitch-lines">
      {/* NAV */}
      <header className="border-b border-pitch-700/60 sticky top-0 bg-pitch-950/90 backdrop-blur-sm z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-grass-500 flex items-center justify-center">
              <span className="text-pitch-950 font-display font-bold text-sm">B</span>
            </div>
            <div className="leading-tight">
              <div className="font-display font-semibold text-sm tracking-tight">BetVision</div>
              <div className="text-[10px] text-ink-500 -mt-0.5">Football Analytics</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item}
                href="#"
                className={`text-sm transition-colors ${
                  i === 0 ? 'text-grass-400 font-medium' : 'text-ink-300 hover:text-ink-100'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button aria-label="Cari" className="w-9 h-9 rounded-full border border-pitch-600 flex items-center justify-center text-ink-400 hover:text-ink-100 hover:border-pitch-600 transition-colors">
              <Search size={15} />
            </button>
            <button aria-label="Mode gelap/terang" className="w-9 h-9 rounded-full border border-pitch-600 flex items-center justify-center text-ink-400 hover:text-ink-100 transition-colors">
              <Moon size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 grid md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div>
          <span className="inline-block text-[11px] uppercase tracking-wider text-grass-400 font-medium border border-grass-500/30 bg-grass-500/10 rounded-full px-3 py-1 mb-5">
            Berbasis statistik pertandingan
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mb-5">
            Baca pertandingan
            <br />
            sebelum <span className="text-grass-400">kick-off.</span>
          </h1>
          <p className="text-ink-300 text-base leading-relaxed mb-8 max-w-md">
            BetVision mengolah form tim, head-to-head, dan catatan kandang-tandang
            jadi prediksi skor dan confidence score yang bisa kamu telusuri sendiri.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#prediksi"
              className="bg-grass-500 hover:bg-grass-400 text-pitch-950 font-medium text-sm px-5 py-3 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              Lihat prediksi hari ini <ChevronRight size={15} />
            </a>
            <a
              href="#"
              className="border border-pitch-600 hover:border-ink-500 text-ink-100 font-medium text-sm px-5 py-3 rounded-lg transition-colors"
            >
              Jadwal lengkap
            </a>
          </div>
        </div>

        {/* Signature element: scoreboard panel, phone mockup jadi elemen dekoratif kecil di belakang */}
        <div className="relative">
          <div className="absolute -right-4 -top-6 w-40 h-72 bg-pitch-800 border border-pitch-600 rounded-[1.5rem] rotate-6 opacity-40 hidden lg:block" />
          <div className="relative bg-pitch-800 border border-pitch-600 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-grass-500 animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider text-ink-500 font-medium">
                Live scoreboard
              </span>
            </div>
            <div className="space-y-3">
              {TODAY_MATCHES.slice(0, 3).map((m) => (
                <div key={m.id} className="flex items-center justify-between font-mono text-sm">
                  <span className="text-ink-300">{m.home.code}</span>
                  <span className="text-ink-100 font-semibold tracking-widest">{m.score}</span>
                  <span className="text-ink-300">{m.away.code}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-pitch-700 flex items-center gap-2 text-[11px] text-ink-500">
              <TrendingUp size={13} className="text-grass-400" />
              Diperbarui berdasarkan statistik terbaru
            </div>
          </div>
        </div>
      </section>

      {/* TICKER — signature element */}
      <div className="border-y border-pitch-700/60 bg-pitch-900 overflow-hidden py-2.5">
        <div className="flex whitespace-nowrap animate-[scroll_28s_linear_infinite]">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-mono text-[11px] text-ink-500 mx-6 tracking-wide">
              {item}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* PREDIKSI HARI INI */}
      <section id="prediksi" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-7">
          <div>
            <span className="text-grass-400 text-xs font-mono">// prediksi hari ini</span>
            <h2 className="font-display text-2xl font-semibold mt-1">Pertandingan terdekat</h2>
          </div>
          <a href="#" className="text-sm text-ink-300 hover:text-grass-400 flex items-center gap-1 transition-colors">
            Lihat semua <ChevronRight size={15} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TODAY_MATCHES.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-10 border-t border-pitch-700/60">
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <h3 className="font-display text-base font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-pitch-700/60 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-grass-500 flex items-center justify-center">
              <span className="text-pitch-950 font-display font-bold text-xs">B</span>
            </div>
            <span className="font-display font-semibold text-sm">BetVision</span>
          </div>
          <p className="text-xs text-ink-500 max-w-md">
            Prediksi dibuat dari kalkulasi statistik, bukan jaminan hasil pertandingan.
            Gunakan sebagai bahan analisa, bukan kepastian.
          </p>
          <span className="text-xs text-ink-700">© 2026 BetVision</span>
        </div>
      </footer>
    </div>
  );
}
