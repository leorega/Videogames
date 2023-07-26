require('dotenv').config();
const {Genre} = require('../db.js')
const axios = require('axios');
const {API_KEY} = process.env;
const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

/*async function getGenres (req, res) {
    try {
        const response = await axios.get(URL);
            if (response.data.results && response.data.results.length > 0) {
                const genres = response.data.results.map(g => {
                    let genre = {
                        id: g.id,
                        name: g.name,
                    };
                    return genre;
                })
                await Genre.bulkCreate(genres);
                return res.status(200).json(genres);
            }
            else {
                return res.status(404).send('Not found');
            }
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    };
};

module.exports = getGenres;*/

async function getGenres(req, res) {
    try {
      const response = await axios.get(URL);
      if (response.data.results && response.data.results.length > 0) {
        const genres = response.data.results.map((g) => ({
          id: g.id,
          name: g.name,
        }));
  
        // Verificar si cada género ya existe en la base de datos antes de insertarlo
        const existingGenres = await Promise.all(
          genres.map(async (genre) => {
            const existingGenre = await Genre.findOne({ where: { id: genre.id } });
            return existingGenre ? null : genre;
          })
        );
  
        // Filtrar los géneros para insertar solo aquellos que no existen
        const genresToInsert = existingGenres.filter((genre) => genre !== null);
  
        // Insertar los nuevos géneros en la base de datos
        if (genresToInsert.length > 0) {
          await Genre.bulkCreate(genresToInsert);
        }
  
        return res.status(200).json(genres);
      } else {
        return res.status(404).send('Not found');
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  module.exports = getGenres;