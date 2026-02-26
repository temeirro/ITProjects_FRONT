import {createAsyncThunk} from '@reduxjs/toolkit';
import {ILogin, IRegister} from "../../interfaces/auth.ts";
import {apiClient} from "../../utils/api/apiClient.ts";
import {handleAxiosError} from "../../utils/errors/handleAxiosError.ts";


export const login = createAsyncThunk(
    'account/login',
    async (payload : ILogin, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/Accounts/Login', payload);
            return response.data;

        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Сталася неочікувана помилка'));
        }
    },
);

export const register = createAsyncThunk(
    'account/register',
    async (payload : IRegister, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/Accounts/Registration', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);