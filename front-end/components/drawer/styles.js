import { StyleSheet } from 'react-native';
let styles =  StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column', // Change this from 'row' to 'column'
  },
  icon: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
  },
  selectedImage: {
    borderRadius: 10,
    padding: 5,
    margin: 5,
    width: '90%',
    zIndex: 2,
  },
  selectedButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#D9D9D9',
    margin: 5,
    width: '100%',
    borderColor: 'red',
    borderWidth: 4,
    zIndex: 2,
  },
    container: {
        width: '100%',
        height: '100%',
        zIndex:1
    },
    home:{
        width: '90%',
        height: '90%',
    },
    topWidget: {
        flexDirection: 'row',
        width: '40%',
        height: '10%',
        fontFamily: 'Arial',
        fontColor: '#373737',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderBottomRightRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    topWidgetElementLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        marginLeft: 15,
    },
    topWidgetElementRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-end',
        marginRight: 20,
    },
    topWidgetButton: {
      marginLeft: 10,
    },
    topWidgetImage: {
        width: 20,
        height: 20,
        marginLeft: 20,
    },
    topWidgetText: {
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#373737'
    },
    drawerLeft: {
        position: 'absolute',
        width: '40%',
        height: '100%',
        opacity: 1,
        zIndex:2,
      },
      drawerLeftContent: {
        width: '100%',
        flexDirection: 'column',
      },


      menuDrawerLeft: {
        height: '10%',
        backgroundColor: '#D9D9D9',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '2%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
  
      textTop: {
      flexDirection: 'row',
      },

      textTopContent:{
        fontSize: 13,
        color: '#373737',
        fontWeight: 'bold',
      },

      imagesTop: {
        marginRight: 10, // Ajout de marge à droite pour déplacer le stylo (pen) à droite
        marginTop: 5,
      },
      listDrawerLeft: {
        height: '80%',
        backgroundColor: '#959595',
        flexDirection: 'list',
        alignItems: 'center',
        opacity: 0.9,

      },
      bottomDrawerLeft: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: '10%',
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Pour espacer les éléments
        paddingHorizontal: 10, // Ajouter un padding horizontal pour espacer du bord de l'écran
      },
      
      buttonBottomDrawerLeft: {
        marginLeft: 15,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'start',
      },

      textBottom: {
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'end',
      },
      textBottomContent:{
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        color: '#373737',
        textAlign: 'right', // Aligner le texte à droite
      },
      textTop: {
        marginRight: 10,
      },
      listItem:{
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#D9D9D9',
        margin: 5,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      textView: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },

      scrollStyle: {
        width: '100%',
        marginLeft: 10
      },
      Field:{
        borderRadius: 10,
        width:'100%',
      },
      plusButton:{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        width: '90%',
      },
      plusButtonImage:{
        width: 20,
        height: 20,
      },
      closeMenu:{
        marginLeft: 10,
        marginTop: 5,
      },
})



export default styles;