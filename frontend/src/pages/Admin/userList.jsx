import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Loader from "../../components/loader";
import { toast } from 'react-toastify'
import Message from "../../components/message";

import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
} from "../../redux/api/userApiSlice";
import AdminMenu from "./adminMenu";


const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState("")
    const [editableUserEmail, setEditableUserEmail] = useState("")

    useEffect(() => {
        refetch()
    }, [refetch]);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure...?")){
            try {
                await deleteUser(id)
                toast.success("User is removed successfully")
            } catch (error) {
                toast.error(error.data.message || error.message)
            }
        }
        refetch()
    }

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id)
        setEditableUserEmail(email)
        setEditableUserName(username)
    }

    const updateHandler = async (id) => {
        try {
            await updateUser({userId: id, username: editableUserName, email: editableUserEmail})
                toast.success("User is updated successfully")
        } catch (error) {
            toast.error(error.data.message || error.message)
        }
        setEditableUserId(null)
        refetch()
    }

    return (
        <div className="p-4">
            <div className="flex justify-center text-red-500 text-3xl font-bold mb-5">Users</div>
            <hr/>
            {isLoading ? (<Loader />) :
                (error ?
                    (<Message variant={'danger'}> {error?.data.message || error.message} </Message>) :
                    <div className="flex flex-col md: flex-row mt-5">
                        <AdminMenu />
                        <table className="w-full md:w-4/5 mx-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">NAME</th>
                                    <th className="px-4 py-2 text-left">EMAIL</th>
                                    <th className="px-4 py-2 text-left">ADMIN</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td className="px-4 py-2">{user._id}</td>
                                        <td className="px-4 py-2">
                                            {editableUserId === user._id ?
                                                (<div className="flex items-center">
                                                    <input type="text" className="w-full p-2 border border-red-400 rounded-lg bg-yellow-200"
                                                        value={editableUserName} onChange={e => setEditableUserName(e.target.value)} />
                                                    <button className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                        onClick={() => updateHandler(user._id)} > <FaCheck />  </button>
                                                </div>)
                                                :
                                                (<div className="flex items-center border-yellow-500">
                                                    {user.username} {" "}
                                                    <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                        <FaEdit className="ml-[1rem]" />
                                                    </button>
                                                </div>)
                                            }
                                        </td>
                                        <td className="px-4 py-2">
                                            {editableUserId === user._id ?
                                                (<div className="flex items-center">
                                                    <input type="email" className="w-full p-2 border border-red-400 rounded-lg bg-yellow-200"

                                                        value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)} />
                                                    <button className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                        onClick={() => updateHandler(user._id)}> <FaCheck /> </button>
                                                </div>)
                                                :
                                                (<div className="flex items-center">
                                                    <p>{user.email}</p>
                                                    <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                        <FaEdit className="ml-[1rem]" />
                                                    </button>
                                                </div>)
                                            }
                                        </td>
                                        <td className="px-4 oy-2">
                                            {user.isAdmin ? (<FaCheck style={{ color: "green" }} />) : (<FaTimes style={{ color: "red" }} />)}
                                        </td>
                                        <td className="px-4 py-2">
                                            {!user.isAdmin && (
                                                <div className="flex">
                                                    <button className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 font-bold rounded"
                                                        onClick={() => deleteHandler(user._id)}> <FaTrash/> 
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )
            }
        </div>
    )
}

export default UserList