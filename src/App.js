import React from 'react';
import './App.css';
import FooterButton from './components/UI/button/FooterButton';
import RouteComponent from './components/RouteComponent';
import { Link } from 'react-router-dom';


function App() {

  const removeToken = () => {
    localStorage.removeItem('Token')
  }

  return (
    <div className='container-fluid'>
        {/* <button className='sidebar-toggle'>
          <FaBars />
        </button> */}
        <Link to='login'>
          <button onClick={removeToken} className='logout-btn'>
            LOGOUT
          </button>
        </Link>
      <div className="App">
        <div style={{marginTop: '10%', marginBottom: '30%'}}>
        <div className='content'>
           <RouteComponent />
        </div>
        </div>
        <FooterButton />
      </div>
    </div>
  );
}

export default App;
