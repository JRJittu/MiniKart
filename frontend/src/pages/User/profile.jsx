import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/userApiSlice";

const Profile = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const { userInfo } = useSelector(state => state.auth)

    const [updateProfile, { isLoading }] = useProfileMutation()

    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.username, userInfo.email])

    const dispatch = useDispatch();

    const submitHanlder = async (e) => {
        e.preventDefault()
        if (password !== confirmPass) {
            toast.error("Passwords Do not match")
        }
        else {
            try {
                const res = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success("Your Profile Upadate Succefully")
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }

    return (
        <div className="container flex justify-center align-center md:flex md:space-x-4 mx-auto p-4 mt-[10rem]">
            <div className="md:w-1/3">
                <h2 className="text-center text-blue-600 text-2xl font-bold my-10">Upadate Profile</h2>
                <form onSubmit={submitHanlder}>
                    <div className="my-4">
                        <label className="block text-black mb-2 font-semibold"> Name </label>
                        <input
                            type="text" placeholder="Enter Name" value={username}
                            className="p-4 rounded-sm w-full border bg-yellow-100 font-semibold"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="my-4">
                        <label className="block text-black mb-2 font-semibold"> Email </label>
                        <input
                            type="email" placeholder="Enter Email" value={email}
                            className="p-4 rounded-sm w-full border bg-yellow-100 font-semibold"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-4">
                        <label className="block text-black mb-2 font-semibold"> Password </label>
                        <input
                            type="password" placeholder="Enter Password" value={password}
                            className="p-4 rounded-sm w-full border bg-yellow-100 font-semibold"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-4">
                        <label className="block text-black mb-2 font-semibold"> Confirm Password </label>
                        <input
                            type="password" placeholder="Confirm Password" value={confirmPass}
                            className="p-4 rounded-sm w-full border bg-yellow-100 font-semibold"
                            onChange={e => setConfirmPass(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-pink-500 text-black rounded py-2 px-4 hover:bg-purple-400">Update</button>
                        <Link to='/user-orders' className="bg-pink-500 text-black rounded py-2 px-4 hover:bg-purple-400">My Orders</Link>
                    </div>
                </form>

                {isLoading && <Loader />}

            </div>
        </div>
    )
}

export default Profile;