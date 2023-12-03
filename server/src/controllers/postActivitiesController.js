const { Country } = require('../db.js');
const { Op } = require("sequelize");

const postActivitiesController = async (req, res) => {
    const name = req.query.name;

    try{
        const countries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });

        if(!countries.length === 0 ) return res.status(404).json({ error: 'Country not found' } );

        res.json(countries);
    } catch(error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = postActivitiesController;