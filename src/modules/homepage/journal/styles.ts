import { StyleSheet} from "react-native";
import { theme } from "src/config/theme";

const styles = StyleSheet.create ({
    mainContainer: {
        flex: 1,
        marginTop: 70,
    },
    scrollView: {
        paddingHorizontal: 15,
    },
    headerContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        position: 'relative'
    },
    dividerContainer: {
        flexDirection:'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    divider: {
        borderColor: '#3b3c3d', 
        borderWidth: 0.7, 
        flex: 1, 
        height: 1
    },
    divider1: {
        borderColor: '#3b3c3d', 
        borderWidth: 0.7, 
        height: 0.5,
        marginVertical: 30,
    },
    text: {
        color: "#9BA0A5",
        marginRight: 10,
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
    noteContainer: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#808181',
        width: 80,
        height: 23,
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
});

export default styles;