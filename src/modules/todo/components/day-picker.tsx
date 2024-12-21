import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {DayListItem} from 'src/utils/types';

interface DayPickerProps {
  numberOfDays?: number;
  onItemPressed: (item: DayListItem) => void;
  behindDays?: boolean;
  isAllButtonVisible?: boolean;
}

const DayPicker: React.FC<DayPickerProps> = ({
  numberOfDays = 7,
  onItemPressed,
  behindDays = false,
  isAllButtonVisible = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<DayListItem>({
    title: 'All',
    date: null,
  });
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (behindDays) {
      const day = moment().startOf('day');
      setSelectedDate({
        title: `${day.format('ddd')}\n${day.format('DD')}`,
        date: day,
      });
      setTimeout(
        () => scrollViewRef.current?.scrollToEnd({animated: true}),
        500,
      );
    }
  }, []);

  const generateDaysList = (num: number) => {
    const daysList: DayListItem[] = isAllButtonVisible
      ? [{title: 'All', date: null}]
      : [];

    if (behindDays) {
      for (let i = num; i >= 0; i--) {
        const day = moment().subtract(i, 'days').startOf('day');
        daysList.push({
          title: `${day.format('ddd')}\n${day.format('DD')}`,
          date: day,
        });
      }
    } else {
      for (let i = 1; i <= num; i++) {
        const day = moment().add(i, 'days').startOf('day');
        daysList.push({
          title: `${day.format('ddd')}\n${day.format('DD')}`,
          date: day,
        });
      }
    }

    return daysList;
  };

  const dates = generateDaysList(numberOfDays);

  const handleDateSelection = (date: DayListItem) => {
    setSelectedDate(date);
    onItemPressed(date);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollContainer}>
      {dates.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dateContainer,
            selectedDate.title === day.title && styles.selectedDateContainer,
          ]}
          onPress={() => handleDateSelection(day)}>
          <Text
            style={[
              styles.dayText,
              selectedDate.title === day.title && styles.selectedText,
            ]}>
            {day.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
  },
  dateContainer: {
    width: 60,
    paddingVertical: 14,
    backgroundColor: '#33333348',
    borderRadius: 16,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateContainer: {
    backgroundColor: '#fff',
  },
  dayText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#000',
  },
});

export default DayPicker;
