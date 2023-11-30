const { Country } = require('../db.js');

const getIdCountriesController = async (req, res) => {
    const idCountries = req.params.idCountries;

    try {

        if(!idCountries) return res.status(404).json({ error: 'Country not found' } );

        const countriesDetails = await Country.findOne(
            {
                where: {
                    id: idCountries
                }
            }
        )

        if(!countriesDetails) return res.status(404).json({ error: 'Country not found' } );

        const touristActivities = await countriesDetails.findOne(
            {
                where: {
                    id: idCountries
                },
                include: {
                    model: TouristActivity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: []
                    }
                }
            }
        );

        res.json({
            id: countriesDetails.id,
            name: countriesDetails.name,
            flagImg: countriesDetails.flagImg,
            continent: countriesDetails.continent,
            capital: countriesDetails.capital,
            subregion: countriesDetails.subregion,
            area: countriesDetails.area,
            population: countriesDetails.population,
            touristActivities: touristActivities.touristActivities
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getIdCountriesController;