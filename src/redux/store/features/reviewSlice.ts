import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ReviewState {
  rating: number;
  comment: string;
}

const initialState: ReviewState = {
  rating: 5,
  comment: '',
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setRating(state, action: PayloadAction<number>) {
      state.rating = action.payload;
    },
    setComment(state, action: PayloadAction<string>) {
      state.comment = action.payload;
    },
    resetReview(state) {
      state.rating = 5;
      state.comment = '';
    },
  },
});

export const { setRating, setComment, resetReview } = reviewSlice.actions;
export default reviewSlice.reducer;
