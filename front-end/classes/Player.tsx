export default class Player {
  static Player(arg0: number[], arg1: string, arg2: never[], arg3: never[], arg4: number): Player[] {
      throw new Error("Method not implemented.");
  }

  id: string;
  position: number[];
  myArray: number[][];
  svg_player : number[];
  speed : number;

  constructor(position : number[], id: string, myArray: number[][], svg_player: number[],speed : number) {
    this.position = position;
    this.id = id;
    this.myArray = myArray;
    this.svg_player = svg_player;
    this.speed = speed;
  }

  static createPlayer(position : number[], id: string, myArray: number[][], svg_player : number[], speed : number): Player {
    return new Player(position, id, myArray, svg_player, speed);
  }

  svgValue(svg: number[]): void{
      this.svg_player = svg;
    }

  pathArraySetup( array: number[][]): void{
      this.myArray = array;
  }

  arrayPush(value: number[]): void{
    this.myArray.push(value);
}

  positionChange(pos: number[]): void{
    this.position = pos;
  }

  speedUp(): void{
    this.speed = this.speed + 1;
    if(this.speed>3){
      this.speed = 1;
    }
  }
}

