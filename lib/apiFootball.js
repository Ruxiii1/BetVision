const axios = require('axios');

const client = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  headers: {
    'x-apisports-key': process.env.API_FOOTBALL_KEY,
  },
});

// Catatan: serverless function itu stateless (instance-nya bisa mati-hidup),
// jadi in-memory cache di sini nggak sereliable versi server biasa.
// Cukup buat ngirit request dalam durasi hidup satu instance aja.
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 jam

async function cachedGet(endpoint, params) {
  const key = endpoint + JSON.stringify(params);
  const cached = cache.get(key);

  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return cached.data;
  }

  const res = await client.get(endpoint, { params });
  cache.set(key, { data: res.data.response, time: Date.now() });
  return res.data.response;
}

async function getLeagues() {
  return cachedGet('/leagues', { current: 'true' });
}

async function getFixtures(leagueId, season) {
  return cachedGet('/fixtures', { league: leagueId, season, next: 20 });
}

async function getTeamStats(teamId, leagueId, season) {
  return cachedGet('/teams/statistics', { team: teamId, league: leagueId, season });
}

async function getH2H(team1Id, team2Id) {
  return cachedGet('/fixtures/headtohead', { h2h: `${team1Id}-${team2Id}`, last: 10 });
}

module.exports = { getLeagues, getFixtures, getTeamStats, getH2H };
