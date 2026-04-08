import { api } from "@/api/baseApi";

export interface Group {
   id: string;
   name: string;
   description?: string;
   membersCount: number;
}

export const groupApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getGroups: builder.query<Group[], void>({
         query: () => "/groups",
         providesTags: ["Groups"],
      }),
      getGroupDetails: builder.query<Group, string>({
         query: (id) => `/groups/${id}`,
         providesTags: (result, error, id) => [{ type: "Groups", id }],
      }),
   }),
});

export const { useGetGroupsQuery, useGetGroupDetailsQuery } = groupApi;
