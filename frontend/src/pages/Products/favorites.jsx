import { useSelector } from "react-redux"
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice"
import ProductComp from "./productComp"

const Favorites = () => {
    const favorites = useSelector(state => state.favorites)


    return <div className="mx-[5rem]">
        <h1 className="text-center text-3xl text-purple-700 font-bold my-[3rem]">Favorite Products</h1>

        <div className="flex flex-wrap">
            {favorites.map((prod) => (
                <div 
                    key={prod._id} 
                    className="flex items-center border mx-1 my-1"
                > 
                    <ProductComp product={prod}/> 
                </div>
            ))}
        </div>

    </div>
}

export default Favorites