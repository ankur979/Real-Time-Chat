import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../baseUrl';
import axios from 'axios';

export const allUser = createAsyncThunk(
    "user/allUser",
    async (token) => {
        // console.log(action);
        try {
            const response = await axios.get(`${baseURL}/user/allUser`, {
                headers: {
                    "user-token": token
                }
            })
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    })

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData:[]
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(allUser.pending, (state, action) => {
            })
            .addCase(allUser.fulfilled, (state, action) => {
                state.userData = action.payload;
            })
            .addCase(allUser.rejected, (state, action) => {
            })
    }
})
//export const { allUser } = userSlice.actions;
export default userSlice.reducer;