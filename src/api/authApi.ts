import { api } from "@/api/baseApi";

export const authApi = api.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (credentials) => ({
            url: "/auth/login",
            method: "POST",
            body: credentials,
         }),
      }),
      register: builder.mutation({
         query: (userData) => ({
            url: "/auth/register",
            method: "POST",
            body: userData,
         }),
      }),
      refreshToken: builder.mutation({
         query: () => ({
            url: "/auth/refresh",
            method: "POST",
         }),
      }),
   }),
});

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation } = authApi;
