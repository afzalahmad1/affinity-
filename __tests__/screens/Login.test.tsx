import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { sendOTP } from '../../src/services/queries';
import Login from '../../src/screens/RegisterAndLogin/Login';
import { RootStackParamList } from '../../src/types/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';

import { Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Define the mock navigation prop type
type MockNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Create the mock navigation object


const mockNavigation: Partial<MockNavigationProp> = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    canGoBack: jest.fn().mockReturnValue(true),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
    getState: jest.fn(),
    isFocused: jest.fn().mockReturnValue(true),
    dispatch: jest.fn(),
    getId: jest.fn(),
};

const mockRoute: RouteProp<RootStackParamList, 'Login'> = {
    key: 'test',
    name: 'Login',
    params: undefined,
};

type TestProps = StackScreenProps<RootStackParamList, 'Login'> & {
  loginNumber: string;
  setLoginNumber: React.Dispatch<React.SetStateAction<string>>;
};

const mocks = [
  {
    request: {
      query: sendOTP,
      variables: { phoneNumber: '1234567890', isResend: false },
    },
    result: {
      data: {
        generateOTP: {
          data: {
            response: 'OTP sent successfully',
          },
        },
      },
    },
  },
];



  

  const renderLogin = (props: Partial<TestProps> = {}) => {
    const defaultProps: TestProps = {
        loginNumber: '',
        setLoginNumber: jest.fn(),
        navigation: mockNavigation,
        route: {
          key: 'test',
          name: 'Login',
          params: undefined,
        },
        ...props,
      };

  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Login {...defaultProps} />
    </MockedProvider>
  );
};

describe('Login', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = renderLogin();

    // Check if Welcome text is rendered
    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('Don\'t have an account?')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
    
    // Check if phone number input and arrow button are rendered
    expect(getByPlaceholderText('Enter your phone number')).toBeTruthy();
  });





  
});
