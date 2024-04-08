import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        listPro: [],
        total: {},
    },

    reducers: {
        orderPro: (state, action) => {
            state.listPro = action.payload.check;
            state.total = action.payload.state;

        },
        
    },
});

export const { orderPro } = orderSlice.actions;
export default orderSlice.reducer;
