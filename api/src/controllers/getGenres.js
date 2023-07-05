require('dotenv').config();
const {Genre} = require('../db.js')
const axios = require('axios');
const {API_KEY} = process.env;
const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

async function getGenres (req, res) {
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

module.exports = getGenres;