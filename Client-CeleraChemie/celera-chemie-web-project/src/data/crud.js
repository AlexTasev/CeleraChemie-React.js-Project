import Auth from '../utils/auth'

function request(method) {
    const getAuthHeader = () => {
        return (Auth.getToken()) 
        ? {
            Authorization: "bearer " + Auth.getToken()
        }
        : {}
    }

    return async (url, data = {}, options = {}) => {
        const authHeader = getAuthHeader();
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...authHeader
            },
            body: JSON.stringify(data),
            ...options
        });

        return response.json();
    }
}

export const get = request('get');
export const post = request('post');
export const put = request('put');
export const remove = request('delete');