import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit"
import {Position} from "../../utils/interfaces";

const initialState : Position = {
    positionList: "[]",
    positionIndex: 0
}

export const positionSlice: Slice<Position>  = createSlice({
    name: "position",
    initialState,
    reducers: {
        setPositionList : (state: Position, action: PayloadAction<string>) => {
            state.positionList = action.payload
        },
        setPositionIndex: (state: Position, action: PayloadAction<number>) => {
            state.positionIndex = action.payload
        }
    }
})