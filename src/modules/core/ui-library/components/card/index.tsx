import React from "react";
import { StyleSheet, View } from "react-native";
import { Card as CardItem, CardProps} from "react-native-paper";
import LinearGradient from 'react-native-linear-gradient';
import {theme} from 'src/config/theme';

type CardPropItems = {
    width: number,
}
const Card : React.FC<CardProps & CardPropItems> = ({
    width,
    style,
    children,
    onPress,
}) => {

    return (
        // Outlined gradients for card's container on dashboard page
        // <LinearGradient
        //     colors={theme.gradientColors.cardBorder}
        //     start={{ x: 0, y: -1 }}
        //     end={{ x: 0, y: 1}}
        //     style={{
        //         justifyContent: 'center',
        //         flex: 1,
        //         borderRadius: 30,
        //         width: width,
        //     }}
        //     >
        //         <CardItem style={[styles.container, style]} onPress={onPress} >
        //             {children}
        //         </CardItem>
        // </LinearGradient>

        // No gradient's version
        <CardItem style={[styles.container, style]} onPress={onPress} >
            {children}
        </CardItem>
        
    )
}

export default Card;

const styles = StyleSheet.create ({
    container: {
        flex:1,
        padding: 15,
        backgroundColor: '#161718',
        borderRadius: 30,
        margin: 2,
    },
    
});