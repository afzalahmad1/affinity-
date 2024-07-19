import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import Login from '../screens/RegisterAndLogin/Login';
import OtpVerification from '../screens/RegisterAndLogin/OtpVerification';
import CreateAccount from '../screens/RegisterAndLogin/CreateAccount';
import LoadingScreen from '../screens/RegisterAndLogin/LoadingScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [loginNumber, setLoginNumber] = React.useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login">
              {props => (
                <Login
                  {...props}
                  loginNumber={loginNumber}
                  setLoginNumber={setLoginNumber}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="CreateUser" component={CreateAccount } />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen } />
            <Stack.Screen name="Otp">
              {props => (
                <OtpVerification
                  {...props}
                  loginNumber={loginNumber}
                />
              )}
            </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
