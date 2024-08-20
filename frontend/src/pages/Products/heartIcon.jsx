import { useEffect } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"

import {
    addToFavorites,
    removeFromFavorites,
    setFavorites
} from "../../redux/features/favorites/favoriteSlice"

import {
    addFavoriteToLocalStorage,
    removeFavoriteFromLocalStorage,
    getFavoritesFromLocalStorage
} from "../../utils/localStorage"

const HeartIcon = ({ product }) => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites) || []
    const isFavorite = favorites.some((p) => p._id === product._id)

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
        dispatch(setFavorites(favoritesFromLocalStorage))
    }, [] )

    const toggleFavorites = () =>{
        if(isFavorite){
            dispatch(removeFromFavorites(product))
            /* Remove product from the local storage as well */
            removeFavoriteFromLocalStorage(product._id)
        }
        else{
            dispatch(addToFavorites(product))
            /* Also add the product to local Storage */
            addFavoriteToLocalStorage(product)
        }
    }

    return( <div className="absolute top-2 right-5 cursor:pointer">
        {
            isFavorite ? (
                <FaHeart onClick={toggleFavorites} className="text-pink-700" />
            ) : (
                <FaRegHeart onClick={toggleFavorites} className="text-black" />
            )
        }
    </div>)
}

export default HeartIcon