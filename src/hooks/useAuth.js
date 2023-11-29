import { useContext } from 'react';
import { AuthContext } from '../contexts/JWTContexts';

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('Auth context must be use inside AuthProvider');

    return context;
};

export default useAuth;
// import { useContext } from 'react';
// import { AuthContext } from '../contexts/JWTContexts';

// const useAuth = () => {
//     const context = useContext(AuthContext);

//     if (!context) {
//         throw new Error('Auth context must be used inside AuthProvider');
//     }

//     const { error, login } = context;

//     const handleLogin = async (userName, password) => {
//         // Your authentication logic here
//         try {
//             // Attempt to authenticate
//             await login(userName, password);

//             // If successful, clear any existing error
//             context.setError('');
//         } catch (error) {
//             // If authentication fails, set an error message
//             context.setError('Authentication failed. Please check your username and password.');
//         }
//     };

//     return {
//         handleLogin,
//         error,
//     };
// };

// export default useAuth;

