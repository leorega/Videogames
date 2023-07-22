import SearchBar from '../../components/searchBar/SearchBar';
import Cards from '../../components/cards/Cards';
import styles from './home.module.css';

function Home () {
    return (
        <div className={styles.home}>
            <div className={styles.nav}>
                <h1 className={styles.title}>VideoGames</h1>
                <SearchBar/>
            </div>
            <Cards/>
        </div>
    );
}

export default Home;