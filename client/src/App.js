import {Routes, Route} from 'react-router-dom';
import LandingPage from './views/landing/LandingPage.js';
import Home from './views/home/Home.js';
import Detail from './views/detail/Detail.js';
import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
