const { Country } = require('../db.js');

const getNameCountriesController = async (req, res) => {
    const name = req.query.name;

    try{
        const countries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });

        if(!countries.length) return res.status(404).json({ error: 'Country not found' } );

        res.json(countries);

    } catch(error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getNameCountriesController;