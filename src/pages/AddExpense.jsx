import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addExpense} from '../services/expenseService';
import { getCategories } from '../services/categoryService';

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

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Could not fetch categories');
      }
    };

    fetchCategories();
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await addExpense({
        title: form.title,
        amount: parseFloat(form.amount),
        category_id: parseInt(form.category_id),
        date: form.date
      });
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
        className="bg-white p-6 rounded shadow-sm w-full max-w-md"
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
          className="w-full max-h-32 mb-3 p-2 border border-gray-300 rounded"
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
