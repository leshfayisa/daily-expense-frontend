import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
const BASE_URL = config.API_BASE_URL

export default function AddExpense() {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category_id: '',
    date: ''
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/expenses/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(`${BASE_URL}/expenses`,
        {
          title: form.title,
          amount: parseFloat(form.amount),
          category_id: parseInt(form.category_id),
          date: form.date
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to add expense');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Add New Expense</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          required
        />

        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          required
        />

        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
