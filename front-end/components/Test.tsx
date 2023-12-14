import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, PanResponder, Pressable, TouchableOpacity, TextStyle, StyleProp, TouchableWithoutFeedback } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import Circle from './Circle';



interface Coordinates {
  x: number;
  y: number;
}

interface CirclePath {
  [key: number]: string;
}

interface MyComponentProps {}

export function MyComponent(props: MyComponentProps) {
  const windowWidth = Dimensions.get('window').width / 1.4;
  const windowHeight = Dimensions.get('window').height / 1.3;

  const [circlePosition, setCirclePosition] = useState<Coordinates>({ x: 200, y: 200 });
  const [isDragging, setIsDragging] = useState(false);

  const [drawing, setDrawing] = useState([false, null] as [boolean, Circle | null]);
  const [path, setPath] = useState('');
  const [circles, setCircles] = useState<Circle[]>([]);
  const [circlePaths, setCirclePaths] = useState<CirclePath>({});
  const [freePaths, setFreePaths] = useState<CirclePath>({});
  let freeD = false;
  let drawingfree = false;
  let myID = -1;



  //6-------->

  const addCircle = () => {
    const maxId = circles.reduce((max, circle) => Math.max(max, circle.id), -1);
    const newId = maxId + 1;
    const newCircle = Circle.createCircle(300, 300, newId, [], 'red', 'black',1);

    setCircles([...circles, newCircle]);
    const initialPath = `M${newCircle.x + styles.circle.width / 2} ${newCircle.y + styles.circle.height / 2}`;
    setCirclePaths({ ...circlePaths, [newId]: initialPath });
  };

  const freeDrawing = () => {
    freeD = !freeD;
  };

  const handleCirclePress2 = (e: any, gestureState: any, id: number) => {
    const updatedCircles = circles.map((circle) => {
      if (circle.id === id) {
        let resetPath = `M${circle.x + styles.circle.width / 2} ${circle.y + styles.circle.height / 2}`;
        const updatedCirclePaths = { ...circlePaths };

        if (updatedCirclePaths.hasOwnProperty(id)) {
          updatedCirclePaths[id] = resetPath;
        }

        setCirclePaths(updatedCirclePaths);

        /*  On verifie la vitesse du cercle et on l'adapte (max = 3)*/
        
        if(circle.speedIndice==1){
          circle.speedIndice++;
          circle.speed = "white";
        }
        else if(circle.speedIndice==2){
          circle.speedIndice++;
          circle.speed = "blue";
        }
        else if(circle.speedIndice==3){
          circle.speedIndice = 1;
          circle.speed = "black";
          
        }
        
        /*  */

        return new Circle(circle.x, circle.y, circle.id, [],"orange", circle.speed, circle.speedIndice);
      }
      let notSelect = circle;
      notSelect.myColor = "red";
      return notSelect;
    });

    setCircles(updatedCircles);
    let TheCircle = updatedCircles.find((circle) => circle.id === id);
    if (TheCircle) {
        handleDrawStart2(e, gestureState, TheCircle);
      } else {
        // Handle the case where TheCircle is undefined
        console.error('Circle not found with id:', id);
      }
  };

  const handleDrawStart2 = (e: any, gestureState: any, TheCircle: Circle) => {
    setPath(`M${TheCircle?.x + styles.circle.width / 2} ${TheCircle?.y + styles.circle.height / 2}`);
    drawing[0] = !drawing[0];
    drawing[1] = TheCircle;
  };

  const resetAllPAth = () => {
    const updatedCirclePaths = { ...circlePaths };
    circles.map((circle) => {
      let resetPath = `M${circle.x + styles.circle.width / 2} ${circle.y + styles.circle.height / 2}`;
      if (updatedCirclePaths.hasOwnProperty(circle.id)) {
        updatedCirclePaths[circle.id] = resetPath;
      }
    });

    setCirclePaths(updatedCirclePaths);
  };

  const handleMovingStart = () => {
    //const animationTiming = 1000;
    const miniTiming = 30;

    function moveCircleStep2(TheCircle: Circle, i: number, timing: number) {
      if (i < TheCircle.myArray.length) {
        let [x, y] = TheCircle.myArray[i];
        x = x - 15;
        y = y - 15;

        TheCircle.moveToThis(x, y);
        i++;
        setCircles((prevCircles) => {
            const updatedCircles = prevCircles.map((circle) => {
              if (circle.id === TheCircle.id) {
                return new Circle(x, y, circle.id, circle.myArray,circle.myColor,circle.speed,circle.speedIndice);
              }
              return circle;
            });
          
            return updatedCircles;
          });
        setTimeout(() => moveCircleStep2(TheCircle, i, timing), timing);
      }
    }

    let atLeastOneTime = false;
    circles.map((circle) => {
      console.log('Circle', circle.id);
      if (circle.myArray.length > 0 && circle instanceof Circle) {
        //moveCircleStep2(circle, 0, (animationTiming*3/circle.speedIndice) / circle.myArray.length);
        moveCircleStep2(circle, 0, (miniTiming/circle.speedIndice));
        atLeastOneTime = true;

        //console.log('Temps:', (animationTiming*3/circle.speedIndice) / circle.myArray.length);
        console.log('Total length:', circle.myArray.length);
      }
    });

    //Bug, je ne sais pas pourquoi mais enlever le timeout ne lance pas la fonction (thread problem)
      setTimeout(resetAllPAth, 0);
  };

  const handleDrawMove = (e: any, gestureState: any, TheCircle: Circle | null) => {
    if (!drawing[0] || !TheCircle) return;

    const x = gestureState.moveX - 340;
    const y = gestureState.moveY - 125;

    const updatedPath = `${path}${path ? ' ' : ''}L${x} ${y}`;
    setPath(updatedPath);

    TheCircle?.pushThis(x, y);

    setCirclePaths({
      ...circlePaths,
      [TheCircle?.id as number]: updatedPath,
    });
  };

  const handleDrawFree = (e: any, gestureState: any) => {

    const x = gestureState.moveX - 340;
    const y = gestureState.moveY - 125;

    const updatedPath = `${path}${path ? ' ' : ''}L${x} ${y}`;
    setPath(updatedPath);
  };

  const handleDrawEnd = () => {
    let unitBool = false;
    drawing[0] = unitBool;
    drawing[1] = null;
    console.log(drawing, freeD, "let go");
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: (e, gestureState) => {
      console.log("Now!");
      if (!freeD) {
        if (drawing[0]) {
          console.log(circles);
          handleDrawMove(e, gestureState, drawing[1]);
        }
      } else {
        handleDrawFree(e, gestureState);
      }
    },
    onPanResponderRelease: () => {
      handleDrawEnd();
    },
  });

  return (
    <View style={[styles.square, { width: windowWidth, height: windowHeight }]} {...panResponder.panHandlers}>
      <Svg height={windowHeight} width={windowWidth}>
        {Object.keys(circlePaths).map((circleId) => (
          <Path key={parseInt(circleId)} d={circlePaths[parseInt(circleId)]} fill="transparent" stroke="black" strokeWidth={2} />
        ))}
      </Svg>
      <View style={[styles.circle, { top: 10, left: 10 }]} onStartShouldSetResponder={(e) =>{ handleMovingStart(); return true;}}>
        {/* ... */}
      </View>

      {circles.map((circle, index) => (
        <View
        key={index}
        style={{
          position: 'absolute',
          top: circle.y,
          left: circle.x,
          width: 30,
          height: 30,
          backgroundColor: circle.myColor,
          borderColor: circle.speed,
          borderWidth: 2, 
          borderRadius: 15,
        }}
        onStartShouldSetResponder={(e) => { handleCirclePress2(e, null, circle.id); return true; }}
      />
      ))}
     <Pressable
  onPress={addCircle}
  style={({ pressed }: { pressed: any }) => [
    {
      backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'rgb(65, 105, 225)',
      padding: 10,
      borderRadius: 5,
    },
  ]}
>
<Text>
    Add Circle
  </Text>
</Pressable>
      <Pressable
        onPress={freeDrawing}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'rgb(165, 15, 25)',
            padding: 10,
            borderRadius: 5,
          },
        ]}
      >
        <Text>
          Free draw
        </Text>
      </Pressable>

    </View>
   
      

  );
}

const styles = StyleSheet.create({
  square: {
    backgroundColor: '#00AA00',
    position: 'relative',
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: '#e74c3c',
    borderRadius: 50,
    position: 'absolute',
  },
});
