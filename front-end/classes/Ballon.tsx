class Ballon {
    static Ballon(arg0: number[], arg1: never[], arg2: string): Ballon[] {
        throw new Error("Method not implemented.");
    }

    position: number[];
    svg_ballon : number[];
    idJoueur: string;

  
    constructor(position : number[], svg_ballon: number[], idJoueur: string) {
      this.position = position;
      this.svg_ballon = svg_ballon;
      this.idJoueur = idJoueur;

    }
  
    static createBallon(position : number[], svg_ballon : number[], idJoueur: string): Ballon {
      const player = new Ballon(position,svg_ballon,idJoueur);
      return player;
    }
  
    svgValue(svg: number[]): void{
        this.svg_ballon = svg;
      }
  
    positionChange(pos: number[]): void{
      this.position = pos;
    }

    idChange(id: string): void{
      this.idJoueur = id;
    }
  
  }
  
  export default Ballon;
  