import api from './api';

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`
});

// get user expenses
export const getExpenses = async () => {
    const res = await api.get('/expenses', {
        headers: getAuthHeaders()
    });
    return res.data;
};

// get specific expense by id
export const getExpenseById = async (id) => {
    const res = await api.get(`/expenses/${id}`, {
        headers: getAuthHeaders()
    });
    return res.data;
};

export const updateExpense = async (id, data) => {
    const res = await api.put(`/expenses/${id}`, data, {
        headers: getAuthHeaders()
    });
    return res.data;
};

export const deleteExpense = async (expenseId) => {
    const res = await api.delete(`/expenses/${expenseId}`, {
        headers: getAuthHeaders()
    });
    return res.data;
};

export const addExpense = async (data) => {
    const res = await api.post('/expenses', data, {
        headers: getAuthHeaders()
    });
    return res.data;
};


export const filterExpenses = async (from, to) => {
    const res = await api.get(`/expenses/filter?from=${from}&to=${to}`, {
        headers: getAuthHeaders()
    });
    return res.data;
};
