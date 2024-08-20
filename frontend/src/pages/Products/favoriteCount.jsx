import { useSelector } from "react-redux"


const FavoriteCount = () => {
    const favorites = useSelector(state => state.favorites)
    const favCount = favorites.length
    return (
        <div className="absolute left-2 top-8">
            {favCount>0 && (
                <span className="px-1 py-0 text-sm bg-pink-500 rounded-full" >{favCount}</span>
            )}
        </div>
    )
}

export default FavoriteCount