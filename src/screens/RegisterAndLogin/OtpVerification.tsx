import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Affinity_Logo} from '../../theme/images';
import colors from '../../theme/colors';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { verifyOtpQuery } from '../../services/queries';
import { RootStackParamList } from '../../types/navigation';
import { StackScreenProps } from '@react-navigation/stack';






type OtpProps = {
  loginNumber:string,
}

type Props = StackScreenProps<RootStackParamList, 'Otp'> & OtpProps;

const OtpVerification: React.FC<Props> = ({ loginNumber, navigation }) => {
  const inputRefs = React.useRef<TextInput[]>([]);
  const [otpTimer, setOtpTimer] = React.useState<number>(60);
  
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [otpValues, setOtpValues] = React.useState<string[]>(['', '', '', '', '', '']);
  const [verifyOtp, { data, loading, error }] = useLazyQuery(verifyOtpQuery);


  React.useEffect(() => {
    let count = otpTimer;
    const interval = setInterval(() => {
      count--;
      setOtpTimer(prevTimer => prevTimer - 1);
      if (count < 1) {
        clearInterval(interval);
        setIsDisabled(false);
      }
    }, 1000);

    // Clean up the interval on component unmount or when timer reaches 0
    return () => clearInterval(interval);
  }, []);

  async function verifyOTPfnc(){

    const otp = otpValues.join('');
    console.log("otp",otp);
    
    try {
      const response = await verifyOtp({
        variables: {
          phoneNumber: loginNumber,
          userOtp: otp,
        },
      });
      console.log("otp res",response.data);
      
      if (response.data) {
        Alert.alert('Success', 'OTP verified successfully');
        // Handle the response data as needed, e.g., navigate to another screen
      }
    } catch (err:any) {
      Alert.alert('Error', err.message || 'Something went wrong');
    }
  }

  React.useEffect(()=>{
    
    if(otpValues[0],otpValues[1],otpValues[2],otpValues[3],otpValues[4],otpValues[5]){
      console.log("check otp",otpValues);
      verifyOTPfnc()
      
    }
    
  },[otpValues])

  const handleTextChange = (text: string, index: number) => {


    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues)
    console.log("otp",otpValues);
    
    if (text.length === 1 && index < inputRefs.current.length - 1) {
      const nextRef = inputRefs.current[index + 1];
      if (nextRef) {
        nextRef.focus();
      }
    }
    if (text.length === 0 && index > 0) {
      const prevRef = inputRefs.current[index - 1];
      if (prevRef) {
        prevRef.focus();
      }
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      const prevRef = inputRefs.current[index - 1];
      if (prevRef) {
        prevRef.focus();
      }
    }
  };

  return (
    <View>
      <View style={{margin: 'auto', marginVertical: 3}}>
        <Image
          source={Affinity_Logo}
          style={{resizeMode: 'contain', width: 150}}
        />
      </View>
      <View style={{marginVertical: 30, marginHorizontal: 25}}>
        <Text
          style={{
            color: colors.black,
            fontSize: 25,
            fontWeight: '800',
            fontFamily: 'inter',
            marginBottom: 25,
          }}>
          OTP Verification
        </Text>
        <Text style={{fontSize: 15, lineHeight: 22}}>
          OTP has been send to ****{loginNumber.slice(6,loginNumber.length)}.Enter the OTP to verify your phone
          number.
        </Text>

        <View style={{marginTop: 50}}>
          <Text style={{fontSize: 16, fontWeight: '500', color: colors.black}}>
            Enter OTP
          </Text>
          <View style={styles.optInputContainer}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInputBox}
                  keyboardType="number-pad"
                  maxLength={1}

                  onChangeText={text => handleTextChange(text, index)}
                  onKeyPress={event => handleKeyPress(event, index)}
                  ref={ref => (inputRefs.current[index] = ref as TextInput)}
                />
              ))}
          </View>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
          <Text
            style={{
              color: colors.blue.darkBlue,
              textDecorationLine: 'underline',
              marginTop: 10,
              fontFamily: 'inter',
              fontSize: 15,
            }}>
            Change phone number
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginHorizontal: 'auto',
          marginTop: 15,
        }}>
        <View style={{display: 'flex', flexDirection: 'row', columnGap: 6}}>
          <Text style={{fontSize: 14, fontFamily: 'inter'}}>
            Didn't Receive Code?
          </Text>
          <TouchableOpacity
            disabled={isDisabled}
            style={isDisabled && styles.disabled}>
            <Text
              style={{
                fontSize: 15,
                textDecorationLine: 'underline',
                color: colors.blue.darkBlue,

                //   color:otpTimer>0? colors.lightGray : colors.lightBlue,
              }}>
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.timerContainer}>
        <Text>
          Resend code in{' '}
          <Text style={{color: 'green'}}>
            00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  otpInputBox: {
    borderWidth: 2,
    borderColor: colors.progressGray,
    width: 50,
    fontSize: 17,
    fontWeight: '500',
    borderRadius: 10,
    padding: 'auto',
    textAlign: 'center',
  },
  optInputContainer: {
    // borderWidth:2,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //   touchableOpacity: {
  //     opacity:1,
  //     color:colors.blue.darkBlue
  //   },
  disabled: {
    opacity: 0.5,
  },
  timerText: {
    fontSize: 16,
  },
  timerContainer: {
    marginTop: 10,
    // borderWidth:2,
    margin: 'auto',
  },
});
