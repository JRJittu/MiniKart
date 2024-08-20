import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoriteReducer from "./features/favorites/favoriteSlice";
import cartsliceReducer from "./features/cart/cartslice";
import shopReducer from "./features/shop/shopSlice";
import { getFavoritesFromLocalStorage } from "../utils/localStorage";

const initialFavorties = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer ,
        auth: authReducer,
        favorites: favoriteReducer,
        cart: cartsliceReducer,
        shop: shopReducer,
    },

    preloadedState: {
        favorites: initialFavorties
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export default store
