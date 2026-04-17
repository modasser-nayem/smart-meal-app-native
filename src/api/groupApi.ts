import { api } from "@/api/baseApi";

export interface Group {
   id: string;
   name: string;
   description?: string;
   location?: string;
   photoUrl?: string;
   membersCount: number;
   inviteCode?: string;
   ownerName?: string;
}

export interface JoinRequestDto {
   groupId: string;
   isIncludedJoinMonth: boolean;
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
      searchGroups: builder.query<Group[], { query: string }>({
         query: ({ query }) => `/groups/search?q=${encodeURIComponent(query)}`,
         providesTags: ["Groups"],
      }),
      createGroup: builder.mutation<Group, FormData>({
         query: (body) => ({
            url: "/groups",
            method: "POST",
            body,
            formData: true,
         }),
         invalidatesTags: ["Groups"],
      }),
      sendJoinRequest: builder.mutation<void, JoinRequestDto>({
         query: (body) => ({ url: "/groups/join-request", method: "POST", body }),
         invalidatesTags: ["Groups"],
      }),
   }),
});

export const {
   useGetGroupsQuery,
   useGetGroupDetailsQuery,
   useSearchGroupsQuery,
   useCreateGroupMutation,
   useSendJoinRequestMutation,
} = groupApi;
