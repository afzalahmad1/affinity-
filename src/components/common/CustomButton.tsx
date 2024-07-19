import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import colors from '../../theme/colors';

interface ButtonProps {
  title: string;
  isDisable: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  isDisable,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisable}
      style={[styles.button, style, isDisable && styles.disabled]}
      onPress={onPress}
      testID="custom-button">
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // elevation: 5,
  },
  buttonText: {
    fontFamily: 'inter',
    color: colors.white,
    fontWeight: '400',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomButton;
