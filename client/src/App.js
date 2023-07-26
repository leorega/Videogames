import {Routes, Route} from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import LandingPage from './views/landing/LandingPage.js';
import Home from './views/home/Home.js';
import Detail from './views/detail/Detail.js';
import Form from './views/form/Form.js';
import './App.css';

function App() {

    useEffect(() => {
      axios.get('http://localhost:3001/genres')
        .then(response => {
          console.log('Datos cargados:', response.data);
        })
        .catch(error => {
          console.error('Error al cargar los datos:', error);
        });
    }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
