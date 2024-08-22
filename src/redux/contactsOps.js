import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://66c71f7c732bf1b79fa569cd.mockapi.io/";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`contacts/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post("contacts", body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchContactsThunk = () => async dispatch => {
//     try {
//         dispatch(fetchIsLoading(true));
//         const res = await axios.get('contacts');
//         dispatch(fetchData(res.data))
//     } catch (error) {
//         dispatch(fetchIsError(true));
//     } finally {
//         dispatch(fetchIsLoading(false));
//     }
// };

// export const deleteContactThunk = (id) => async dispatch => {
//     try {
//         dispatch(fetchIsLoading(true));
//         await axios.delete(`contacts/${id}`);
//         dispatch(deleteContacts(id));
//     } catch (error) {
//         dispatch(fetchIsError(true));
//     } finally {
//         dispatch(fetchIsLoading(false));
//     }
// };
