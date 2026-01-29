import React, { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ProgressCircle} from 'react-native-svg-charts';
import {Separator, Text} from 'src/modules/core/ui-library';
import Icon from 'src/modules/core/components/icon';
import {theme} from 'src/config/theme';
import {SCREEN_WIDTH} from 'src/consts/constants';
import useCompass from '../home/useCompass';
import { NavigationPropsType } from 'src/utils/types';
import moment from 'moment';

const CompassScore = ( props : NavigationPropsType & {
  // Props declaration
  segments?: number[],
  colors?: string[],
  virtue?: string[],
}) => {

  const {
    segments = [0,0,0],
    colors = [theme.colors.virtueColor1, theme.colors.virtueColor2, theme.colors.virtueColor3],
    virtue = ["", "", ""],
  } = props;

  const [showWidget, setShowWidget] = useState(false);
  const {selectedDate, handledateFilter} = useCompass(props);
  const isToday = moment(selectedDate, 'YYYY-MM-DD').isSame(moment(), 'day');
  const selectedDayName = moment(selectedDate, 'YYYY-MM-DD').format('dddd');

  useEffect(() => {
    if (segments.every(value => value === 10)) {
      setShowWidget(true);
    } else {
      setShowWidget(false);
    }
  }, [segments]);

  return (
    <View style={styles.container}>
      {/* Content Section */}
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text variant="body1" style={{fontSize: 16}}>
            {isToday ? "Today's compass" : `${selectedDayName}'s compass`}
          </Text>
          <View style={styles.iconContainer}>
            <Icon name="compass" size="normal" />
          </View>
        </View>
        {/* If compass score reaches to 30 */}
        {showWidget? (
          <View style={styles.compassWidget}>
            <Icon name='compassWidget'/>
          </View>
        ) : (
          <View>
            <View style={styles.chartBox}>
              {[0, 1, 2].map((value, index) => (
                <ProgressCircle
                  key={value.id}
                  style={[
                    styles.progressCircle,
                    {
                      // To adjust sizes dynamically
                      height: SCREEN_WIDTH * 0.13 + RFValue(25) * index + 2,
                      width: SCREEN_WIDTH * 0.13 + RFValue(25) * index,
                    },
                  ]}
                  progress={segments[index] / 10}
                  progressColor={colors[index]}
                  strokeWidth={RFValue(7.4)}
                  backgroundColor="#333"
                />
              ))}
            </View>
            <Separator height={10} />
            {/* Labels at the Bottom */}
            <View style={styles.labelsContainer}>
              {virtue.map((label, index) => (
                <View key={index} style={styles.labelItem}>
                  <View style={[styles.dot, { backgroundColor: colors[index] }]} />
                  <Text style={styles.labelText}>{label}</Text>
                </View>
              ))}
            </View>

          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#161718',
    borderRadius: RFValue(25),
    height: RFValue(200),
    padding: RFValue(16),
    justifyContent: 'space-between'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: RFValue(28),
    height: RFValue(28),
    backgroundColor: '#F4F4F414',
    borderRadius: RFValue(9),
    
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  titleContainer: {
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
    fontSize: RFValue(10),
  },
  chartBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    position: 'absolute', 
    transform: [{ translateX: 0 }, { translateY: RFValue(-58) }]
  },
  compassWidget: {
    alignItems: 'center',
    alignSelf: 'center'
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
    marginRight: RFValue(10),
  },
  percentText: {
    fontSize: RFValue(20),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CompassScore;