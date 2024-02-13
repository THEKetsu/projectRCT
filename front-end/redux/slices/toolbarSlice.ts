import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface ToolBarState {
    positionList: string
}

const initialState: ToolBarState = {
    positionList: ""
}

export const toolbarSlice = createSlice({
    name: "toolbar",
    initialState,
    reducers: {
        setToolbarPositionList : (state, action: PayloadAction<string>) : void => {
            state.positionList = action.payload
        }
    }
})