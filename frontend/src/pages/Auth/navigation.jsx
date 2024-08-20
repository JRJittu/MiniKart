import { useState } from 'react'
import './navigation.css'
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/api/userApiSlice'
import { logout } from '../../redux/features/auth/authSlice'
import FavoriteCount from '../Products/favoriteCount'

const Navigation = () => {

    const { userInfo } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showSidebar, setShowSideBar] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const toggleSideBar = () => {
        setShowSideBar(!showSidebar)
    }

    const closeSideBar = () => {
        setShowSideBar(false)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ logoutApiCall ] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div
            style={{ zIndex: 999 }}
            className={`${showSidebar ? "hidden" : "flex"} 
            xl:flex lg:flex md:hidden sm:hidden flex-col justify-between 
            p-4 text-white bg-black w-[4%] hover:w-[12%] h-[100vh] fixed`}
            id='navigation-container'
        >

            <div className="flex flex-col justify-center space-y-4">
                <Link to='/' className="flex items-center transition-trasnform transform hover:translate-x-2">
                    <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">HOME</span>
                </Link>

                <Link to='/shop' className="flex items-center transition-trasnform transform hover:translate-x-2">
                    <AiOutlineShopping className='mr-2 mt-[3rem]' size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
                </Link>

                <Link to='/cart' className="flex items-center transition-trasnform transform hover:translate-x-2">
                    <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">CART</span>
                    <div className="absolute top-9">
                        {cartItems.length > 0 && (
                                <span className='px-1 py-0 text-sm text-white bg-pink-500 rounded-full'>
                                    {cartItems.length}
                                </span>
                        ) }
                    </div>
                </Link>

                <Link to='/favorite' className="flex items-center transition-trasnform transform hover:translate-x-2">
                    <FaHeart className='mr-2 mt-[3rem]' size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>
                    <FavoriteCount />
                </Link>

            </div>

            <div className="realtive mb-10">
                <button onClick={toggleDropdown} className='flex items-center focus:outline-none'>
                    {userInfo ? <span className='text-yellow-500 text-[17px]'>{userInfo.username}</span> : <></>}

                    {userInfo && (
                        <svg xmlns='http://www/w3.org/2000/svg'
                            className={`h-5 w-5 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                        </svg>
                    )}
                </button>

                {dropdownOpen && userInfo && (
                    <ul className={`absoulte right-0 mt-2 ml-14 space-y-2 bg-black text-pink-600 
                        ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}>

                        {userInfo.isAdmin && (
                            <>
                                <li><Link to='/admin/dashboard' className='block px-4 py-1 hover:bg-gray-200'>Dash Board</Link></li>
                                <li><Link to='/admin/productlist' className='block px-4 py-1 hover:bg-gray-200'>Products</Link></li>
                                <li><Link to='/admin/categorylist' className='block px-4 py-1 hover:bg-gray-200'>Category</Link></li>
                                <li><Link to='/admin/orderlist' className='block px-4 py-1 hover:bg-gray-200'>Orders</Link></li>
                                <li><Link to='/admin/userlist' className='block px-4 py-1 hover:bg-gray-200'>Users</Link></li>
                            </>
                        )}
                        <li><Link to='/profile' className='block px-4 py-1 hover:bg-gray-400'>Profile</Link></li>
                        <li><Link className='block px-4 py-1 hover:bg-gray-400' onClick={logoutHandler}>Logout</Link></li>
                    </ul>
                )}
            </div>

            {!userInfo && (
                <ul>
                    <li>
                        <Link to='/login' className="flex items-center transition-trasnform transform hover:translate-x-2">
                            <AiOutlineLogin className='mr-2 mt-[3rem]' size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/register' className="flex items-center transition-trasnform transform hover:translate-x-2">
                            <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>
                        </Link>
                    </li>
                </ul>
            )}
        </div>)
}

export default Navigation;