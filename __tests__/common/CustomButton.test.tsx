import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../../src/components/common/CustomButton';
import colors from '../../src/theme/colors';

describe('CustomButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <CustomButton title="Click Me" onPress={() => {}} isDisable={false} />
    );

    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton title="Click Me" onPress={onPressMock} isDisable={false} />
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const customTextStyle = { color: 'yellow' };
    const { getByText, getByTestId } = render(
      <CustomButton
        title="Styled Button"
        onPress={() => {}}
        style={customStyle}
        textStyle={customTextStyle}
        isDisable={false}
      />
    );

    const button = getByTestId('custom-button');
    const buttonText = getByText('Styled Button');

    expect(button).toHaveStyle(customStyle);
    expect(buttonText).toHaveStyle(customTextStyle);
  });

  it('disables the button when isDisable is true', () => {
    const { getByText, getByTestId } = render(
      <CustomButton title="Disabled Button" onPress={() => {}} isDisable={true} />
    );

    const button = getByTestId('custom-button');

    expect(button.props.accessibilityState.disabled).toBe(true);
    expect(button).toHaveStyle({ opacity: 0.5 });
  });

  it('enables the button when isDisable is false', () => {
    const { getByText, getByTestId } = render(
      <CustomButton title="Enabled Button" onPress={() => {}} isDisable={false} />
    );

    const button = getByTestId('custom-button');

    expect(button.props.accessibilityState.disabled).toBe(false);
    expect(button).not.toHaveStyle({ opacity: 0.5 });
  });
});
