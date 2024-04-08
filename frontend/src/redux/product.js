import { createSlice } from '@reduxjs/toolkit';

export const proSlice = createSlice({
    name: 'product',
    initialState: {
       searchValue: '',
       categoryId: ''
    },

    reducers: {
        search: (state, action) => {
            state.searchValue = action.payload
        },
        category: (state, action) => {
            state.categoryId = action.payload
        },

    },
});

export const { search, category } = proSlice.actions;
export default proSlice.reducer;
