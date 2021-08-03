export const addToken = (token) => {
    window.localStorage.setItem('access_token', token);
}

export const getToken = () => {
    return new Promise((resolve, reject) => {
        const token = window.localStorage.getItem('access_token');
        resolve(token);
    });    
}

export const deleteToken = () => {
    window.localStorage.removeItem('access_token');
}