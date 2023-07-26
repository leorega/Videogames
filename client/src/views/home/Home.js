import {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBar from '../../components/searchBar/SearchBar';
import Cards from '../../components/cards/Cards';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import styles from './home.module.css';

const URL = 'http://localhost:3001/videogames';

function Home () {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [games, setGames] = useState([]);
    const [reloadGames, setReloadGames] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    
    useEffect(() => {
        const getGames = async () => {
            try {
                const response = await axios.get(URL);
                setGames(response.data);
                setCurrentPage(0);
                dispatch({type: 'INITIALIZE_GAMES', payload: response.data});
            } catch (error) {
                console.error('Error en la llamada:', error);
            }
        };
        getGames();
    }, [reloadGames]);
    
    async function onSearch (name) {
        try {
            const response = await axios(`${URL}/name?name=${name}`);
            
            setGames(response.data); 
            setCurrentPage(0);
            dispatch({type: 'INITIALIZE_GAMES', payload: response.data});
        }
        catch (error) {
            console.log(error)
        };
    };
    
    function handleTitleClick () {
        setReloadGames(prevState => !prevState);       
    };

    function handleClick () {
        navigate('/form');
    }

    return (
        <div className={styles.home}>
            <div className={styles.nav}>
                <h1 className={styles.title} onClick={handleTitleClick}>VideoGames</h1>
                <SearchBar onSearch={onSearch}/>
                <button className={styles.button} onClick={handleClick}>Create Game</button>
            </div>
            {games.length > 0 ? 
            <Cards games={games} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
            /> : <h2 className={styles.loading}>Loading...</h2>}
        </div>
    );
}

export default Home;



