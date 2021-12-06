import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'https://kylory-contacts.herokuapp.com'
axios.defaults.baseURL = 'http://localhost:4000/api';

export const DB_fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/contacts');
      return data.contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const DB_postContact = createAsyncThunk(
  'contacts/postContact',
  async ({ name, number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/contacts', {
        name: `${name}`,
        number: `${number}`,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const DB_deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const filterContacts = createAction('contacts/filterContacts');
