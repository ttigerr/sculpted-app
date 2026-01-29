import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {CARD_BORDER_RADIUS} from 'src/consts/constants';
import Icon from 'src/modules/core/components/icon';
import {Text} from 'src/modules/core/ui-library';
import {theme} from 'src/config/theme';
import {Separator} from 'src/modules/core/ui-library';
import {IconSize} from 'src/modules/core/components/icon/types/iconTypes';
import {TouchableRipple, } from 'react-native-paper';

interface InfoCardProps {
  taskCount: number;
  iconName: string;
  iconSize?: IconSize;
  infoText: string;
  onPress?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  taskCount,
  iconName,
  infoText,
  iconSize = 'medium',
  onPress,
}) => {
  return (
    <TouchableRipple onPress={onPress} style={styles.touchable}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Icon name={iconName} size={iconSize} />
          </View>
          <View style={styles.taskCountContainer}>
            <Text variant="h1" style={styles.taskCount}>
              {taskCount >= 100 ? taskCount = 99: taskCount}
            </Text>
            <Text variant="body1"style={styles.plusText}>{taskCount >= 99 ? "+" : null}</Text>
          </View>
        </View>
        <Separator height={RFValue(16)} />
        <Text variant="h6" style={styles.infoText}>
          {infoText}
        </Text>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  touchable: {
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.dashboardCardBackground,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBackground: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 9,
    backgroundColor: '#1f2021',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoText: {
    maxWidth: RFValue(100),
  },
  taskCount: {
    color: theme.colors.primaryTextColor,
    fontSize: 40,
    textAlign: 'center',
    lineHeight: 40.5,
  },
  taskCountContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  plusText: {
    fontWeight: '700'
  }
});

export default InfoCard;
