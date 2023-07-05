require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

async function getVideogames (req, res) {
    try {
        const response = await axios.get(URL);
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
                })
                return res.status(200).json(videogames);
            }
            else {
                return res.status(404).send('Not found');
            }
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    };
};

module.exports = getVideogames;