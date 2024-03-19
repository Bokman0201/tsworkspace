import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes, useNavigate } from 'react-router-dom';
import { Home } from './components/Home';
import { Container } from 'react-bootstrap';
import Header from './components/template/Header';
import { Client } from './model/ClientModel';
import { Login } from './components/client/Login';
import { Signup } from './components/client/Signup';
import { BoardList } from './components/board/BoardList';
import { GroupList } from './components/group/GroupList';
import { useRecoilState } from 'recoil';
import { clientState } from './store/ClientStore';
import { MyGroup } from './components/group/MyGroup';
import { GroupDetail } from './components/group/GroupDetail';

function App() {
  const clientString = sessionStorage.getItem('client');
  const navigator = useNavigate();
  const [client, setClient] = useState<Client>({
    clientEmail: '',
    clientName: '',
    clientNick: '',
    clientJoinDate: '',
    clientBirth: '',
    affiliationId: 0
  });
  const [clientStore, setClientStore] =useRecoilState(clientState);



  useEffect(() => {
    if(clientString){
      const parseClient = JSON.parse(clientString)
      setClient(parseClient);
      setClientStore(parseClient);
    }
  else{
      navigator("/login");
  }
  }, [clientString])

  useEffect(()=>{
    //로그용
  },[client])









  return (
    <div className="" >

      {client.clientEmail !== '' && (
        <Header />
      )}

      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          
          <Route path='/boardList' element={<BoardList/>}/>

          <Route path='/groupList' element ={<GroupList/>}/>
          <Route path='/mygroup' element={<MyGroup/>}/>
          <Route path="/groupDetail" element={<GroupDetail />} />
        </Routes>
      </Container>


    </div>
  );
}

export default App;
