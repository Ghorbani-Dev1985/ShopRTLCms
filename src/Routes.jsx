import Comments from './Pages/Comments/Comments';
import Discounts from './Pages/Discounts/Discounts';
import Home from './Pages/Home/Home'
import Orders from './Pages/Orders/Orders';
import Products from './Pages/Products/Products';
import Users from './Pages/Users/Users';


let routes = [
    {path: '/' , element: <Home />},
    {path: '/products' , element: <Products />},
    {path: '/comments' , element: <Comments />},
    {path: '/users' , element: <Users />},
    {path: '/orders' , element: <Orders />},
    {path: '/discounts' , element: <Discounts />},
]

export default routes;