import * as React from 'react';
import { List, ListItemProps as ListProps } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-library';
import Icon from 'src/modules/core/components/icon';
import { theme } from 'src/config/theme';
import { RFValue } from 'react-native-responsive-fontsize';

type ListItemProps = {
    title: string;
    variant?: string;
    right?: React.ReactNode;
    left?: React.ReactNode;
};

const ListItem: React.FC<ListItemProps & ListProps> = ({
    title,
    variant, 
    left,
    right,
    style,
    onPress,
}) => {
    return (
        <List.Item
            left={() => left && <View style={styles.icon}>{left}</View>} 
            title={<Text variant={variant} style={styles.text}>{title}</Text>}
            right={() => right && <View style={styles.icon}>{right}</View>}
            style={[styles.container, style]}
            onPress={onPress}
        />
    );
};

export default ListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.listItemColor, 
        borderRadius: 17,
        paddingLeft: RFValue(15),
        paddingRight: RFValue(15),
        justifyContent: 'center',
        height: 50
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlignVertical: 'center', 
        fontSize: 16, 
        lineHeight: RFValue(17)
    },
    
});