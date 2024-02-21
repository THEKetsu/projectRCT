import Player from "../classes/Player";
import Ballon from "../classes/Ballon";


export function isValidString (input: string): boolean {
    const regex = /^[RrBb][1-9](?:[0-9])?$/;

    return regex.test(input);
}

export function comparePositions(positionA: number[], positionB: number[]): boolean {
    return positionA[0] === positionB[0] && positionA[1] === positionB[1];
}

export function parsePositionList(positionList: string) {
    return JSON
        .parse(positionList)
        .map((item: any) => [item[0], item[1].map(Player.from), item[2].map(Ballon.from)])
}