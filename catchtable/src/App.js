import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './component/HomeComponent/Home';
import { Header } from './component/template/Header';
import { LoginHome } from './component/LoginComponent/LoginHome';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { clientState } from './recoil/clientStore';
import { SignUp } from './component/signComponent/SignUp';
import { Footer } from './component/template/Footer';
import { MyPage } from './component/ClientComponent/Mypage';
import { Management } from './component/RestaurantComponent/Management';
import { RestaurantList } from './component/RestaurantComponent/RestaurantList';
import { RestaurantDetail } from './component/RestaurantComponent/RestaurantDetail';
import { ResFooter } from './component/template/ResFooter';


function App() {
  const sessionClientInfo = sessionStorage.getItem("clientInfo")
  const [clientInfo, setClientInfo] = useRecoilState(clientState);
  const location = useLocation();

  const navigator = useNavigate();
  useEffect(() => {
    if (sessionClientInfo !== "") {
      setClientInfo(JSON.parse(sessionClientInfo))
    } else {
      navigator('/login')
    }
  }, [sessionClientInfo])


  return (
    <div className="app">
      <header>
        <Header />

      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<LoginHome />} />
          <Route path='/management' element={<Management />} />
          <Route path='/resList' element={<RestaurantList />} />
          <Route path='/resDetail' element={<RestaurantDetail />} />
        </Routes>
      </main>
      <footer>
        {location.pathname !== "/resDetail" && (
          <Footer />
        )}
      </footer>
    </div>
  );
}

export default App;
