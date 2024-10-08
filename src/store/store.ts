import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState } from "./storage";
import cartSlice, { CART_PERSISTENT_STATE } from "./cart.slice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userSlice,
    },
});

store.subscribe(() => {
    saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
    saveState({ items: store.getState().cart.items }, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
