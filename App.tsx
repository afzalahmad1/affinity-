/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import AppNavigator from "./src/navigations/AppNavigator"



import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BASE_URl} from './src/utils/config';

import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';

import colors from './src/theme/colors';
import CreateAccount from './src/screens/RegisterAndLogin/CreateAccount';
import LoadingScreen from './src/screens/RegisterAndLogin/LoadingScreen';
import Login from './src/screens/RegisterAndLogin/Login';
import OtpVerification from './src/screens/RegisterAndLogin/OtpVerification';

const client = new ApolloClient({
  uri: BASE_URl,
  cache: new InMemoryCache(),
});

// console.log("base",BASE_URl);

function App(): React.JSX.Element {
  const [loginNumber, setLoginNumber] = React.useState<string>('');
  const Stack = createNativeStackNavigator();

  return (
    <ApolloProvider client={client}>
      
        <SafeAreaView style={styles.container}>
          <StatusBar />
          <AppNavigator />
        </SafeAreaView>
      


      {/* <CreateAccount /> */}
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default App;
