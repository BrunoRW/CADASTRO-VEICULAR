export const isAuth = () => {return localStorage.token ? true : false};
export const getToken = () => {return localStorage.token};