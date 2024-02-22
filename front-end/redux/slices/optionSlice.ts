import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit"
import {Option} from "../../utils/interfaces";

const initialState : Option = {
    selectedPlayer: "",
    inputPlayerId: "",
    refresh: null,
    playerPaths: "[]",
    closestPlayer: "[\"\", []]",
    autoLink: true
}

export const optionSlice: Slice<Option>  = createSlice({
    name: "option",
    initialState,
    reducers: {
        selectPlayer: (state: Option, action: PayloadAction<string>): void => {
            state.selectedPlayer = action.payload
        },
        setInputPlayerId: (state: Option, action: PayloadAction<string>): void => {
            state.inputPlayerId = action.payload
        },
        triggerRefresh: (state: Option): void => {
            state.refresh = Date.now()
        },
        setPlayerPaths: (state: Option, action: PayloadAction<string>): void => {
            state.playerPaths = action.payload
        },
        setClosestPlayer: (state: Option, action: PayloadAction<string>): void => {
            state.closestPlayer = action.payload
        },
        toggleAutoLink: (state: Option): void => {
            state.autoLink = !state.autoLink
        }
    }
})