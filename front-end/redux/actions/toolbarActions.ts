import { TLActionsType } from "../../utils/interfaces";
import {toolbarSlice} from "../slices/toolbarSlice";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

// @ts-ignore
export const {
    selectZoomMode,
    selectBallMode,
    selectPlayerMode,
    selectDrawMode,
    unselectAll
}: TLActionsType = toolbarSlice.actions