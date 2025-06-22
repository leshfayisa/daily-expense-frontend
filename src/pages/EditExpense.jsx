import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getExpenseById, updateExpense } from '../services/expenseService';
import { getCategories } from '../services/categoryService';

export default function EditExpense() {
    const { id } = useParams();
    const [form, setForm] = useState({
        title: '',
        amount: '',
        category_id: '',
        date: ''
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const expense = await getExpenseById(id);
                setForm({
                    title: expense.title,
                    amount: expense.amount,
                    category_id: expense.category_id,
                    date: expense.date.split('T')[0]
                });

                const cats = await getCategories();
                setCategories(cats);
            } catch (err) {
                console.error(err);
                setError('Failed to load expense or categories');
            }
        };
        load();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await updateExpense(id, {
                title: form.title,
                amount: parseFloat(form.amount),
                category_id: parseInt(form.category_id),
                date: form.date
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Failed to update expense');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Expense</h2>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <input name="title" value={form.title} placeholder='Title' onChange={handleChange} className="w-full mb-3 p-2 border border-gray-300 rounded" required />
                <input name="amount" type="number" placeholder='Amount' value={form.amount} onChange={handleChange} className="w-full mb-3 p-2 border border-gray-300 rounded" required />

                <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full mb-3 p-2 border border-gray-300 rounded" required>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                    ))}
                </select>

                <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full mb-3 p-2 border border-gray-300 rounded" required />

                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full cursor-pointer">Update Expense</button>
            </form>
        </div>
    );
}
