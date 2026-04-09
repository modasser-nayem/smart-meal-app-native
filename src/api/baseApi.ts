import {
   createApi,
   fetchBaseQuery,
   BaseQueryFn,
   FetchArgs,
   FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
import { Config } from "@/config";
import { logout, setCredentials } from "@/store/authSlice";

const baseQuery = fetchBaseQuery({
   baseUrl: Config.API_URL,
   prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
   },
});

const baseQueryWithReauth: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, api, extra) => {
   let result = await baseQuery(args, api, extra);

   // console.log("API Result:", result);

   if (result.error?.status === 401) {
      const refreshResult = await baseQuery("/auth/refresh", api, extra);
      if (refreshResult.data) {
         api.dispatch(setCredentials(refreshResult.data as any));
         result = await baseQuery(args, api, extra);
      } else {
         api.dispatch(logout());
      }
   }

   // Global Error Handling Logic could be added here
   return result;
};

export const api = createApi({
   reducerPath: "api",
   baseQuery: baseQueryWithReauth,
   tagTypes: ["User", "Meals", "Expenses", "Groups", "Auth"],
   endpoints: () => ({}),
});
