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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch