const CatModel = ({isOpen, onClose, children}) => {
    return (<>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="absolute top-[40%] right-[50%] bg-yellow-100 p-4 rounded-lg z-10 text-rght">
                    <button onClick={onClose} className="text-black font-semibold hover:text-grey-700 
                        focus:outline:none mr-2">X</button>
                    {children}
                </div>
            </div>
        )}
    </>)
}

export default CatModel