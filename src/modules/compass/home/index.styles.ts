
import { StyleSheet } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const compassStyles = StyleSheet.create({
    compassHeader: {
        paddingTop: RFValue(82),
        paddingHorizontal: RFValue(16),
    },
    container: {
        paddingTop: RFValue(82),
        paddingHorizontal: RFValue(16),
        flex: 1,
    },
    navigationBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        left: RFValue(0),
    },
    infoCardsContainer: {
        flex: 1,
    },
    virtueText: {
        color: "#FFFFFF",
        opacity: 0.4
    }
});