import { Routes, Route } from 'react-router-dom';
import Register from '../components/auth/Register';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
