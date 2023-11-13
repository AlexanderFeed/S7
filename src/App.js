import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';
import Users from './Users';
import Watch from './Watch';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Appheader></Appheader>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/users/:id' element={<Watch/>}></Route>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
