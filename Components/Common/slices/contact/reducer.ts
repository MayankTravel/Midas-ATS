import { createSlice } from "@reduxjs/toolkit";
import { getContacts, addNewContact, updateContact, deleteContact } from './thunk';

export const initialState = {
    contacts: [],
    error: {},
};

const contactslice = createSlice({
    name: 'Contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getContacts.fulfilled, (state: any, action: any) => {
            state.contacts = action.payload;
        });
        builder.addCase(getContacts.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(addNewContact.fulfilled, (state: any, action: any) => {
            state.contacts.push(action?.payload);
        });
        builder.addCase(addNewContact.rejected, (state: any, action: any) => {
            state.error = action?.payload?.error || null;
        });

        builder.addCase(updateContact.fulfilled, (state: any, action: any) => {
            state.contacts = (state.contacts || []).map((event: any) =>
                event.id.toString() === action?.payload.id.toString()
                    ? { ...event, ...action?.payload }
                    : event
            );
        });

        builder.addCase(updateContact.rejected, (state: any, action: any) => {
            state.error = action?.payload?.error || null;
        });

        builder.addCase(deleteContact.fulfilled, (state: any, action: any) => {
            state.contacts = state.contacts.filter(
                (event: any) => event.id.toString() !== action?.payload.toString()
            );
        });
        builder.addCase(deleteContact.rejected, (state: any, action: any) => {
            state.error = action?.payload?.error || null;
        });
    }
});

export default contactslice.reducer;