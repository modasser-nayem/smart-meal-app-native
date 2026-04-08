import { api } from "@/api/baseApi";

export interface MealRecord {
   id: string;
   userId: string;
   mealTypeId: string;
   date: string;
   quantity: number;
   note?: string;
}

export const mealApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getMeals: builder.query<MealRecord[], { startDate?: string; endDate?: string } | void>({
         query: (params) => ({
            url: "/meals",
            params: params || {},
         }),
         providesTags: ["Meals"],
      }),
      addMeal: builder.mutation<MealRecord, Partial<MealRecord>>({
         query: (body) => ({
            url: "/meals",
            method: "POST",
            body,
         }),
         invalidatesTags: ["Meals"],
      }),
   }),
});

export const { useGetMealsQuery, useAddMealMutation } = mealApi;
