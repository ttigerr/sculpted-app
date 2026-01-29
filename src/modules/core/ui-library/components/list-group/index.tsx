// ListGroup.tsx
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from 'src/config/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import ListItem from '../list-item';

export type ListItemProps = {
  title: string;
  variant?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
  children: any,
};

type ListGroupProps = {
  items: ListItemProps[];
};

export const ListGroup: React.FC<ListGroupProps> = ({ items = [] }) => {
  return (
    <View style={styles.groupContainer}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem {...item} />
          {index < items.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default ListGroup;

const styles = StyleSheet.create({
    groupContainer: {
      backgroundColor: theme.colors.listItemColor,
      borderRadius: RFValue(17),
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.listItemBorderColor,
        marginHorizontal: RFValue(16),
    },
});

