import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import styles from './detail.module.css';

const URL = 'http://localhost:3001/videogames/';

function Detail() {

    const navigate = useNavigate();

    const {id} = useParams();
    const [game, setGame] = useState({});
    
    useEffect(() => {
        const game = async () => {
            try {
                const response = await axios.get(`${URL}${id}`);
                setGame(response.data);
            } catch (error) {
                console.error('Error en la llamada:', error);
            }
        };
        game();
    }, [id]);

    function handleClose() {
        navigate(-1);
    };
    
    return (
        <div className={styles.detailContainer}>
            <button className={styles.closeButton} onClick={handleClose}>X</button>
            <div className={styles.detailImage}>
                <div className={styles.detail}>
                    <h2>{game.name}</h2>
                    <h3>+  ID: {game.id}</h3>
                    {game.platforms && <h3>+  Platforms: {game.platforms.join(', ')}</h3>}
                    <h3>+  Rating: {game.rating}</h3>
                    <h3>+  Released: {game.released}</h3>
                    {game.genres && <h3>+  Genres: {game.genres.join(', ')}</h3>}
                </div>
                <img className={styles.image} src={game.image} alt={game.name}/>
            </div>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: game.description }}>
            </div>
        </div>
    );
}

export default Detail;