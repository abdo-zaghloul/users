import { Routes, Route, HashRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UserDetails } from './pages/UserDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
