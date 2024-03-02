import {optionSlice} from "../slices/optionSlice";
import {Option, OptionActionsType, PlayerPath, Position} from "../../utils/interfaces";
import {isValidString, parsePositionList} from "../../utils/functions";
import Player from "../../classes/Player";
import {setPositionList} from "./positionActions";
import Ballon from "../../classes/Ballon";
import {Dispatch} from "react";
import { returnPublicInstance } from '../../classes/ReturnPublicManager';

// @ts-ignore
export const {
    selectPlayer,
    setInputPlayerId,
    triggerRefresh,
    triggerRefreshAnimation,
    setPlayerPaths,
    setClosestPlayer,
    toggleAutoLink
}: OptionActionsType = optionSlice.actions


export function linkToPlayer (refresh: boolean, dispatch: Dispatch<any>, position: Position, option: Option): void {
    const buffPL = parsePositionList(position.positionList)

    if (buffPL[position.positionIndex][1].length > 0 && buffPL[position.positionIndex][2].length > 0) {
        if (buffPL[position.positionIndex][2][0].idJoueur == "") {
            buffPL[position.positionIndex][2][0].idChange(JSON.parse(option.closestPlayer)[0]);
            buffPL[position.positionIndex][2][0].positionChange(JSON.parse(option.closestPlayer)[1]);

            dispatch(setPositionList(JSON.stringify(buffPL)))
        } else {
            buffPL[position.positionIndex][2][0].idChange("");

            dispatch(setPositionList(JSON.stringify(buffPL)))
        }

        if (refresh) {
            dispatch(triggerRefresh());
        }
    }
}

export function replacePlayerID (text: string, dispatch: Dispatch<any>, position: Position, option: Option): void {
    const buffPositionList = parsePositionList(position.positionList)

    if (buffPositionList[position.positionIndex][1].some((joueur: Player) => joueur.id === text && joueur.id !== option.inputPlayerId)) {
        console.log(`A player has the ID:${text}`);
        return
    }

    if (isValidString(text)) {
        let indexID: number = buffPositionList[position.positionIndex][1].findIndex((joueur: Player): boolean => joueur.id === option.selectedPlayer);

        if (indexID != -1) {
            if (buffPositionList[position.positionIndex][2].length > 0) {
                if (buffPositionList[position.positionIndex][2][0].idJoueur === buffPositionList[position.positionIndex][1][indexID].id) {
                    
                    buffPositionList[position.positionIndex][2][0].idChange(text)
                    dispatch(setPositionList(JSON.stringify(buffPositionList)))
                }
            }
            let indexPath = JSON.parse(option.playerPaths).findIndex((p: PlayerPath): boolean => p.id === buffPositionList[position.positionIndex][1][indexID].id + 'P');

            if (indexPath != -1) {
                dispatch(setPlayerPaths(
                    JSON.stringify(
                        JSON.parse(option.playerPaths).splice(indexPath, 1)
                    )
                ))
            }

            buffPositionList[position.positionIndex][1][indexID].idChange(text)

            dispatch(setPositionList(
                JSON.stringify(
                    buffPositionList
                )
            ))
            dispatch(selectPlayer(text))
        }
    }
}

export function modifySpeed(dispatch: Dispatch<any>, position: Position, option: Option, speedValue: number){
    let indexID: number = JSON.parse(position.positionList)[position.positionIndex][1].findIndex((joueur: Player): boolean => joueur.id === option.selectedPlayer);

    if(indexID != -1){
        let newPositionList: [number, Player[], Ballon[]][] = JSON.parse(position.positionList);
        newPositionList[position.positionIndex][1].map((j, index) => {
            let objectIntoPlayer = Player.createPlayer(j.position, j.id, j.myArray, j.svg_player, j.speed);
            newPositionList[position.positionIndex][1][index] = objectIntoPlayer;
          });
        // let object = newPositionList[position.positionIndex][1][indexID];
        // let newPlayer = Player.createPlayer(object.position,object.id,object.myArray,object.svg_player,speedValue);
        // newPositionList[position.positionIndex][1][indexID] = newPlayer;
        
        newPositionList[position.positionIndex][1][indexID].speedChange(speedValue);
 
        dispatch(setPositionList(JSON.stringify(newPositionList)));
        dispatch(triggerRefresh());
    }
}

export function deletePlayer (dispatch: Dispatch<any>, position: Position, option: Option) {
    let indexID: number = JSON.parse(position.positionList)[position.positionIndex][1].findIndex((joueur: Player): boolean => joueur.id === option.selectedPlayer);

    if (indexID != -1) {
        let newPositionList: [number, Player[], Ballon[]][] = [...JSON.parse(position.positionList)];
        let indexPathID: number = JSON.parse(option.playerPaths).findIndex((p: PlayerPath): boolean => p.id === option.selectedPlayer + 'P');

        const foundIndex = returnPublicInstance.returnActionList.findIndex(
            (number) => number[0] === position.positionIndex
          );
        
        if(foundIndex != -1){
            returnPublicInstance.returnActionList[foundIndex][1].push(["d",newPositionList[position.positionIndex][1][indexID]]);
        }else{
            returnPublicInstance.returnActionList.push([position.positionIndex,[["d",newPositionList[position.positionIndex][1][indexID]]]]);
        }
          

       
        newPositionList[position.positionIndex][1].splice(indexID, 1);

        dispatch(setPositionList(JSON.stringify(newPositionList)))

        dispatch(selectPlayer(""))

        if (indexPathID != -1) {
            const newPlayerPath: PlayerPath[] = [...JSON.parse(option.playerPaths)];

            newPlayerPath.splice(indexPathID, 1);

            dispatch(setPlayerPaths(JSON.stringify(newPlayerPath)))
        }
        dispatch(triggerRefresh())
    }
}

export function deleteBallon (dispatch: Dispatch<any>, position: Position): void {
    const newPositionList = JSON.parse(position.positionList)

    newPositionList[position.positionIndex][2].splice(0, 1);

    dispatch(setPositionList(JSON.stringify(newPositionList)))
    dispatch(triggerRefresh())
}

