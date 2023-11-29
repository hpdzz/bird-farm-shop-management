// import { createContext, useEffect, useReducer, useState } from 'react';
// import { axiosInstances } from '../utils/axios';
// import { isValidToken, setSession } from '../utils/jwt';
// import { getUserInfo, setUserInfo } from '../utils/utils';
// import { useNavigate } from 'react-router-dom';

// import { API_ROOT } from '../utils/apiUrl';
// import { jwtDecode } from 'jwt-decode';

// const Types = {
//     Initialize: 'INITIALIZE',
//     Login: 'LOGIN',
//     Logout: 'LOGOUT',
// };

// const initialState = {
//     isAuthenticated: false,
//     isInitialized: false,
//     user: null,
// };

// const JWTReducer = (state, action) => {
//     switch (action.type) {
//         case 'INITIALIZE':
//             return {
//                 isAuthenticated: action.payload.isAuthenticated,
//                 isInitialized: true,
//                 user: action.payload.user,
//             };
//         case 'LOGIN':
//             setUserInfo(action.payload.user);
//             return {
//                 ...state,
//                 isAuthenticated: true,
//                 user: action.payload.user,
//             };
//         case 'LOGOUT':
//             return {
//                 ...state,
//                 isAuthenticated: false,
//                 user: null,
//             };
//         default:
//             return state;
//     }
// };

// const AuthContext = createContext(null);

// function AuthProvider({ children }) {
//     const navigate = useNavigate();
//     const [state, dispatch] = useReducer(JWTReducer, initialState);
//     const [error, setError] = useState(null);
//     const [notfication, setNotification] = useState(null);
//     useEffect(() => {
//         const initialize = async () => {
//             try {
//                 const accessToken = window.localStorage.getItem('accessToken');
//                 console.log('Received Access Token:', accessToken);
//                 const userRaw = getUserInfo();

//                 if (accessToken && isValidToken(accessToken) && userRaw) {
//                     setSession(accessToken);
//                     const user = JSON.parse(userRaw);
//                     dispatch({
//                         type: Types.Initialize,
//                         payload: {
//                             isAuthenticated: true,
//                             user,
//                         },
//                     });
//                 } else {
//                     dispatch({
//                         type: Types.Initialize,
//                         payload: {
//                             isAuthenticated: false,
//                             user: null,
//                         },
//                     });
//                 }
//             } catch (err) {
//                 console.error(err);
//                 setError(err.message);
//                 dispatch({
//                     type: Types.Initialize,
//                     payload: {
//                         isAuthenticated: false,
//                         user: null,
//                     },
//                 });
//             }
//         };

//         initialize();
//     }, [dispatch]);

//     const login = async (userName, userPassword) => {
//         try {
//             const response = await axiosInstances.login.post(`${API_ROOT}Auth/SignInUser`, {
//                 userName,
//                 userPassword,
//             });
//             console.log('Server Response:', response);

//             if (response.data && response.data.data && response.data.data.token) {
//                 const decodedToken = jwtDecode(response.data.data.token);
//                 console.log('Decoded Token:', decodedToken);

//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('role');
//                 localStorage.removeItem('username');

//                 localStorage.setItem('accessToken', response.data.data.token);
//                 localStorage.setItem('role', decodedToken.role);
//                 localStorage.setItem('username', decodedToken.username);

//                 dispatch({
//                     type: Types.Login,
//                     payload: {
//                         user: decodedToken,
//                     },
//                 });

//                 if (decodedToken.role === 'User') {
//                     navigate('/user');
//                 } else if (decodedToken.role === 'Admin') {
//                     navigate('/admin', { replace: true });
//                 } else if (decodedToken.role === 'Manager') {
//                     navigate('/manager', { replace: true });
//                 } else {
//                     console.log('role không hợp lệ');
//                 }

//                 navigate(`/${decodedToken.role.toLowerCase()}`);
//                 console.log('Đăng nhập thành công!');
//             } else {
//                 if (response.data && response.data.statusCode === 0) {
//                     console.error(`Đăng nhập thất bại: ${response.data.messageError}`);
//                     setNotification(`Đăng nhập thất bại: ${response.data.messageError}`);
//                 } else {
//                     console.error('Đăng nhập thất bại: Token không hợp lệ hoặc không được trả về.');
//                     setNotification('Đăng nhập thất bại');
//                 }
//                 console.error('Invalid server response:', response);
//             }
//         } catch (error) {
//             console.error('Đã có lỗi xảy ra trong quá trình đăng nhập:', error);
//             setError(error.message);
//             if (error.response) {
//                 console.error('Server Error Response:', error.response.data);
//             }
//         }
//     };

//     const logout = async () => {
//         setSession(null);
//         setUserInfo({});
//         dispatch({ type: Types.Logout });
//         navigate('/');
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 ...state,
//                 method: 'jwt',
//                 login,
//                 logout,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export { AuthContext, AuthProvider };

import React, { createContext, useEffect, useReducer } from 'react';
import { axiosInstances } from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import { getUserInfo, setUserInfo } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

import { API_ROOT } from '../utils/apiUrl';
import { jwtDecode } from 'jwt-decode';
import { fetchAllCart, resetCart, updateCart } from '../redux/cartSlice';

const Types = {
    Initialize: 'INITIALIZE',
    Login: 'LOGIN',
    Logout: 'LOGOUT',
};

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    error: null,
};

const JWTReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return {
                isAuthenticated: action.payload.isAuthenticated,
                isInitialized: true,
                user: action.payload.user,
                error: null,
            };
        case 'LOGIN':
            setUserInfo(action.payload.user);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                error: null,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(JWTReducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken);
                    const userRaw = getUserInfo();
                    const user = JSON.parse(userRaw);
                    dispatch({
                        type: Types.Initialize,
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    });
                } else {
                    dispatch({
                        type: Types.Initialize,
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: Types.Initialize,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        };

        initialize();
    }, []);

    const login = async (userName, userPassword) => {
        try {
            dispatch({ type: 'SET_ERROR', payload: { error: null } });

            const response = await axiosInstances.login.post(`${API_ROOT}Auth/SignInUser`, {
                userName,
                userPassword,
            });

            if (response.data && response.data.data && response.data.data.token) {
                const decodedToken = jwtDecode(response.data.data.token);
                console.log(decodedToken);
                console.log(decodedToken.UserID);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('role');
                localStorage.removeItem('username');
                localStorage.removeItem('id');
                localStorage.setItem('accessToken', response.data.data.token);
                localStorage.setItem('role', decodedToken.role);
                localStorage.setItem('username', decodedToken.username);
                localStorage.setItem('id', decodedToken.UserID);
                // localStorage.setItem('userid', decodedToken.id);
                console.log(decodedToken);
                if (decodedToken.role === 'User') {
                    navigate('/');
                } else if (decodedToken.role === 'Admin') {
                    navigate('/admin', { replace: true });
                } else if (decodedToken.role === 'Manager') {
                    navigate('/manager', { replace: true });
                } else {
                    console.log('role không hợp lệ');
                }
                dispatch({
                    type: Types.Login,
                    payload: {
                        user: decodedToken,
                    },
                });

                // navigate(`/${decodedToken.role.toLowerCase()}`);
            } else {
                dispatch({
                    type: 'SET_ERROR',
                    payload: {
                        error:
                            response.data && response.data.statusCode === 1
                                ? 'Tài khoản hoặc mật khẩu không chính xác.'
                                : 'Đăng nhập thất bại',
                    },
                });
            }
        } catch (error) {
            console.error('Đã có lỗi xảy ra trong quá trình đăng nhập:', error);
            dispatch({
                type: 'SET_ERROR',
                payload: {
                    error: error.message || 'Đăng nhập thất bại',
                },
            });
        }
    };

    const logout = async () => {
        localStorage.removeItem('id');
        localStorage.removeItem('userID');

        setSession(null);
        setUserInfo({});
        dispatch({ type: Types.Logout });
        navigate('/');
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
