import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dialog , Portal, DialogProps as DialogPropTypes } from 'react-native-paper';
import {Text} from '@ui-library';

type DialogProps = {
    title: string;
}


const AlertDialog : React.FC<DialogProps & DialogPropTypes> = (
    title,
) => {
    const [visible, setVisible] = React.useState(false); 
    const hideDialog = () => setVisible(false);

  return (
    <View>
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Icon icon="alert" />
                <Dialog.Title style={styles.title}>
                    <Text variant={"h3"}>{title}</Text>
                </Dialog.Title>
                <Dialog.Content>
                <Text variant="h3">This is simple dialog</Text>
                </Dialog.Content>
            </Dialog>
        </Portal>
    </View>
  );
};

export default AlertDialog;

const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
    },
  })