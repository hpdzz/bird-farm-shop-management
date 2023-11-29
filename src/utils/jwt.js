import { jwtDecode } from 'jwt-decode';
// import { verify, sign } from 'jsonwebtoken';
import axios, { axiosInstances } from './axios';

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode(accessToken);

    return decoded;
};

// const setSession = (accessToken) => {
//     if (accessToken) {
//         localStorage.setItem('accessToken', accessToken);
//         axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//         axiosInstances.paymentService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//     } else {
//         localStorage.removeItem('accessToken');
//         delete axios.defaults.headers.common.Authorization;
//     }
// };
const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);

        if (axios && axios.defaults) {
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            axiosInstances.paymentService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        } else {
            console.error('axios is not configured');
        }
    } else {
        localStorage.removeItem('accessToken');

        if (axios && axios.defaults) {
            delete axios.defaults.headers.common.Authorization;
        } else {
            console.error('axios is not configured');
        }
    }
};
export { isValidToken, setSession };
// import { jwtDecode } from 'jwt-decode';
// import axios from './axios';

// const isValidToken = (accessToken) => {
//     if (!accessToken) {
//         return false;
//     }
//     try {
//         const decoded = jwtDecode(accessToken);
//         return decoded;
//     } catch (error) {
//         console.error('Error decoding token:', error);
//         return false;
//     }
// };

// const setSession = (accessToken) => {
//     if (accessToken) {
//         localStorage.setItem('accessToken', accessToken);

//         if (axios && axios.defaults) {
//             axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//         } else {
//             console.error('axios is not configured correctly');
//         }
//     } else {
//         localStorage.removeItem('accessToken');

//         if (axios && axios.defaults) {
//             delete axios.defaults.headers.common.Authorization;
//         } else {
//             console.error('axios is not configured correctly');
//         }
//     }
// };

// export { isValidToken, setSession };
