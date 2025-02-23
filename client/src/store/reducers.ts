import { combineReducers } from '@reduxjs/toolkit';
import { commonSlice } from './commonSlice';
// import { bookingSlice } from './bookingSlice';
import { customerBookingSlice } from './customerBookingSlice';

// Define the root reducer type
const reducers = {
  common: commonSlice.reducer,
  // booking: bookingSlice.reducer,
  customerBooking: customerBookingSlice.reducer
};

// Optionally create a combined reducer (useful for type inference)
const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;
export default reducers;
