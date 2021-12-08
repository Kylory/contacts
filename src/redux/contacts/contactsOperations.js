import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://contacts-back.herokuapp.com/api';
// axios.defaults.baseURL = 'http://localhost:4000/api';

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
      return data.newContact;
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

export const DB_updateContactById = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, contact }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/contacts/${contactId}`, contact);
      return data.updatedContact;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const filterContacts = createAction('contacts/filterContacts');

export const openModal = createAction('contacts/openModal');
export const closeModal = createAction('contacts/closeModal');

export const getEditContactId = createAsyncThunk(
  'contacts/getEditContactId',
  async (contactId, { rejectWithValue }) => {
    return contactId;
  },
);
export const clearEditContactId = createAction('contacts/clearEditContactId');
