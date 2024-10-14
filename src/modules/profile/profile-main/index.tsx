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
} from 'src/modules/core/ui-library';
import {NavigationPropsType} from 'src/utils/types';
import Icon from 'src/modules/core/components/icon';
import {List} from 'react-native-paper';
import {theme} from 'src/config/theme';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';

const ProfileMain = (navigationProps: NavigationPropsType) => {
  const {navigation} = navigationProps;
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => {
    <AlertDialog title={'Title'} visible={true} children={undefined} />;
  };

  const goToEditScreen = () => {
    navigation.navigate(navigationScreenNames.edit);
  };

  const onBackButtonPressed = () => navigation.goBack();

  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Header container included return, avartar and edit buttion */}
          <View style={styles.headerContainer}>
            <Pressable onPress={onBackButtonPressed}>
              <Icon name="return" size="normal" />
            </Pressable>
            <View style={styles.avartarBorder}>
              <Avartar size={76} source={require('assets/img/profile.jpeg')} />
              {/* Fake icon */}
              <View style={styles.icon} />
            </View>
            {/* <IconButton name="edit" size="normal"/> */}
            <Pressable onPress={goToEditScreen}>
              <View style={styles.editContainer}>
                <Text variant="body">{'Edit'}</Text>
                <Icon name="edit" size="small" />
              </View>
            </Pressable>
          </View>
          <View style={styles.userNameContainer}>
            <Text variant="h1">{'User Name'}</Text>
            <Text variant="body">{'Username@emailaddress.com'}</Text>
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
              left={<Icon name="lock-outlined" size="normal" />}
              right={<Icon name="right-arrow" size="small" />}
            />
          </List.Section>
          <List.Section style={styles.listContainer}>
            <ListItem
              title="Reset Password"
              variant="body"
              left={<Icon name="notification-outlined" size="normal" />}
              right={<Icon name="right-arrow" size="small" />}
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
              style={styles.listItems}
            />
            <ListItem
              title="Delete"
              variant="delete"
              left={<Icon name="delete" size="normal" />}
              onPress={showDialog}
            />
          </List.Section>
        </ScrollView>
      </SafeAreaView>
    </MainWrapper>
  );
};

export default ProfileMain;

// CSS Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  userNameContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.listItemColor,
    height: 23,
    minWidth: 50,
  },
  detailText: {
    paddingBottom: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.listItemColor,
    borderRadius: 20,
    marginVertical: 10,
  },
  innerContainer1: {
    flex: 1,
    padding: 20,
  },
  innerContainer2: {
    flex: 1,
    borderColor: theme.colors.listItemBorderColor,
    borderLeftWidth: 1,
    padding: 20,
  },
  listContainer: {
    backgroundColor: theme.colors.listItemColor,
    borderRadius: 20,
    marginVertical: 10,
  },
  listItems: {
    borderColor: theme.colors.listItemBorderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  avartarBorder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 8,
    borderColor: theme.colors.avartarBorderColor,
    borderRadius: 50,
  },
  icon: {
    borderRadius: 50,
    height: 28,
    width: 28,
    backgroundColor: theme.colors.avartarBadgeDefaultColor,
    marginLeft: -28,
    marginBottom: -10,
  },
});
