// set localstorage
export const setLocalStorage = (name, value) => {
    localStorage.setItem(name, value);
};
// get localstorage
export const getLocalStorage = (name) => localStorage.getItem(name);
//
export const removeLocalStorage = (key) => localStorage.removeItem(key);

export const saveCollections = (data) => localStorage.setItem('COLLECTIONS', JSON.stringify(data));
export const getCollections = () => localStorage.getItem('COLLECTIONS');

export const removeUserInfo = () => localStorage.removeItem('USER_INFO');
export const setUserInfo = (userInfo) => setLocalStorage('USER_INFO', JSON.stringify(userInfo));
export const getUserInfo = () => getLocalStorage('USER_INFO');

export const removeAppToken = (token) => localStorage.removeItem('accessToken');
export const setAppToken = (token) => setLocalStorage('accessToken', token);
export const getAppToken = () => getLocalStorage('accessToken');
