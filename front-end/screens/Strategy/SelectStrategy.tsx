import {
    View,
    Button,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native';
import {useEffect, useState} from "react";
import {useFonts} from 'expo-font';
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import { retrieveStrategies, subscribeToStrategies } from '../../firebase/firebase';
import { deleteStrategy } from '../../firebase/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;
const starSize = dimWidth * 0.02; // Adjust this factor according to your preference
const backButtonSize = dimWidth * 0.02;
const fieldSize = dimWidth * 0.05;

 
// @ts-ignore
export default function SelectStrategy ({ navigation }) {
  const [strategies, setStrategies] = useState<any[]>([]);
  const [filteredStrategies, setFilteredStrategies] = useState<any[]>([]); // Nouvel état pour stocker les stratégies filtrées
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingItemName, setEditingItemName] = useState('');

useEffect(() => {
    const unsubscribe = subscribeToStrategies((updatedStrategies: any[]) => {
      setStrategies(updatedStrategies);
    });

    // Nettoyer l'abonnement lorsque le composant est démonté
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    console.log('Strategies updated:', strategies);
    if (strategies.length === 0) {
      fetchData();
    } else {
      setFilteredStrategies(strategies); // Initialise les stratégies filtrées avec toutes les stratégies disponibles
    }
  }, [strategies]); 
     useEffect(() => {
      console.log('Strategies updated:', strategies);
      if (strategies.length < 0) {
        const strategiesData = retrieveStrategies();
        setFilteredStrategies(strategiesData);
      }
      setFilteredStrategies(strategies); // Initialise les stratégies filtrées avec toutes les stratégies disponibles
    }, [strategies]); // Met à jour les stratégies filtrées lorsque les stratégies initiales changent

     const fetchData = async () => {
         try {
             const strategiesData = await retrieveStrategies();
             setStrategies(strategiesData);
         } catch (error) {
             console.error('Error fetching strategies:', error);
         }
     };
 
     const handleDeleteItem = async (id: number) => {
         try {
             await deleteStrategy(id);
             // Mettre à jour les données après la suppression
             fetchData();
         } catch (error) {
             console.error('Error deleting item:', error);
         }
     };

     const handleFilter = (text: string) => {
      const filteredData = strategies.filter((strategy) =>
        strategy.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredStrategies(filteredData);
    };


    const handleEditItem = async (id: number, name: string) => {
      try {
        // Récupérer l'ID du document Firebase correspondant à l'ID de la stratégie
        const querySnapshot = await getDocs(collection(db, 'Strategy'));
        let firestoreId: string | null = null;
        querySnapshot.forEach(doc => {
          if (doc.data().id === id) {
            firestoreId = doc.id;
          }
        });
    
        // Vérifier si l'ID Firestore a été trouvé
        if (!firestoreId) {
          console.error('Firestore ID not found for selected item');
          return;
        }
    
        // Mettre à jour le nom de la stratégie
        const strategyRef = doc(db, 'Strategy', firestoreId);
        await updateDoc(strategyRef, { name: name });
    
        // Recharger les données
        fetchData();
      } catch (error) {
        console.error('Error updating item:', error);
      }
    };


  const renderItem = ({ item  }) => {









    return (
        <TouchableOpacity
          onPress={() => handleItemClick(item.id)} // Appel de la fonction lorsqu'un élément est cliqué
          style={[
            styles.stratContainer,
            selectedItemId === item.id && styles.selectedItem, // Appliquer un style conditionnel si l'élément est sélectionné
          ]}
        >
          <Image source={require('../../assets/Field_Stack.png')} style={styles.fieldImage} />
          {editingItemId === item.id ? (
        <TextInput
          value={editingItemName}
          onChangeText={setEditingItemName}
        />
        ) : (
        <Text style={styles.cellText}>{item.name}</Text>)}
          <View style={styles.actionButtonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
            <Feather name={"trash"} size={40} color={"red"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pencilButton} onPress={() => {
          if (editingItemId === item.id) {
            handleEditItem(item.id, editingItemName);
            setEditingItemId(null);
            setEditingItemName('');
          } else {
            setEditingItemId(item.id);
            setEditingItemName(item.name);
          }
        }}>
            <Octicons name={"pencil"} size={40} color={"grey"} />
          </TouchableOpacity>
          </View>
        </TouchableOpacity>
          
      );
  };


    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [stratName, NameStrat] = useState('');
    const [loaded] = useFonts({
        oswald: require('../../assets/font/Oswald-Medium.ttf'),
        roboto: require('../../assets/font/Roboto-Medium.ttf'),
    });
    if (!loaded) {
        return null;
    }
    const handleItemClick = (id: number) => {
      console.log('Item clicked:', id);
      setSelectedItemId(id); // Mettre à jour l'ID de l'élément sélectionné lorsqu'il est cliqué
      navigation.navigate("Strategy");
    };

    return (
        <View style={styles.homeContainer}>
            <ImageBackground source={require('../../assets/home_background.png')} resizeMode="cover"
                             style={styles.image}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Charger une Stra<Text style={styles.redText}>tégie</Text></Text>
                </View>
                <TouchableOpacity style={[styles.leftButton, {width: backButtonSize, height: backButtonSize}]}
                                  onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/left_arrow.png')}
                           style={{width: backButtonSize, height: backButtonSize}}/>
                </TouchableOpacity>
                <View style={styles.starContainer}>
                    <Image source={require('../../assets/star.png')}
                           style={[styles.starImage, {width: starSize, height: starSize}]}/>
                    <Image source={require('../../assets/star.png')}
                           style={[styles.starImage, {width: starSize, height: starSize}]}/>
                    <Image source={require('../../assets/star.png')}
                           style={[styles.starImage, {width: starSize, height: starSize}]}/>
                </View>
                <View style={styles.searchContainer}>
                <Entypo
                    name={"magnifying-glass"}
                    size={20}
                    color={"white"}
                />    
                <TextInput
                  style={styles.input}
                  placeholder="search"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)" // Couleur du placeholder avec opacité
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {
                    NameStrat(text);
                    handleFilter(text);
                  }}
              />
                </View>
                <View style={styles.listContainer}>
                <FlatList
                    data={filteredStrategies} // Utilise les stratégies filtrées pour afficher dans la FlatList
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={Math.floor(dimWidth / (dimWidth * 0.3))} // Adjust the width of each item according to your UI
                    showsVerticalScrollIndicator={false}
                />
                </View>
                <Button onPress={() => navigation.navigate("Strategy")} title={"GO TO STRATEGY"}/>
            </ImageBackground>

        </View>
    )
}
const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Centrer le contenu verticalement
        width: '100%',
        height: '100%'
    },
    starContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starImage: {
        marginHorizontal: 5,
    },
    titleText: {
        fontSize: 36, // Ajuster la taille du titre
        color: '#D9D9D9',
        fontWeight: 'bold',
        fontFamily: "oswald",
        marginBottom: 20, // Espacement inférieur
    },
    redText: {
        color: '#A8171B',
        fontWeight: 'bold', // Texte en gras
        fontFamily: "oswald",
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftButton: {
        position: 'absolute',
        top: 40,
        left: 30,
        zIndex: 999,
    },
    listContainer: {
        flex: 1, // Utiliser toute la hauteur disponible
        width: '90%',
        marginLeft: '5%',
    },
    stratContainer: {
        backgroundColor: 'white',
        aspectRatio: 1,
        width: '30%',
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center', // Centrer le contenu
        alignItems: 'center', // Centrer le contenu
    },
    fieldImage: {
        width: '70%', // Ajuster la taille de l'image
        height: '70%', // Ajuster la taille de l'image
        resizeMode: 'contain',
    },
    cellText: {
        color: 'black',
        textAlign: 'center',
        fontFamily: "oswald",
        fontSize: 20, // Ajuster la taille du texte
    },
    listflat: {
        width: '100%',
        height: '100%'
    },
    searchContainer: {
        width: '70%', // Réduire la largeur de la barre de recherche
        height: 40, // Réduire la hauteur de la barre de recherche
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Ajouter une couleur de fond semi-transparente
        borderRadius: 20, // Arrondir les coins de la barre de recherche
        flexDirection: 'row', // Utiliser un arrangement horizontal
        justifyContent: 'space-between', // Espacement égal entre les éléments
        alignItems: 'center', // Centrer les éléments verticalement
        paddingHorizontal: 10, // Ajouter un espacement horizontal interne
        marginTop:'5%', // Ajuster l'écart par rapport au titre
        marginBottom:'2%'
    },
    input: {
        flex: 1, // Utiliser tout l'espace disponible
        height: '100%', // Utiliser toute la hauteur de la barre de recherche
        paddingHorizontal: 10,
        fontSize: 16, // Ajuster la taille de la police du texte
        fontFamily: "roboto",
        color: '#fff',
    },
    selectedItem: {
        borderWidth: 2,
        borderColor: 'red',
      },
    pencilButton: {
      position:"relative",
      marginHorizontal:"25%"

    },
    deleteButton:{
      position:"relative",
      marginHorizontal:"25%"
    },
    actionButtonContainer:{
      flex:1,
      flexDirection:"row",
      marginTop:"2%",
      alignItems:"center",
      justifyContent:"center"
    }
      
});