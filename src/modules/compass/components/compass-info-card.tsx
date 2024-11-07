import React from 'react';
import {View, StyleSheet} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {ProgressCircle} from 'react-native-svg-charts';
import {Separator, Text} from 'src/modules/core/ui-library';
import Icon from 'src/modules/core/components/icon';

const CompassScore = ({
  score = 88,
  segments = [0.4, 0.7, 0.8],
  colors = ['#FFC3C3', '#FFB080', '#EE4633'],
}) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.title}>
        <View style={styles.innerContainer}>
          <Text variant="body2">Today's Compass</Text>

          <Separator height={RFValue(16)} />
          <View style={styles.content}>
            {/* Left Side - Score */}
            <View style={styles.leftContainer}>
              <Text style={styles.score}>{score}</Text>
              <View>
                <Text variant='h1'>%</Text>
                <Text variant='body3' style={styles.labelText}>OVERALL</Text>
                <Text variant='body3' style={styles.labelText}>SCORE</Text>
              </View>
            </View>
            
            {/* Right Side - Radial Chart */}
            <View style={styles.rightContainer}>
              {segments.map((value, index) => (
                <ProgressCircle
                  style={[
                    styles.progressCircle,
                    {height: 60 + 30 * index, width: 60 + 30 * index},
                  ]}
                  progress={value} // Full circle
                  progressColor={colors[index]}
                  strokeWidth={10}
                  backgroundColor={'#333'}
                />
              ))}
            </View>
          </View>
          <Separator height={RFValue(16)} />
          {/* Labels at the Bottom */}
          <View style={styles.labelsContainer}>
            <View style={styles.labelItem}>
              <View style={[styles.dot, {backgroundColor: colors[0]}]} />
              <Text style={styles.labelText}>Professionalism</Text>
            </View>
            <View style={styles.labelItem}>
              <View style={[styles.dot, {backgroundColor: colors[1]}]} />
              <Text style={styles.labelText}>Dedication</Text>
            </View>
            <View style={styles.labelItem}>
              <View style={[styles.dot, {backgroundColor: colors[2]}]} />
              <Text style={styles.labelText}>Effort</Text>
            </View>
          </View>
        </View>

        <View style={styles.iconContainer}>
          <Icon name="compass" size="normal" />
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#202122',
    paddingHorizontal: 5,
    borderRadius: 14,
    marginRight: RFValue(10),
  },
  score: {
    color: '#ffffff',
    fontSize: RFValue(72),
    fontWeight: 'bold',
  },
  percent: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: RFValue(30),
  },
  label: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 4,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10
  },
  labelText: {
    color: '#ffffff',
    fontSize: 12,
  },
  progressCircle: {
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    backgroundColor: "#1C1D1E",
    borderRadius: 8,
  },
  innerContainer: {
    flex: 1
  }
});

export default CompassScore;
