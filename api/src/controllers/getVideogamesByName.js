require('dotenv').config();
const {Op} = require('sequelize');
const {Videogame} = require('../db.js');
const axios = require('axios');
const {API_KEY} = process.env;
const URL = "https://api.rawg.io/api/games";

async function getVideogamesByName(req, res) {
    const {name} = req.query;
    try {
      const videogamesFromDB = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        limit: 15,
      });
      const videogamesDB = videogamesFromDB.map(videogame => {
        return videogame.get({ plain: true });
      });  
      
      const response = await axios.get(`${URL}?search={${name}}&key=${API_KEY}`); 
      const videogamesAPI = response.data.results;
      if (videogamesAPI.length > 0) {
        const gamesAPI = videogamesAPI.map(game => {
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
        let allVideogames = [...videogamesDB, ...gamesAPI]
        return res.status(200).json(allVideogames);
      } else {
        return res.status(404).send('No se encontraron videojuegos con ese nombre.');
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  module.exports = getVideogamesByName;