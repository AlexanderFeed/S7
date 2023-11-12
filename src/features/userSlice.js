import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { startTransition } from "react";
import { act } from "react-dom/test-utils";

export const loginUser = createAsyncThunk (
    'user/loginUser',
    async(userCredentials, {rejectWithValue}) =>{
        const request = await fetch("https://reqres.in/api/login", {
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(userCredentials)
        }).then((res) => {
            return res.json();    
        })
        
        const response = await request.token;
        if(response === undefined){
            return rejectWithValue(request.error)
            
        }
        localStorage.setItem('email', userCredentials.username)
        localStorage.setItem('jwttoken', request.token)
        return response;
        
    }
)



export const userSlice = createSlice({
    name: "user",
    initialState:{
        username:null,
        token:null,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.username = localStorage.getItem('email');
            state.token = action.payload;
            state.error = null
        })
        .addCase(loginUser.rejected,(state, action)=>{
            state.username = null;
            state.token = null;
            state.error = action.error.message;

        })
    }
});

export default userSlice.reducer;