import { configureStore } from '@reduxjs/toolkit'
import {testUserSlice} from "./slices/testUserSlice";
import {positionLogicSlice} from "./slices/positionLogicSlice";

export const store = configureStore({
    reducer: {
        testUser: testUserSlice.reducer,
        positionLogic: positionLogicSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch