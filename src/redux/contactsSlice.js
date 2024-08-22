import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectContacts, selectFilter } from "./selectors";

const initialState = {
    contacts: [],
    isLoading: false,
    isError: false,
    filter: '',
};

const handlePending = state => {
    state.isLoading = true;
    state.isError = false;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.isError = action.payload;
};


const slice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        changeFilter(state, action) {
            state.filter = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
            })
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.contacts.push(action.payload);
            })
            .addCase(addContact.rejected, handleRejected);
    }
});


export const selectFilteredContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filter) => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    }
);


export const { changeFilter } = slice.actions;
export const contactsReducer = slice.reducer;