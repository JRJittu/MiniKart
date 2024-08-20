import { createSlice } from "@reduxjs/toolkit";

// Here state is Empty array initially

const FavoriteSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        addToFavorites: (state, action) => {
            /* Check if the product is not already in favorite */
            // .some()  returns boolean value which check atleast one items in array matches the codition, return false if nothing match
            // .map()  returns array of boolean here

            if(!state.some((product) => product._id === action.payload._id)){
                state.push(action.payload)
            }
        },

        removeFromFavorites: (state, action) => {
            /* Remove the product with matching id  */
            return state.filter((product) => product._id !== action.payload._id )
        },

        setFavorites: (state, action) => {
            /* Set the favorites from local storage */
            return action.payload
        }
    }
})

export const { addToFavorites, removeFromFavorites, setFavorites } = FavoriteSlice.actions ;

export const selectFavoriteProduct = (state) => state.favorites

export default FavoriteSlice.reducer