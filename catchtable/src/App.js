import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './component/Home';

function App() {
  return (
    <div className="">


        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;
