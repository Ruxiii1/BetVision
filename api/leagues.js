const { getLeagues } = require('../lib/apiFootball');

module.exports = async (req, res) => {
  try {
    const leagues = await getLeagues();
    res.status(200).json(leagues);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Gagal ambil data liga' });
  }
};
