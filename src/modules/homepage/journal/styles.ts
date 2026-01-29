import { StyleSheet} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "src/config/theme";

const styles = StyleSheet.create ({
    mainContainer: {
        flex: 1,
        marginTop: RFValue(20),
    },
    scrollView: {
        paddingHorizontal: RFValue(16),
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: RFValue(15)
    },
    contentcontainer: {
        flexDirection:'row',
        alignItems: 'center',
    },
    divider: {
        borderColor: '#3b3c3d', 
        borderWidth: 0.7, 
        flex: 1, 
        height: 1
    },
    floatingButton: {
        position: 'relative',
        height: 50,
        width: 50,
    },
    divider1: {
        borderColor: '#3b3c3d', 
        borderWidth: 0.7, 
        height: 0.5,
    },
    backButton: {
        left: 0, 
        position: 'absolute',
    },
    text: {
        color: "#9BA0A5",
        marginRight: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    text1: {
        marginRight: 10,
    },
    sliderContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    defaultContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    scheduledContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 30
    },
    addButton: {
        backgroundColor: '#5A5B5C',
        width: RFValue(25),
        height: RFValue(25),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appBar: {
        backgroundColor: theme.colors.background,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: RFValue(16),
        paddingBottom: RFValue(10)
    },
    titleStyle: {
        color: '#FFFFFF',
        fontSize: RFValue(12),
    },
    buttonContainer: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#FFFFFF14',
        alignItems: 'center',
      },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    
});

export default styles;