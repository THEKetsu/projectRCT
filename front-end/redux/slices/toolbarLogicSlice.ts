import {ActionCreatorWithoutPayload, createSlice, Slice, SliceCaseReducers} from "@reduxjs/toolkit"

export interface ToolbarLogic {
    zoomMode: boolean,
    ballMode: boolean,
    playerMode: boolean,
    drawMode: boolean
}

const initialState: ToolbarLogic = {
    zoomMode: true,
    ballMode: false,
    playerMode: false,
    drawMode: false
}

export const toolbarLogicSlice: Slice<ToolbarLogic> = createSlice({
    name: "toolbarLogic",
    initialState,
    reducers: {
        selectZoomMode: (state: ToolbarLogic): void => {
            state.zoomMode = true
            state.ballMode = false
            state.playerMode = false
            state.drawMode = false
        },
        selectBallMode: (state: ToolbarLogic): void => {
            state.zoomMode = false
            state.ballMode = true
            state.playerMode = false
            state.drawMode = false
        },
        selectPlayerMode: (state: ToolbarLogic): void => {
            state.zoomMode = false
            state.ballMode = false
            state.playerMode = true
            state.drawMode = false
        },
        selectDrawMode: (state: ToolbarLogic): void => {
            state.zoomMode = false
            state.ballMode = false
            state.playerMode = false
            state.drawMode = true
        },
        unselectAll : (state: ToolbarLogic): void => {
            state.zoomMode = false
            state.ballMode = false
            state.playerMode = false
            state.drawMode = false
        }
    }
})