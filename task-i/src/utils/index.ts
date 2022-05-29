const apiRequest = (...params: Parameters<typeof fetch>) => fetch(...params).then((response) => response.json());

export const getUsers = () => apiRequest('https://jsonplaceholder.typicode.com/users');
export const getPosts = (userId: number | null) => apiRequest(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
export const getComments = (postId: number | null) => apiRequest(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
