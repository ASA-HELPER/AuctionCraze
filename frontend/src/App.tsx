import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { useAppDispatch } from './hooks/storeHooks';
import { Home, Login } from './pages';

function App() {
  const dispatch = useAppDispatch();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <ToastContainer position='top-right' theme='dark'/>
    </Router>
  )
}

export default App
