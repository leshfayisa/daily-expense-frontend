import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
const BASE_URL = `${config.API_BASE_URL}/expenses`;

export default function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(BASE_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Fetched expenses:", res.data);

            setExpenses(res.data);
        } catch (err) {
            setError('Failed to load expenses');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className='flex justify-between items-center mb-2'>
                <h1 className="text-2xl font-bold mb-4">Your Expenses</h1>
                <button
                    onClick={() => navigate("/add")}
                    className='py-2 px-4 bg-green-500 hover:bg-green-600 rounded'
                >add more expenses
                </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {expenses.length === 0 ? (
                <p className='text-center'>No expenses yet.</p>
            ) : (
                <div className="space-y-4">
                    {expenses.map((expense) => (
                        <div
                            key={expense.expense_id}
                            className="bg-white p-4 rounded shadow-sm flex justify-between items-center max-w-md"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{expense.title}</h2>
                                <p className="text-sm text-gray-500">
                                    Category: {expense.category_name} | Date: {formatDate(expense.date)}
                                </p>
                            </div>
                            <span className="text-right font-bold text-green-600">
                                ${expense.amount}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
