import React from "react";
import { StyleSheet} from "react-native";
import { theme } from "src/config/theme";
import { SCREEN_WIDTH } from "src/consts/constants";

const styles = StyleSheet.create ({
    mainContainer: {
        flex: 1,
        marginTop: 70,
    },
    scrollView: {
        paddingHorizontal: 15,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    innerHeaderContainer: {
        paddingLeft: 20,
    },
    avartarBorder: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 50,
    },
    toDoListContainer: {
        marginTop: 20,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginVertical: 10,
    },
    cardContainer: {
        // width: (SCREEN_WIDTH / 2) - 10,
        height: 232,
        justifyContent: 'center',
        alignContent: 'center',
    },
    cardInner: {
        flex: 1,
        justifyContent: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 28,
        height: 28,
        backgroundColor: "#1C1D1E",
        borderRadius: 8,
    },
    cardTitleContainer: {
        display: 'flex',
        flexDirection: "row",
        marginBottom: 25,
        alignItems: 'center', 
    },
    innerCardTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    compassBorder: {
        height: 28,
        width: 0,
        borderWidth: 3,
        borderRadius: 3,
        borderColor: "#EE7933",
        marginRight: 5,
    },
    toDoBorder: {
        height: 28,
        width: 0,
        borderWidth: 3,
        borderRadius: 3,
        borderColor: "#FDDF38",
        marginRight: 5,
    },
    compassDot: {
        height: 13,
        width: 13,
        borderWidth: 1,
        borderRadius: 21,
        backgroundColor: "#EE7933",
        marginRight: 5,
    },
    toDoDot: {
        height: 13,
        width: 13,
        borderWidth: 1,
        borderRadius: 21,
        backgroundColor: "#FDDF38",
        marginRight: 5,
    },
    defaultDot: {
        height: 13,
        width: 13,
        borderRadius: 21,
        backgroundColor: "#2C2D2F",
        marginRight: 5,
    },
    progressBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    journalCard: {
        height: 110,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    journalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bookmark: {
        marginLeft: 20
    },
    spiralTextDecorationContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    ovalTextDecorationContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0
    }
});

export default styles;