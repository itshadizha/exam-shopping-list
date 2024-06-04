import { configureStore } from "@reduxjs/toolkit";
import purchaseSlice from "./slices/purchaseSlice";

export const store = configureStore({
    reducer: {
        purchases: purchaseSlice,
    }
})