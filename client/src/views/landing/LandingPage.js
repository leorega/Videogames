import {NavLink} from 'react-router-dom';
import styles from './landing.module.css';

function LandingPage () {
    return (
        <div className = {styles.div}>
            <NavLink to='/home'>
                <button className = {styles.button}>Ingresar</button>
            </NavLink>
        </div>
    );
};

export default LandingPage;