import {configureStore} from "@reduxjs/toolkit/src";
import {testUserSlice} from "./slices/testUserSlice";


export const store = configureStore({
    reducer: {
        testUser: testUserSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>