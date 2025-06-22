import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getExpenses, deleteExpense, filterExpenses } from '../services/expenseService';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns';

export default function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState();
    const { logout } = useAuth();
    const [range, setRange] = useState('all');

    const fetchExpenses = async () => {
        try {
            const data = await getExpenses();
            setExpenses(data);
        } catch (err) {
            setError('Failed to load expenses');
        }
    };

    const handleDelete = async (expenseId) => {
        try {
            await deleteExpense(expenseId)
            setExpenses((prev) => prev.filter((e) => e.expense_id !== expenseId));
            setMessage("Expense deleted successfully");
        } catch (err) {
            console.error(err);
            setError("Failed to delete expense");
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const computeRange = (type) => {
        const today = new Date();
        if (type === 'this_week') {
            return {
                from: format(startOfWeek(today), 'yyyy-MM-dd'),
                to: format(endOfWeek(today), 'yyyy-MM-dd')
            };
        }
        if (type === 'this_month') {
            return {
                from: format(startOfMonth(today), 'yyyy-MM-dd'),
                to: format(endOfMonth(today), 'yyyy-MM-dd')
            };
        }
        // return custom manually
    };

    useEffect(() => {
        const fetchFiltered = async () => {
            if (range === 'custom') return; // Skip until custom UI added
            if (range === 'all') {
                fetchExpenses();
                return;
            }
            const { from, to } = computeRange(range);
            try {
                const data = await filterExpenses(from, to);
                setExpenses(data);
            } catch (err) {
                setError("Failed to filter expenses");
            }
        };

        fetchFiltered();
    }, [range]);


    const Total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className='flex justify-between items-center mb-2'>
                <h1 className="text-2xl font-bold mb-4">Your Expenses</h1>
                <button
                    onClick={() => logout()}
                    className='my-4 py-1.5 px-3 bg-gray-600 hover:bg-gray-700 transition-colors rounded text-white cursor-pointer'
                >Logout
                </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {message && <p className="text-green-600 mb-4">{message}</p>}
            <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Total expense: ${Total.toFixed(2)}</p>
                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="all">Show All</option>
                    <option value="this_week">This Week</option>
                    <option value="this_month">This Month</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
            <button
                onClick={() => navigate("/add")}
                className='my-4 py-1.5 px-3 bg-green-600 hover:bg-green-700 rounded cursor-pointer'
            >add more expenses
            </button>
            {expenses.length === 0 ? (
                <p className='text-center'>No expenses yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {expenses.map((expense) => (
                        <div
                            key={expense.expense_id}
                            className="bg-white px-4 py-2 rounded shadow-sm flex flex-col items-center gap-3"
                        >
                            <div className='w-full flex justify-end gap-2'>
                                <button
                                    onClick={() => navigate(`/edit/${expense.expense_id}`)}
                                    className='px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-sm cursor-pointer'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(expense.expense_id)}
                                    className='px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-sm cursor-pointer'
                                >
                                    Delete
                                </button>
                            </div>

                            <div className='w-full flex justify-between items-center'>
                                <h2 className="text-lg font-semibold">{expense.title}</h2>
                                <p className="text-sm text-gray-500">
                                    Category: {expense.category_name} | Date: {formatDate(expense.date)}
                                </p>

                                <span className="text-right font-bold text-green-600">
                                    ${expense.amount}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
