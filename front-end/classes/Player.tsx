class Player {

  id: string;
  position: number[];
  myArray: number[][];
  svg_player : number[];
  speed : number;
  ballonOn : string;


  constructor(position : number[], id: string, myArray: number[][], svg_player: number[],speed : number, ballonOn: string) {
    this.position = position;
    this.id = id;
    this.myArray = myArray;
    this.svg_player = svg_player;
    this.speed = speed;
    this.ballonOn = ballonOn;
  }

  static createPlayer(position : number[], id: string, myArray: number[][], svg_player : number[], speed : number, ballonOn :string): Player {
    const player = new Player(position, id, myArray,svg_player,speed,ballonOn);
    return player;
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
    this.speed = this.speed +1;
    if(this.speed>3){
      this.speed = 1;
    }
  }

}

export default Player;
