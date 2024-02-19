import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit"

export interface Option {
    selectedPlayer: string
}

const initialState : Option = {
    selectedPlayer: ""
}

export const optionSlice: Slice<Option>  = createSlice({
    name: "option",
    initialState,
    reducers: {
        selectPlayer: (state: Option, action: PayloadAction<string>) => {
            state.selectedPlayer = action.payload
        }
    }
})