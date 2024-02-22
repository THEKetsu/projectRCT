import { StyleSheet } from 'react-native';
let styles =  StyleSheet.create({
    reminderText: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black',
        fontWeight: 'bold',
    },
    boldText: {
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        width:'2%',
        height: '80%',
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    titleTeam:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        margin: 10,
    },
    playerList:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '90%',
    },
    chevronIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        fontSize: 20,
    },
    optioncontainer: {
        position: 'absolute',
        right: 0,
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        width:'30%',
        height: '80%',
        zIndex: 4,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    containerRight: {
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        zIndex: 4,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    buttonLeft: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 5
    },
    buttonRight: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 5
    },
    input:{
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 5,
    },
    button: {
        justifyContent: 'center',
        backgroundColor: 'rgb(65, 105, 225)',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    teamButton: {
        flexDirection: 'row',
        padding: 10,
    },
    selectedButton: {
        borderWidth: 2,
        borderColor: 'white',
    },
    widgetPage:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',  
        height: '90%',
    },
    widgetElement: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        height: '90%',
    },
    topText: {
        fontSize: 13,
        color: 'black',
        textAlign: 'flex-start',
    },
    textPlacement:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
});

export default styles;