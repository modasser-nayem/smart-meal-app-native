import { api } from "@/api/baseApi";

export interface MealRecord {
   id: string;
   userId: string;
   mealTypeId: string;
   date: string;
   quantity: number;
   note?: string;
}

export interface LogMealDto {
   date: string;
   mealTypeId: string; // "breakfast" | "lunch" | "dinner"
   quantity: number;
   note?: string;
}

export interface AdminLogMealDto extends LogMealDto {
   targetUserId: string; // manager/owner logging for a specific member
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
      addMeal: builder.mutation<MealRecord, LogMealDto>({
         query: (body) => ({
            url: "/meals",
            method: "POST",
            body,
         }),
         invalidatesTags: ["Meals"],
      }),
      adminLogMeal: builder.mutation<MealRecord, AdminLogMealDto>({
         query: (body) => ({
            url: "/meals/admin",
            method: "POST",
            body,
         }),
         invalidatesTags: ["Meals"],
      }),
   }),
});

export const { useGetMealsQuery, useAddMealMutation, useAdminLogMealMutation } = mealApi;
