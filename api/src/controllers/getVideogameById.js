require('dotenv').config();
const {Videogame, Genre} = require('../db.js');
const axios = require('axios');
const {API_KEY} = process.env;
const URL = "https://api.rawg.io/api/games/";

async function getVideogamesById (req, res) {

    const {idVideogame} = req.params;

    try {
        if (idVideogame.includes("-")) {
            let videogameFromDB = await Videogame.findOne({
                where: {
                    id: idVideogame
                },
                include: {model: Genre}
            });

            if (videogameFromDB) {
                videogameFromDB = videogameFromDB.toJSON();
                return res.status(200).json(videogameFromDB);
            }; 

            return res.json({error: error.message});
        };

        const response = await axios.get(`${URL}${idVideogame}?key=${API_KEY}`);

        if (response.data) {
            const game = response.data;
            const videogame = {
                id: game.id,
                name: game.name,
                description: game.description,
                platforms: game.platforms.map(platform => platform.platform.name),
                genres: game.genres.map(genre => genre.name),
                image: game.background_image,
                released: game.released,
                rating: game.rating
            };
            return res.status(200).json(videogame);
        };
    }
    catch (error) {
        return res.json({message: error.message});
    };
};

module.exports = getVideogamesById;