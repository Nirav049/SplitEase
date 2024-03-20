import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Transaction from './Components/Transaction/Transaction';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { SignIn, SignInButton } from '@clerk/clerk-react';

function App() {
  const [active, setActive] = useState(1);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null); // Change initial value to null

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const global = useGlobalContext();
  console.log(global);

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Transaction />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <div>
      {profile ? (
        <AppStyled bg={bg} className="App">
          {orbMemo}
          <MainLayout>
          <Navigation active={active} setActive={setActive} profile={profile} />
            <main>{displayData()}</main>
            
          </MainLayout>
        </AppStyled>
      ) : (
        <GoogleAuthentication login={login} />
      )}
    </div>
  );
}

const GoogleAuthentication = ({ login }) => (
  <div>
    <h2>Google Authentication</h2>
    
    <button type='button'className={'inputButton'} onClick={login}>Sign in with Google 🚀</button>
    
  </div>
);

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
