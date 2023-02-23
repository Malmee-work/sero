import { configureStore } from "@reduxjs/toolkit";
import { recipeApi } from "./api-slice";

const store = configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
});

export default store;
