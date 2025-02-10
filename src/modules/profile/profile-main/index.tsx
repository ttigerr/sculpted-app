import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  Text,
  Avartar,
  ListItem,
  AlertDialog,
  Separator,
} from 'src/modules/core/ui-library';
import {NavigationPropsType} from 'src/utils/types';
import Icon from 'src/modules/core/components/icon';
import {List} from 'react-native-paper';
import {theme} from 'src/config/theme';
import styles from './styles';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import {RFValue} from 'react-native-responsive-fontsize';
import useProfileMain from './useProfileMain';

const ProfileMain = (navigationProps: NavigationPropsType) => {
  const {userData} = useProfileMain(navigationProps);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => {
    <AlertDialog title={'Title'} visible={true} children={undefined} />;
  };

  const {onBackButtonPressed, goToEditScreen, resetPassword, journalReminder} =
    useProfileMain(navigationProps);

  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Header container included return, avartar and edit buttion */}
          <View style={styles.headerContainer}>
            <Pressable onPress={onBackButtonPressed} style={styles.flexBasis}>
              <Icon name="return" size="normal" />
            </Pressable>
            <View style={styles.profileIconWrapper}>
              <Avartar size={76} source={require('assets/img/profile.jpeg')} />
              {/* <View style={styles.icon} /> */}
            </View>
            {/* <IconButton name="edit" size="normal"/> */}
            <Pressable onPress={goToEditScreen} style={styles.flexBasis}>
              <View style={styles.editContainer}>
                <Text variant="body2">{'Edit'}</Text>
                <Icon name="edit" size="xsmall" />
              </View>
            </Pressable>
          </View>

          <View style={styles.userNameContainer}>
            {userData && <Text variant="h1">{userData.name}</Text>}
            {userData && <Text variant="body">{userData.email}</Text>}
          </View>
          {/* Detail's section */}
          <Text variant="body">{'About me'}</Text>
          <View style={styles.detailContainer}>
            <View style={styles.innerContainer1}>
              <Text variant="paragraph" style={styles.detailText}>
                {'Gender'}
              </Text>
              <Text variant="h3">{'Male'}</Text>
            </View>
            <View style={styles.innerContainer2}>
              <Text variant="paragraph" style={styles.detailText}>
                {'Birthday'}
              </Text>
              <Text variant="h3">{'02/06/2001'}</Text>
            </View>
          </View>
          {/* List items */}
          <List.Section style={styles.listContainer}>
            <ListItem
              title="Reset Password"
              variant="body"
              left={<Icon name="lockFocused" size="normal" />}
              right={<Icon name="right-arrow" size="small" />}
              onPress={resetPassword}
            />
          </List.Section>
          <List.Section style={styles.listContainer}>
            <ListItem
              title="Journal Reminder"
              variant="body"
              left={<Icon name="notification-outlined" size="normal" />}
              right={<Icon name="right-arrow" size="small" />}
              onPress={journalReminder}
            />
          </List.Section>
          <List.Section style={styles.listContainer}>
            <ListItem
              title="Help & Support"
              variant="body"
              left={<Icon name="question-mark" size="normal" />}
              right={<Icon name="right-arrow" size="small" />}
            />
            <ListItem
              title="Sign Out"
              variant="body"
              left={<Icon name="signout" size="normal" />}
              right={
                <Text variant="body1" style={styles.userText}>
                  {'#Username'}
                </Text>
              }
              style={styles.listItems}
            />
            <ListItem
              title="Delete"
              variant="delete"
              left={<Icon name="delete" size="normal" />}
              onPress={showDialog}
            />
          </List.Section>
          <Separator height={RFValue(220)} />
        </ScrollView>
      </SafeAreaView>
    </MainWrapper>
  );
};

export default ProfileMain;
