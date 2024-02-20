

export function isValidString (input: string): boolean {
    const regex = /^[RrBb][1-9](?:[0-9])?$/;

    return regex.test(input);
}

export function comparePositions(positionA: number[], positionB: number[]): boolean {
    return positionA[0] === positionB[0] && positionA[1] === positionB[1];
}