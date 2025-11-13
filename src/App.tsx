import { Routes, Route, HashRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UserDetails } from './pages/UserDetails';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
