import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./redux/store.js"

// import {PayPalScriptProvider} from "@paypal/react-paypal-js"

// Private Routes
import PrivateRoutes from "./components/privateRoutes.jsx"
import Profile from './pages/User/profile.jsx'

import AdminRoutes from './pages/Admin/adminRoutes.jsx'
import UserList from './pages/Admin/userList.jsx'
import CategoryList from './pages/Admin/categoryList.jsx'
import ProductList from './pages/Admin/productList.jsx'
import ProductUpdate from './pages/Admin/productUpdate.jsx'
import AllProducts from './pages/Admin/allProducts.jsx'
import ProductDetails from './pages/Products/productDetails.jsx'


// Auth
import Login from './pages/Auth/login.jsx'
import Register from "./pages/Auth/register.jsx"

/* Navigation */
import Home from './pages/home.jsx'
import Cart from './pages/cart.jsx'
import Shop from './pages/shop.jsx'
import Favorites from './pages/Products/favorites.jsx'
import Shipping from './pages/Orders/shipping.jsx'
import PlaceOrder from './pages/Orders/placeOrder.jsx'
import OrderPayment from './pages/Orders/orderPayment.jsx'
import UserOrders from './pages/User/userOrders.jsx'
import Order from './pages/Orders/order.jsx'
import Orderlist from './pages/Admin/orderlist.jsx'
import AdminDashboard from './pages/Admin/adminDashboard.jsx'

const My_router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route index={true} path='' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/shop' element={<Shop />} />

            <Route path='' element={<PrivateRoutes />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/favorite' element={<Favorites />} />

                <Route path='/shipping' element={<Shipping />} />
                <Route path='/placeorder' element={<PlaceOrder />} />
                <Route path='/payment-done' element={<OrderPayment />} />
                <Route path='/user-orders' element={<UserOrders />} />
                <Route path='/order/:id' element={<Order />} />

            </Route>

            {/*Admin Routes */}
            <Route path='/admin' element={<AdminRoutes />}>
                <Route path='userlist' element={<UserList />} />
                <Route path='categorylist' element={<CategoryList />} />
                <Route path='productlist' element={<ProductList />} />
                <Route path='allproductslist' element={<AllProducts />} />
                <Route path='product/update/:_id' element={<ProductUpdate />} />
                <Route path='orderlist' element={<Orderlist />} />
                <Route path='dashboard' element={<AdminDashboard />} />
            </Route>

        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={My_router} />
    </Provider>
)
