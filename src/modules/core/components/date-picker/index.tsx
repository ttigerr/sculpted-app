import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import {Button} from 'react-native-paper';
import moment from 'moment';

const CalendarPicker = ({selectedDate, onDateSelect, isVisible}) => {
  const [currentDate, setCurrentDate] = useState(
    moment(selectedDate || moment()),
  );
  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);

  useEffect(() => {
    setCurrentDate(moment(selectedDate || moment()));
  }, [selectedDate]);

  // Generate days for the current month
  const generateDays = () => {
    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    const days = [];

    // Add leading empty days for alignment
    for (let i = 0; i < startOfMonth.day(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (
      let d = startOfMonth;
      d.isBefore(endOfMonth) || d.isSame(endOfMonth);
      d.add(1, 'day')
    ) {
      days.push(d.clone());
    }

    return days;
  };

  // Change month handler
  const changeMonth = direction => {
    setCurrentDate(prevDate =>
      prevDate.clone().add(direction === 'next' ? 1 : -1, 'month'),
    );
  };

  // Change year handler
  const changeYear = year => {
    setCurrentDate(prevDate => prevDate.clone().year(year));
    setIsYearPickerVisible(false);
  };

  // Render year picker
  const renderYearPicker = () => {
    const currentYear = moment().year();
    const years = Array.from(
      {length: currentYear - 1940 + 1},
      (_, i) => 1940 + i,
    );
    return (
      <Modal visible={isYearPickerVisible} transparent>
        <View style={styles.fullScreenModal}>
          <View style={styles.yearPickerContainer}>
            <FlatList
              data={years}
              keyExtractor={item => item.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => changeYear(item)}
                  style={styles.yearItem}>
                  <Text style={styles.yearText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  };

  if (!isVisible) return null;

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.fullScreenModal}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Button onPress={() => changeMonth('prev')} icon="chevron-left" />
            <TouchableOpacity onPress={() => setIsYearPickerVisible(true)}>
              <Text style={styles.headerText}>
                {currentDate.format('MMMM YYYY')}
              </Text>
            </TouchableOpacity>
            <Button onPress={() => changeMonth('next')} icon="chevron-right" />
          </View>

          {/* Days of the Week */}
          <View style={styles.daysOfWeekContainer}>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <Text key={day} style={styles.dayOfWeek}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Days */}
          <View style={styles.calendarContainer}>
            {generateDays().map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                {day ? (
                  <Pressable
                    onPress={() => onDateSelect(day)}
                    style={({pressed}) => [
                      styles.dayButton,
                      pressed && styles.dayButtonPressed,
                    ]}>
                    <Text style={styles.dayText}>{day.date()}</Text>
                  </Pressable>
                ) : null}
              </View>
            ))}
          </View>

          {/* Year Picker */}
          {renderYearPicker()}
        </View>
      </View>
    </Modal>
  );
};

export default CalendarPicker;

const styles = StyleSheet.create({
  fullScreenModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayOfWeek: {
    color: 'red',
    fontSize: 14,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%', // 7 columns
    alignItems: 'center',
    marginVertical: 4,
  },
  dayText: {
    color: '#fff',
  },
  dayButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dayButtonPressed: {
    backgroundColor: 'red',
  },
  yearPickerContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yearItem: {
    padding: 16,
  },
  yearText: {
    color: 'red',
    fontSize: 18,
  },
});
