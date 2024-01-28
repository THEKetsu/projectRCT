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
        width: '20%',
        height: '100%',
        opacity: 0.8,
        zIndex:2,
      },
      drawerLeftContent: {
        flex:1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: 'red',
      },
      menuDrawerLeft: {
        flex: 1,
        marginTop: 20,
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginRight: 5,
      },
      listDrawerLeft: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        flexDirection: 'list',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 5,
      },
})

export default styles;