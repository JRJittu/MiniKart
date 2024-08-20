import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Loader from "../../components/loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/userApiSlice";

const Register = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])           // Dependency array

    const submitHandler = async(e) =>{
        e.preventDefault()
        if(password!=confirmPass){
            toast.error("Password Do not Match")
        }else{
            try {
                const res = await register({username, email, password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate(redirect)
                toast.success("User Successfully Register")
            } catch (error) {
                toast.error(error?.data?.message || error.message);

            }
        }
    }

    return <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
            <h1 className="text-2xl font-semibold mb-4">Register</h1>
            <form onSubmit={submitHandler} className="container w-[40rem]">
                <div className="my-[2rem]">
                    <label htmlFor="name" className="block text-lg font-semibold font-md text-black">Name</label>
                    <input type="text" id="name" placeholder="Enter Name" value={username}
                        className="mt-1 p-2 bg-pink-100 border rounded w-full border-red-500"
                        onChange={e => setUserName(e.target.value)}
                    ></input>
                </div>

                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-lg font-semibold font-md text-black">Email</label>
                    <input type="email" id="email" placeholder="Enter Email" value={email}
                        className="mt-1 p-2 bg-pink-100 border rounded w-full border-red-500"
                        onChange={e => setEmail(e.target.value)}
                    ></input>
                </div>

                <div className="my-[2rem]">
                    <label htmlFor="password" className="block text-lg font-semibold font-md text-black">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" value={password}
                        className="mt-1 p-2 bg-pink-100 border rounded w-full border-red-500"
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                </div>

                <div className="my-[2rem]">
                    <label htmlFor="confirmpassword" className="block text-lg font-semibold font-md text-black">Confirm Password</label>
                    <input type="password" id="confirmpassword" placeholder="Confirm Password" value={confirmPass}
                        className="mt-1 p-2 bg-pink-100 border rounded w-full border-red-500"
                        onChange={e => setConfirmPass(e.target.value)}
                    ></input>
                </div>

                <button disabled={isLoading} type="submit" 
                    className="bg-pink-500 text-yellow px-4 py-2 rounded cursor-pointer my">
                    {isLoading ? "Registering..." : "Register"}
                </button>
                {isLoading && <Loader/>}
            </form>

            <div className="mt-4">
                <p className="text-black"> Already have an acoount? {""}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-red-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
        <img src='/register.jpg' className="h-[48rem] w-[52%] xl:block md:hidden sm:hidden rounded-lg border-4 border-purple-500 border-solid" alt="Login" />

    </section>
}

export default Register;