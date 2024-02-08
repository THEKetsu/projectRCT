import { StyleSheet } from 'react-native';
let styles = StyleSheet.create({
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
        flex: 1,
        flexDirection: 'row',
        width: 300,
        height: 60,
        fontFamily: 'Arial',
        fontColor: '#373737',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderBottomRightRadius: 10,
    },
    topWidgetElement: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 5,
    },
    topWidgetElementLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 5,
    },
    topWidgetElementRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 5,
    },
    topWidgetButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    topWidgetImage: {
        width: 20,
        height: 20,
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
        paddingHorizontal: '2%'
      },

      textTop: {
      flexDirection: 'row',
      alignItems: 'center'
      },

      textTopContent:{
        fontSize: 10,
        color: '#373737',
      },

      imagesTop: {
        marginRight: '10%'
      },
      

      listDrawerLeft: {
        height: '80%',
        backgroundColor: '#959595',
        flexDirection: 'list',
        alignItems: 'center',
        opacity: 0.9,

      },
      bottomDrawerLeft: {
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
        width:'100%'
      }
})

export default styles;