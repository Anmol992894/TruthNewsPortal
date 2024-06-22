import logo from './logo.svg';
import './App.css';
import News from './Component/News';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detailpage from './Component/Detailpage';
import Favorite from './Component/Favrouite';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <Routes>
      <Route path='/' element={<News/>}/>
      <Route path='/detail' element={<Detailpage/>}/>
      <Route path='/fav' element={<Favorite/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
