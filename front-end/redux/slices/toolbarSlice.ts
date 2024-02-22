import {ActionCreatorWithoutPayload, createSlice, Slice, SliceCaseReducers} from "@reduxjs/toolkit"
import {Toolbar} from "../../utils/interfaces";

const initialState: Toolbar = {
    zoomMode: true,
    ballMode: false,
    playerMode: false,
    drawMode: false
}

export const toolbarSlice: Slice<Toolbar> = createSlice({
    name: "toolbar",
    initialState,
    reducers: {
        selectZoomMode: (state: Toolbar): void => {
            state.zoomMode = true
            state.ballMode = false
            state.playerMode = false
            state.drawMode = false
        },
        selectBallMode: (state: Toolbar): void => {
            state.zoomMode = false
            state.ballMode = true
            state.playerMode = false
            state.drawMode = false
        },
        selectPlayerMode: (state: Toolbar): void => {
            state.zoomMode = false
            state.ballMode = false
            state.playerMode = true
            state.drawMode = false
        },
        selectDrawMode: (state: Toolbar): void => {
            state.zoomMode = false
            state.ballMode = false
            state.playerMode = false
            state.drawMode = true
        },
        unselectAll : (state: Toolbar): void => {
            state.zoomMode = false
            state.ballMode = false
            state.playerMode = false
            state.drawMode = false
        }
    }
})