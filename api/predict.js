const { getTeamStats, getH2H } = require('../lib/apiFootball');

module.exports = async (req, res) => {
  try {
    const { homeId, awayId, leagueId, season } = req.query;
    if (!homeId || !awayId || !leagueId) {
      return res.status(400).json({ error: 'homeId, awayId, leagueId wajib diisi' });
    }

    const yr = season || new Date().getFullYear();

    const [homeStats, awayStats, h2h] = await Promise.all([
      getTeamStats(homeId, leagueId, yr),
      getTeamStats(awayId, leagueId, yr),
      getH2H(homeId, awayId),
    ]);

    const prediction = calculatePrediction(homeStats, awayStats, h2h, homeId);
    res.status(200).json(prediction);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Gagal generate prediksi' });
  }
};

function calculatePrediction(homeStats, awayStats, h2hMatches, homeId) {
  const homePlayed = homeStats.fixtures.played.total || 1;
  const awayPlayed = awayStats.fixtures.played.total || 1;
  const homePlayedHome = homeStats.fixtures.played.home || 1;
  const awayPlayedAway = awayStats.fixtures.played.away || 1;

  const homeWinRate = homeStats.fixtures.wins.total / homePlayed;
  const homeWinRateHome = homeStats.fixtures.wins.home / homePlayedHome;
  const awayWinRate = awayStats.fixtures.wins.total / awayPlayed;
  const awayWinRateAway = awayStats.fixtures.wins.away / awayPlayedAway;

  let h2hHomeWins = 0, h2hAwayWins = 0, h2hDraws = 0;
  h2hMatches.forEach((m) => {
    const homeGoals = m.goals.home;
    const awayGoals = m.goals.away;
    const isHomeTeamHome = m.teams.home.id == homeId;
    if (homeGoals === awayGoals) h2hDraws++;
    else if ((homeGoals > awayGoals && isHomeTeamHome) || (awayGoals > homeGoals && !isHomeTeamHome)) h2hHomeWins++;
    else h2hAwayWins++;
  });
  const h2hTotal = h2hMatches.length || 1;

  const homeScore = homeWinRateHome * 0.4 + homeWinRate * 0.3 + (h2hHomeWins / h2hTotal) * 0.3;
  const awayScore = awayWinRateAway * 0.4 + awayWinRate * 0.3 + (h2hAwayWins / h2hTotal) * 0.3;

  const total = homeScore + awayScore || 1;
  let homeWinPct = Math.round((homeScore / total) * 100);
  let awayWinPct = Math.round((awayScore / total) * 100);
  let drawPct = 100 - homeWinPct - awayWinPct;

  if (drawPct < 10) {
    const diff = 10 - drawPct;
    drawPct = 10;
    if (homeWinPct > awayWinPct) homeWinPct -= diff;
    else awayWinPct -= diff;
  }

  const homeAvgScored = parseFloat(homeStats.goals.for.average.total) || 1;
  const awayAvgConceded = parseFloat(awayStats.goals.against.average.total) || 1;
  const awayAvgScored = parseFloat(awayStats.goals.for.average.total) || 1;
  const homeAvgConceded = parseFloat(homeStats.goals.against.average.total) || 1;

  const predictedHomeGoals = Math.max(0, Math.round((homeAvgScored + awayAvgConceded) / 2));
  const predictedAwayGoals = Math.max(0, Math.round((awayAvgScored + homeAvgConceded) / 2));

  return {
    homeWinPct,
    drawPct,
    awayWinPct,
    predictedScore: `${predictedHomeGoals}-${predictedAwayGoals}`,
    h2hSummary: { homeWins: h2hHomeWins, awayWins: h2hAwayWins, draws: h2hDraws, total: h2hMatches.length },
  };
}
