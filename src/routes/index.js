import AboutAdmin from '../components/Admin/AboutAdmin/AboutAdmin';
import Cart from '../pages/CartPage/Cart';
import Home from '../pages/Home/Home';
import LoginForm from '../pages/Login/LoginForm';
// import ManagerScreen from '../pages/Manager/ManagerScreen';
import Products from '../pages/ProductsPage/Products';
import SingleProduct from '../pages/SingleProductPage/SingleProductPage';
import Setting from '../components/Admin/Setting/Settings';
import UserAdmin from '../components/Admin/UserAdmin/UserAdmin';
import DashboardManager from '../components/Manager/dashboard/DashboardManager';
import AccountManager from '../components/Manager/account/AccountManager';
import CategoryManager from '../components/Manager/categories/CategoryManager';
import EditCategory from '../components/Manager/categories/EditCategory';
import AddCategory from '../components/Manager/categories/AddCategory';
import ProductManager from '../components/Manager/product/ProductManager';
import AddProduct from '../components/Manager/product/AddProduct';
import EditProduct from '../components/Manager/product/EditProduct';
import OrderManager from '../components/Manager/order/OrderManager';
import OrderDetails from '../components/Manager/order/OrderDetails';
import EditAccount from '../components/Manager/account/EditAccount';
import HomeAdmin from '../pages/Admin/Home/HomeAdmin';
import RegisterForm from '../pages/Login/RegisterForm';
import Unauthorized from '../pages/404/unauthorized';
import AboutPage from '../pages/About/AboutPage';
import Checkout from '../pages/checkout/CheckOut';
import Step4 from '../pages/MixBird/Step4';
import MyBird from '../components/Navbar/YourBird';
import DetailMixBird from '../components/Navbar/DetailMixBird';
import OrderUser from '../components/User/Order/OrderUser';
import OrderDetailsUser from '../components/User/Order/OrderDetailsUser';
import MixManager from '../components/Manager/mix/MixManager';
import LoadingPage from '../components/Navbar/LoadingPage';
import MyAcount from '../components/Navbar/MyAccount';
export const publicRoutes = [
    { path: '/', Component: Home },
    { path: '/login', Component: LoginForm },
    { path: '/register', Component: RegisterForm },
    { path: '/about', Component: AboutPage },
    { path: '/products', Component: Products },
    { path: '/products/category/:id', Component: Products },
    { path: '/products/:id', Component: SingleProduct },
    { path: '/cart', Component: Cart },
    { path: '/unauthorized', Component: Unauthorized },
    { path: '/loading', Component: LoadingPage }
];

export const privateRoutes = {
    admin: [
        { path: '/admin', Component: HomeAdmin },
        { path: '/admin/about', Component: AboutAdmin },
        { path: '/admin/setting', Component: Setting },
        { path: '/admin/userAdmin', Component: UserAdmin },
    ],
    user: [
        { path: '/', Component: Home },
        { path: '/about', Component: AboutPage },
        { path: '/user/products', Component: Products },
        { path: '/user/products/category/:id', Component: Products },
        { path: '/user/products/:id', Component: SingleProduct },
        { path: '/user/cart', Component: Cart },
        { path: '/user/checkout', Component: Checkout },
        { path: '/mixbird', Component: Step4 },
        { path: '/user/order', Component: OrderUser },
        { path: '/user/order/:id', Component: OrderDetailsUser },
        { path: '/user/mixbird', Component: Step4 },
        { path: '/user/mybird', Component: MyBird },
        { path: '/user/mybird/detail/:birdID', Component: DetailMixBird },
        { path: '/user/myaccount', Component: MyAcount }
    ],
    manager: [
        { path: '/manager', Component: DashboardManager },
        { path: '/manager/dashboard', Component: DashboardManager },
        { path: '/manager/account', Component: AccountManager },
        { path: '/manager/categories', Component: CategoryManager },
        { path: '/manager/new-categories', Component: AddCategory },
        { path: '/manager/edit-category/:id', Component: EditCategory },
        { path: '/manager/products', Component: ProductManager },
        { path: '/manager/new-product', Component: AddProduct },
        { path: '/manager/edit-product/:id', Component: EditProduct },
        { path: '/manager/order', Component: OrderManager },
        { path: '/manager/order/:id', Component: OrderDetails },
        { path: '/manager/edit-user/:id', Component: EditAccount },
        { path: '/manager/mix', Component: MixManager },

    ],
};
