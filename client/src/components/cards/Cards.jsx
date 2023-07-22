import {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '../card/Card';
import styles from './cards.module.css';

const URL = 'http://localhost:3001/videogames';

function Cards () {

    const [games, setGames] = useState([]);

    useEffect(() => {
        const getGames = async () => {
          try {
            const response = await axios.get(URL);
            setGames(response.data);
          } catch (error) {
            console.error('Error en la llamada:', error);
          }
        };
        getGames();
      }, []);

    return (
        <div className={styles.cards}>
            {games.map((game) => (
                <Card key={game.id} game={game}/>
            ))}
        </div>
    );
}

export default Cards;