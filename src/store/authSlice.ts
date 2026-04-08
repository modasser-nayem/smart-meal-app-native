import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
   id: string;
   name: string;
   email: string;
   avatar: string | null;
   createdAt: string;
   updatedAt: string;
}

interface AuthState {
   user: User | null;
   accessToken: string | null;
   refreshToken: string | null;
   isAuthenticated: boolean;
   isEmailVerified: boolean;
}

const initialState: AuthState = {
   user: null,
   accessToken: null,
   refreshToken: null,
   isAuthenticated: false,
   isEmailVerified: false,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setCredentials: (
         state,
         {
            payload: { user, accessToken, refreshToken, isEmailVerified },
         }: PayloadAction<{
            user: User;
            accessToken: string;
            refreshToken: string;
            isEmailVerified: boolean;
         }>,
      ) => {
         state.user = user;
         state.accessToken = accessToken;
         state.refreshToken = refreshToken;
         state.isEmailVerified = isEmailVerified;
         state.isAuthenticated = true;
      },
      logout: (state) => {
         state.user = null;
         state.accessToken = null;
         state.refreshToken = null;
         state.isAuthenticated = false;
      },
   },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
