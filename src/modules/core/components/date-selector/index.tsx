import { BlurView } from "@react-native-community/blur";
import React from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import DatePicker from "react-native-date-picker";

interface DateSelectorProps {
  visible: boolean;
  onDateChange?: (date: Date) => void;
  date: Date;
  onClose: () => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  visible,
  onDateChange,
  date,
  onClose,
}) => {
  const today = new Date();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.fullScreen}>
        {/* Tappable background */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlay}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="dark"
              blurAmount={2}
            />
          </View>
        </TouchableWithoutFeedback>

        {/* Foreground DatePicker */}
        <View style={styles.modalContainer}>
          <DatePicker
            date={date}
            onDateChange={onDateChange}
            theme="dark"
            mode="date"
            maximumDate={today}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    position: "absolute", // ensure it floats over the background
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: "50%",
    transform: [{ translateY: -100 }], // adjust as needed
  },
});
