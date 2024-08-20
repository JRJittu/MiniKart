import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa"


const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return <>
        <button 
            className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7"} bg-gray-100 fixed rounded-lg`}
            onClick={toggleMenu}
        >
            {isMenuOpen ? <FaTimes color="black"/> : <>
                <div className="w-6 h-0.5 bg-black my-1"></div>
                <div className="w-6 h-0.5 bg-black my-1"></div>
                <div className="w-6 h-0.5 bg-black my-1"></div>
            </>}
        </button>

        {isMenuOpen && (
            <section className="bg-gray-200 p-4 fixed right-7 top-5">
                <ul className="list-none mt-2">
                    <li> <NavLink style={({isActive})=>({
                            color: isActive ? 'red' : 'black'
                        })}
                        className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm" 
                        to='/admin/dashboard'>
                        Admin Dashboard 
                    </NavLink> </li>

                    <li> <NavLink style={({isActive})=>({
                            color: isActive ? 'red' : 'black'
                        })}
                        className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm" 
                        to='/admin/categorylist'>
                        Create Category 
                    </NavLink> </li>

                    <li> <NavLink style={({isActive})=>({
                            color: isActive ? 'red' : 'black'
                        })}
                        className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm" 
                        to='/admin/productlist'>
                        Create Product 
                    </NavLink> </li>

                    <li> <NavLink style={({isActive})=>({
                            color: isActive ? 'red' : 'black'
                        })}
                        className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm" 
                        to='/admin/allproductslist'>
                        All Products 
                    </NavLink> </li>

                    <li> <NavLink style={({isActive})=>({
                            color: isActive ? 'red' : 'black'
                        })}
                        className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm" 
                        to='/admin/userlist'>
                        Manage Users
                    </NavLink> </li>

                    <li> <NavLink style={({isActive})=>({
                            color: isActive ? 'red' : 'black'
                        })}
                        className="list-item py-2 px-3 block mb-5 hover:bg-gray-400 rounded-sm" 
                        to='/admin/orderlist'>
                        Manage Orders
                    </NavLink> </li>

                </ul>
            </section>
        )}
    </>
}

export default AdminMenu