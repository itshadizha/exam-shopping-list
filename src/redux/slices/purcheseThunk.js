import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL =
  "https://api-v2.elchocrud.pro/api/v1/e7696d63e21e7ebdabc10cce3496cf55/purchases";

export const addPurchase = createAsyncThunk(
  "purchases/addPurchase",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      dispatch(getPurchases());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPurchases = createAsyncThunk(
  "purchases/getPurchases",

  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL);

      const data = response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePurchase = createAsyncThunk(
  "purchases/deletePurchase",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      dispatch(getPurchases());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePurchase = createAsyncThunk(
    "purchases/updatePurchase",
    async (updatingPurchase, { dispatch, rejectWithValue }) => {
        try {
          await fetch(`${BASE_URL}/${updatingPurchase.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatingPurchase.data),
            
          });
    
          dispatch(getPurchases());
        } catch (error) {
          return rejectWithValue(error);
        }
      }
)
