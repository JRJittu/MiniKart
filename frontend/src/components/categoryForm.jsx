import { set } from "mongoose"

const CategoryForm = ({value, setValue, handleSubmit, buttonTxt="Submit", handleDelete}) => {
    
    return (
        <div className="p-3 flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md">

                <input type="text" value={value} placeholder="Enter new category name" 
                    className="py-3 px-4 border rounded-lg w-full border-blue-500"
                    onChange={e => setValue(e.target.value)}
                />

                <div className="flex justify-between">

                    <button className="bg-green-400 text-black py-2 px-4 rounded-lg 
                        border border-blue-500 hover:bg-green-600 focus:outline-none focus:ring-2 
                        focus:ring-pink-500 focus:ring-opacity-50">
                        {buttonTxt}</button>

                    {handleDelete && (
                        <button className="bg-red-400 text-black py-2 px-4 rounded-lg 
                            border border-blue-600 hover:bg-red-600 focus:outline-none focus:ring-2 
                            focus:ring-red-500 focus:ring-opacity-50" 
                        onClick={handleDelete}> Delete </button>
                    )}

                </div>

            </form>
       </div>
    )
}

export default CategoryForm