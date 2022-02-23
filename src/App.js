import 'antd/dist/antd.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from './pages/Admin/DashBoard';
import ParserResume from './pages/Admin/ParserResume';
import AdminJob from './pages/Admin/AdminJob';
import ProtectedRoutes from './components/ProtectRoutes';
import CheckUser from './pages/CheckUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/register/:type' element={<RegisterPage />} />
        <Route path='/check' element={<CheckUser />} />
        <Route path='/admin/job' element={<ProtectedRoutes><AdminJob /></ProtectedRoutes>} />
        <Route path='/admin/dashboard' element={<ProtectedRoutes><DashBoard /></ProtectedRoutes>} />
        <Route path='/admin/parse' element={<ProtectedRoutes><ParserResume /></ProtectedRoutes>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
