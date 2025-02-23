import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Defining the structure of Booking Details
interface BookingDetails {
  user_id: string;
  service_provider_id: string;
  service_type_id: string;
  street_address: string;
  unit_apt: string;
  task_details: string;
  date: string;
  start_time: string;
  number_of_hours: number;
  total_amount: number;
  status: string;
}

// Defining the state structure
interface BookingState {
  bookingDetails: BookingDetails | null;
}

const initialState: BookingState = {
  bookingDetails: null,
};

export const customerBookingSlice = createSlice({
  name: 'customerBooking',
  initialState,
  reducers: {    
    setBookingDetails: (state, action: PayloadAction<BookingDetails>) => {
      state.bookingDetails = action.payload;
    },
    clearBookingDetails: (state) => {
      state.bookingDetails = null;
    },
  },
});

export const { setBookingDetails, clearBookingDetails } = customerBookingSlice.actions;
