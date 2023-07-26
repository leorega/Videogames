import {useEffect, useState} from 'react';
import Card from '../card/Card';
import styles from './cards.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { filterByGenre, filterBySource, sortByAlphabetical, sortByRating } from '../../redux/actions';

function Cards (props) {

    const {
        games, 
        currentPage, 
        setCurrentPage
    } = props;

    const filteredGames = useSelector((state) => state.filteredGames);
    const dispatch = useDispatch();
    console.log(filteredGames);
    const gamesPerPage = 15;

    const [aPageGames, setAPageGames] = useState([]);

    useEffect(() => {
        setAPageGames(games.slice(currentPage * gamesPerPage, (currentPage + 1) * gamesPerPage));
    }, [games, currentPage]); 

    useEffect(() => {
        setAPageGames(filteredGames.slice(currentPage * gamesPerPage, (currentPage + 1) * gamesPerPage));
    }, [filteredGames, currentPage]);
    
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

    function handleFilterByGenre (e) {
        dispatch(filterByGenre(e.target.textContent));
    };

    function handleFilterBySource (e) {
        dispatch(filterBySource(e.target.textContent));
    };

    function handleSortByAlpha (e) {
        dispatch(sortByAlphabetical(e.target.textContent))
    };

    function handleSortByRating (e) {
        dispatch(sortByRating(e.target.textContent))
    };


    return (
        <div>
            <div className={styles.paginate}>
                <nav className={styles.contNav}>
                    <div className={styles.filterNav}>
                        <span>Filter by:</span>
                        <div>
                            <button className={styles.button}>Genres</button>
                            <ul className={styles.ul}>
                                <li onClick={handleFilterByGenre} value='Action'>Action</li>
                                <li onClick={handleFilterByGenre} value='Indie'>Indie</li>
                                <li onClick={handleFilterByGenre} value='Adventure'>Adventure</li>
                                <li onClick={handleFilterByGenre} value='RPG'>RPG</li>
                                <li onClick={handleFilterByGenre} value='Strategy'>Strategy</li>
                                <li onClick={handleFilterByGenre} value='Shooter'>Shooter</li>
                                <li onClick={handleFilterByGenre} value='Casual'>Casual</li>
                                <li onClick={handleFilterByGenre} value='Simulation'>Simulation</li>
                                <li onClick={handleFilterByGenre} value='Puzzle'>Puzzle</li>
                                <li onClick={handleFilterByGenre} value='Arcade'>Arcade</li>
                                <li onClick={handleFilterByGenre} value='Platformer'>Platformer</li>
                                <li onClick={handleFilterByGenre} value='Racing'>Racing</li>
                                <li onClick={handleFilterByGenre} value='Sports'>Sports</li>
                                <li onClick={handleFilterByGenre} value='Fighting'>Fighting</li>
                                <li onClick={handleFilterByGenre} value='Family'>Family</li>
                                <li onClick={handleFilterByGenre} value='Board Games'>Board Games</li>
                                <li onClick={handleFilterByGenre} value='Educational'>Educational</li>
                                <li onClick={handleFilterByGenre} value='Card'>Card</li> 
                                <li onClick={handleFilterByGenre} value='Massively Multiplayer'>Massively Multiplayer</li>
                            </ul>
                        </div>
                        <div>
                            <button className={styles.button}>Sources</button>
                            <ul className={styles.ul}>
                                <li onClick={handleFilterBySource} value='API'>API</li>
                                <li onClick={handleFilterBySource} value='Data Base'>Data Base</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.filterNav}>
                        <span>Order by:</span>
                        <div>
                            <button className={styles.button}>Name</button>
                            <ul className={styles.ul}>
                                <li onClick={handleSortByAlpha} value='Ascending'>Ascending</li>
                                <li onClick={handleSortByAlpha} value='Descending'>Descending</li>
                            </ul>
                        </div>
                        <div>
                            <button className={styles.button}>Rating</button>
                            <ul className={styles.ul}>
                                <li onClick={handleSortByRating} value='Ascending'>Ascending</li>
                                <li onClick={handleSortByRating} value='Descending'>Descending</li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className={styles.contNav}>
                    <button className={styles.button} onClick={prevPage}>Prev</button>
                    <h3 className={styles.font}>Page {currentPage+1}</h3>
                    <button className={styles.button} onClick={nextPage}>Next</button>
                </div>
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



