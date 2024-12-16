import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ProgressCircle } from 'react-native-svg-charts';
import { Separator, Text } from 'src/modules/core/ui-library';
import Icon from 'src/modules/core/components/icon';

const CompassScore = ({
  score = 88,
  segments = [0.4, 0.7, 0.8],
  colors = ['#FFC3C3', '#FFB080', '#EE4633'],
}) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text variant="body2">Today's Compass</Text>
        <View style={styles.iconContainer}>
          <Icon name="compass" size="normal" />
        </View>
      </View>

      {/* Spacer */}
      <Separator height={RFValue(20)} />

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Left Side - Score */}
        <View style={styles.leftContainer}>
          <Text style={styles.score}>{score}</Text>
          <View style={{marginLeft: RFValue(5)}}>
            <Text style={styles.percentText}>%</Text>
            <Separator height={RFValue(5)} />
            <Text style={styles.labelText}>
              OVERALL
            </Text>
            <Text style={styles.labelText}>
              SCORE
            </Text>
          </View>
        </View>

        {/* Right Side - Radial Chart */}
        <View style={styles.rightContainer}>
          {segments.map((value, index) => (
            <ProgressCircle
              key={index}
              style={[
                styles.progressCircle,
                { height: 60 + 30 * index, width: 60 + 30 * index },
              ]}
              progress={value} // Full circle
              progressColor={colors[index]}
              strokeWidth={10}
              backgroundColor="#333"
            />
          ))}
        </View>
      </View>

      {/* Spacer */}
      <Separator height={RFValue(20)} />

      {/* Labels at the Bottom */}
      <View style={styles.labelsContainer}>
        <View style={styles.labelItem}>
          <View style={[styles.dot, { backgroundColor: colors[0] }]} />
          <Text style={styles.labelText}>Professionalism</Text>
        </View>
        <View style={styles.labelItem}>
          <View style={[styles.dot, { backgroundColor: colors[1] }]} />
          <Text style={styles.labelText}>Dedication</Text>
        </View>
        <View style={styles.labelItem}>
          <View style={[styles.dot, { backgroundColor: colors[2] }]} />
          <Text style={styles.labelText}>Effort</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: RFValue(16),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: RFValue(28),
    height: RFValue(28),
    backgroundColor: '#1C1D1E',
    borderRadius: RFValue(8),
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#202122',
    paddingHorizontal: RFValue(5),
    borderRadius: RFValue(14),
    marginRight: RFValue(8)
  },
  score: {
    color: '#ffffff',
    fontSize: RFValue(75),
    fontWeight: 'bold',
  },
  labelText: {
    color: '#ffffff',
    fontSize: RFValue(10),
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    position: 'absolute',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: RFValue(8),
    height: RFValue(8),
    borderRadius: RFValue(4),
    marginRight: RFValue(8),
  },
  percentText: {
    fontSize: RFValue(20),
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});

export default CompassScore;

