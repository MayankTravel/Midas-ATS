import { createSlice } from "@reduxjs/toolkit";
import { getAPIKey, addNewAPIKey, updateAPIKey, deleteAPIKey } from './thunk';

export const initialState = {
    apiKey: [],
    error: {},
};

const APIKeyslice = createSlice({
    name: 'APIKey',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAPIKey.fulfilled, (state: any, action: any) => {
            state.apiKey = action.payload;
        });
        builder.addCase(getAPIKey.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(addNewAPIKey.fulfilled, (state: any, action: any) => {
            state.apiKey.push(action?.payload);
        });
        builder.addCase(addNewAPIKey.rejected, (state: any, action: any) => {
            state.error = action?.payload?.error || null;
        });

        builder.addCase(updateAPIKey.fulfilled, (state: any, action: any) => {
            state.apiKey = (state.apiKey || []).map((event: any) =>
                event.id.toString() === action?.payload.id.toString()
                    ? { ...event, ...action?.payload }
                    : event
            );
        });

        builder.addCase(updateAPIKey.rejected, (state: any, action: any) => {
            state.error = action?.payload?.error || null;
        });

        builder.addCase(deleteAPIKey.fulfilled, (state: any, action: any) => {
            state.apiKey = state.apiKey.filter(
                (event: any) => event.id.toString() !== action?.payload.toString()
            );
        });
        builder.addCase(deleteAPIKey.rejected, (state: any, action: any) => {
            state.error = action?.payload?.error || null;
        });
    }
});

export default APIKeyslice.reducer;