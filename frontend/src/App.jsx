import './css/App.css'
import { Outlet } from 'react-router-dom';
import logo from './assets/Speedy Gonzales Transport.svg';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Outlet />
      {location.pathname === '/' || location.pathname === '/admin' ? (
        <div className="logoContainer">
          <img src={logo} alt="Logo" />
        </div>
      ) : <></>}
    </div>
  )
}

export default App
