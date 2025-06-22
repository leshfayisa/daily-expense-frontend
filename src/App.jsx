import { Routes, Route } from 'react-router-dom';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add" element={<AddExpense />} />
      <Route path="/edit/:id" element={<EditExpense />} />
    </Routes>
  );
}

export default App;
