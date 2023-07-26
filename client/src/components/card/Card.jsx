import {useNavigate} from 'react-router-dom';
import styles from './card.module.css';

function Card (props) {

    const {game} = props;

    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate(`/detail/${game.id}`);
    };

    const genresList = game.genres.join(', ');

    return (
        <div className={styles.card} onClick={navigateHandler}>
            <img src={game.image} alt={game.name} className={styles.images}/>
            <div className={styles.info}>
                <h2 className={styles.font}>{game.name}</h2>
                <p className={styles.font}>{genresList}</p>
            </div>
        </div>
    )
}

export default Card;

