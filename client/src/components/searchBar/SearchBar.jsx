import {useState} from 'react';
import styles from './searchBar.module.css';

export default function SearchBar(props) {

   const {onSearch} = props;

   const [name, setname] = useState('')

   function changeHandler (event) {
      event.preventDefault();
      let input = event.target.value

      setname(input)
   }

   return (
      <div className={styles.searchBar}>
         <input className={styles.input} type='search' value={name} onChange={changeHandler}/>
         <button className={styles.button} onClick={()=>onSearch(name)}>Search</button>
      </div>
   );
}