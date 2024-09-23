import * as React from 'react';
import { List, ListItemProps as ListProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import {Text} from '@ui-library';
import Icon from 'src/modules/core/components/icon';
import {theme} from 'src/config/theme';

type ListItemProps = {
    title: string;
    variant: string;
    right?: React.ReactNode;
    left?: React.ReactNode;
}

const ListItem : React.FC<ListItemProps & ListProps> = ({
    title,
    variant,
    left,
    right,
    style,
    onPress,
}) => {
    return (
        <List.Item 
            title={<Text variant={variant}>{title}</Text>}
            left={() => <List.Icon icon={() => left} />} 
            right={() => <List.Icon icon={() => right} />}
            style={[styles.container, style]}
            onPress={onPress}
        />
    );
}

export default ListItem;

const styles = StyleSheet.create({
    container: {
        color: theme.colors.listItemColor,
        height: 49,
        borderRadius:20,
        padding: 20,
    }
});