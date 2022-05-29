import type { User } from '../types';

export const apiRequest = async <T>(...params: Parameters<typeof fetch>): Promise<T> => {
    const res = await fetch(...params);

    if (Math.random() < 0.5) {
        // We should throw
        throw new Error('Unexpected API error');
    }

    return res.json();
};

export const getUsers = () => apiRequest<User[]>('https://jsonplaceholder.typicode.com/users');
