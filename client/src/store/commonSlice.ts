import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Defining the structure of the User object
interface User {
  name: string;
  token: string;
  email: string;
}

// Defining the state structure
interface CommonState {
  user: User | null;
  language: string; 
}

const initialState: CommonState = {
  user: null,
  language: 'en',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.user = user;
    },
    setLanguage: (state, action: PayloadAction<{ language: string }>) => {
      const { language } = action.payload;
      state.language = language;
    },
  },
});

export const { setUser, setLanguage } = commonSlice.actions;
