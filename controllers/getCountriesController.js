const { Country } = require('../db.js');

const getCountriesController = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getCountriesController;