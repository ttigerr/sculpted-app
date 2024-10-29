import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {CARD_BORDER_RADIUS} from 'src/consts/constants';
import Icon from 'src/modules/core/components/icon';
import {Text} from 'src/modules/core/ui-library';
import {theme} from 'src/config/theme';
import {Separator} from 'src/modules/core/ui-library';
import {IconSize} from 'src/modules/core/components/icon/types/iconTypes';

interface InfoCardProps {
  taskCount: number;
  iconName: string;
  iconSize?: IconSize;
  infoText: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  taskCount,
  iconName,
  infoText,
  iconSize = 'small',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Icon name={iconName} size={iconSize} />
        </View>
        <Text variant="paragraph" style={styles.taskCount}>
          {taskCount}
        </Text>
      </View>
      <Separator height={RFValue(16)} />
      <Text variant="caption" style={styles.infoText}>
        {infoText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dashboardCardBackground,
    borderRadius: CARD_BORDER_RADIUS,
    padding: RFValue(16),
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBackground: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#22222293',
  },
  infoText: {
    color: theme.colors.primaryTextColor,
    fontSize: RFValue(14),
    fontWeight: '600',
    maxWidth: RFValue(100),
  },
  taskCount: {
    color: theme.colors.primaryTextColor,
    fontSize: RFValue(34),
    textAlign: 'right',
    textAlignVertical: 'bottom',
    lineHeight: 36,
  },
});

export default InfoCard;
