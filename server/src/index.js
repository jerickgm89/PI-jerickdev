const server = require("./server.js");
const { conn } = require('./db.js');
const fs = require('fs').promises;
const Country = require('./models/Country.js');

const PORT = process.env.PORT || 5000;

async function fetchCountries(){
    try {
        const data = await fs.readFile('../api/db.json', 'utf8');
        const json = JSON.parse(data);
        const countries = json.countries;
    
        for (let country of countries) {
            const mappedCountry = {
                id: country.cca3,
                name: country.name.common,
                flag_image: country.flags.png,
                continent: country.region,
                capital: country.capital ? country.capital[0] : 'N/A',
                population: country.population,
                subregion: country.subregion,
                area: country.area,
            };
            await Country.create(mappedCountry);
        }
      } catch (error) {
        console.error(error);
      }
}

try {
    server.listen(PORT, async() => {
        console.log(`Server listening on port ${PORT}`);
        await conn.sync({ force: false });
        console.log('Database connected');

        //Verificar si hay paises en la base de datos
        const countriesCount = await Country.count();
        if (countriesCount === 0){
            await fetchCountries();
        }
    });
} catch (error) {
    console.log(error);
}