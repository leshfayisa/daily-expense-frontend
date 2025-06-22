import { useState } from 'react';
import { registerUser } from '../../services/authService';

function Register() {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (!form.first_name || !form.last_name || !form.email || !form.password) {
            return alert("Please all the fields")
        }
        try {
            const res = await registerUser(form);
            alert(res.message);
            setLoading(false)
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-96'>
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <div className='flex flex-col gap-3'>
                    <input
                        key="first_name"
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        placeholder={"first name".toUpperCase()}
                        className="p-2 border border-gray-300 w-full rounded"
                    />
                    <input
                        key="last_name"
                        type="text"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        placeholder={"last name".toUpperCase()}
                        className="p-2 border border-gray-300 w-full rounded"
                    />
                    <input
                        key="email"
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={"email".toUpperCase()}
                        className="p-2 border border-gray-300 w-full rounded"
                    />
                    <input
                        key="password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder={"password".toUpperCase()}
                        className="p-2 border border-gray-300 w-full rounded"
                    />
                </div>
                <button type="submit"
                    className={`mt-6 text-white px-4 py-2 rounded w-full ${loading ? 'bg-gray-200 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                    disabled={loading}
                >
                    Register
                </button>
            </form>

        </div>
    )
}

export default Register;