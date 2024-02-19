import {toolbarSlice} from "../slices/toolbarSlice";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

interface TLActionsType {
    selectZoomMode: ActionCreatorWithoutPayload,
    selectBallMode: ActionCreatorWithoutPayload,
    selectPlayerMode: ActionCreatorWithoutPayload,
    selectDrawMode: ActionCreatorWithoutPayload,
    unselectAll: ActionCreatorWithoutPayload
}

// @ts-ignore
export const {
    selectZoomMode,
    selectBallMode,
    selectPlayerMode,
    selectDrawMode,
    unselectAll
}: TLActionsType = toolbarSlice.actions