import React, {Dispatch, useEffect, useRef, useState} from 'react';
import {Platform, Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {
    HandlerStateChangeEvent,
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PinchGestureHandler,
    State,
    TapGestureHandler,
    TapGestureHandlerEventPayload
} from 'react-native-gesture-handler';
import {returnPublicInstance} from '../../classes/ReturnPublicManager';
import pointInPolygon from 'point-in-polygon';
import Player from '../../classes/Player';
import data from '../../assets/data2.json'
import Ballon from '../../classes/Ballon';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setPositionIndex, setPositionList} from "../../redux/actions/positionActions";
import {selectZoomMode, unselectAll} from "../../redux/actions/toolbarActions";
import {
    linkToPlayer,
    selectPlayer,
    setClosestPlayer,
    setInputPlayerId,
    setPlayerPaths,
    triggerRefresh
} from "../../redux/actions/optionActions";
import {comparePositions, isValidString, parsePositionList} from '../../utils/functions';
import {FreeDraw, Option, PlayerPath, Position, ShirtDigit, Toolbar} from '../../utils/interfaces';
import Options from "../Options/Options";
import RightDrawer from '../Options/RightDrawer';

export function Field({}) {
    const position: Position = useAppSelector((state) => state.position);
    let [px1, py1] = [0, 0];
    let svg_fieldUNCHANGED = [0, 1136.77, 212.877, 2.62354, 920.021, 1131.04, 1136.77]
    let lineSize = [3, 10];
    let superSvg_Field = [[0, 1136.77, 212.877, 2.62354, 920.021, 1131.04, 1136.77], [108, 989, 1040, 990], [151, 742, 996, 742],
        [216.943, 894.651, 225.778, 848.22], [183.655, 893.16, 254.031], [329.347, 894.217, 385.055, 894.462],
        [358.816, 893.085, 362.692, 850.692], [371.717, 759.661, 374.928, 725.8], [242.346, 757.585, 248.331, 724.101],
        [807.066, 759.283, 803.95, 725.404], [917.532, 759.868, 911.927, 726.31], [455.641, 894.651, 508.841, 894.878],
        [657.497, 894.519, 709.615, 894.746], [244.816, 620.688, 286.958, 620.858], [262.923, 637.618, 268.832, 604.097],
        [383.782, 637.297, 387.335, 604.588], [364.326, 620.763, 407.038, 620.952], [792.265, 637.883, 787.325, 604.21],
        [766.767, 620.669, 812.823, 620.858], [894.618, 637.807, 888.785, 604.286], [870.564, 620.858, 916.62, 621.047],
        [478.669, 620.499, 524.725, 620.688], [640.53, 621.046, 686.586, 621.235], [268.0, 58.0, 874.0, 60.0], [193.0, 491.0, 951.0, 492.0],
        [239.401, 228.381, 904.403, 230.269], [355.301, 123.062, 350.247, 146.145], [335.712, 124.477, 373.408, 124.647],
        [419.312, 124.572, 457.598, 124.723], [704.143, 124.194, 750.199, 124.383], [782.081, 122.816, 827.206, 123.005],
        [728.653, 123.137, 731.883, 148.542], [803.969, 121.344, 809.422, 146.825], [438.94, 124.477, 436.071, 147.542],
        [428.832, 215.717, 425.26, 249.559], [337.441, 215.83, 332.083, 249.445], [739.938, 215.735, 743.89, 249.54],
        [819.929, 215.886, 825.876, 249.389], [515.225, 124.628, 553.928, 124.798], [629.035, 124.383, 669.752, 124.553],
        [289.029, 362.466, 335.085, 362.655], [314.128, 346.913, 308.124, 380.415], [416.235, 345.724, 412.948, 379.585],
        [391.838, 360.767, 437.895, 360.956], [756.772, 344.969, 760.44, 378.792], [735.569, 362.56, 781.625, 362.749],
        [843.071, 345.12, 848.885, 378.641], [824.299, 361.881, 870.355, 362.069], [501.697, 362.466, 547.753, 362.655],
        [640.53, 361.975, 686.586, 362.164], [594.645, 990.647, 594.303, 1069.83], [541.0, 1026.0, 596.0],
        [541.843, 989.854, 541.521, 1069.03], [556.0, 41.0, 593.0], [83.6003, 1124.92, 278.028, 7.5498, 864.39, 9.95247, 1065.9, 1124.92, 83.6003],
        [592.802, 56.6235, 11.3247], [902.332, 895.217, 972.708, 894.878], [939.154, 892.971, 932.105, 846.257],
        [795.172, 894.5, 850.88, 894.727], [823.672, 894.5, 820.062, 852.07], [556.701, 56.4698, 556.666, 11.3316]];
    let superXArray = [[0, 2, 4, 5], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2],
        [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2]
        , [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2],
        [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2, 4, 6, 8], [0], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2]];

    let receivedTranslationsCounter = 0;
    let center = [((superSvg_Field[0][0] + superSvg_Field[0][2] + superSvg_Field[0][4] + superSvg_Field[0][5]) / 4), ((superSvg_Field[0][1] + superSvg_Field[0][3] + superSvg_Field[0][3] + superSvg_Field[0][6]) / 4)]
    let proportionTotalSize = 0.5;
    let player = [58.8338, 8.04599, 46.7427, 1.24114, 46.4687, 1.08466, 46.1611, 1.00175, 45.848, 1.0, 38.3728, 37.8771, 1.0, 37.4018, 1.20324, 37.0513, 1.56502, 36.7009, 1.92679, 36.504, 2.41746, 36.504, 2.92909, 36.504, 4.46396, 35.9133, 5.93598, 34.8619, 7.0213, 33.8105, 8.10662, 32.3845, 8.71635, 30.8976, 8.71635, 29.4107, 8.71635, 27.9847, 8.10662, 26.9333, 7.0213, 25.8819, 5.93598, 25.2912, 4.46396, 25.2912, 2.92909, 25.2912, 2.41746, 25.0943, 1.92679, 24.7438, 1.56502, 24.3934, 1.20324, 23.918, 1.0, 23.4224, 1.0, 15.9472, 15.6333, 1.00134, 15.3248, 1.08427, 15.0502, 1.24114, 2.96138, 8.04599, 2.09963, 8.51609, 1.45365, 9.31976, 1.16507, 10.2808, 0.876488, 11.2418, 0.96887, 12.2817, 1.42196, 13.1725, 5.92342, 22.0488, 6.25073, 22.6869, 6.74135, 23.2202, 7.34187, 23.5905, 7.94239, 23.9608, 8.62981, 24.154, 9.32931, 24.149, 14.0784, 43.4399, 14.0784, 44.4632, 14.4722, 45.4445, 15.1731, 46.1681, 15.874, 46.8916, 16.8247, 47.2981, 17.816, 47.2981, 43.9792, 44.9704, 47.2981, 45.9211, 46.8916, 46.622, 46.1681, 47.323, 45.4445, 47.7168, 44.4632, 47.7168, 43.4399, 24.149, 52.4682, 53.1677, 24.154, 53.8551, 23.9608, 54.4556, 23.5905, 55.0561, 23.2202, 55.5468, 22.6869, 55.8741, 22.0488, 60.3755, 13.1725, 60.8284, 12.2814, 60.9205, 11.2413, 60.6314, 10.2802, 60.3424, 9.31916, 59.6959, 8.51568, 58.8338, 8.04599, 9.32931, 20.2909, 9.29478, 20.2926, 9.26081, 20.2814, 9.23353, 20.2595, 4.75542, 11.4315, 14.0784, 6.1796, 20.2909, 9.32931, 52.5616, 20.2571, 52.5487, 20.2691, 52.5336, 20.2783, 52.5171, 20.2841, 52.5006, 20.2899, 52.4832, 20.2922, 52.4658, 20.2909, 47.7168, 6.1796, 57.0421, 11.4315, 52.5616, 20.2571];
    let ballon_svg = [34.60405, 5.044065000000001, 34.411260000000006, 3.9079690000000005, 33.86994000000001, 2.8599220000000005, 33.0551, 2.0450950000000003, 32.240260000000006, 1.2302784000000002, 31.1922, 0.6890104, 30.056130000000003, 0.49626980000000004, 24.591970000000003, -0.43016350000000003, 14.296230000000003, -0.8537243000000001, 6.722664000000001, 6.7231190000000005, -0.8509748000000001, 14.3, -0.43077970000000004, 24.59366, 0.4956744, 30.056130000000003, 0.6889324, 31.19337, 1.2314523, 32.24221, 2.0479290000000003, 33.05718, 2.8644070000000004, 33.872150000000005, 3.914339, 34.412690000000005, 5.052008000000001, 34.60392000000001, 6.965920000000001, 34.930220000000006, 8.903751999999999, 35.096230000000006, 10.845289000000001, 35.1, 16.260530000000003, 35.1, 23.003890000000002, 33.749950000000005, 28.377050000000004, 28.377050000000004, 35.95241000000001, 20.803510000000003, 35.53043, 10.506483000000001, 34.60405, 5.044065000000001, 5.494138, 31.944380000000002, 4.909944, 31.845060000000004, 4.371055, 31.5666, 3.9520390000000005, 31.147610000000004, 3.5330230000000005, 30.72862, 3.254576, 30.189770000000003, 3.1552170000000004, 29.605550000000004, 2.69204, 26.99424, 2.572336, 24.333530000000007, 2.799147, 21.691150000000004, 13.408590000000002, 32.300450000000005, 10.766236000000001, 32.527300000000004, 8.105513, 32.40757, 5.494138, 31.944380000000002, 23.901670000000006, 13.106860000000001, 21.48185, 15.525120000000001, 22.55162, 16.594890000000003, 22.685130000000004, 16.718390000000003, 22.79225, 16.867500000000003, 22.86661, 17.033250000000002, 22.94097, 17.19913, 22.981140000000003, 17.37827, 22.984650000000002, 17.560010000000002, 22.988030000000002, 17.74162, 22.95488, 17.92219, 22.88689, 18.0908, 22.818900000000003, 18.25928, 22.717630000000003, 18.41242, 22.589060000000003, 18.540860000000002, 22.46049, 18.669300000000003, 22.307220000000004, 18.77044, 22.138610000000003, 18.8383, 21.970000000000002, 18.90616, 21.78943, 18.939180000000004, 21.60769, 18.93554, 21.426080000000002, 18.931900000000002, 21.24694, 18.8916, 21.081190000000003, 18.817110000000003, 20.915440000000004, 18.742620000000002, 20.76646, 18.635369999999998, 20.64309, 18.50186, 19.57488, 17.43365, 17.433390000000003, 19.575010000000002, 18.50329, 20.64491, 18.636800000000004, 20.76828, 18.74405, 20.91726, 18.818540000000002, 21.08301, 18.89316, 21.248760000000004, 18.93346, 21.4279, 18.9371, 21.609510000000004, 18.94074, 21.79125, 18.907590000000003, 21.971820000000005, 18.83986, 22.140430000000002, 18.772000000000002, 22.309040000000003, 18.67086, 22.462180000000004, 18.54229, 22.590750000000003, 18.413850000000004, 22.719320000000003, 18.260839999999998, 22.82072, 18.09223, 22.88871, 17.92362, 22.95657, 17.743180000000002, 22.98985, 17.56144, 22.986340000000006, 17.3797, 22.982960000000002, 17.200560000000003, 22.942790000000006, 17.034810000000004, 22.868430000000004, 16.868930000000002, 22.79394, 16.719820000000002, 22.68695, 16.59645, 22.553440000000002, 15.52486, 21.481980000000004, 13.10491, 23.901800000000005, 12.980786, 24.032450000000004, 12.831767000000001, 24.136840000000003, 12.666641, 24.208990000000004, 12.501515000000001, 24.281140000000004, 12.323623000000001, 24.319490000000002, 12.143443000000001, 24.321830000000006, 11.963263000000001, 24.324170000000002, 11.784435000000002, 24.29037, 11.617515000000001, 24.22251, 11.450595000000002, 24.15452, 11.298962999999999, 24.053900000000002, 11.171550000000002, 23.9265, 11.044124000000002, 23.7991, 10.943504000000003, 23.64752, 10.875618000000003, 23.480600000000003, 10.807719000000002, 23.313680000000005, 10.773932000000002, 23.134800000000006, 10.776246, 22.954620000000006, 10.778547000000001, 22.77444, 10.816910000000002, 22.596600000000002, 10.889047, 22.431500000000003, 10.961197000000002, 22.2664, 11.065665000000001, 22.11729, 11.196302000000001, 21.99327, 13.617890000000001, 19.575010000000002, 12.548016000000002, 18.505240000000004, 12.311299, 18.248880000000003, 12.182989000000001, 17.910880000000002, 12.189983000000002, 17.56209, 12.196977000000002, 17.2133, 12.338742, 16.880760000000002, 12.585547000000002, 16.63415, 12.832352000000002, 16.38767, 13.1651, 16.246230000000004, 13.513890000000002, 16.23947, 13.862680000000001, 16.232840000000003, 14.200550000000002, 16.361410000000003, 14.45665, 16.598270000000003, 15.52655, 17.66817, 17.66635, 15.525120000000001, 16.59645, 14.45522, 16.359460000000002, 14.199120000000002, 16.230890000000002, 13.861250000000002, 16.237520000000004, 13.51246, 16.244280000000003, 13.163670000000002, 16.38572, 12.831000000000001, 16.63233, 12.584195000000001, 16.878809999999998, 12.337390000000003, 17.211479999999998, 12.195638000000002, 17.560270000000003, 12.188644000000002, 17.909060000000004, 12.181637, 18.24706, 12.309947000000001, 18.50329, 12.546651, 19.57488, 13.61815, 21.99483, 11.198356, 22.118850000000002, 11.067719000000002, 22.267960000000002, 10.963251000000001, 22.433060000000005, 10.891101, 22.59816, 10.818964000000001, 22.77613, 10.780614000000002, 22.956310000000002, 10.778300000000002, 23.136490000000006, 10.775999000000002, 23.315240000000003, 10.809786, 23.482160000000004, 10.877672, 23.64908, 10.945558, 23.80079, 11.046178000000001, 23.928189999999997, 11.173604000000003, 24.055590000000002, 11.301017, 24.15621, 11.452649000000001, 24.22407, 11.619556000000003, 24.29193, 11.786476, 24.325730000000004, 11.965291, 24.32339, 12.145471, 24.321180000000002, 12.325651, 24.282830000000004, 12.503543000000002, 24.21068, 12.668669000000003, 24.138530000000003, 12.833782000000003, 24.034010000000002, 12.982788000000001, 23.903360000000006, 13.106860000000001, 23.901670000000006, 32.300580000000004, 13.408980000000001, 21.69102, 2.799693, 22.49429, 2.7254500000000004, 23.331360000000004, 2.683265, 24.207170000000005, 2.683265, 26.017160000000004, 2.6896480000000005, 27.82351, 2.847702, 29.60724, 3.155763, 30.19107, 3.2554339999999997, 30.729660000000003, 3.534011, 31.148390000000006, 3.9530010000000004, 31.566990000000004, 4.371978, 31.845190000000002, 4.910672000000001, 31.94451, 5.494619, 32.407700000000006, 8.105942, 32.527300000000004, 10.766613, 32.300580000000004, 13.408980000000001];
    let xBallon_Array = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 256, 258, 260, 262, 264, 266, 268, 270, 272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300, 302, 304, 306, 308, 310, 312, 314, 316, 318, 320, 322, 324, 326, 328, 330, 332, 334, 336, 338, 340, 342, 344, 346, 348, 350, 352, 354, 355, 357, 359, 361, 363, 365, 367, 369, 371, 373, 375, 377, 379, 381, 383, 385, 387]
    const xArrayPlayer = [0, 2, 4, 6, 8, 10, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 109, 111, 113, 115, 117, 119, 122, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153, 155, 157, 159, 162, 163, 165, 167, 169, 171, 173, 175, 177, 179, 181];
    let animationEnCours = false;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [prevPourcent, setPrevPourcent] = useState([0, 0]);
    const [boolLock, setLock] = useState(false);
    const [grabEnCours, setgrabEnCours] = useState(false);
    const [delta, setDelta] = useState(1);
    const [proportion, setProportion] = useState(1.0);
    const [translationPrev, setTranslationPrev] = useState([1.0, 1.0]);
    const [translationIncrement, setTranslationInc] = useState([0, 0]);
    const [translationPrevPlayer, setTranslationPrevPlayer] = useState([1.0, 1.0]);
    const [listMaillot, setlistMaillot] = useState<ShirtDigit[]>([]);
    const [checkForEnd, setcheckForEnd] = useState<Boolean[]>([]);
    const [svgSize, setSvgSize] = useState({
        width: useWindowDimensions().width,
        height: useWindowDimensions().height
    });
    const [animationPathBallon, setAnimationPathBallon] = useState<number[][]>([]);
    const [currentDraw, setCurrentDraw] = useState<FreeDraw[]>([]);
    const [superField, setSuperField] = useState(superSvg_Field);
    const [numCCC, setNumCCC] = useState(0);
    const [numAnimation, setNumAnimation] = useState(0);
    const [freeID, setFreeID] = useState(-1);
    const [dynamicPositionList, setDynamicPositionList] = useState<[number, Player[], Ballon[]][]>([]);
    const [svgPlayers, setSvgPlayers] = useState<React.ReactNode[]>([]);
    const [svgBallon, setSvgBallon] = useState<React.ReactNode>();
    const [pathDrawing, setPathDrawing] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

    let myBase = [svgSize.width / 2, svgSize.height / 2];

    const panRef = useRef<PanGestureHandler>(null);
    const pinchRef = useRef<PinchGestureHandler>(null);
    const pressableRef = useRef<TapGestureHandler>(null);
    const svgRef = useRef<any>(null);

    const dispatch: Dispatch<any> = useAppDispatch()

    const toolbar: Toolbar = useAppSelector((state) => state.toolbar)
    const option: Option = useAppSelector((state) => state.option)

    useEffect(() => {
        retrievePlayer();
    }, []);

    useEffect(() => {
        if (returnPublicInstance.indexAnimation != 0) {
            animate(position.positionIndex);
        }
    }, [returnPublicInstance.indexAnimation]);

    useEffect(() => {
        const numberOfFalse = checkForEnd.filter(value => value === false).length;
        const numberOfTrue = checkForEnd.length - numberOfFalse;

        if (numberOfFalse === numberOfTrue && numberOfFalse != 0) {
            checkEndingAnimation();
        }

    }, [checkForEnd]);

    useEffect(() => {
        if (position.positionList != "[]" && JSON.parse(position.positionList)[0][0] != 0) {
            setDynamicPositionList(parsePositionList(position.positionList))
            setNumCCC(numCCC + 1);
        }
    }, [position.positionList]);

    useEffect(() => {
        dispatch(setPlayerPaths("[]"))
        setCurrentDraw([]);
        setNumCCC(numCCC + 1);
    }, [position.positionIndex]);

    useEffect(() => {
        console.log(numAnimation)
        if (dynamicPositionList.length > 0 && numAnimation >= 0) {
            simulateRefresh(position.positionIndex, false);
        }
    }, [numCCC]);

    useEffect(() => {
        if (option.refresh != null) {
            if (option.refresh > 0) {
                setNumCCC(numCCC + 1)
            }
        } else {
            setNumAnimation(numAnimation + 1)
        }
    }, [option.refresh]);

    useEffect(() => {
        if (option.refreshAnimation != null) {
            if (option.refreshAnimation > 0) {
                setNumCCC(numCCC + 1)
            }
        } else {
            setNumAnimation(numAnimation + 1)
        }
    }, [option.refreshAnimation])

    useEffect(() => {
        if (dynamicPositionList.length > 0) {
            if (numAnimation > 0) {
                simulateRefresh(position.positionIndex, true);
            } else {
                simulateRefresh(position.positionIndex, false);
            }

            if (!isFirstLoad) {
                if (dynamicPositionList.length >= position.positionIndex) {
                    animate(position.positionIndex);
                }
            } else {
                setIsFirstLoad(false)
            }
        }
    }, [numAnimation]);

    const setAll = () => {
        setSuperField(superSvg_Field);

        if (currentDraw) {
            const buffDraw: FreeDraw[] = currentDraw
            buffDraw.map((free) => {
                let redrawPath = '';
                for (let i = 0; i < free.numbers.length; i++) {
                    let myNumberXY = getPourcentageCenter(free.numbers[i][0], 1 - free.numbers[i][1]);
                    if (i == 0) {
                        redrawPath = `M${myNumberXY[0]} ${myNumberXY[1]}`;
                    } else {
                        redrawPath = `${redrawPath}L${myNumberXY[0]} ${myNumberXY[1]}`;
                    }
                }
                free.path = redrawPath;
            })
            setCurrentDraw(buffDraw);
        }
    }

    const proportionAll = (prop: number) => {
        center = [((superSvg_Field[0][0] + superSvg_Field[0][2] + superSvg_Field[0][4] + superSvg_Field[0][5]) / 4), ((superSvg_Field[0][1] + superSvg_Field[0][3] + superSvg_Field[0][3] + superSvg_Field[0][6]) / 4)]

        superSvg_Field.map((Thefield, index) => {
            superSvg_Field[index] = proportionSVG2(Thefield, prop, center, superXArray[index]);
        });
        lineSize = proportionSVG(lineSize, prop);
    };

    const diffSVGAll = (baseCenter: number[]) => {
        superSvg_Field.map((Thefield, index) => {
            superSvg_Field[index] = diffSVG(Thefield, center, superXArray[index], baseCenter);
        });
    };

    const diffMovingAll = (mouv: number[]) => {
        superSvg_Field.map((Thefield, index) => {
            superSvg_Field[index] = diffMoving(Thefield, superXArray[index], mouv);
        });
    };

    const proportionSVG2 = (svgArray: number[], proportionScale: number, center: number[], xArray: number[]) => {
        return svgArray.map((value, index) => {
            const isXCoordinate = xArray.includes(index);
            const diff = value - center[isXCoordinate ? 0 : 1];
            const scaledDiff = diff * proportionScale;

            return center[isXCoordinate ? 0 : 1] + scaledDiff;
        });
    };
    const proportionSVG = (svgArray: number[], proportionScale: number) => {
        return svgArray.map((value) => value * proportionScale);
    };

    proportionAll(proportionTotalSize);

    const diffSVG = (svgArray: number[], centerNew: number[], xArray: number[], centerBase: number[]) => {
        let numb = [centerBase[0] - centerNew[0], centerBase[1] - centerNew[1]];
        svgArray = svgArray.map((value, index) => {
            if (xArray.includes(index)) {
                // Subtract numb from the value
                return value + numb[0];
            } else {
                return value + numb[1];
            }
        });
        return svgArray;
    };

    diffSVGAll(myBase);

    const diffMoving = (svgArray: number[], xArray: number[], numb: number[]) => {
        svgArray = svgArray.map((value, index) => {
            if (xArray.includes(index)) {

                return value + numb[0];
            } else {
                return value + numb[1];
            }
        });
        return svgArray;
    };

    const onPinchGestureEvent = (event: any) => {
        if (toolbar.zoomMode) {
            let scale;

            if (Platform.OS === 'web') {
                scale = delta;
            } else {
                scale = event.nativeEvent.scale;
                let newDelta = scale < 1 ? 0.95 : 1.05;
                newDelta = newDelta * delta;
                setDelta(Math.abs(newDelta));
                scale = newDelta;
            }

            proportionAll(Number(scale.toFixed(2)))
            diffMovingAll([translationIncrement[0], translationIncrement[1]]);
            setProportion(Number(scale.toFixed(2)));
            setAll();

            center = [((superSvg_Field[0][0] + superSvg_Field[0][2] + superSvg_Field[0][4] + superSvg_Field[0][5]) / 4), ((superSvg_Field[0][1] + superSvg_Field[0][3] + superSvg_Field[0][3] + superSvg_Field[0][6]) / 4)]
            let svg_Mode = proportionSVG(player, ((superSvg_Field[0][5] - superSvg_Field[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))

            dynamicPositionList[position.positionIndex][1].map((joueur) => {
                svg_Mode = diffSVG(svg_Mode, getCenter(svg_Mode), xArrayPlayer, getPourcentageCenter(joueur.position[0], joueur.position[1]))
                joueur.svgValue(svg_Mode);
            });

            svg_Mode = proportionSVG(ballon_svg, ((superSvg_Field[0][5] - superSvg_Field[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))
            dynamicPositionList[position.positionIndex][2].map((ball) => {
                svg_Mode = diffSVG(svg_Mode, getCenterBallon(svg_Mode), xBallon_Array, getPourcentageCenter(ball.position[0], ball.position[1]))
                ball.svgValue(svg_Mode);
            });

            showPlayer(false, position.positionIndex);
        }
    };

    const handleWheel = (event: React.WheelEvent) => {
        let newDelta = event.deltaY > 0 ? 0.9 : 1.1;

        newDelta = delta < 1 ? newDelta * delta : newDelta * delta;

        setDelta(Math.abs(newDelta));
        onPinchGestureEvent(event);
    };

    const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
        if (pathDrawing) {
            const {translationX, translationY} = event.nativeEvent;

            JSON.parse(option.playerPaths).map((chemin: PlayerPath) => {
                if (chemin.id === option.selectedPlayer) {
                    const index = dynamicPositionList[position.positionIndex][1].findIndex(player => player.id + 'P' === chemin.id);

                    if (index !== -1) {
                        let getXY = getPourcentageCenter2(dynamicPositionList[position.positionIndex][1][index].position[0], dynamicPositionList[position.positionIndex][1][index].position[1]);
                        let pourcentX = ((getXY[0] + translationX) - superField[0][0]) / (superField[0][5] - superField[0][0]);
                        let pourcentY = ((getXY[1] + translationY) - superField[0][3]) / (superField[0][1] - superField[0][3]);

                        const updatedPath = `${chemin.path}L${getXY[0] + translationX} ${getXY[1] + translationY}`;
                        const ecartIgnore = 0.02;

                        if (
                            (pourcentX < (prevPourcent[0] - ecartIgnore) || pourcentX > (prevPourcent[0] + ecartIgnore)) ||
                            (pourcentY < (prevPourcent[1] - ecartIgnore) || pourcentY > (prevPourcent[1] + ecartIgnore))
                        ) {
                            setPrevPourcent([pourcentX, pourcentY]);

                            const polygonPoints: number[][] = [
                                [superField[0][0], superField[0][1]],
                                [superField[0][2], superField[0][3]],
                                [superField[0][4], superField[0][3]],
                                [superField[0][5], superField[0][6]],
                            ];

                            const isInside: boolean = pointInPolygon([getXY[0] + translationX, getXY[1] + translationY], polygonPoints);
                            if (!isInside) {
                                dynamicPositionList[position.positionIndex][1][index].pathArraySetup([]);

                                let buffPlayerPaths = JSON.parse(option.playerPaths)
                                buffPlayerPaths = buffPlayerPaths.filter((p: PlayerPath) => p.id !== option.selectedPlayer)

                                dispatch(setPlayerPaths(JSON.stringify(buffPlayerPaths)))
                            } else {
                                dynamicPositionList[position.positionIndex][1][index].arrayPush([pourcentX, pourcentY]);

                                let buffPlayerPaths = JSON.parse(option.playerPaths)

                                buffPlayerPaths = buffPlayerPaths.map((prev: PlayerPath) => {
                                    if (prev.id === option.selectedPlayer) {
                                        return {...prev, path: updatedPath};
                                    }
                                    return prev;
                                })

                                dispatch(setPlayerPaths(JSON.stringify(buffPlayerPaths)))
                            }
                        }
                    }
                }
            });

            if (option.selectedPlayer == '' && freeID != -1) {
                currentDraw.map((free) => {
                    if (freeID === free.id) {
                        let getXY = getPourcentageCenter2(free.position[0], 1 - (free.position[1]));
                        getXY[0] = getXY[0] - px1;
                        getXY[1] = getXY[1] - py1;
                        const updatedPath = `${free.path}L${getXY[0] + translationX} ${getXY[1] + translationY}`;
                        const polygonPoints: number[][] = [
                            [superField[0][0], superField[0][1]],
                            [superField[0][2], superField[0][3]],
                            [superField[0][4], superField[0][3]],
                            [superField[0][5], superField[0][6]],
                        ];
                        const isInside: boolean = pointInPolygon([getXY[0] + translationX, getXY[1] + translationY], polygonPoints);
                        let pourcentX = ((getXY[0] + translationX) - superField[0][0]) / (superField[0][5] - superField[0][0]);
                        let pourcentY = ((getXY[1] + translationY) - superField[0][3]) / (superField[0][1] - superField[0][3]);

                        if (!isInside) {
                            setCurrentDraw((prevPaths) => {
                                const newPaths: FreeDraw[] = prevPaths.filter((p: FreeDraw): boolean => p.id !== freeID);
                                let i: number = -1;
                                return newPaths.map((free: FreeDraw) => {
                                    return {...free, id: i++};
                                });
                            });
                        } else {
                            setCurrentDraw((prevPaths: FreeDraw[]) => {
                                return prevPaths.map((prevChemin: FreeDraw) => {
                                    if (prevChemin.id === freeID) {
                                        const newNumbers: number[][] = prevChemin.numbers;
                                        newNumbers.push([pourcentX, pourcentY]);

                                        return {...prevChemin, path: updatedPath, numbers: newNumbers};
                                    }
                                    return prevChemin;
                                });
                            });
                        }
                    }
                });
            }
        } else if (toolbar.zoomMode) {
            const {translationX, translationY} = event.nativeEvent;

            if ((event.nativeEvent.state === State.ACTIVE && (translationX > -1000 && translationX < 1000 &&
                translationY > -1000 && translationY < 1000) && (translationPrev[0] != translationX && translationPrev[1] != translationY)) || translationX == 100) {
                receivedTranslationsCounter++;

                if (receivedTranslationsCounter === 3) {
                    setTranslationPrev([translationX, translationY]);
                    setTranslationInc([(translationIncrement[0] + (translationX - translationPrev[0])),
                        (translationIncrement[1] + (translationY - translationPrev[1]))]);
                    setLock(true);
                    proportionAll(proportion);
                    diffMovingAll([translationIncrement[0],
                        translationIncrement[1]]);
                    setAll();

                    center = [((superSvg_Field[0][0] + superSvg_Field[0][2] + superSvg_Field[0][4] + superSvg_Field[0][5]) / 4), ((superSvg_Field[0][1] + superSvg_Field[0][3] + superSvg_Field[0][3] + superSvg_Field[0][6]) / 4)]
                    let svg_Mode: number[] = proportionSVG(player, ((superSvg_Field[0][5] - superSvg_Field[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))

                    dynamicPositionList[position.positionIndex][1].map((joueur: Player) => {
                        svg_Mode = diffSVG(svg_Mode, getCenter(svg_Mode), xArrayPlayer, getPourcentageCenter(joueur.position[0], joueur.position[1]))
                        joueur.svgValue(svg_Mode)
                    })

                    svg_Mode = proportionSVG(ballon_svg, ((superSvg_Field[0][5] - superSvg_Field[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))
                    dynamicPositionList[position.positionIndex][2].map((ball: Ballon) => {
                        svg_Mode = diffSVG(svg_Mode, getCenterBallon(svg_Mode), xBallon_Array, getPourcentageCenter(ball.position[0], ball.position[1]))
                        ball.svgValue(svg_Mode);
                    })

                    showPlayer(false, position.positionIndex);
                    receivedTranslationsCounter = 0;
                }
            }
        } else if (toolbar.playerMode && option.selectedPlayer != "") {
            const {translationX, translationY} = event.nativeEvent;

            if (event.nativeEvent.state === State.ACTIVE && (translationX > -1000 && translationX < 1000 &&
                translationY > -1000 && translationY < 1000) && (translationPrev[0] != translationX && translationPrev[1] != translationY)) {
                receivedTranslationsCounter++;

                if (receivedTranslationsCounter === 3) {
                    let grabB: boolean = false;

                    setTranslationPrevPlayer([translationX, translationY]);

                    dynamicPositionList[position.positionIndex][1].map((j: Player) => {
                        if (j.id == option.selectedPlayer) {
                            let centerPlayer: number[] = [(j.svg_player[74] + j.svg_player[139] + (translationX - translationPrevPlayer[0]) * 2) / 2,
                                (j.svg_player[9] + j.svg_player[105] + (translationY - translationPrevPlayer[1]) * 2) / 2]
                            const polygonPoints: number[][] = [
                                [superField[0][0], superField[0][1]],
                                [superField[0][2], superField[0][3]],
                                [superField[0][4], superField[0][3]],
                                [superField[0][5], superField[0][6]],
                            ];
                            const isInside: boolean = pointInPolygon(centerPlayer, polygonPoints);

                            if (isInside) {
                                setgrabEnCours(true);
                                grabB = true;

                                j.svgValue(diffMoving(j.svg_player, xArrayPlayer,
                                    [translationX - translationPrevPlayer[0], translationY - translationPrevPlayer[1]]));
                            }

                            j.pathArraySetup([]);
                            dispatch(setPlayerPaths("[]"))

                            dynamicPositionList[position.positionIndex][1].map((joueur: Player) => {
                                if (option.selectedPlayer == joueur.id) {
                                    let centerXY = getCenter(joueur.svg_player);
                                    let pourcentX = (centerXY[0] - superField[0][0]) / (superField[0][5] - superField[0][0]);
                                    let pourcentY = (centerXY[1] - superField[0][3]) / (superField[0][1] - superField[0][3]);
                                    joueur.positionChange([pourcentX, 1 - pourcentY]);
                                }

                                if (dynamicPositionList[position.positionIndex][2].length > 0) {
                                    if (j.id == dynamicPositionList[position.positionIndex][2][0].idJoueur) {
                                        let svg_Mode = dynamicPositionList[position.positionIndex][2][0].svg_ballon;

                                        svg_Mode = diffSVG(svg_Mode, getCenterBallon(svg_Mode), xBallon_Array, getPourcentageCenter2(j.position[0], j.position[1]));
                                        dynamicPositionList[position.positionIndex][2][0].svgValue(svg_Mode);

                                        let centerXY = getCenterBallon(svg_Mode);
                                        let pourcentX = (centerXY[0] - superField[0][0]) / (superField[0][5] - superField[0][0]);
                                        let pourcentY = (centerXY[1] - superField[0][3]) / (superField[0][1] - superField[0][3]);
                                        dynamicPositionList[position.positionIndex][2][0].positionChange([pourcentX, 1 - pourcentY]);
                                    }
                                }
                            })
                        } else {
                            return;
                        }
                    })
                    showPlayer(grabB, position.positionIndex);
                    receivedTranslationsCounter = 0;
                }
            }
        }
    };

    const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
        if (event.nativeEvent.state === State.END) {
            setTranslationPrev([0, 0]);
            setPathDrawing(false);
            setgrabEnCours(false);
            setFreeID(-1);
            setTranslationPrevPlayer([1.0, 1.0]);
            setNumCCC(numCCC + 1)

            dynamicPositionList[position.positionIndex][1].map((joueur) => {
                if (option.selectedPlayer == joueur.id) {
                    let centerXY = getCenter(joueur.svg_player);
                    let pourcentX = (centerXY[0] - superField[0][0]) / (superField[0][5] - superField[0][0]);
                    let pourcentY = (centerXY[1] - superField[0][3]) / (superField[0][1] - superField[0][3]);
                    joueur.positionChange([pourcentX, 1 - pourcentY]);
                }
            })
            dispatch(selectPlayer(""))
            setPrevPourcent([0, 0]);
        }
    };

    const getPourcentageCenter = (x: number, y: number) => {
        let distanceMaxX = superSvg_Field[0][5] - superSvg_Field[0][0];
        let distanceMaxY = superSvg_Field[0][1] - superSvg_Field[0][3];
        let resultX = distanceMaxX * x;
        let resultY = distanceMaxY * y;

        return ([resultX + superSvg_Field[0][0], superSvg_Field[0][1] - resultY]);
    };

    const getPourcentageCenter2 = (x: number, y: number) => {
        let distanceMaxX = superField[0][5] - superField[0][0];
        let distanceMaxY = superField[0][1] - superField[0][3];
        let resultX = distanceMaxX * x;
        let resultY = distanceMaxY * y;

        return ([resultX + superField[0][0], superField[0][1] - resultY]);
    };

    const getCenter = (svgP: number[]) => {
        let centerPlayer = [(svgP[74] + svgP[139]) / 2, (svgP[9] + svgP[105]) / 2]

        return (centerPlayer)
    };

    const getCenterBallon = (svgP: number[]) => {
        let centerBallon = [(svgP[20] + svgP[50]) / 2, (svgP[17] + svgP[43]) / 2]

        return (centerBallon)
    };

    center = [((superSvg_Field[0][0] + superSvg_Field[0][2] + superSvg_Field[0][4] + superSvg_Field[0][5]) / 4), ((superSvg_Field[0][1] + superSvg_Field[0][3] + superSvg_Field[0][3] + superSvg_Field[0][6]) / 4)]

    const retrievePlayer = () => {
        data.map(myPosition => {
            let myPlayersData: Player[] = [];
            let myBallonData: Ballon[] = [];
            myPosition.data.map((item) => {
                const xCoordinate = item.position[0][0];
                const yCoordinate = item.position[1][0];

                let newPlayer = Player.createPlayer([xCoordinate, yCoordinate], item.id, item.array, player, 1);
                myPlayersData.push(newPlayer);

            });

            if (myPosition.ballon.length > 0) {
                myPosition.ballon.map((bal) => {
                    const xCoordinate = bal.position[0][0];
                    const yCoordinate = bal.position[1][0];
                    let newBallon = Ballon.createBallon([xCoordinate, yCoordinate], ballon_svg, bal.idJoueur);
                    myBallonData.push(newBallon);
                });
            }

            let positionCurrent: [number, Player[], Ballon[]] = [
                myPosition.position,
                [...myPlayersData],
                [...myBallonData]
            ];

            setDynamicPositionList((prevPos) => [...prevPos, positionCurrent]);
            setNumCCC(numCCC + 1);

            myPlayersData = [];
            myBallonData = [];
        });
    }

    const handlePlayerPress = (id: string) => {
        setPathDrawing(true);

        dynamicPositionList[position.positionIndex][1].map((joueur: Player): void => {
            if (joueur.id === id) {
                dispatch(selectPlayer(`${joueur.id}P`))
                joueur.speedUp();

                let getXY: number[] = getPourcentageCenter2(joueur.position[0], joueur.position[1]);
                let beginPath: string = `M${getXY[0]} ${getXY[1]}`;

                joueur.pathArraySetup([]);

                const existingIndex = JSON.parse(option.playerPaths).findIndex((p: PlayerPath): boolean => p.id === joueur.id + 'P');
                const newPaths: PlayerPath[] = JSON.parse(option.playerPaths)

                newPaths[existingIndex].path = beginPath

                dispatch(setPlayerPaths(JSON.stringify(newPaths)))

                setDynamicPositionList((j0) => {
                    const save: Player[] = j0[position.positionIndex][1].filter((c) => c.id === joueur.id);
                    const updatedPlayer: Player[] = j0[position.positionIndex][1].filter((c) => c.id !== joueur.id);
                    const updatedPlayerData: Player = save[0]; // Replace with your logic to update player properties

                    return [
                        ...j0.slice(0, position.positionIndex),
                        [j0[position.positionIndex][0], [...updatedPlayer, updatedPlayerData], j0[position.positionIndex][2]],
                        ...j0.slice(position.positionIndex + 1),
                    ];
                });

                let mcenter = [((superField[0][0] + superField[0][2] + superField[0][4] + superField[0][5]) / 4), ((superField[0][1] + superField[0][3] + superField[0][3] + superField[0][6]) / 4)]

                diffSVGAll(mcenter);
                proportionAll(proportion);
                setAll();

                let svg_Mode = proportionSVG(player, ((superSvg_Field[0][5] - superSvg_Field[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))
                dynamicPositionList[position.positionIndex][1].map((joueur) => {
                    svg_Mode = diffSVG(svg_Mode, getCenter(svg_Mode), xArrayPlayer, getPourcentageCenter(joueur.position[0], joueur.position[1]))
                    joueur.svgValue(svg_Mode);
                });

                svg_Mode = proportionSVG(ballon_svg, ((superSvg_Field[0][5] - superSvg_Field[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))
                dynamicPositionList[position.positionIndex][2].map((ball) => {
                    svg_Mode = diffSVG(svg_Mode, getCenterBallon(svg_Mode), xBallon_Array, getPourcentageCenter(ball.position[0], ball.position[1]))
                    ball.svgValue(svg_Mode);
                });
                showPlayer(false, position.positionIndex);
            }
        });
    };

    const showPlayer = (grab: boolean, indexC: number) => {
        let maillot: ShirtDigit[] = [];
        let moveBallon: number[] = [-100, -100];
        let ballonShown: boolean = false;
        let dispatchAt = false;
        let newPaths: PlayerPath[] = JSON.parse(option.playerPaths);

        setSvgPlayers([]);
        setSvgBallon([]);

        dynamicPositionList[indexC][1].map((joueur) => {
            let color: string;
            let colorSpeed: string;
            let getXY: number[] = getPourcentageCenter(joueur.position[0], joueur.position[1]);

            if (joueur.id[0] == 'B') {
                color = "#0024A6";
            } else {
                color = "#A62400";
            }

            if (joueur.speed == 3) {
                colorSpeed = "white";
            } else if (joueur.speed == 2) {
                colorSpeed = "yellow";
            } else {
                colorSpeed = "black";
            }

            if (dynamicPositionList[indexC][2].length > 0) {
                if (joueur.id == dynamicPositionList[indexC][2][0].idJoueur && !grab) {
                    ballonShown = true;
                    moveBallon = getCenter(joueur.svg_player);
                    dynamicPositionList[indexC][2][0].positionChange(joueur.position);
                }
            }

            if (joueur.myArray.length > 0 && !animationEnCours && !grab) {

                let drawnPath = ``;
                for (let i = 0; i < joueur.myArray.length; i++) {
                    if (i == 0) {
                        drawnPath = `M${getXY[0]} ${getXY[1]}`;
                    }
                    getXY = getPourcentageCenter(joueur.myArray[i][0], (1 - joueur.myArray[i][1]));
                    drawnPath = `${drawnPath}L${getXY[0]} ${getXY[1]}`
                }

                const existingIndex = JSON.parse(option.playerPaths).findIndex((p: PlayerPath) => p.id === joueur.id + 'P');

                if (existingIndex != -1) {
                    newPaths[existingIndex].path = drawnPath
                    dispatchAt = true;
                } else {
                    newPaths.push({id: joueur.id + 'P', path: drawnPath});
                    dispatchAt = true;
                }
            } else if (animationEnCours) {
                newPaths = [];
                dispatchAt = true;
            }

            if (!JSON.parse(option.playerPaths).some((p: PlayerPath): boolean => p.id === joueur.id + "P")) {
                let beginPath: string = `M${getXY[0]} ${getXY[1]}`;

                dispatch(setPlayerPaths(
                    JSON.stringify([
                        ...JSON.parse(option.playerPaths),
                        {id: joueur.id + 'P', path: beginPath}
                    ])
                ))
            }

            const svgPlayer = [
                <Path
                    key={joueur.id}
                    d={`M${joueur.svg_player[0]} ${joueur.svg_player[1]}L${joueur.svg_player[2]} ${joueur.svg_player[3]}C${joueur.svg_player[4]} ${joueur.svg_player[5]} ${joueur.svg_player[6]} ${joueur.svg_player[7]} ${joueur.svg_player[8]} ${joueur.svg_player[9]}H${joueur.svg_player[10]}C${joueur.svg_player[11]} ${joueur.svg_player[12]} ${joueur.svg_player[13]} ${joueur.svg_player[14]} ${joueur.svg_player[15]} ${joueur.svg_player[16]}C${joueur.svg_player[17]} ${joueur.svg_player[18]} ${joueur.svg_player[19]} ${joueur.svg_player[20]} ${joueur.svg_player[21]} ${joueur.svg_player[22]}C${joueur.svg_player[23]} ${joueur.svg_player[24]} ${joueur.svg_player[25]} ${joueur.svg_player[26]} ${joueur.svg_player[27]} ${joueur.svg_player[28]}C${joueur.svg_player[29]} ${joueur.svg_player[30]} ${joueur.svg_player[31]} ${joueur.svg_player[32]} ${joueur.svg_player[33]} ${joueur.svg_player[34]}C${joueur.svg_player[35]} ${joueur.svg_player[36]} ${joueur.svg_player[37]} ${joueur.svg_player[38]} ${joueur.svg_player[39]} ${joueur.svg_player[40]}C${joueur.svg_player[41]} ${joueur.svg_player[42]} ${joueur.svg_player[43]} ${joueur.svg_player[44]} ${joueur.svg_player[45]} ${joueur.svg_player[46]}C${joueur.svg_player[47]} ${joueur.svg_player[48]} ${joueur.svg_player[49]} ${joueur.svg_player[50]} ${joueur.svg_player[51]} ${joueur.svg_player[52]}C${joueur.svg_player[53]} ${joueur.svg_player[54]} ${joueur.svg_player[55]} ${joueur.svg_player[56]} ${joueur.svg_player[57]} ${joueur.svg_player[58]}H${joueur.svg_player[59]}C${joueur.svg_player[60]} ${joueur.svg_player[61]} ${joueur.svg_player[62]} ${joueur.svg_player[63]} ${joueur.svg_player[64]} ${joueur.svg_player[65]}L${joueur.svg_player[66]} ${joueur.svg_player[67]}C${joueur.svg_player[68]} ${joueur.svg_player[69]} ${joueur.svg_player[70]} ${joueur.svg_player[71]} ${joueur.svg_player[72]} ${joueur.svg_player[73]}C${joueur.svg_player[74]} ${joueur.svg_player[75]} ${joueur.svg_player[76]} ${joueur.svg_player[77]} ${joueur.svg_player[78]} ${joueur.svg_player[79]}L${joueur.svg_player[80]} ${joueur.svg_player[81]}C${joueur.svg_player[82]} ${joueur.svg_player[83]} ${joueur.svg_player[84]} ${joueur.svg_player[85]} ${joueur.svg_player[86]} ${joueur.svg_player[87]}C${joueur.svg_player[88]} ${joueur.svg_player[89]} ${joueur.svg_player[90]} ${joueur.svg_player[91]} ${joueur.svg_player[92]} ${joueur.svg_player[93]}H${joueur.svg_player[94]}V${joueur.svg_player[95]}C${joueur.svg_player[96]} ${joueur.svg_player[97]} ${joueur.svg_player[98]} ${joueur.svg_player[99]} ${joueur.svg_player[100]} ${joueur.svg_player[101]}C${joueur.svg_player[102]} ${joueur.svg_player[103]} ${joueur.svg_player[104]} ${joueur.svg_player[105]} ${joueur.svg_player[106]} ${joueur.svg_player[107]}H${joueur.svg_player[108]}C${joueur.svg_player[109]} ${joueur.svg_player[110]} ${joueur.svg_player[111]} ${joueur.svg_player[112]} ${joueur.svg_player[113]} ${joueur.svg_player[114]}C${joueur.svg_player[115]} ${joueur.svg_player[116]} ${joueur.svg_player[117]} ${joueur.svg_player[118]} ${joueur.svg_player[119]} ${joueur.svg_player[120]}V${joueur.svg_player[121]}H${joueur.svg_player[122]}C${joueur.svg_player[123]} ${joueur.svg_player[124]} ${joueur.svg_player[125]} ${joueur.svg_player[126]} ${joueur.svg_player[127]} ${joueur.svg_player[128]}C${joueur.svg_player[129]} ${joueur.svg_player[130]} ${joueur.svg_player[131]} ${joueur.svg_player[132]} ${joueur.svg_player[133]} ${joueur.svg_player[134]}L${joueur.svg_player[135]} ${joueur.svg_player[136]}C${joueur.svg_player[137]} ${joueur.svg_player[138]} ${joueur.svg_player[139]} ${joueur.svg_player[140]} ${joueur.svg_player[141]} ${joueur.svg_player[142]}C${joueur.svg_player[143]} ${joueur.svg_player[144]} ${joueur.svg_player[145]} ${joueur.svg_player[146]} ${joueur.svg_player[147]} ${joueur.svg_player[148]}ZM${joueur.svg_player[149]} ${joueur.svg_player[150]}C${joueur.svg_player[151]} ${joueur.svg_player[152]} ${joueur.svg_player[153]} ${joueur.svg_player[154]} ${joueur.svg_player[155]} ${joueur.svg_player[156]}L${joueur.svg_player[157]} ${joueur.svg_player[158]}L${joueur.svg_player[159]} ${joueur.svg_player[160]}V${joueur.svg_player[161]}H${joueur.svg_player[162]}ZM${joueur.svg_player[163]} ${joueur.svg_player[164]}C${joueur.svg_player[165]} ${joueur.svg_player[166]} ${joueur.svg_player[167]} ${joueur.svg_player[168]} ${joueur.svg_player[169]} ${joueur.svg_player[170]}C${joueur.svg_player[171]} ${joueur.svg_player[172]} ${joueur.svg_player[173]} ${joueur.svg_player[174]} ${joueur.svg_player[175]} ${joueur.svg_player[176]}H${joueur.svg_player[177]}V${joueur.svg_player[178]}L${joueur.svg_player[179]} ${joueur.svg_player[180]}L${joueur.svg_player[181]} ${joueur.svg_player[182]}Z`}
                    fill={color}
                    stroke={colorSpeed}
                    strokeWidth="1.5"
                />
            ];
            setSvgPlayers((prevSvgPlayers) => [...prevSvgPlayers, svgPlayer]);

            let textM = joueur.id.substring(1);
            let buffPosition = getCenter(joueur.svg_player);
            let textSizing = 30;
            let proportionPlayerX = (player[74] - player[139]) / (joueur.svg_player[74] - joueur.svg_player[139]);

            textSizing = textSizing / proportionPlayerX;

            if (joueur.id.length > 2) {
                buffPosition[0] = buffPosition[0] - (buffPosition[0] / 1.77 - joueur.svg_player[74] / 1.77);
            } else {
                buffPosition[0] = buffPosition[0] - (buffPosition[0] / 3.7 - joueur.svg_player[74] / 3.7);
            }

            buffPosition[1] = buffPosition[1] - (buffPosition[1] * 1.7 - joueur.svg_player[75] * 1.7);

            let module: ShirtDigit = {
                id: joueur.id, position: buffPosition,
                textContent: textM, textSize: textSizing
            }

            maillot.push(module);
        });

        setlistMaillot(maillot);

        if (!ballonShown) {
            dynamicPositionList[indexC][2].map((ball) => {
                const svgBall = [
                    <Path
                        d={`M${ball.svg_ballon[0]} ${ball.svg_ballon[1]}C${ball.svg_ballon[2]} ${ball.svg_ballon[3]} ${ball.svg_ballon[4]} ${ball.svg_ballon[5]} ${ball.svg_ballon[6]} ${ball.svg_ballon[7]}C${ball.svg_ballon[8]} ${ball.svg_ballon[9]} ${ball.svg_ballon[10]} ${ball.svg_ballon[11]} ${ball.svg_ballon[12]} ${ball.svg_ballon[13]}C${ball.svg_ballon[14]} ${ball.svg_ballon[15]} ${ball.svg_ballon[16]} ${ball.svg_ballon[17]} ${ball.svg_ballon[18]} ${ball.svg_ballon[19]}C${ball.svg_ballon[20]} ${ball.svg_ballon[21]} ${ball.svg_ballon[22]} ${ball.svg_ballon[23]} ${ball.svg_ballon[24]} ${ball.svg_ballon[25]}C${ball.svg_ballon[26]} ${ball.svg_ballon[27]} ${ball.svg_ballon[28]} ${ball.svg_ballon[29]} ${ball.svg_ballon[30]} ${ball.svg_ballon[31]}C${ball.svg_ballon[32]} ${ball.svg_ballon[33]} ${ball.svg_ballon[34]} ${ball.svg_ballon[35]} ${ball.svg_ballon[36]} ${ball.svg_ballon[37]}C${ball.svg_ballon[38]} ${ball.svg_ballon[39]} ${ball.svg_ballon[40]} ${ball.svg_ballon[41]} ${ball.svg_ballon[42]} ${ball.svg_ballon[43]}C${ball.svg_ballon[44]} ${ball.svg_ballon[45]} ${ball.svg_ballon[46]} ${ball.svg_ballon[47]} ${ball.svg_ballon[48]} ${ball.svg_ballon[49]}C${ball.svg_ballon[50]} ${ball.svg_ballon[51]} ${ball.svg_ballon[52]} ${ball.svg_ballon[53]} ${ball.svg_ballon[54]} ${ball.svg_ballon[55]}ZM${ball.svg_ballon[56]} ${ball.svg_ballon[57]}C${ball.svg_ballon[58]} ${ball.svg_ballon[59]} ${ball.svg_ballon[60]} ${ball.svg_ballon[61]} ${ball.svg_ballon[62]} ${ball.svg_ballon[63]}C${ball.svg_ballon[64]} ${ball.svg_ballon[65]} ${ball.svg_ballon[66]} ${ball.svg_ballon[67]} ${ball.svg_ballon[68]} ${ball.svg_ballon[69]}C${ball.svg_ballon[70]} ${ball.svg_ballon[71]} ${ball.svg_ballon[72]} ${ball.svg_ballon[73]} ${ball.svg_ballon[74]} ${ball.svg_ballon[75]}L${ball.svg_ballon[76]} ${ball.svg_ballon[77]}C${ball.svg_ballon[78]} ${ball.svg_ballon[79]} ${ball.svg_ballon[80]} ${ball.svg_ballon[81]} ${ball.svg_ballon[82]} ${ball.svg_ballon[83]}ZM${ball.svg_ballon[84]} ${ball.svg_ballon[85]}L${ball.svg_ballon[86]} ${ball.svg_ballon[87]}L${ball.svg_ballon[88]} ${ball.svg_ballon[89]}C${ball.svg_ballon[90]} ${ball.svg_ballon[91]} ${ball.svg_ballon[92]} ${ball.svg_ballon[93]} ${ball.svg_ballon[94]} ${ball.svg_ballon[95]}C${ball.svg_ballon[96]} ${ball.svg_ballon[97]} ${ball.svg_ballon[98]} ${ball.svg_ballon[99]} ${ball.svg_ballon[100]} ${ball.svg_ballon[101]}C${ball.svg_ballon[102]} ${ball.svg_ballon[103]} ${ball.svg_ballon[104]} ${ball.svg_ballon[105]} ${ball.svg_ballon[106]} ${ball.svg_ballon[107]}C${ball.svg_ballon[108]} ${ball.svg_ballon[109]} ${ball.svg_ballon[110]} ${ball.svg_ballon[111]} ${ball.svg_ballon[112]} ${ball.svg_ballon[113]}C${ball.svg_ballon[114]} ${ball.svg_ballon[115]} ${ball.svg_ballon[116]} ${ball.svg_ballon[117]} ${ball.svg_ballon[118]} ${ball.svg_ballon[119]}C${ball.svg_ballon[120]} ${ball.svg_ballon[121]} ${ball.svg_ballon[122]} ${ball.svg_ballon[123]} ${ball.svg_ballon[124]} ${ball.svg_ballon[125]}C${ball.svg_ballon[126]} ${ball.svg_ballon[127]} ${ball.svg_ballon[128]} ${ball.svg_ballon[129]} ${ball.svg_ballon[130]} ${ball.svg_ballon[131]}C${ball.svg_ballon[132]} ${ball.svg_ballon[133]} ${ball.svg_ballon[134]} ${ball.svg_ballon[135]} ${ball.svg_ballon[136]} ${ball.svg_ballon[137]}L${ball.svg_ballon[138]} ${ball.svg_ballon[139]}L${ball.svg_ballon[140]} ${ball.svg_ballon[141]}L${ball.svg_ballon[142]} ${ball.svg_ballon[143]}C${ball.svg_ballon[144]} ${ball.svg_ballon[145]} ${ball.svg_ballon[146]} ${ball.svg_ballon[147]} ${ball.svg_ballon[148]} ${ball.svg_ballon[149]}C${ball.svg_ballon[150]} ${ball.svg_ballon[151]} ${ball.svg_ballon[152]} ${ball.svg_ballon[153]} ${ball.svg_ballon[154]} ${ball.svg_ballon[155]}C${ball.svg_ballon[156]} ${ball.svg_ballon[157]} ${ball.svg_ballon[158]} ${ball.svg_ballon[159]} ${ball.svg_ballon[160]} ${ball.svg_ballon[161]}C${ball.svg_ballon[162]} ${ball.svg_ballon[163]} ${ball.svg_ballon[164]} ${ball.svg_ballon[165]} ${ball.svg_ballon[166]} ${ball.svg_ballon[167]}C${ball.svg_ballon[168]} ${ball.svg_ballon[169]} ${ball.svg_ballon[170]} ${ball.svg_ballon[171]} ${ball.svg_ballon[172]} ${ball.svg_ballon[173]}C${ball.svg_ballon[174]} ${ball.svg_ballon[175]} ${ball.svg_ballon[176]} ${ball.svg_ballon[177]} ${ball.svg_ballon[178]} ${ball.svg_ballon[179]}C${ball.svg_ballon[180]} ${ball.svg_ballon[181]} ${ball.svg_ballon[182]} ${ball.svg_ballon[183]} ${ball.svg_ballon[184]} ${ball.svg_ballon[185]}C${ball.svg_ballon[186]} ${ball.svg_ballon[187]} ${ball.svg_ballon[188]} ${ball.svg_ballon[189]} ${ball.svg_ballon[190]} ${ball.svg_ballon[191]}L${ball.svg_ballon[192]} ${ball.svg_ballon[193]}L${ball.svg_ballon[194]} ${ball.svg_ballon[195]}C${ball.svg_ballon[196]} ${ball.svg_ballon[197]} ${ball.svg_ballon[198]} ${ball.svg_ballon[199]} ${ball.svg_ballon[200]} ${ball.svg_ballon[201]}C${ball.svg_ballon[202]} ${ball.svg_ballon[203]} ${ball.svg_ballon[204]} ${ball.svg_ballon[205]} ${ball.svg_ballon[206]} ${ball.svg_ballon[207]}C${ball.svg_ballon[208]} ${ball.svg_ballon[209]} ${ball.svg_ballon[210]} ${ball.svg_ballon[211]} ${ball.svg_ballon[212]} ${ball.svg_ballon[213]}C${ball.svg_ballon[214]} ${ball.svg_ballon[215]} ${ball.svg_ballon[216]} ${ball.svg_ballon[217]} ${ball.svg_ballon[218]} ${ball.svg_ballon[219]}C${ball.svg_ballon[220]} ${ball.svg_ballon[221]} ${ball.svg_ballon[222]} ${ball.svg_ballon[223]} ${ball.svg_ballon[224]} ${ball.svg_ballon[225]}C${ball.svg_ballon[226]} ${ball.svg_ballon[227]} ${ball.svg_ballon[228]} ${ball.svg_ballon[229]} ${ball.svg_ballon[230]} ${ball.svg_ballon[231]}C${ball.svg_ballon[232]} ${ball.svg_ballon[233]} ${ball.svg_ballon[234]} ${ball.svg_ballon[235]} ${ball.svg_ballon[236]} ${ball.svg_ballon[237]}C${ball.svg_ballon[238]} ${ball.svg_ballon[239]} ${ball.svg_ballon[240]} ${ball.svg_ballon[241]} ${ball.svg_ballon[242]} ${ball.svg_ballon[243]}L${ball.svg_ballon[244]} ${ball.svg_ballon[245]}L${ball.svg_ballon[246]} ${ball.svg_ballon[247]}C${ball.svg_ballon[248]} ${ball.svg_ballon[249]} ${ball.svg_ballon[250]} ${ball.svg_ballon[251]} ${ball.svg_ballon[252]} ${ball.svg_ballon[253]}C${ball.svg_ballon[254]} ${ball.svg_ballon[255]} ${ball.svg_ballon[256]} ${ball.svg_ballon[257]} ${ball.svg_ballon[258]} ${ball.svg_ballon[259]}C${ball.svg_ballon[260]} ${ball.svg_ballon[261]} ${ball.svg_ballon[262]} ${ball.svg_ballon[263]} ${ball.svg_ballon[264]} ${ball.svg_ballon[265]}C${ball.svg_ballon[266]} ${ball.svg_ballon[267]} ${ball.svg_ballon[268]} ${ball.svg_ballon[269]} ${ball.svg_ballon[270]} ${ball.svg_ballon[271]}L${ball.svg_ballon[272]} ${ball.svg_ballon[273]}L${ball.svg_ballon[274]} ${ball.svg_ballon[275]}L${ball.svg_ballon[276]} ${ball.svg_ballon[277]}C${ball.svg_ballon[278]} ${ball.svg_ballon[279]} ${ball.svg_ballon[280]} ${ball.svg_ballon[281]} ${ball.svg_ballon[282]} ${ball.svg_ballon[283]}C${ball.svg_ballon[284]} ${ball.svg_ballon[285]} ${ball.svg_ballon[286]} ${ball.svg_ballon[287]} ${ball.svg_ballon[288]} ${ball.svg_ballon[289]}C${ball.svg_ballon[290]} ${ball.svg_ballon[291]} ${ball.svg_ballon[292]} ${ball.svg_ballon[293]} ${ball.svg_ballon[294]} ${ball.svg_ballon[295]}C${ball.svg_ballon[296]} ${ball.svg_ballon[297]} ${ball.svg_ballon[298]} ${ball.svg_ballon[299]} ${ball.svg_ballon[300]} ${ball.svg_ballon[301]}L${ball.svg_ballon[302]} ${ball.svg_ballon[303]}L${ball.svg_ballon[304]} ${ball.svg_ballon[305]}C${ball.svg_ballon[306]} ${ball.svg_ballon[307]} ${ball.svg_ballon[308]} ${ball.svg_ballon[309]} ${ball.svg_ballon[310]} ${ball.svg_ballon[311]}C${ball.svg_ballon[312]} ${ball.svg_ballon[313]} ${ball.svg_ballon[314]} ${ball.svg_ballon[315]} ${ball.svg_ballon[316]} ${ball.svg_ballon[317]}C${ball.svg_ballon[318]} ${ball.svg_ballon[319]} ${ball.svg_ballon[320]} ${ball.svg_ballon[321]} ${ball.svg_ballon[322]} ${ball.svg_ballon[323]}C${ball.svg_ballon[324]} ${ball.svg_ballon[325]} ${ball.svg_ballon[326]} ${ball.svg_ballon[327]} ${ball.svg_ballon[328]} ${ball.svg_ballon[329]}C${ball.svg_ballon[330]} ${ball.svg_ballon[331]} ${ball.svg_ballon[332]} ${ball.svg_ballon[333]} ${ball.svg_ballon[334]} ${ball.svg_ballon[335]}C${ball.svg_ballon[336]} ${ball.svg_ballon[337]} ${ball.svg_ballon[338]} ${ball.svg_ballon[339]} ${ball.svg_ballon[340]} ${ball.svg_ballon[341]}C${ball.svg_ballon[342]} ${ball.svg_ballon[343]} ${ball.svg_ballon[344]} ${ball.svg_ballon[345]} ${ball.svg_ballon[346]} ${ball.svg_ballon[347]}C${ball.svg_ballon[348]} ${ball.svg_ballon[349]} ${ball.svg_ballon[350]} ${ball.svg_ballon[351]} ${ball.svg_ballon[352]} ${ball.svg_ballon[353]}H${ball.svg_ballon[354]}ZM${ball.svg_ballon[355]} ${ball.svg_ballon[356]}L${ball.svg_ballon[357]} ${ball.svg_ballon[358]}C${ball.svg_ballon[359]} ${ball.svg_ballon[360]} ${ball.svg_ballon[361]} ${ball.svg_ballon[362]} ${ball.svg_ballon[363]} ${ball.svg_ballon[364]}C${ball.svg_ballon[365]} ${ball.svg_ballon[366]} ${ball.svg_ballon[367]} ${ball.svg_ballon[368]} ${ball.svg_ballon[369]} ${ball.svg_ballon[370]}C${ball.svg_ballon[371]} ${ball.svg_ballon[372]} ${ball.svg_ballon[373]} ${ball.svg_ballon[374]} ${ball.svg_ballon[375]} ${ball.svg_ballon[376]}C${ball.svg_ballon[377]} ${ball.svg_ballon[378]} ${ball.svg_ballon[379]} ${ball.svg_ballon[380]} ${ball.svg_ballon[381]} ${ball.svg_ballon[382]}C${ball.svg_ballon[383]} ${ball.svg_ballon[384]} ${ball.svg_ballon[385]} ${ball.svg_ballon[386]} ${ball.svg_ballon[387]} ${ball.svg_ballon[388]}Z`}
                        fill="#A65000"
                    />
                ];

                setSvgBallon(svgBall[0]);
            });
        } else {
            showBallon(moveBallon);
        }

        if (!animationEnCours) {
            closestPlayerToBallon();
        }

        if (dispatchAt) {
            dispatch(setPlayerPaths(JSON.stringify(newPaths)))
        }


    }

    const showBallon = (move: number[]) => {

        if (move[0] != -100 || move[1] != -100) {
            let distX = (dynamicPositionList[position.positionIndex][2][0].svg_ballon[20] - dynamicPositionList[position.positionIndex][2][0].svg_ballon[50]);
            let distY = (dynamicPositionList[position.positionIndex][2][0].svg_ballon[17] - dynamicPositionList[position.positionIndex][2][0].svg_ballon[43]);

            move = [move[0] + distX / 2, move[1] + distY / 3];

            if (!animationEnCours && !grabEnCours) {
                dynamicPositionList[position.positionIndex][2][0].svgValue(diffSVG(dynamicPositionList[position.positionIndex][2][0].svg_ballon, move, xBallon_Array, getCenterBallon(dynamicPositionList[position.positionIndex][2][0].svg_ballon)));
            }

            dynamicPositionList[position.positionIndex][2].map((ball) => {
                const svgBall = [<Path
                    d={`M${ball.svg_ballon[0]} ${ball.svg_ballon[1]}C${ball.svg_ballon[2]} ${ball.svg_ballon[3]} ${ball.svg_ballon[4]} ${ball.svg_ballon[5]} ${ball.svg_ballon[6]} ${ball.svg_ballon[7]}C${ball.svg_ballon[8]} ${ball.svg_ballon[9]} ${ball.svg_ballon[10]} ${ball.svg_ballon[11]} ${ball.svg_ballon[12]} ${ball.svg_ballon[13]}C${ball.svg_ballon[14]} ${ball.svg_ballon[15]} ${ball.svg_ballon[16]} ${ball.svg_ballon[17]} ${ball.svg_ballon[18]} ${ball.svg_ballon[19]}C${ball.svg_ballon[20]} ${ball.svg_ballon[21]} ${ball.svg_ballon[22]} ${ball.svg_ballon[23]} ${ball.svg_ballon[24]} ${ball.svg_ballon[25]}C${ball.svg_ballon[26]} ${ball.svg_ballon[27]} ${ball.svg_ballon[28]} ${ball.svg_ballon[29]} ${ball.svg_ballon[30]} ${ball.svg_ballon[31]}C${ball.svg_ballon[32]} ${ball.svg_ballon[33]} ${ball.svg_ballon[34]} ${ball.svg_ballon[35]} ${ball.svg_ballon[36]} ${ball.svg_ballon[37]}C${ball.svg_ballon[38]} ${ball.svg_ballon[39]} ${ball.svg_ballon[40]} ${ball.svg_ballon[41]} ${ball.svg_ballon[42]} ${ball.svg_ballon[43]}C${ball.svg_ballon[44]} ${ball.svg_ballon[45]} ${ball.svg_ballon[46]} ${ball.svg_ballon[47]} ${ball.svg_ballon[48]} ${ball.svg_ballon[49]}C${ball.svg_ballon[50]} ${ball.svg_ballon[51]} ${ball.svg_ballon[52]} ${ball.svg_ballon[53]} ${ball.svg_ballon[54]} ${ball.svg_ballon[55]}ZM${ball.svg_ballon[56]} ${ball.svg_ballon[57]}C${ball.svg_ballon[58]} ${ball.svg_ballon[59]} ${ball.svg_ballon[60]} ${ball.svg_ballon[61]} ${ball.svg_ballon[62]} ${ball.svg_ballon[63]}C${ball.svg_ballon[64]} ${ball.svg_ballon[65]} ${ball.svg_ballon[66]} ${ball.svg_ballon[67]} ${ball.svg_ballon[68]} ${ball.svg_ballon[69]}C${ball.svg_ballon[70]} ${ball.svg_ballon[71]} ${ball.svg_ballon[72]} ${ball.svg_ballon[73]} ${ball.svg_ballon[74]} ${ball.svg_ballon[75]}L${ball.svg_ballon[76]} ${ball.svg_ballon[77]}C${ball.svg_ballon[78]} ${ball.svg_ballon[79]} ${ball.svg_ballon[80]} ${ball.svg_ballon[81]} ${ball.svg_ballon[82]} ${ball.svg_ballon[83]}ZM${ball.svg_ballon[84]} ${ball.svg_ballon[85]}L${ball.svg_ballon[86]} ${ball.svg_ballon[87]}L${ball.svg_ballon[88]} ${ball.svg_ballon[89]}C${ball.svg_ballon[90]} ${ball.svg_ballon[91]} ${ball.svg_ballon[92]} ${ball.svg_ballon[93]} ${ball.svg_ballon[94]} ${ball.svg_ballon[95]}C${ball.svg_ballon[96]} ${ball.svg_ballon[97]} ${ball.svg_ballon[98]} ${ball.svg_ballon[99]} ${ball.svg_ballon[100]} ${ball.svg_ballon[101]}C${ball.svg_ballon[102]} ${ball.svg_ballon[103]} ${ball.svg_ballon[104]} ${ball.svg_ballon[105]} ${ball.svg_ballon[106]} ${ball.svg_ballon[107]}C${ball.svg_ballon[108]} ${ball.svg_ballon[109]} ${ball.svg_ballon[110]} ${ball.svg_ballon[111]} ${ball.svg_ballon[112]} ${ball.svg_ballon[113]}C${ball.svg_ballon[114]} ${ball.svg_ballon[115]} ${ball.svg_ballon[116]} ${ball.svg_ballon[117]} ${ball.svg_ballon[118]} ${ball.svg_ballon[119]}C${ball.svg_ballon[120]} ${ball.svg_ballon[121]} ${ball.svg_ballon[122]} ${ball.svg_ballon[123]} ${ball.svg_ballon[124]} ${ball.svg_ballon[125]}C${ball.svg_ballon[126]} ${ball.svg_ballon[127]} ${ball.svg_ballon[128]} ${ball.svg_ballon[129]} ${ball.svg_ballon[130]} ${ball.svg_ballon[131]}C${ball.svg_ballon[132]} ${ball.svg_ballon[133]} ${ball.svg_ballon[134]} ${ball.svg_ballon[135]} ${ball.svg_ballon[136]} ${ball.svg_ballon[137]}L${ball.svg_ballon[138]} ${ball.svg_ballon[139]}L${ball.svg_ballon[140]} ${ball.svg_ballon[141]}L${ball.svg_ballon[142]} ${ball.svg_ballon[143]}C${ball.svg_ballon[144]} ${ball.svg_ballon[145]} ${ball.svg_ballon[146]} ${ball.svg_ballon[147]} ${ball.svg_ballon[148]} ${ball.svg_ballon[149]}C${ball.svg_ballon[150]} ${ball.svg_ballon[151]} ${ball.svg_ballon[152]} ${ball.svg_ballon[153]} ${ball.svg_ballon[154]} ${ball.svg_ballon[155]}C${ball.svg_ballon[156]} ${ball.svg_ballon[157]} ${ball.svg_ballon[158]} ${ball.svg_ballon[159]} ${ball.svg_ballon[160]} ${ball.svg_ballon[161]}C${ball.svg_ballon[162]} ${ball.svg_ballon[163]} ${ball.svg_ballon[164]} ${ball.svg_ballon[165]} ${ball.svg_ballon[166]} ${ball.svg_ballon[167]}C${ball.svg_ballon[168]} ${ball.svg_ballon[169]} ${ball.svg_ballon[170]} ${ball.svg_ballon[171]} ${ball.svg_ballon[172]} ${ball.svg_ballon[173]}C${ball.svg_ballon[174]} ${ball.svg_ballon[175]} ${ball.svg_ballon[176]} ${ball.svg_ballon[177]} ${ball.svg_ballon[178]} ${ball.svg_ballon[179]}C${ball.svg_ballon[180]} ${ball.svg_ballon[181]} ${ball.svg_ballon[182]} ${ball.svg_ballon[183]} ${ball.svg_ballon[184]} ${ball.svg_ballon[185]}C${ball.svg_ballon[186]} ${ball.svg_ballon[187]} ${ball.svg_ballon[188]} ${ball.svg_ballon[189]} ${ball.svg_ballon[190]} ${ball.svg_ballon[191]}L${ball.svg_ballon[192]} ${ball.svg_ballon[193]}L${ball.svg_ballon[194]} ${ball.svg_ballon[195]}C${ball.svg_ballon[196]} ${ball.svg_ballon[197]} ${ball.svg_ballon[198]} ${ball.svg_ballon[199]} ${ball.svg_ballon[200]} ${ball.svg_ballon[201]}C${ball.svg_ballon[202]} ${ball.svg_ballon[203]} ${ball.svg_ballon[204]} ${ball.svg_ballon[205]} ${ball.svg_ballon[206]} ${ball.svg_ballon[207]}C${ball.svg_ballon[208]} ${ball.svg_ballon[209]} ${ball.svg_ballon[210]} ${ball.svg_ballon[211]} ${ball.svg_ballon[212]} ${ball.svg_ballon[213]}C${ball.svg_ballon[214]} ${ball.svg_ballon[215]} ${ball.svg_ballon[216]} ${ball.svg_ballon[217]} ${ball.svg_ballon[218]} ${ball.svg_ballon[219]}C${ball.svg_ballon[220]} ${ball.svg_ballon[221]} ${ball.svg_ballon[222]} ${ball.svg_ballon[223]} ${ball.svg_ballon[224]} ${ball.svg_ballon[225]}C${ball.svg_ballon[226]} ${ball.svg_ballon[227]} ${ball.svg_ballon[228]} ${ball.svg_ballon[229]} ${ball.svg_ballon[230]} ${ball.svg_ballon[231]}C${ball.svg_ballon[232]} ${ball.svg_ballon[233]} ${ball.svg_ballon[234]} ${ball.svg_ballon[235]} ${ball.svg_ballon[236]} ${ball.svg_ballon[237]}C${ball.svg_ballon[238]} ${ball.svg_ballon[239]} ${ball.svg_ballon[240]} ${ball.svg_ballon[241]} ${ball.svg_ballon[242]} ${ball.svg_ballon[243]}L${ball.svg_ballon[244]} ${ball.svg_ballon[245]}L${ball.svg_ballon[246]} ${ball.svg_ballon[247]}C${ball.svg_ballon[248]} ${ball.svg_ballon[249]} ${ball.svg_ballon[250]} ${ball.svg_ballon[251]} ${ball.svg_ballon[252]} ${ball.svg_ballon[253]}C${ball.svg_ballon[254]} ${ball.svg_ballon[255]} ${ball.svg_ballon[256]} ${ball.svg_ballon[257]} ${ball.svg_ballon[258]} ${ball.svg_ballon[259]}C${ball.svg_ballon[260]} ${ball.svg_ballon[261]} ${ball.svg_ballon[262]} ${ball.svg_ballon[263]} ${ball.svg_ballon[264]} ${ball.svg_ballon[265]}C${ball.svg_ballon[266]} ${ball.svg_ballon[267]} ${ball.svg_ballon[268]} ${ball.svg_ballon[269]} ${ball.svg_ballon[270]} ${ball.svg_ballon[271]}L${ball.svg_ballon[272]} ${ball.svg_ballon[273]}L${ball.svg_ballon[274]} ${ball.svg_ballon[275]}L${ball.svg_ballon[276]} ${ball.svg_ballon[277]}C${ball.svg_ballon[278]} ${ball.svg_ballon[279]} ${ball.svg_ballon[280]} ${ball.svg_ballon[281]} ${ball.svg_ballon[282]} ${ball.svg_ballon[283]}C${ball.svg_ballon[284]} ${ball.svg_ballon[285]} ${ball.svg_ballon[286]} ${ball.svg_ballon[287]} ${ball.svg_ballon[288]} ${ball.svg_ballon[289]}C${ball.svg_ballon[290]} ${ball.svg_ballon[291]} ${ball.svg_ballon[292]} ${ball.svg_ballon[293]} ${ball.svg_ballon[294]} ${ball.svg_ballon[295]}C${ball.svg_ballon[296]} ${ball.svg_ballon[297]} ${ball.svg_ballon[298]} ${ball.svg_ballon[299]} ${ball.svg_ballon[300]} ${ball.svg_ballon[301]}L${ball.svg_ballon[302]} ${ball.svg_ballon[303]}L${ball.svg_ballon[304]} ${ball.svg_ballon[305]}C${ball.svg_ballon[306]} ${ball.svg_ballon[307]} ${ball.svg_ballon[308]} ${ball.svg_ballon[309]} ${ball.svg_ballon[310]} ${ball.svg_ballon[311]}C${ball.svg_ballon[312]} ${ball.svg_ballon[313]} ${ball.svg_ballon[314]} ${ball.svg_ballon[315]} ${ball.svg_ballon[316]} ${ball.svg_ballon[317]}C${ball.svg_ballon[318]} ${ball.svg_ballon[319]} ${ball.svg_ballon[320]} ${ball.svg_ballon[321]} ${ball.svg_ballon[322]} ${ball.svg_ballon[323]}C${ball.svg_ballon[324]} ${ball.svg_ballon[325]} ${ball.svg_ballon[326]} ${ball.svg_ballon[327]} ${ball.svg_ballon[328]} ${ball.svg_ballon[329]}C${ball.svg_ballon[330]} ${ball.svg_ballon[331]} ${ball.svg_ballon[332]} ${ball.svg_ballon[333]} ${ball.svg_ballon[334]} ${ball.svg_ballon[335]}C${ball.svg_ballon[336]} ${ball.svg_ballon[337]} ${ball.svg_ballon[338]} ${ball.svg_ballon[339]} ${ball.svg_ballon[340]} ${ball.svg_ballon[341]}C${ball.svg_ballon[342]} ${ball.svg_ballon[343]} ${ball.svg_ballon[344]} ${ball.svg_ballon[345]} ${ball.svg_ballon[346]} ${ball.svg_ballon[347]}C${ball.svg_ballon[348]} ${ball.svg_ballon[349]} ${ball.svg_ballon[350]} ${ball.svg_ballon[351]} ${ball.svg_ballon[352]} ${ball.svg_ballon[353]}H${ball.svg_ballon[354]}ZM${ball.svg_ballon[355]} ${ball.svg_ballon[356]}L${ball.svg_ballon[357]} ${ball.svg_ballon[358]}C${ball.svg_ballon[359]} ${ball.svg_ballon[360]} ${ball.svg_ballon[361]} ${ball.svg_ballon[362]} ${ball.svg_ballon[363]} ${ball.svg_ballon[364]}C${ball.svg_ballon[365]} ${ball.svg_ballon[366]} ${ball.svg_ballon[367]} ${ball.svg_ballon[368]} ${ball.svg_ballon[369]} ${ball.svg_ballon[370]}C${ball.svg_ballon[371]} ${ball.svg_ballon[372]} ${ball.svg_ballon[373]} ${ball.svg_ballon[374]} ${ball.svg_ballon[375]} ${ball.svg_ballon[376]}C${ball.svg_ballon[377]} ${ball.svg_ballon[378]} ${ball.svg_ballon[379]} ${ball.svg_ballon[380]} ${ball.svg_ballon[381]} ${ball.svg_ballon[382]}C${ball.svg_ballon[383]} ${ball.svg_ballon[384]} ${ball.svg_ballon[385]} ${ball.svg_ballon[386]} ${ball.svg_ballon[387]} ${ball.svg_ballon[388]}Z`}
                    fill="#A65000"/>];

                setSvgBallon(svgBall[0]);
            });
        }
    };


    const addPlayer = (positionAdd: number[], idAdd: string) => {
        superSvg_Field = superField;

        if (isValidString(idAdd)) {
            let newPlayer = Player.createPlayer(positionAdd, idAdd, [], player, 1);
            let continueAdding = true;
            let existingPlayerIndex = -1;

            dynamicPositionList[position.positionIndex][1].map((player, index) => {
                if (newPlayer.id == player.id) {
                    continueAdding = false;
                    existingPlayerIndex = index;
                }
            })

            if (continueAdding) {
                let svg_Mode: number[] = proportionSVG(player, ((superField[0][5] - superField[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))

                center = [((superField[0][0] + superField[0][2] + superField[0][4] + superField[0][5]) / 4), ((superField[0][1] + superField[0][3] + superField[0][3] + superField[0][6]) / 4)]
                svg_Mode = diffSVG(svg_Mode, getCenter(svg_Mode), xArrayPlayer, getPourcentageCenter2(newPlayer.position[0], newPlayer.position[1]))
                newPlayer.svgValue(svg_Mode);

                setDynamicPositionList((prevPos) => {
                    const newPositionList = [...prevPos];

                    if (newPositionList[position.positionIndex]) {
                        newPositionList[position.positionIndex][1] = [...newPositionList[position.positionIndex][1], newPlayer];
                    }

                    return newPositionList;
                });

                const foundIndex = returnPublicInstance.returnActionList.findIndex(
                    (number) => number[0] === position.positionIndex
                );

                if (foundIndex != -1) {
                    returnPublicInstance.returnActionList[foundIndex][1].push(["c", newPlayer.id]);

                } else {
                    returnPublicInstance.returnActionList.push([position.positionIndex, [["c", newPlayer.id]]]);
                }

            } else {
                let svg_Mode: number[] = proportionSVG(player, ((superField[0][5] - superField[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))

                center = [((superField[0][0] + superField[0][2] + superField[0][4] + superField[0][5]) / 4), ((superField[0][1] + superField[0][3] + superField[0][3] + superField[0][6]) / 4)]
                svg_Mode = diffSVG(svg_Mode, getCenter(svg_Mode), xArrayPlayer, getPourcentageCenter2(newPlayer.position[0], newPlayer.position[1]))
                newPlayer.svgValue(svg_Mode);

                setDynamicPositionList((prevPos) => {
                    const newPositionList = [...prevPos];

                    if (newPositionList[position.positionIndex]) {
                        const updatedPlayers = [...newPositionList[position.positionIndex][1]];

                        updatedPlayers[existingPlayerIndex] = newPlayer;
                        newPositionList[position.positionIndex][1] = updatedPlayers;
                    }
                    return newPositionList;
                });
            }
            dispatch(setInputPlayerId(""))
            setNumCCC(numCCC + 1)
        }
    };

    const addBallon = (positionAdd: number[]) => {
        superSvg_Field = superField;

        let newBall = Ballon.createBallon(positionAdd, ballon_svg, "");
        let svg_Mode = proportionSVG(ballon_svg, ((superField[0][5] - superField[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))

        center = [((superField[0][0] + superField[0][2] + superField[0][4] + superField[0][5]) / 4), ((superField[0][1] + superField[0][3] + superField[0][3] + superField[0][6]) / 4)]
        svg_Mode = diffSVG(svg_Mode, getCenterBallon(svg_Mode), xBallon_Array, getPourcentageCenter2(newBall.position[0], newBall.position[1]))
        newBall.svgValue(svg_Mode);

        if (dynamicPositionList[position.positionIndex][2].length > 0) {
            const foundIndex = returnPublicInstance.returnActionList.findIndex(
                // @ts-ignore
                (number) => number[0] === position.positionIndex
            );

            if (foundIndex != -1) {
                // @ts-ignore
                returnPublicInstance.returnActionList[foundIndex][1].push(["b-", dynamicPositionList[position.positionIndex][2][0]]);
            } else {
                // @ts-ignore
                returnPublicInstance.returnActionList.push([position.positionIndex, [["b-", dynamicPositionList[position.positionIndex][2][0]]]]);
            }
        }

        setDynamicPositionList((prevPos) => {
            const newPositionList = [...prevPos];

            if (newPositionList[position.positionIndex]) {
                newPositionList[position.positionIndex][2] = [newBall];
            }

            return newPositionList;
        });

        // @ts-ignore
        const foundIndex = returnPublicInstance.returnActionList.findIndex(
            (number) => number[0] === position.positionIndex
        );

        if (foundIndex != -1) {
            // @ts-ignore
            returnPublicInstance.returnActionList[foundIndex][1].push(["b+", []]);
        } else {
            // @ts-ignore
            returnPublicInstance.returnActionList.push([position.positionIndex, [["b+", []]]]);
        }

        showPlayer(false, position.positionIndex);
        setNumCCC(numCCC + 1)
    };

    const setupPlayerAdding = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        const x = event.nativeEvent.x;
        const y = event.nativeEvent.y;
        const state = event.nativeEvent.state;

        if (state == 2) {
            dispatch(selectPlayer(""))
            if (toolbar.playerMode && svgRef.current) {
                let onPlayer = false;

                dynamicPositionList[position.positionIndex][1].map((joueur) => {
                    const polygonPoints: number[][] = [
                        [joueur.svg_player[74], joueur.svg_player[9]],
                        [joueur.svg_player[74], joueur.svg_player[105]],
                        [joueur.svg_player[139], joueur.svg_player[105]],
                        [joueur.svg_player[139], joueur.svg_player[9]],
                    ];

                    svgRef.current.measure(() => {
                        const isInside: boolean = pointInPolygon([x, y], polygonPoints);

                        if (isInside) {
                            onPlayer = true;
                            dispatch(selectPlayer(joueur.id))
                        }
                    })
                });

                if (!onPlayer) {
                    svgRef.current.measure(() => {
                        const adjustedX = x;
                        const adjustedY = y;
                        const polygonPoints: number[][] = [
                            [superField[0][0], superField[0][1]],
                            [superField[0][2], superField[0][3]],
                            [superField[0][4], superField[0][3]],
                            [superField[0][5], superField[0][6]],
                        ];
                        const isInside: boolean = pointInPolygon([adjustedX, adjustedY], polygonPoints);

                        if (isInside && !onPlayer) {
                            let pourcentX = (adjustedX - superField[0][0]) / (superField[0][5] - superField[0][0]);
                            let pourcentY = (adjustedY - superField[0][3]) / (superField[0][1] - superField[0][3]);
                            addPlayer([pourcentX, 1 - pourcentY], option.inputPlayerId);
                        }
                    });
                }
            } else if (toolbar.ballMode && svgRef.current) {
                svgRef.current.measure(() => {
                    const adjustedX = x;
                    const adjustedY = y;
                    const polygonPoints: number[][] = [
                        [superField[0][0], superField[0][1]],
                        [superField[0][2], superField[0][3]],
                        [superField[0][4], superField[0][3]],
                        [superField[0][5], superField[0][6]],
                    ];
                    const isInside: boolean = pointInPolygon([adjustedX, adjustedY], polygonPoints);

                    if (isInside) {
                        let pourcentX = (adjustedX - superField[0][0]) / (superField[0][5] - superField[0][0]);
                        let pourcentY = (adjustedY - superField[0][3]) / (superField[0][1] - superField[0][3]);
                        addBallon([pourcentX, 1 - pourcentY]);
                    }
                });

            } else if (toolbar.drawMode && svgRef.current) {
                let onPlayer = false;

                dynamicPositionList[position.positionIndex][1].map((joueur) => {
                    const polygonPoints: number[][] = [
                        [joueur.svg_player[74], joueur.svg_player[9]],
                        [joueur.svg_player[74], joueur.svg_player[105]],
                        [joueur.svg_player[139], joueur.svg_player[105]],
                        [joueur.svg_player[139], joueur.svg_player[9]],
                    ];

                    svgRef.current.measure(() => {
                        const isInside: boolean = pointInPolygon([x, y], polygonPoints);

                        if (isInside) {
                            onPlayer = true;
                            handlePlayerPress(joueur.id);
                        }
                    })
                })

                if (!onPlayer && toolbar.drawMode) {
                    svgRef.current.measure((px: number, py: number) => {
                        px1 = px;
                        py1 = py;
                        const adjustedX = x;
                        let pourcentX = (adjustedX - superField[0][0]) / (superField[0][5] - superField[0][0]);
                        let pourcentY = (y - superField[0][3]) / (superField[0][1] - superField[0][3]);
                        const newFreePath: FreeDraw = {
                            id: currentDraw.length,
                            position: [pourcentX, pourcentY],
                            path: `M${adjustedX} ${y}`,
                            numbers: [[pourcentX, pourcentY]]
                        };

                        setFreeID(newFreePath.id);
                        setCurrentDraw((prevDraw: FreeDraw[]) => [...prevDraw, newFreePath]);
                        setPathDrawing(true);
                    });
                }
            }
        }
    }

    const [isLinekd, setIsLinked] = useState(false);

    const animate = (indexC: number): void => {
        let waitForLink = false;
        if (dynamicPositionList[indexC].length > 0) {
            if (dynamicPositionList[indexC][2].length > 0) {

                let currentValue = 1000;
                let indexJ = dynamicPositionList[indexC][1].findIndex((j) => j.id === JSON.parse(option.closestPlayer)[0]);
                if (indexJ != -1 && dynamicPositionList[indexC][2][0].idJoueur == "") {
                    let joueur = dynamicPositionList[indexC][1][indexJ];
                    let positionBallon = dynamicPositionList[indexC][2][0].position
                    currentValue = Math.abs(joueur.position[0] - positionBallon[0]) + Math.abs(joueur.position[1] - positionBallon[1]);

                    if (currentValue < 0.01) {
                        waitForLink = true;
                    }
                }
            }
        }

        if (!waitForLink) {
            dispatch(setPositionList(JSON.stringify(dynamicPositionList)))
            superSvg_Field = superField;
            dispatch(unselectAll())
            setPathDrawing(false);

            animationEnCours = true;

            let atLeastOneChange = false;
            let listJoueurModify: [string, number[]][] = [];
            let ballonMove = false;

            if (dynamicPositionList.length > indexC + 1) {
                let listJoueurA: [string, number[]][] = [];
                let listJoueurB: [string, number[]][] = [];
                dynamicPositionList[indexC][1].map((joueur) => {
                    listJoueurA.push([joueur.id, joueur.position]);
                });

                dynamicPositionList[indexC + 1][1].map((joueur) => {
                    listJoueurB.push([joueur.id, joueur.position]);
                });

                if (dynamicPositionList[indexC][2].length > 0) {
                    if (dynamicPositionList[indexC][2][0].idJoueur != "" && dynamicPositionList[indexC + 1][2].length > 0) {
                        if (dynamicPositionList[indexC][2][0].position != dynamicPositionList[indexC + 1][2][0].position) {
                            let indexIDJoueur = dynamicPositionList[indexC][1].findIndex((joueur) => joueur.id === dynamicPositionList[indexC][2][0].idJoueur);
                            if (indexIDJoueur != -1) {
                                if (dynamicPositionList[indexC][1][indexIDJoueur].myArray.length <= 1) {
                                    ballonMove = true;
                                }
                            }
                        }
                    }
                }

                listJoueurA.forEach(([id, positionA]) => {
                    const playerB = listJoueurB.find(([playerId]) => playerId === id);

                    if (playerB && !comparePositions(positionA, playerB[1])) {
                        listJoueurModify.push([id, playerB[1]]);
                    }
                });
            }

            if (ballonMove) {
                dynamicPositionList[indexC][2][0].idChange("");
                let listNumb = [[-100, -100], [dynamicPositionList[indexC][2][0].position[0], 1 - dynamicPositionList[indexC][2][0].position[1]]];
                let addCx = 1;
                let addCy = 1;
                let [currentX, currentY] = dynamicPositionList[indexC][2][0].position;
                let [finalX, finalY] = dynamicPositionList[indexC + 1][2][0].position;
                let antiCrashIndex = 0;
                let absolueX = Math.abs(currentX - finalX);
                let absolueY = Math.abs(currentY - finalY);
                let uppScaleX = 0.1;
                let uppScaleY = 0.1;

                if (dynamicPositionList[indexC][2][0].position[0] > dynamicPositionList[indexC + 1][2][0].position[0]) {
                    addCx = -1;
                }

                if (dynamicPositionList[indexC][2][0].position[1] > dynamicPositionList[indexC + 1][2][0].position[1]) {
                    addCy = -1;
                }

                if (absolueX >= absolueY && absolueX > 0) {
                    uppScaleY = 0.1 * absolueY / absolueX;

                } else if (absolueY > 0) {
                    uppScaleX = 0.1 * absolueX / absolueY;
                }

                while ((Math.abs(currentX - finalX) > uppScaleX ||
                    Math.abs(currentY - finalY) > uppScaleY) && antiCrashIndex < 1000) {
                    antiCrashIndex++;

                    if (Math.abs(currentX - finalX) < uppScaleX) {
                        currentX = finalX;
                    } else {
                        currentX = currentX + uppScaleX * addCx;
                    }

                    if (Math.abs(currentY - finalY) < uppScaleY) {
                        currentY = finalY;
                    } else {
                        currentY = currentY + uppScaleY * addCy;
                    }

                    listNumb.push([currentX, 1 - currentY]);
                }

                listNumb.push([finalX, 1 - finalY]);
                const newAnimationPathBallon = listNumb.slice(1);

                let getXYListStart = getPourcentageCenter(newAnimationPathBallon[0][0], 1 - newAnimationPathBallon[0][1]);
                let getXYListEnd = getPourcentageCenter(newAnimationPathBallon[newAnimationPathBallon.length - 1][0], 1 - newAnimationPathBallon[newAnimationPathBallon.length - 1][1]);
                setAnimationPathBallon([getXYListStart, getXYListEnd]);
                prioAnimation(listNumb, 0, atLeastOneChange, listJoueurModify, indexC);
            } else {
                animateSuite(atLeastOneChange, listJoueurModify, indexC);
            }
        } else {
            dynamicPositionList[indexC][2][0].idChange(JSON.parse(option.closestPlayer)[0]);
            if (numAnimation > 0) {
                setNumAnimation(numAnimation * -1 - 1);
            } else {
                setNumAnimation(numAnimation - 1);
            }
        }
    };

    const animateSuite = (atLeastOneChange: boolean, listJoueurModify: [string, number[]][], indexC: number) => {
        let indexCheck: number = -1;
        dynamicPositionList[indexC][1].map((joueur) => {
            const modifyIndex = listJoueurModify.findIndex(([id]) => id === joueur.id);

            if (joueur.myArray.length > 0) {
                atLeastOneChange = true;
                setcheckForEnd((prevC) => [...prevC, false]);
                goAnimation(joueur, 0, indexCheck, indexC);

                const existingIndex: number = JSON.parse(option.playerPaths).findIndex((p: PlayerPath): boolean => p.id === joueur.id + 'P');

                if (existingIndex !== -1) {
                    let buffPlayerPaths: PlayerPath[] = JSON.parse(option.playerPaths)
                    buffPlayerPaths = buffPlayerPaths.filter((p: PlayerPath) => p.id !== joueur.id + 'P')
                    dispatch(setPlayerPaths(JSON.stringify(buffPlayerPaths)))
                }
            } else if (modifyIndex != -1) {
                let listNumb: number[][] = [[-100, -100], [joueur.position[0], 1 - joueur.position[1]]];
                let addCx: number = 1;
                let addCy: number = 1;
                let [currentX, currentY]: number[] = joueur.position;
                let antiCrashIndex: number = 0;
                let absolueX: number = Math.abs(currentX - listJoueurModify[modifyIndex][1][0]);
                let absolueY: number = Math.abs(currentY - listJoueurModify[modifyIndex][1][1]);
                let uppScaleX: number = 0.02;
                let uppScaleY: number = 0.02;

                if (joueur.position[0] > listJoueurModify[modifyIndex][1][0]) {
                    addCx = -1;
                }

                if (joueur.position[1] > listJoueurModify[modifyIndex][1][1]) {
                    addCy = -1;
                }

                if (absolueX >= absolueY && absolueX > 0) {
                    uppScaleY = uppScaleY * absolueY / absolueX;

                } else if (absolueY > 0) {
                    uppScaleX = uppScaleX * absolueX / absolueY;
                }

                while ((Math.abs(currentX - listJoueurModify[modifyIndex][1][0]) > uppScaleX ||
                    Math.abs(currentY - listJoueurModify[modifyIndex][1][1]) > uppScaleY) && antiCrashIndex < 1000) {
                    antiCrashIndex++;

                    if (Math.abs(currentX - listJoueurModify[modifyIndex][1][0]) < uppScaleX) {
                        currentX = listJoueurModify[modifyIndex][1][0];
                    } else {
                        currentX = currentX + uppScaleX * addCx;
                    }


                    if (Math.abs(currentY - listJoueurModify[modifyIndex][1][1]) < uppScaleY) {
                        currentY = listJoueurModify[modifyIndex][1][1];
                    } else {
                        currentY = currentY + uppScaleY * addCy;
                    }

                    listNumb.push([currentX, 1 - currentY]);
                }

                listNumb.push([listJoueurModify[modifyIndex][1][0], 1 - listJoueurModify[modifyIndex][1][1]]);
                joueur.pathArraySetup(listNumb);

                setcheckForEnd((prevC) => [...prevC, false]);
                indexCheck = indexCheck + 1;
                goAnimation(joueur, 0, indexCheck, indexC);
            }
        });

        if (dynamicPositionList.length == indexC + 1 && atLeastOneChange) {
            const newList: Player[] = [];

            dynamicPositionList[indexC][1].map((joueur) => {
                if (joueur.myArray.length > 0) {

                    let newPlayer = Player.createPlayer([joueur.myArray[joueur.myArray.length - 1][0], 1 - joueur.myArray[joueur.myArray.length - 1][1]], joueur.id, [], joueur.svg_player, 1);

                    newList.push(newPlayer);
                } else {
                    newList.push(joueur);
                }
            });

            setDynamicPositionList((prevPos: [number, Player[], Ballon[]][]) => [
                ...prevPos,
                [indexC + 2, newList, prevPos[indexC][2]],
            ]);

            dispatch(setPlayerPaths("[]"))
            setCurrentDraw([]);
            dispatch(setPositionList(JSON.stringify(dynamicPositionList)))
        }
    };

    const goAnimation = (j: Player, index: number, indexCheck: number, indexC: number) => {
        let timingAnimation: number = 100;

        if (j.myArray.length > index) {
            if (j.myArray[index][0] != -100) {
                center = [((superSvg_Field[0][0] + superSvg_Field[0][2] + superSvg_Field[0][4] + superSvg_Field[0][5]) / 4), ((superSvg_Field[0][1] + superSvg_Field[0][3] + superSvg_Field[0][3] + superSvg_Field[0][6]) / 4)]
                let svg_Mode = proportionSVG(player, ((superSvg_Field[0][5] - superSvg_Field[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))

                svg_Mode = diffSVG(svg_Mode, getCenter(svg_Mode), xArrayPlayer, getPourcentageCenter(j.myArray[index][0], 1 - j.myArray[index][1]));
                j.svgValue(svg_Mode);

                if (dynamicPositionList[indexC][2].length > 0) {
                    if (j.id == dynamicPositionList[indexC][2][0].idJoueur) {
                        let svg_Mode = proportionSVG(ballon_svg, ((superSvg_Field[0][5] - superSvg_Field[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))

                        svg_Mode = diffSVG(svg_Mode, getCenterBallon(svg_Mode), xBallon_Array, getPourcentageCenter(j.myArray[index][0], 1 - j.myArray[index][1]));
                        dynamicPositionList[indexC][2][0].svgValue(svg_Mode);
                    }
                }
                showPlayer(false, indexC);
            }
            if (j.myArray.length == index + 1 && j.myArray[index][0] != -100) {
                j.positionChange([j.myArray[index][0], 1 - j.myArray[index][1]])
            }
            setTimeout(() => goAnimation(j, index + 1, indexCheck, indexC), timingAnimation / (j.speed + 1));
        } else if (j.myArray.length == 0) {
            //OK... il peut être vide je sais pas comment...
        } else {
            if (j.myArray[0][0] != -100) {
                j.positionChange([j.myArray[0][0], 1 - j.myArray[0][1]]);

            } else {
                j.positionChange([j.myArray[1][0], 1 - j.myArray[1][1]]);
                j.pathArraySetup([]);
            }

            setcheckForEnd((prevC) => [...prevC, true]);

            //Here i want to check if there the number of false is equal to the number of true
            //If it is filter to only have the true one.


        }
    };


    const checkEndingAnimation = () => {
        if (dynamicPositionList.length - 1 > position.positionIndex) {
            console.log("HELLO")
            if (dynamicPositionList[position.positionIndex][2].length > 0) {
                dynamicPositionList[position.positionIndex][2][0].idChange(option.inputPlayerId);
            }

            if (numAnimation > 0) {
                setNumAnimation(numAnimation + 1);
            } else {
                setNumAnimation(numAnimation * -1 + 1);
            }

            dispatch(setPositionIndex(position.positionIndex + 1));
            dispatch(selectZoomMode())
        }
    };

    const prioAnimation = (j: number[][], index: number, atLeastOneChange: boolean, listJoueurModify: [string, number[]][], indexC: number) => {
        let timingAnimation = 600;

        if (j.length > index) {
            if (j[index][0] != -100) {
                center = [((superSvg_Field[0][0] + superSvg_Field[0][2] + superSvg_Field[0][4] + superSvg_Field[0][5]) / 4), ((superSvg_Field[0][1] + superSvg_Field[0][3] + superSvg_Field[0][3] + superSvg_Field[0][6]) / 4)]
                let svg_Mode = proportionSVG(ballon_svg, ((superSvg_Field[0][5] - superSvg_Field[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))

                svg_Mode = diffSVG(svg_Mode, getCenterBallon(svg_Mode), xBallon_Array, getPourcentageCenter(j[index][0], 1 - j[index][1]));
                dynamicPositionList[position.positionIndex][2][0].svgValue(svg_Mode);

                showPlayer(false, indexC);
            }
            if (j.length == index + 1 && j[index][0] != -100) {
                dynamicPositionList[position.positionIndex][2][0].positionChange([j[index][0], 1 - j[index][1]])
            }
            setTimeout(() => prioAnimation(j, index + 1, atLeastOneChange, listJoueurModify, indexC), timingAnimation / 4);
        } else {
            if (j[0][0] != -100) {
                dynamicPositionList[position.positionIndex][2][0].positionChange([j[0][0], 1 - j[0][1]]);
            } else {
                dynamicPositionList[position.positionIndex][2][0].positionChange([j[1][0], 1 - j[1][1]]);
                setAnimationPathBallon([]);
            }
            animateSuite(atLeastOneChange, listJoueurModify, indexC);
        }
    };

    const closestPlayerToBallon = () => {
        if (dynamicPositionList[position.positionIndex][1].length > 0 && dynamicPositionList[position.positionIndex][2].length > 0) {
            let positionBallon = dynamicPositionList[position.positionIndex][2][0].position;
            let closestValue = 1000;
            let closestID: [string, number[]] = ["", positionBallon];
            let currentValue = 1000;
            dynamicPositionList[position.positionIndex][1].map((joueur) => {
                currentValue = Math.abs(joueur.position[0] - positionBallon[0]) + Math.abs(joueur.position[1] - positionBallon[1]);

                if (currentValue < closestValue) {
                    closestValue = currentValue;
                    closestID = [joueur.id, joueur.position];

                    if (closestValue < 0.05
                        && option.autoLink
                        && dynamicPositionList[position.positionIndex][2][0].idJoueur == "") {

                        linkToPlayer(false, dispatch, position, option)

                        dispatch(setClosestPlayer(JSON.stringify(closestID)))
                    }
                }
            });
            dispatch(setClosestPlayer(JSON.stringify(closestID)))
        }
    };

    const simulateRefresh = (positionI: number, debugZoom: boolean) => {

        if (!debugZoom) {
            proportionAll(proportion);
            setTranslationInc([translationIncrement[0],
                translationIncrement[1]]);
            setLock(true);
            diffMovingAll([translationIncrement[0],
                translationIncrement[1]]);
        }
        setAll();

        center = [((superSvg_Field[0][0] + superSvg_Field[0][2] + superSvg_Field[0][4] + superSvg_Field[0][5]) / 4), ((superSvg_Field[0][1] + superSvg_Field[0][3] + superSvg_Field[0][3] + superSvg_Field[0][6]) / 4)]
        let svg_Mode = proportionSVG(player, ((superSvg_Field[0][5] - superSvg_Field[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))
        dynamicPositionList[positionI][1].map((joueur: Player) => {
            svg_Mode = diffSVG(svg_Mode, getCenter(svg_Mode), xArrayPlayer, getPourcentageCenter(joueur.position[0], joueur.position[1]))
            joueur.svgValue(svg_Mode);
        });

        svg_Mode = proportionSVG(ballon_svg, ((superSvg_Field[0][5] - superSvg_Field[0][0]) / (svg_fieldUNCHANGED[5] - svg_fieldUNCHANGED[0])))
        dynamicPositionList[positionI][2].map((ball: Ballon) => {
            svg_Mode = diffSVG(svg_Mode, getCenterBallon(svg_Mode), xBallon_Array, getPourcentageCenter(ball.position[0], ball.position[1]))
            ball.svgValue(svg_Mode);
        });

        showPlayer(false, positionI);

        dispatch(setPositionList(JSON.stringify(dynamicPositionList)))
    };


    return (
        <View style={styles.container}>
            <PinchGestureHandler onGestureEvent={onPinchGestureEvent} simultaneousHandlers={[panRef, pressableRef]}>
                <PanGestureHandler ref={panRef} onGestureEvent={onGestureEvent}
                                   onHandlerStateChange={onHandlerStateChange}
                                   simultaneousHandlers={[pinchRef, pressableRef]}>
                    <TapGestureHandler ref={pressableRef} onHandlerStateChange={setupPlayerAdding}>
                        <View style={styles.Field}
                              ref={svgRef} {...(Platform.OS === 'web' ? {onWheel: handleWheel} : {})}>
                            <Svg
                                width={svgSize.width}
                                height={svgSize.height}
                                style={styles.svgContainer}
                            >
                                <Path
                                    d={`M${superField[0][0]} ${superField[0][1]}L${superField[0][2]} ${superField[0][3]}H${superField[0][4]}L${superField[0][5]} ${superField[0][6]}H${superField[0][0]}Z`}
                                    fill="#006A24"
                                />

                                <Path
                                    d={`M${superField[1][0]} ${superField[1][1]}L${superField[1][2]} ${superField[1][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[2][0]} ${superField[2][1]}L${superField[2][2]} ${superField[2][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[3][0]} ${superField[3][1]}L${superField[3][2]} ${superField[3][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[4][0]} ${superField[4][1]}H${superField[4][2]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[5][0]} ${superField[5][1]}L${superField[5][2]} ${superField[5][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[6][0]} ${superField[6][1]}L${superField[6][2]} ${superField[6][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[7][0]} ${superField[7][1]}L${superField[7][2]} ${superField[7][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[8][0]} ${superField[8][1]}L${superField[8][2]} ${superField[8][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[9][0]} ${superField[9][1]}L${superField[9][2]} ${superField[9][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[10][0]} ${superField[10][1]}L${superField[10][2]} ${superField[10][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[11][0]} ${superField[11][1]}L${superField[11][2]} ${superField[11][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[12][0]} ${superField[12][1]}L${superField[12][2]} ${superField[12][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[13][0]} ${superField[13][1]}L${superField[13][2]} ${superField[13][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[14][0]} ${superField[14][1]}L${superField[14][2]} ${superField[14][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[15][0]} ${superField[15][1]}L${superField[15][2]} ${superField[15][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[16][0]} ${superField[16][1]}L${superField[16][2]} ${superField[16][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[17][0]} ${superField[17][1]}L${superField[17][2]} ${superField[17][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[18][0]} ${superField[18][1]}L${superField[18][2]} ${superField[18][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[19][0]} ${superField[19][1]}L${superField[19][2]} ${superField[19][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[20][0]} ${superField[20][1]}L${superField[20][2]} ${superField[20][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[21][0]} ${superField[21][1]}L${superField[21][2]} ${superField[21][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[22][0]} ${superField[22][1]}L${superField[22][2]} ${superField[22][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[23][0]} ${superField[23][1]}L${superField[23][2]} ${superField[23][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[24][0]} ${superField[24][1]}L${superField[24][2]} ${superField[24][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[25][0]} ${superField[25][1]}L${superField[25][2]} ${superField[25][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[26][0]} ${superField[26][1]}L${superField[26][2]} ${superField[26][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[27][0]} ${superField[27][1]}L${superField[27][2]} ${superField[27][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[28][0]} ${superField[28][1]}L${superField[28][2]} ${superField[28][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[29][0]} ${superField[29][1]}L${superField[29][2]} ${superField[29][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[30][0]} ${superField[30][1]}L${superField[30][2]} ${superField[30][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[31][0]} ${superField[31][1]}L${superField[31][2]} ${superField[31][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[32][0]} ${superField[32][1]}L${superField[32][2]} ${superField[32][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[33][0]} ${superField[33][1]}L${superField[33][2]} ${superField[33][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[34][0]} ${superField[34][1]}L${superField[34][2]} ${superField[34][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[35][0]} ${superField[35][1]}L${superField[35][2]} ${superField[35][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[36][0]} ${superField[36][1]}L${superField[36][2]} ${superField[36][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[37][0]} ${superField[37][1]}L${superField[37][2]} ${superField[37][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[38][0]} ${superField[38][1]}L${superField[38][2]} ${superField[38][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[39][0]} ${superField[39][1]}L${superField[39][2]} ${superField[39][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[40][0]} ${superField[40][1]}L${superField[40][2]} ${superField[40][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[41][0]} ${superField[41][1]}L${superField[41][2]} ${superField[41][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[42][0]} ${superField[42][1]}L${superField[42][2]} ${superField[42][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[43][0]} ${superField[43][1]}L${superField[43][2]} ${superField[43][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[44][0]} ${superField[44][1]}L${superField[44][2]} ${superField[44][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[45][0]} ${superField[45][1]}L${superField[45][2]} ${superField[45][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[46][0]} ${superField[46][1]}L${superField[46][2]} ${superField[46][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[47][0]} ${superField[47][1]}L${superField[47][2]} ${superField[47][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[48][0]} ${superField[48][1]}L${superField[48][2]} ${superField[48][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[49][0]} ${superField[49][1]}L${superField[49][2]} ${superField[49][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[50][0]} ${superField[50][1]}L${superField[50][2]} ${superField[50][3]}`}
                                    stroke="black"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[51][0]} ${superField[51][1]}H${superField[51][2]}`}
                                    stroke="black"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[52][0]} ${superField[52][1]}L${superField[52][2]} ${superField[52][3]}`}
                                    stroke="black"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[53][0]} ${superField[53][1]}H${superField[53][2]}`}
                                    stroke="#010101"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[54][0]} ${superField[54][1]}L${superField[54][2]} ${superField[54][3]}L${superField[54][4]} ${superField[54][5]}L${superField[54][6]} ${superField[54][7]}H${superField[54][8]}Z`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                    fill="none" // Make the fill transparent
                                />
                                <Path
                                    d={`M${superField[55][0]} ${superField[55][1]}V${superField[55][2]}`}
                                    stroke="#010101"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[56][0]} ${superField[56][1]}L${superField[56][2]} ${superField[56][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}

                                />
                                <Path
                                    d={`M${superField[57][0]} ${superField[57][1]}L${superField[57][2]} ${superField[57][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[58][0]} ${superField[58][1]}L${superField[58][2]} ${superField[58][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[59][0]} ${superField[59][1]}L${superField[59][2]} ${superField[59][3]}`}
                                    stroke="white"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />
                                <Path
                                    d={`M${superField[60][0]} ${superField[60][1]}L${superField[60][2]} ${superField[60][3]}`}
                                    stroke="#010101"
                                    strokeWidth={lineSize[0]}
                                    strokeMiterlimit={lineSize[1]}
                                />

                                {JSON.parse(option.playerPaths).map((P: PlayerPath) => (
                                    <Path key={P.id} d={P.path} fill="transparent" stroke="black"
                                          strokeWidth={lineSize[0]} strokeMiterlimit={lineSize[1]}/>
                                ))}

                                {currentDraw.map((F: FreeDraw) => (
                                    <Path key={F.id} d={F.path} fill="transparent" stroke="yellow"
                                          strokeWidth={lineSize[0]} strokeMiterlimit={lineSize[1]}/>
                                ))}

                                {animationPathBallon.length > 0 && (
                                    <Path key='BallonPath'
                                          d={`M${animationPathBallon[0][0]} ${animationPathBallon[0][1]}L${animationPathBallon[animationPathBallon.length - 1][0]} ${animationPathBallon[animationPathBallon.length - 1][1]}Z`}
                                          fill="transparent" stroke="red"
                                          strokeWidth={lineSize[0]} strokeMiterlimit={lineSize[1]}/>)
                                }

                                {svgPlayers}
                                {svgBallon}
                            </Svg>
                            {listMaillot.map(({id, position, textContent, textSize}) => (
                                <Text key={id} style={{
                                    position: 'absolute',
                                    fontSize: textSize,
                                    left: position[0],
                                    top: position[1],
                                    color: 'white'
                                }}>
                                    {textContent}
                                </Text>
                            ))}
                        </View>
                    </TapGestureHandler>
                </PanGestureHandler>
            </PinchGestureHandler>

            {!isOpen && <RightDrawer setIsOpen={setIsOpen}/>}

            {isOpen && <Options animate={animate} setIsOpen={setIsOpen}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    svgContainer: {
        backgroundColor: 'transparent'
    },
    Field: {
        width: '98%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        zIndex: 0,
    },
});
