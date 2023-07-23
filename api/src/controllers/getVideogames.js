/*require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

async function getVideogames (req, res) {
    try {
        const totalpages = 5;
        const allVideoGames = [];
        for (let page = 1; page <= totalpages.length; page++){   
            const response = await axios.get(`${URL}&page=${page}`);
            if (response.data.results && response.data.results.length > 0) {
                const videogames = response.data.results.map(game => {
                    let videogame = {
                        id: game.id,
                        name: game.name,
                        description: game.description,
                        platforms: game.platforms?.map(platform => platform.platform.name),
                        image: game.background_image,
                        genres: game.genres?.map(genre => genre.name),
                        released: game.released,
                        rating: game.rating
                    };
                    return videogame;
                });
                allVideoGames.push(...videogames);
            }
        }
        console.log(allVideoGames);
        return res.status(200).json(allVideoGames);
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    };
};

module.exports = getVideogames;*/
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

async function getVideogames(req, res) {
  try {
    const totalPages = 5; 
    const allVideogames = [];
    
    for (let page = 1; page <= totalPages; page++) {
      const response = await axios.get(`${URL}&page=${page}`);
      if (response.data.results && response.data.results.length > 0) {
        const videogames = response.data.results.map(game => {
          let videogame = {
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: game.platforms?.map(platform => platform.platform.name),
            image: game.background_image,
            genres: game.genres?.map(genre => genre.name),
            released: game.released,
            rating: game.rating
          };
          return videogame;
        });
        allVideogames.push(...videogames);
      }
    }

    if (allVideogames.length > 0) {
      return res.status(200).json(allVideogames);
    } else {
      return res.status(404).send('Not found');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = getVideogames;
