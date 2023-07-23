import {useEffect, useState} from 'react';
import Card from '../card/Card';
import styles from './cards.module.css';

function Cards (props) {

    const {games, currentPage, setCurrentPage} = props;

    const gamesPerPage = 15;

    const [aPageGames, setAPageGames] = useState([]);

    useEffect(() => {
      setAPageGames(games.slice(currentPage * gamesPerPage, (currentPage + 1) * gamesPerPage));
    },[games, currentPage]); 
    
    function nextPage () {
        const totalElements = games.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * gamesPerPage;

        if (firstIndex >= totalElements) return;

        setCurrentPage(nextPage);
    };

    function prevPage () {
        const prevPage = currentPage - 1;

        if (prevPage < 0) return;

        setCurrentPage(prevPage);
    };

    return (
        <div>
            <div className={styles.paginate}>
                <button className={styles.button} onClick={prevPage}>Prev</button>
                <h3 className={styles.font}>Page {currentPage+1}</h3>
                <button className={styles.button} onClick={nextPage}>Next</button>
            </div>
            <div className={styles.cards}>
                {aPageGames.map((game) => (
                    <Card key={game.id} game={game}/>
                ))}
            </div>
        </div>
    );
}

export default Cards;

