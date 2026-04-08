import { api } from "@/api/baseApi";
// I'll define User and UpdateUserDto here for now, until I have a dedicated types file.
export interface User {
   id: string;
   email: string;
   username: string;
   photoUrl?: string;
}

export interface UpdateUserDto {
   username?: string;
   photoUrl?: string;
}

export const userApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getProfile: builder.query<User, void>({
         query: () => "/users/me",
         providesTags: ["User"],
      }),
      updateProfile: builder.mutation<User, UpdateUserDto>({
         query: (body) => ({ url: "/users/me", method: "PATCH", body }),
         invalidatesTags: ["User"],
      }),
   }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
