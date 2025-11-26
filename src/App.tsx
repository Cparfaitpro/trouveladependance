import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import './App.css'
import Fin from './pages/Fin';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trouveladependance/game" element={<Game />} />
        <Route path="*" element={<Home />} />
        <Route path="/trouveladependance/fin" element={<Fin />} />
      </Routes>
  );
}

export default App;