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

export interface DayPickerProps {
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
    dateString: null
  });
  
  const scrollViewRef = useRef<ScrollView>(null);

  // Handle date's selection
  useEffect(() => {
    // last 7 days
    if (behindDays) {
      const day = moment().startOf('day');
      // Display today's date
      setSelectedDate({
        title: `${day.format('ddd')}\n${day.format('DD')}`,
        date: day,
        dateString: day.format('YYYY-MM-DD'),
      });
      setTimeout(
        () => scrollViewRef.current?.scrollToEnd({animated: true}),
        500,
      );
    // 7 days ahead
    } else {
      const day = moment().startOf('day');
      // Display today's date
      setSelectedDate({
        title: `${day.format('ddd')}\n${day.format('DD')}`,
        date: day,
        dateString: day.format('YYYY-MM-DD'),
      });
      setTimeout(
        () => scrollViewRef.current?.scrollTo({animated: true}),
        500,
      );
    }
  }, []);

  const generateDaysList = (num: number) => {
    const daysList: DayListItem[] = isAllButtonVisible
      ? [{title: 'All', date: null, dateString: ""}]
      : [];
    // To display previous 7 days       
    if (behindDays) {
      for (let i = num; i >= 0; i--) {
        const day = moment().subtract(i, 'days').startOf('day');
        daysList.push({
          title: `${day.format('ddd')}\n${day.format('DD')}`,
          date: day,
          dateString: day.format('YYYY-MM-DD'),
        });
      }
    // To display 7 days ahead
    } else {
      for (let i = 0; i <= num; i++) {
        const day = moment().add(i, 'days').startOf('day');
        daysList.push({
          title: `${day.format('ddd')}\n${day.format('DD')}`,
          date: day,
          dateString: day.format('YYYY-MM-DD'),
        });
      }
    }
    return daysList;
  };

  const handleDateSelection = (date: DayListItem) => {
    setSelectedDate(date);
    onItemPressed(date);
  };

  const dates = generateDaysList(numberOfDays);

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
  dateContainer: {
    width: 60,
    height: 67,
    backgroundColor: '#33333348',
    borderRadius: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateContainer: {
    backgroundColor: '#fff',
  },
  dayText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '400',
    textAlign: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '700',
  },
  selectedText: {
    color: '#000',
    fontWeight: '700',
  },
});

export default DayPicker;