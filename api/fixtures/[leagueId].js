const { getFixtures } = require('../../lib/apiFootball');

module.exports = async (req, res) => {
  try {
    const { leagueId } = req.query;
    const season = req.query.season || new Date().getFullYear();
    const fixtures = await getFixtures(leagueId, season);
    res.status(200).json(fixtures);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Gagal ambil jadwal pertandingan' });
  }
};
