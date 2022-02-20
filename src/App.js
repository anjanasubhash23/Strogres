import 'antd/dist/antd.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from './pages/DashBoard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/register/:type' element={<RegisterPage />} />
        <Route path = '/dashboard' element = {<DashBoard/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
