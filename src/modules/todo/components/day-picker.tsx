import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';

interface DayPickerProps {
  numberOfDays?: number; // Número de días a mostrar (opcional, por defecto será 7)
}

const DayPicker: React.FC<DayPickerProps> = ({numberOfDays = 7}) => {
  // Estado para la fecha seleccionada, por defecto el día actual
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  // Generar las fechas más cercanas al día actual
  const generateDates = () => {
    let dates = [];
    for (let i = 0; i < numberOfDays; i++) {
      dates.push(moment().add(i, 'days'));
    }
    return dates;
  };

  const dates = generateDates();

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>
      {dates.map(date => (
        <TouchableOpacity
          key={date.format('YYYY-MM-DD')}
          style={[
            styles.dateContainer,
            selectedDate === date.format('YYYY-MM-DD') &&
              styles.selectedDateContainer,
          ]}
          onPress={() => handleDateSelection(date.format('YYYY-MM-DD'))}>
          <Text
            style={[
              styles.dayText,
              selectedDate === date.format('YYYY-MM-DD') && styles.selectedText,
            ]}>
            {date.format('ddd')} {/* Abreviatura del día (ej: Sun, Mon) */}
          </Text>
          <Text
            style={[
              styles.dateText,
              selectedDate === date.format('YYYY-MM-DD') && styles.selectedText,
            ]}>
            {date.format('DD')} {/* Día del mes */}
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
    width: RFValue(60),
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
    fontSize: 14,
    color: '#999',
    fontWeight: 'bold',
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
