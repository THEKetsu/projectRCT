class Ballon {

    position: number[];
    svg_ballon : number[];
    idJoueur: string;
  
    constructor(position : number[], svg_ballon: number[], idJoueur: string) {
      this.position = position;
      this.svg_ballon = svg_ballon;
      this.idJoueur = idJoueur;
    }
  
    static createBallon(position : number[], svg_ballon : number[], idJoueur: string): Ballon {
        return new Ballon(position, svg_ballon, idJoueur);
    }

    static from(json: any) {
        return Object.assign(new Ballon(json.position, json.svg_ballon, json.idJoueur), json)
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
  