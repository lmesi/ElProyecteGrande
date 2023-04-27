import './App.css'
import { Outlet } from 'react-router-dom';
import logo from './assets/Speedy Gonzales Transport.svg';

function App() {

  return (
    <div className="App">
      <Outlet />
      {location.pathname === '/' && (
        <div className="logoContainer">
          <img src={logo} alt="Logo" />
        </div>
      )}
    </div>
  )
}

export default App
