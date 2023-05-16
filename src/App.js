import './App.css';
import Login from "./components/login/Login"
import Signup from './components/signup/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgetPass from './components/forget-pass/ForgetPass';
import Mansger from './components/mansger/Mansger';

function App() {

  return (

    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Mansger />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget-pass' element={<ForgetPass />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
