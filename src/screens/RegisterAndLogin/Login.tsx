import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import CarouselContainer from '../../components/specific/RegisterAndLogin/CarouselContainer';
import colors from '../../theme/colors';
import { gql, useLazyQuery } from '@apollo/client';
import { sendOTP } from '../../services/queries';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type LoginProps = {
  loginNumber: string;
  setLoginNumber: React.Dispatch<React.SetStateAction<string>>;
}

type Props = StackScreenProps<RootStackParamList, 'Login'> & LoginProps;

const Login: React.FC<Props> = ({ loginNumber, setLoginNumber, navigation }) => {
  const [loginUser, { data, loading, error }] = useLazyQuery(sendOTP);
  const [otpMessage, setOtpMessage] = React.useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await loginUser({ variables: { phoneNumber: loginNumber, isResend: false } });
      if (response.data) {
        Alert.alert('OTP sent successfully', response.data.generateOTP.data.response);
        console.log("login object",response.data)
        setOtpMessage(response.data.generateOTP.data.response);
        setTimeout(() => {
          return navigation.navigate("Otp", { loginNumber });
        }, 2000);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong');
    }
  }

  return (
    <View>
      <CarouselContainer />
      <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
        <Text style={{ color: colors.black, fontSize: 25, fontWeight: '800', fontFamily: 'inter' }}>
          Welcome
        </Text>
        <Text style={{ color: colors.black }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem expedita quia tenetur nihil. Iure, voluptatibus, nobis odit culpa par
        </Text>

        <View style={styles.loginContainer}>
          <Text style={{ color: colors.black, fontFamily: "inter", fontWeight: "600", fontSize: 16 }}>
            Phone Number
          </Text>
          <View style={styles.inputFlex}>
            <TextInput
              placeholder='Enter your phone number'
              style={styles.loginInputs}
              keyboardType='number-pad'
              value={loginNumber}
              onChangeText={(text) => setLoginNumber(text)}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.arrowBtn} testID="arrow-btn">
              <Ionicons name='arrow-forward' size={30} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 'auto', marginTop: 0 }}>
        <Text style={{ fontSize: 14, fontFamily: 'inter', color: colors.black }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateUser')}>
          <Text style={{ color: colors.blue.cardBlue, fontSize: 15, fontWeight: '800' }}>
            {'  '} Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginInputs: {
    flex: 5,
    borderColor: colors.progressGray,
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  loginContainer: {
    marginTop: 40,
    display: "flex",
    rowGap: 5,
  },
  inputFlex: {
    borderWidth: 2,
    borderColor: colors.progressGray,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 5
  },
  arrowBtn: {
    backgroundColor: colors.blue.darkBlue,
    flex: 1,
    height: 42,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 5,
    borderTopEndRadius: 5
  }
});
