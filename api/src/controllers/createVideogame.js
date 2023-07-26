const {Videogame, Genre} = require('../db.js');

const createVideogame = async (req, res) => {
    const {name, description, platforms, image, released, rating, genres} = req.body;
    if (!name || !description || !platforms || !image || !released || !rating || !genres) {
        return res.json({message: "Faltan datos"});
    };
    
    try {
        
        const existingGenres = await Genre.findAll({ where: { id: genres } });

        
        const videogame = await Videogame.findOrCreate({ where: {
            name, description, platforms, image, released, rating
        }});
        await videogame[0].addGenres(existingGenres);

        return res.status(200).json(videogame[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
}

module.exports = createVideogame;