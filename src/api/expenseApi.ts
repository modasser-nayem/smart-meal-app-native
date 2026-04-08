import { api } from "@/api/baseApi";

export interface ExpenseRecord {
   id: string;
   userId: string;
   amount: number;
   category: string;
   date: string;
   description?: string;
}

export const expenseApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getExpenses: builder.query<ExpenseRecord[], { month?: string; year?: string } | void>({
         query: (params) => ({
            url: "/expenses",
            params: params || {},
         }),
         providesTags: ["Expenses"],
      }),
      addExpense: builder.mutation<ExpenseRecord, Partial<ExpenseRecord>>({
         query: (body) => ({
            url: "/expenses",
            method: "POST",
            body,
         }),
         invalidatesTags: ["Expenses"],
      }),
   }),
});

export const { useGetExpensesQuery, useAddExpenseMutation } = expenseApi;
