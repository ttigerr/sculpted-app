import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ProgressCircle} from 'react-native-svg-charts';
import {Separator, Text} from 'src/modules/core/ui-library';
import Icon from 'src/modules/core/components/icon';
import {theme} from 'src/config/theme';
import {SCREEN_WIDTH} from 'src/consts/constants';

const CompassScore = ({
  score = 88,
  segments = [0.4, 0.7, 0.8],
  colors = ['#FFC3C3', '#FFB080', '#EE4633'],
}) => {
  return (
    <View style={styles.container}>
      {/* Content Section */}
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text variant="body2" style={styles.title}>
            Today's compass
          </Text>
          {/* <View style={styles.scoreBox}>
            <Text style={styles.score}>{score}</Text>
            <View style={{marginLeft: RFValue(5)}}>
              <Text style={styles.percentText}>%</Text>
              <Separator height={RFValue(5)} />
              <Text style={styles.labelText}>OVERALL</Text>
              <Text style={styles.labelText}>SCORE</Text>
            </View>
          </View> */}
          <View style={styles.iconContainer}>
            <Icon name="compass" size="normal" />
          </View>
        </View>
        {/* <Separator height={60} /> */}
        <View>
          <View style={styles.chartBox}>
            {segments.map((value, index) => (
              <ProgressCircle
                key={index}
                style={[
                  styles.progressCircle,
                  {
                    height: SCREEN_WIDTH * 0.15 + 30 * index,
                    width: SCREEN_WIDTH * 0.5 + 30 * index,
                  },
                ]}
                progress={value}
                progressColor={colors[index]}
                strokeWidth={9}
                backgroundColor="#333"
              />
            ))}
          </View>
        </View>
        <Separator height={10} />
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
    backgroundColor: '#161718',
    borderRadius: RFValue(25),
    padding: RFValue(16)
  },
  title: {
    color: '#FFFFFF',
    fontSize: RFValue(14),
    fontWeight: '500',
    marginBottom: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: RFValue(28),
    height: RFValue(28),
    backgroundColor: '#F4F4F414',
    borderRadius: RFValue(8),
    alignSelf: 'flex-end',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#202122',
    paddingHorizontal: RFValue(5),
    borderRadius: RFValue(14),
    marginRight: RFValue(8),
  },
  score: {
    color: '#ffffff',
    fontSize: RFValue(72),
    fontWeight: 'bold',
  },
  labelText: {
    color: '#ffffff',
    fontSize: RFValue(9),
  },
  chartBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 70
    
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
    marginRight: 25,
  },
  dot: {
    width: RFValue(5),
    height: RFValue(5),
    borderRadius: RFValue(2.5),
    marginRight: RFValue(8),
  },
  percentText: {
    fontSize: RFValue(20),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CompassScore;
