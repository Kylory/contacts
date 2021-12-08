import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://contacts-back.herokuapp.com/api';
// axios.defaults.baseURL = 'http://localhost:4000/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      token.set(response.data.ResponseBody.token);
      return response.data.ResponseBody;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/login', credentials);
      token.set(response.data.ResponseBody.token);
      return response.data.ResponseBody;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      token.unset();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const LStoken = state.auth.token;

    if (LStoken === null) {
      return thunkAPI.rejectWithValue();
    }

    token.set(LStoken);
    try {
      const response = await axios.get('/users/current');
      return response.data.ResponseBody;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const logInUserRejected = createAction('auth/logInUserRejected');
export const registerUserRejected = createAction('auth/registerUserRejected');
