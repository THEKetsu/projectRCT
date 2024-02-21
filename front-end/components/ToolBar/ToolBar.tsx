import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Animated,
    Image,
    Fragment
} from 'react-native';
import Player from '../../classes/Player';
import Ballon from '../../classes/Ballon';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setPositionIndex, setPositionList} from "../../redux/actions/positionActions";
import {
    selectBallMode,
    selectDrawMode,
    selectPlayerMode,
    selectZoomMode
} from "../../redux/actions/toolbarActions";
import {Position} from "../../redux/slices/positionSlice";
import {Toolbar} from "../../utils/interfaces";
import {triggerRefresh} from "../../redux/actions/optionActions";

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;

export default function ToolBar() {
    const [numberOfPosition, setNumberOfPosition] = useState<number[]>([0, 1]);
    const [collapsed, setCollapsed] = useState(false); // État pour suivre l'état de la barre (repliée ou non)
    const [animation] = useState(new Animated.Value(0)); // Utilisation d'Animated pour gérer l'animation

    const dispatch = useAppDispatch()
    const position: Position = useAppSelector((state) => state.position)
    const toolbar: Toolbar = useAppSelector((state) => state.toolbar)

    const toggleBar = (): void => {
        const toValue: 0 | 1 = collapsed ? 0 : 1;

        Animated.timing(animation, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();

        // Inversion de l'état 'collapsed' pour refléter le nouvel état de la barre
        setCollapsed(!collapsed);
    };

    const [shirt_color, setColorShirt] = useState('black')

    const maillot_inline = () => {
        setColorShirt('red')
        setColorZoom('black')
        setColorBall('black')
        setPenColor('black')
    }
    const [zoom_color, setColorZoom] = useState('black');
    const zoom_inline = () => {
        setColorShirt('black')
        setColorZoom('red')
        setColorBall('black')
        setPenColor('black')

        const barHeight: Animated.AnimatedInterpolation<string> = animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['2.5%', '25%'],
        });

        useEffect((): void => {
            let different = true;

            numberOfPosition.map((i): void => {
                if (i == position.positionIndex) {
                    different = false;
                }
            })

            if (position.positionIndex != 0 && different) {
                setNumberOfPosition((prevPositions: number[]) => [...prevPositions, position.positionIndex]);
            }
        }, [position.positionIndex]);

        const handlePress = (item: number) => {
            console.log("Position : ", item);
            setSelectedPosition(item);
            sendDataToB(item);
            if (receivedPosition[0][0] != 0) {
                console.log("Position reçu", receivedPosition)
                sendSavedData(receivedPosition);
            }
        };
        const handleChoosenPosition = (index: number) => {
            setChoosenPosition(index)

            if (position.positionList != "[]" && JSON.parse(position.positionList)[0][0] != 0) {
                dispatch(setPositionList(position.positionList))
            }
        };

        const handleCreateNewPosition = () => {
            console.log("New position created");
            const newPosition = Math.max(...numberOfPosition) + 1;
            setNumberOfPosition(prevPositions => [...prevPositions, newPosition]);
        };

        const handleDeletePosition = () => {
            if (selectedPosition !== null) {
                setNumberOfPosition(prevPositions => prevPositions.filter(position => position !== selectedPosition));
                setSelectedPosition(null); // Reset selected position
            }
        };
        console.log("Position list : ", numberOfPosition);
        return (
            <View
                style={[styles.bottomBarContainer, !collapsed ? styles.bottomBarContainer_false_collapsed : styles.bottomBarContainer_true_collapsed]}
            >
                <View
                    style={[styles.retract_and_position, !collapsed ? styles.retract_and_position_false_collapsed : styles.retract_and_position_true_collapsed]}
                >
                    <TouchableOpacity onPress={toggleBar} style={styles.retractable}>
                        {collapsed && (
                            <MaterialIcons
                                name={"keyboard-arrow-down"}
                                size={(dimWidth * 2) / 100}
                                color={"black"}
                            />
                        )}
                        {!collapsed && (
                            <MaterialIcons
                                name={"keyboard-arrow-up"}
                                size={(dimWidth * 2) / 100}
                                color={"black"}
                            />
                        )}
                    </TouchableOpacity>

                    <View
                        style={styles.poseContainer}
                    >
                        {numberOfPosition.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={index}
                                onPress={() => {
                                    handlePress(item)
                                    handleChoosenPosition(index)
                                }}
                                style={[styles.buttonPos, index === position_chosen ? {
                                    borderWidth: 2,
                                    borderColor: 'red'
                                } : null]}
                            >
                                <Text>{item + 1}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Animated.View style={styles.buttonContainer}>

                        {collapsed && (<MaterialIcons style={styles.chevronIcon}
                                                      name={"keyboard-arrow-down"}
                                                      size={(dimWidth * 2) / 100}
                                                      color={"black"}
                        />)}
                        {!collapsed && (<MaterialIcons style={styles.chevronIcon}
                                                       name={"keyboard-arrow-up"}
                                                       size={(dimWidth * 2) / 100}
                                                       color={"black"}
                        />)}

                    </TouchableOpacity>
                    {/* scrollbar des positions */}
                    <View style={styles.poseContainer}>
                        {/* <View> */}
                        <View style={styles.positionContainer}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                                <View style={{flexDirection: "row"}}>
                                    {numberOfPosition.map((item, index) => (
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            key={index}
                                            onPress={() => {
                                                handlePress(item);
                                                handleChoosenPosition(index);
                                            }}
                                            // style={styles.buttonPos}
                                            style={[styles.buttonPos, index === position_chosen ? {
                                                borderWidth: 2,
                                                borderColor: 'red'
                                            } : null]}
                                        >
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                    ))}
                                    {/* New "Plus" button */}
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={handleCreateNewPosition}
                                        style={styles.plusSign}
                                    >
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                    {/* Unique "Delete" button */}
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={handleDeletePosition}
                                        style={styles.deleteSign}
                                    >
                                        <Ionicons
                                            name={"shirt-sharp"}
                                            size={'200%'}
                                            color={toolbar.playerMode ? "red" : "black"}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{color: 'white'}}>🗑️</Text>
                                </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
    </View>
        <Animated.View style={[styles.container, {height: barHeight}]}>

            <View style={styles.buttonContainer}>

                <TouchableOpacity onPress={() => {
                    handleClickAdd();
                    maillot_inline();
                }} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                    {/* Add player */}
                    <Ionicons
                        name={"shirt-sharp"}
                        size={(dimWidth * 4) / 100}
                        color={shirt_color}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => dispatch(selectZoomMode())}
                    style={[styles.buttonBase, !collapsed && {display: 'none'}]}
                >
                    <FontAwesome
                        name={"arrows"}
                        size={'200%'}
                        color={toolbar.zoomMode ? "red" : "black"}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => dispatch(selectBallMode())}
                    style={[styles.buttonBase, !collapsed && {display: 'none'}]}
                >
                    <MaterialIcons
                        name={"sports-rugby"}
                        size={'200%'}
                        color={toolbar.ballMode ? "red" : "black"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(selectDrawMode())
                        dispatch(triggerRefresh())
                    }}
                    style={[styles.buttonBase, !collapsed && {display: 'none'}]}
                >
                    <FontAwesome
                        name={"pencil"}
                        size={'200%'}
                        color={toolbar.drawMode ? "red" : "black"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    handleClickZoom();
                    zoom_inline();
                }} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                    {/* Mode Zoom */}
                    <FontAwesome
                        name={"arrows"}
                        size={(dimWidth * 4) / 100}
                        color={zoom_color}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    handleCLickBallMode();
                    ball_inline();
                }} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                    {/* Mode Ballon */}
                    <MaterialIcons
                        name={"sports-rugby"}
                        size={(dimWidth * 4) / 100}
                        color={ball_color}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    handleClickDrawMode();
                    pen_inline();
                }} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                    {/* Mode crayon */}
                    <FontAwesome
                        name={"pencil"}
                        size={(dimWidth * 4) / 100}
                        color={pen_color}
                    />
                </TouchableOpacity>
            </View>
        </Animated.View>
    </View>
    </View>
    )
    }
}


const styles = StyleSheet.create({
    bottomBarContainer: {
        flex: 1,
        flexDirection: "column"
    },
    bottomBarContainer_false_collapsed: {
        flexGrow: 0, // Empêche l'expansion du conteneur
        alignSelf: 'flex-start',
    },
    container: {
        height: dimHeight / 4,
        width: dimWidth,
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    retract_and_position_false_collapsed: {
        position: 'absolute',
        bottom: 0
    }
    poseContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    positionContainer: {
        height: (dimHeight * 5) / 100,
        width: windowWidth,
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        position: 'relative',
    },
    buttonBase: {
        height: (dimHeight * 5) / 100,
        width: (dimWidth * 5) / 100,
        backgroundColor: 'transparent',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%"
    },
    retractable: {
        position: "absolute",
        top: -((dimHeight * 3) / 100),
        backgroundColor: "#D9D9D9",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginLeft: "45%",
        width: (dimWidth * 10) / 100,
        height: (dimHeight * 7.5) / 100,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: 'black',
    },
    chevronIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonPos: {
        height: (dimHeight * 5) / 100,
        width: (dimWidth * 5) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderTopRightRadius: 10,
        borderRightWidth: 2,
        borderColor: 'lightgrey',
        backgroundColor: 'white'
    },
    deleteSign: {
        height: (dimHeight * 5) / 100,
        width: (dimWidth * 5) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderTopRightRadius: 10,
        borderRightWidth: 2,
        borderColor: 'lightgrey',
        color: 'red',
        backgroundColor: '#A60000'
    },
    plusSign: {
        height: (dimHeight * 5) / 100,
        width: (dimWidth * 5) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderTopRightRadius: 10,
        borderRightWidth: 2,
        borderColor: 'lightgrey',
        color: 'lightgrey',
        backgroundColor: 'lightgrey',
    },
    buttonBaseContainer: {
        backgroundColor: 'lightgrey',
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activebutton: {
        width: (dimHeight * 10) / 100, // Largeur du bouton
        height: (dimWidth * 5) / 100, // Hauteur du bouton
        borderRadius: 50, // Moitié de la largeur/hauteur pour obtenir une forme de cercle
        backgroundColor: 'white', // Couleur de fond du bouton
        borderColor: 'red',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
})