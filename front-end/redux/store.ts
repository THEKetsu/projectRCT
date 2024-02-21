import { configureStore } from '@reduxjs/toolkit'
import {positionSlice} from "./slices/positionSlice";
import {toolbarSlice} from "./slices/toolbarSlice";
import {optionSlice} from "./slices/optionSlice";
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";
import {dispatchType} from "../utils/interfaces";

export const store = configureStore({
    reducer: {
        position: positionSlice.reducer,
        toolbar: toolbarSlice.reducer,
        option: optionSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch