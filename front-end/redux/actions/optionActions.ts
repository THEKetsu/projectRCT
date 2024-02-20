import {optionSlice} from "../slices/optionSlice";
import {OptionActionsType} from "../../utils/interfaces";

// @ts-ignore
export const {
    selectPlayer,
    setInputPlayerId,
    triggerRefresh,
    setPlayerPaths,
    setClosestPlayer,
    toggleAutoLink
}: OptionActionsType = optionSlice.actions