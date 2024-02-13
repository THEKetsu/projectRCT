import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit"

export interface PositionLogic {
    positionList: string
}

const initialState : PositionLogic = {
    positionList: "hello"
}

export const positionLogicSlice: Slice<PositionLogic>  = createSlice({
    name: "positionLogic",
    initialState,
    reducers: {
        setPositionList : (state: PositionLogic, action: PayloadAction<string>) => {
            state.positionList = action.payload
        }
    }
})