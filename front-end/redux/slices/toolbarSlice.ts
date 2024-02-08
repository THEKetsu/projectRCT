import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import Player from "../../classes/Player";
import Ballon from "../../classes/Ballon";

export interface ToolBarState {
    positionList: [number, Player[], Ballon[]][]
}

const initialState: ToolBarState = {
    positionList: [[
        0,
        [Player.createPlayer([0, 0], "0B", [], [], 1)],
        [Ballon.createBallon([0,0],[],"")]
    ]]
}

export const toolbarSlice = createSlice({
    name: "toolbar",
    initialState,
    reducers: {
        setToolbarPositionList : (state, action: PayloadAction<[number, Player[], Ballon[ ]][]>) : void => {
            state.positionList = action.payload
        }
    }
})