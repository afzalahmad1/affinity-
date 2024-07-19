import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

interface CustomCheckboxProps {
  isChecked: boolean;
  onPress: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ isChecked, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.checkbox} testID="checkbox">
    {isChecked && <View style={styles.checkboxTick} testID="checkbox-tick"/>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:4,
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: colors.blackShade.iconColor,
    
  },
});

export default CustomCheckbox;
