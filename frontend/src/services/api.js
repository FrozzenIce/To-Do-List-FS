const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if(token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    let data = null;

    try {
        data = await response.json();
    } catch {
        data == null;
    }

    if(!response.ok) {
        throw new Error (
            data?.message ||
            data?.error ||
            'Something went wrong'
        );
    }

    return data;
}

export const authApi = {
    register: (data) =>
        request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

        login: (data) =>
            request('/auth/login', {
                method: 'POST',
                body: JSON.stringify(json),
            }),

}