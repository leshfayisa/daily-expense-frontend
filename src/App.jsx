import { Routes, Route } from 'react-router-dom';
import Register from '../components/auth/Register';
import Dashboard from '../components/view/Dashboard';
import Login from '../components/auth/Login';
import AddExpense from '../components/view/AddExpense';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add" element={<AddExpense />} />
    </Routes>
  );
}

export default App;
