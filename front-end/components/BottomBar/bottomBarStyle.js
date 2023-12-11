import { StyleSheet } from 'react-native'
// Styles pour les éléments du composant
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      height: '10%'
  
    },
    bar: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: 'lightblue',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    button: {
      position: "absolute",
      top: '-10%',
      backgroundColor: 'lightblue',
      width: 100,
      height: 40,
      borderRadius: 20,
      alignItems: 'center'
    },
    menuImage: {
      width: '10%',
      height: '40%'
  
    },
    displayBottomImage: {
      width: '15%',
      height: '40%'
  
    }
  });
  
