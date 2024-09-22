import * as React from 'react';
import { List, ListItemProps as ListProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import {Text} from '@ui-library';
import Icon from 'src/modules/core/components/icon';
import {theme} from 'src/config/theme';

type ListItemsProps = {
    title: string;
    variant: string;
    right?: React.ReactNode;
    left?: React.ReactNode;
}

const ListItems : React.FC<ListItemsProps & ListProps> = ({
    title,
    variant,
    left,
    right,
    onPress,
}) => {
    return (
        <List.Item 
            title={<Text variant={variant}>{title}</Text>}
            left={() => <List.Icon icon={() => left} />} 
            right={() => <List.Icon icon={() => right} />}
            style={styles.container}
            onPress={onPress}
        />
    );
}

export default ListItems;

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        color: theme.colors.listItemColor,
        borderColor: theme.colors.listItemBorderColor,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 49,
        padding: 20,
    }
});