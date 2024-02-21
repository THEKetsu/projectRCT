import { configureStore } from '@reduxjs/toolkit'
import {positionLogicSlice} from "./slices/positionLogicSlice";
import {toolbarLogicSlice} from "./slices/toolbarLogicSlice";

export const store = configureStore({
    reducer: {
        positionLogic: positionLogicSlice.reducer,
        toolbarLogic: toolbarLogicSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch