import React from "react";
import { StyleSheet} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "src/config/theme";
import { SCREEN_WIDTH } from "src/consts/constants";

const styles = StyleSheet.create ({
    mainContainer: {
        flex: 1,
        marginTop: RFValue(15),
    },
    scrollView: {
        paddingHorizontal: RFValue(16),
    },
    headerContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    innerHeaderContainer: {
        gap: 10,
        paddingLeft: 20,
        justifyContent: 'center'
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
        gap: 10
    },
    cardContainer: {
        // width: (SCREEN_WIDTH / 2) - 10,
        // height: 232,
        justifyContent: 'center',
        alignContent: 'center',
    },
    cardTiltText: {
        fontSize: 16,
        lineHeight: RFValue(0)
    },
    compassInnerCard: {
        flex: 1,
        justifyContent: 'center',
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
        marginBottom: RFValue(20),
        alignItems: 'center',
    },
    innerCardTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    compassBorder: {
        height: 28,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: "#EE7933",
        marginRight: RFValue(5),
    },
    toDoBorder: {
        height: 28,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: "#FDDF38",
        marginRight: RFValue(5),
    },
    compassDot: {
        height: RFValue(10),
        width: RFValue(10),
        borderRadius: 21,
        backgroundColor: "#EE7933",
        marginRight: RFValue(5),
    },
    toDoDot: {
        height: RFValue(13),
        width: RFValue(13),
        borderRadius: 21,
        borderColor: '#1f2025',
        borderWidth: 1,
        backgroundColor: "#FDDF38",
        marginRight: RFValue(5),
    },
    defaultDot: {
        height: RFValue(13),
        width: RFValue(13),
        borderWidth: 1,
        borderColor: '#1f2025',
        borderRadius: 21,
        backgroundColor: "#1f2021",
        marginRight: RFValue(5),
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
    },
    journalTitleText: {
        marginBottom: 10, 
    },
    journalDescriptionText: {
        fontSize: 12, 
        fontWeight: '400'
    }
});

export default styles;