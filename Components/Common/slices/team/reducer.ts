import { createSlice } from "@reduxjs/toolkit";
import { getTeam, addNewMember, updateMember, deleteMember } from './thunk';

export const initialState = {
    team: [],
    error: {},
};

const teamslice = createSlice({
    name: 'Team',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTeam.fulfilled, (state: any, action: any) => {
            state.team = action.payload;
        });
        builder.addCase(getTeam.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(addNewMember.fulfilled, (state: any, action: any) => {
            state.team.push(action?.payload);
        });
        builder.addCase(addNewMember.rejected, (state: any, action: any) => {
            state.error = action?.payload?.error || null;
        });

        builder.addCase(updateMember.fulfilled, (state: any, action: any) => {
            state.team = (state.team || []).map((event: any) =>
                event.id.toString() === action?.payload.id.toString()
                    ? { ...event, ...action?.payload }
                    : event
            );
        });

        builder.addCase(updateMember.rejected, (state: any, action: any) => {
            state.error = action?.payload?.error || null;
        });

        builder.addCase(deleteMember.fulfilled, (state: any, action: any) => {
            state.team = state.team.filter(
                (event: any) => event.id.toString() !== action?.payload.toString()
            );
        });
        builder.addCase(deleteMember.rejected, (state: any, action: any) => {
            state.error = action?.payload?.error || null;
        });
    }
});

export default teamslice.reducer;