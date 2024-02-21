import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export interface PlayerPath {
    id: string;
    path: string;
}

export interface FreeDraw {
    position: number[];
    path: string;
    id: number;
    numbers: number[][];
}

export interface ShirtDigit {
    id: string;
    position: number[];
    textContent: string;
    textSize: number;
}

export interface Position {
    positionList: string,
    positionIndex: number
}

export interface Toolbar {
    zoomMode: boolean,
    ballMode: boolean,
    playerMode: boolean,
    drawMode: boolean
}

export interface TLActionsType {
    selectZoomMode: ActionCreatorWithoutPayload,
    selectBallMode: ActionCreatorWithoutPayload,
    selectPlayerMode: ActionCreatorWithoutPayload,
    selectDrawMode: ActionCreatorWithoutPayload,
    unselectAll: ActionCreatorWithoutPayload
}

export interface Option {
    selectedPlayer: string,
    inputPlayerId: string,
    refresh: number | null,
    playerPaths: string,
    closestPlayer: string,
    autoLink: boolean
}

export interface OptionActionsType {
    selectPlayer: ActionCreatorWithPayload<string>,
    setInputPlayerId: ActionCreatorWithPayload<string>,
    triggerRefresh: ActionCreatorWithoutPayload,
    setPlayerPaths: ActionCreatorWithPayload<string>,
    setClosestPlayer: ActionCreatorWithPayload<string>,
    toggleAutoLink: ActionCreatorWithoutPayload
}

export interface dispatchType {
    option: Option,
    position: Position,
    toolbar: Toolbar
}