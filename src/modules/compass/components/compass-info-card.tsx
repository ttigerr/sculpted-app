import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Circle, G, Text as SvgText} from 'react-native-svg';
import {ProgressCircle} from 'react-native-svg-charts';

const CompassScore = ({
  score = 88,
  segments = [0.6, 0.8, 1],
  colors = ['#ff6600', '#ff8c42', '#ffb86c'],
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Compass</Text>

      <View style={styles.content}>
        {/* Left Side - Score */}
        <View style={styles.leftContainer}>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.percent}>%</Text>
          <Text style={styles.label}>OVERALL SCORE</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
  },
  score: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  percent: {
    color: '#ffffff',
    fontSize: 24,
  },
  label: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 4,
  },
  rightContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  labelItem: {
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  labelText: {
    color: '#ffffff',
    fontSize: 12,
  },
  progressCircle: {
    position: 'absolute',
  },
});

export default CompassScore;
