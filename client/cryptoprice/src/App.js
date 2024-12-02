import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { Route,Routes } from 'react-router-dom';
import Trending from './components/trending';
import Exchanges from './components/exchanges';
import Footer from './components/footer/footer';
function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/trending' element={<Trending/>}/>
        <Route  path="/exchanges" element={<Exchanges/>}/>
      </Routes>
     <Footer/>

    </div>
  );
}

export default App;
