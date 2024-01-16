import Home from './Pages/Home/Home'
import Users from './Pages/Users/Users';
import NewUser from './Pages/NewUser/NewUser';
import Products from './Pages/Products/Products';
import NewProduct from './Pages/NewProduct/NewProduct';


let routes = [
    {path: '/' , element: <Home />},
    {path: '/users' , element: <Users />},
    {path: '/newUser' , element: <NewUser />},
    {path: '/products' , element: <Products />},
    {path: '/newProduct' , element: <NewProduct />},
]

export default routes;