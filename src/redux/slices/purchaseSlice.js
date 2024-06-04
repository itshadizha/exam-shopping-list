import { createSlice } from "@reduxjs/toolkit";
import { addPurchase, deletePurchase, getPurchases, updatePurchase } from "./purcheseThunk";

const initialState = {
  purchases: [],
  isLoading: false,
};

const purchaseSlice = createSlice({
  name: "purchases",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPurchases.fulfilled, (state, { payload }) => {
        state.purchases = payload;
        state.isLoading = false;
      })
      .addCase(getPurchases.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPurchases.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPurchase.fulfilled, (state, { payload }) => {
        state.purchases.push(payload);
        state.isLoading = false;
      })
      .addCase(addPurchase.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addPurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePurchase.fulfilled, (state, { payload }) => {
        state.purchases = state.purchases.filter(purchase => purchase._id !== payload);
        state.isLoading = false;
      })
      .addCase(deletePurchase.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePurchase.fulfilled, (state, { payload }) => {
        const index = state.purchases.findIndex(purchase => purchase._id === payload._id);
        if (index !== -1) {
          state.purchases[index] = payload;
        }
        state.isLoading = false;
      })
      .addCase(updatePurchase.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePurchase.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default purchaseSlice.reducer;
