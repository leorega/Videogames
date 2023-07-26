import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './card.module.css';

function Card (props) {

    const {game} = props;

    const navigate = useNavigate();

    const [genresList, setGenresList] = useState('');

    useEffect(() => {
        if (game.genres && game.genres.length > 0) {
        setGenresList(game.genres.join(', '));
        } else {
        fetchGenres(game.id);
        }
    }, [game]);

    const fetchGenres = async (gameId) => {
        try {
          const response = await axios.get(`http://localhost:3001/videogames/${gameId}/genres`);
          const genres = response.data.map((genre) => genre.name).join(', ');
          setGenresList(genres);
        } catch (error) {
          console.error('Error al obtener los géneros del juego:', error);
        }
      };

    const navigateHandler = () => {
        navigate(`/detail/${game.id}`);
    };

    return (
        <div className={styles.card} onClick={navigateHandler}>
            <img src={game.image} alt={game.name} className={styles.images}/>
            <div className={styles.info}>
                <h2 className={styles.font}>{game.name}</h2>
                {genresList && <p className={styles.font}>{genresList}</p>}
            </div>
        </div>
    )
}

export default Card;

