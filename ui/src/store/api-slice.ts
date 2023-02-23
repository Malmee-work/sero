import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../config";
import { Recipe } from "../types/recipe";

export const recipeApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: configuration.apiurl }),
  tagTypes: ["Recipe"],
  endpoints: (build) => ({
    getRecipes: build.query<Recipe[], void>({
      query: () => `recipes`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Recipe" as const, _id })),
              { type: "Recipe", id: "LIST" },
            ]
          : [{ type: "Recipe", id: "LIST" }],
    }),
    addRecipe: build.mutation<Recipe, Partial<Recipe>>({
      query: (body) => ({
        url: `recipes`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Recipe", id: "LIST" }],
    }),
  }),
});

export const { useGetRecipesQuery, useAddRecipeMutation } = recipeApi;
