import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  accessToken?: string,
}

const initialState: AuthState = {
  accessToken: ""
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.accessToken = action.payload
    }
  }
})

export const { setAuthState} = authSlice.actions;

export default authSlice.reducer