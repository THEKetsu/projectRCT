import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit"

export interface PositionLogic {
    positionList: string,
    positionIndex: number
}

const initialState : PositionLogic = {
    positionList: "[]",
    positionIndex: 0
}

export const positionLogicSlice: Slice<PositionLogic>  = createSlice({
    name: "positionLogic",
    initialState,
    reducers: {
        setPositionList : (state: PositionLogic, action: PayloadAction<string>) => {
            state.positionList = action.payload
        },
        setPositionIndex: (state: PositionLogic, action: PayloadAction<number>) => {
            state.positionIndex = action.payload
        }
    }
})