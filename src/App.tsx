import React from 'react';
import logo from './logo.svg';
import './App.css';
import Registration from './component/SignUp';
import Login from './component/Login';
import PostItem from './component/post';
import Nav from './component/Navbar';
import Home from './component/Home';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SideBar from './component/SideBar';
import Profile from './component/profile';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        {/* <Registration/> */}
        <Route  path='/' element={<Registration/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/home' element={<Home/>}/>
        
        </Routes>
      </Router>
      
    
    </div>
  );
}

export default App;
