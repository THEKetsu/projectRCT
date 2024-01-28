import React, { useEffect, useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import Player from '../../classes/Player';

import data from '../../assets/data2.json';

interface ComponentPositionProps {
  sendDataToB: (data: number) => void;
  receivedData: number;
  receivedPosition: [number, Player[]][];
  sendSavedData: (data: [number, Player[]][]) => void;
}

const ComponentPosition: React.FC<ComponentPositionProps> = ({ sendDataToB, receivedData, receivedPosition, sendSavedData }) => {

  const [numberOfPosition, setmyNumberOfPosition] = useState<number[]>([1,2]);
  // data.map((item) => {
    
  //   setmyNumberOfPosition(prevPositions => [...prevPositions, item.position]);
  // });


  useEffect(() => {
    console.log(receivedData);
    let different = true;
    numberOfPosition.map((i) => {
      if(i==receivedData){
        different = false;
      }
    })
    if(receivedData != 0 && different){
      setmyNumberOfPosition(prevPositions => [...prevPositions, receivedData]);
    }
  }, [receivedData]);






  const handlePress = (item: number) => {

    //On envoye l'information de quel position sera la current, et on envoie la sauvegarde des positions (pour reset)
    sendDataToB(item);

    //On verifie qu'on envoie pas la donnée vide
    if(receivedPosition[0][0] != 0){
      console.log("Position reçu",receivedPosition)
      sendSavedData(receivedPosition);
    }
    
  };

  return (
    <View>
      {numberOfPosition.map((item,index) => (
        <Pressable key={index} onPress={() => handlePress(item)}>
        <Text>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ComponentPosition;