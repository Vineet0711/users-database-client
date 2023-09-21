import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header/Header'
import Home from './Pages/Home/Home';
import Edit from './Pages/Edit/Edit';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';
import { Route,Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/userprofile/:id' element={<Profile/>}/>
        <Route path='/' element={Home}/>
      </Routes>
    </div>
  )
}

export default App
