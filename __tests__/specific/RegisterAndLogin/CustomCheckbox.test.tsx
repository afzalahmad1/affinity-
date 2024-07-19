import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomCheckbox from '../../../src/components/specific/RegisterAndLogin/CustomCheckbox';
import colors from '../../../src/theme/colors';

describe('CustomCheckbox', () => {
  it('renders correctly when checked', () => {
    const { getByTestId } = render(<CustomCheckbox isChecked={true} onPress={() => {}} />);
    
    // Verify that the checkbox tick is rendered
    const checkboxTick = getByTestId('checkbox-tick');
    expect(checkboxTick).toBeTruthy();
    
  });

  it('renders correctly when not checked', () => {
    const { queryByTestId } = render(<CustomCheckbox isChecked={false} onPress={() => {}} />);
    
    // Verify that the checkbox tick is not rendered
    const checkboxTick = queryByTestId('checkbox-tick');
    expect(checkboxTick).toBeNull();
  });

  it('calls onPress when clicked', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<CustomCheckbox isChecked={true} onPress={onPressMock} />);
    
    // Simulate pressing the checkbox
    const checkbox = getByTestId('checkbox');
    fireEvent.press(checkbox);
    
    // Verify that the onPress function is called
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
