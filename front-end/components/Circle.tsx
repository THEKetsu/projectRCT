class Circle {
    x: number;
    y: number;
    id: number;
    myArray: number[][];
    myColor: string;
    speed: string;
    speedIndice: number;
  
    constructor(x: number, y: number, id: number, myArray: number[][], myColor: string, speed: string, speedIndice: number) {
      this.x = x;
      this.y = y;
      this.id = id;
      this.myArray = myArray;
      this.myColor = myColor;
      this.speed = speed; //Vitesse montré par la couleur directement 1=Noir , 2=White, 3=Blue
      this.speedIndice = speedIndice; //J'avais besoin d'un chiffre quand même xD
    }
  
    static createCircle(x: number, y: number, id: number, myArray: number[][], myColor: string, speed: string, speedIndice: number): Circle {
      const circle = new Circle(x, y, id, myArray,myColor,speed,speedIndice);
      return circle;
    }
  
    pushThis(x: number, y: number): void {
      const myPush = this.myArray;
      myPush.push([x, y]);
      this.myArray = myPush;
    }
  
    moveToThis(x: number, y: number): void {
      this.x = x;
      this.y = y;
    }
  }
  
  export default Circle;
