import Auth from '../utils/auth'

function request(method) {
    const getAuthHeader = () => {
        return (Auth.getToken())
            ? {
                Authorization: "bearer " + Auth.getToken()
            }
            : {}
    }

    const baseUrl = "http://localhost:5000/";

    return async (url, data = {}, options = {}) => {
        const authHeader = getAuthHeader();
        url = baseUrl + url;

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...authHeader
            },
            body: Object.keys(data).length
                ? JSON.stringify(data)
                : undefined,
            ...options
        });

        return response.json();
    }
}

export const get = request('get');
export const post = request('post');
export const put = request('put');
export const remove = request('delete');