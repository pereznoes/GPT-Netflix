import { createSlice } from "@reduxjs/toolkit";

type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

const userSlice = createSlice({
  name: "user",
  initialState: <User | null>null,
  reducers: {
    setUser: (_, action) => action.payload,
    removeUser: () => null,
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
