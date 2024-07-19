import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import colors from '../../theme/colors';
import CustomCheckbox from '../../components/specific/RegisterAndLogin/CustomCheckbox';
import CustomButton from '../../components/common/CustomButton';

import CarouselContainer from '../../components/specific/RegisterAndLogin/CarouselContainer';
import { NewUser } from '../../types/registerAndLogin';
import { useMutation, gql } from '@apollo/client';
import { REGISTER_USER } from '../../services/queries';
import { verifyEmail } from '../../utils/verifyEmail';
import { RootStackParamList } from '../../types/navigation';
import { StackScreenProps } from '@react-navigation/stack';


type Props = StackScreenProps<RootStackParamList, 'CreateUser'>;

const CreateAccount: React.FC<Props> = ({ navigation }) => {
  const [isSelected, setSelection] = React.useState<boolean>(false);
  const [isDisable, setDisable] = React.useState<boolean>(false);

  const [message,setMessage] = React.useState<string>("")
  const [newUser,setNewUser] = React.useState<NewUser>({
    name:"",
    phone:"",
    email:""
  })

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

  React.useEffect(()=>{
    if(newUser.name && newUser.phone && newUser.email && isSelected){
      // console.log("enable");
      setDisable(false)
    }else{
      // console.log("disable");
      setDisable(true)
    }
  },[isSelected,newUser])


  const handleInputChange = (text:string,field:string)=>{
    setNewUser({...newUser, [field]:text})
  }



  const handleCreateNewUser = async()=>{

    if(!newUser.name || !newUser.email || !newUser.phone){
      setMessage("All Fields are necessory")
      return;
    }else{
      if(newUser.phone.length < 10){
        setMessage("Phone Number Must be in 10 Digits")
        return;
      }
      if(!verifyEmail(newUser.email)){

        setMessage("Incorrect Email")
        return;
      }
    }



    try {
      const { name, email, phone } = newUser;
      const response =await registerUser({
        variables: {
          name,
          email,
          phoneNumber: phone,
          stream:1,
          courseLevel:1
        },
      });
      
      setMessage(response.data.registerUser.message)
    } catch (err) {
      console.error("Error creating new user:", err);
      setMessage("Error creating new user:")
    }
  }



  return (
    <View>
      <CarouselContainer />
      <View style={styles.createContainer}>
        <Text
          style={{
            color: colors.black,
            fontSize: 25,
            fontWeight: '800',
            fontFamily: 'inter',
          }}>
          Create an account
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Full Name</Text>
            <View>
              <TextInput
                placeholder="Enter your first & last name"
                style={styles.createInputs}
                value={newUser.name}
                onChangeText={(text)=>handleInputChange(text,"name")}
              />
            </View>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <View>
              <TextInput
                placeholder="Enter Phone Number"
                style={styles.createInputs}
                keyboardType='number-pad'
                value={newUser.phone}
                onChangeText={(text)=>handleInputChange(text,"phone")}
              />
            </View>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email Address</Text>
            <View>
              <TextInput
                placeholder="Enter Email Address"
                style={styles.createInputs}
                value={newUser.email}
                onChangeText={(text)=>handleInputChange(text,"email")}
              />
            </View>
          </View>
        </View>
        <View style={styles.checkboxContainer}>
          <CustomCheckbox
            isChecked={isSelected}
            onPress={() => setSelection(!isSelected)}
          />
          <Text style={{color: colors.black, fontSize: 12}}>
            I agree with privacy policy & terms and conditions
          </Text>
        </View>
      </View>
      {message && <Text>{message}</Text>}
      <View>
        <CustomButton
          title="Create Account"
          onPress={handleCreateNewUser}
          isDisable={isDisable}
          //   style={isDisabled && styles.disabled}
          // onPress={() => 'log'}
          style={styles.customButton}
          // textStyle={styles.customButtonText}
        />
        
      </View>
      
      <View style={{display:"flex", flexDirection:"row",   marginHorizontal: 'auto', marginTop: 18}}>
        <Text style={{fontSize: 14,  fontFamily: 'inter', color: colors.black}}>
          Already have an account?
        </Text>
        <TouchableOpacity  onPress={()=>navigation.navigate("Login")}>
            <Text style={{color: colors.blue.cardBlue,fontSize:15, fontWeight: '800'}}>
              {'  '}
              Login Now
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({

  createContainer: {
    // flex:1,
    // borderWidth: 1,
    marginHorizontal: 25,
    marginVertical: 30,
  },
  inputContainer: {
    marginVertical: 15,
    display: 'flex',
    rowGap: 15,
  },
  label: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'inter',
  },
  createInputs: {
    borderWidth: 2,
    borderColor: colors.progressGray,
    // borderColor: "#e2e8f0", 

    // borderColor:"#ddd",
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  labelContainer: {
    display: 'flex',
    rowGap: 5,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 5,
  },
  customButton: {
    marginHorizontal: 40,
    borderRadius: 30,
    backgroundColor: colors.blue.darkBlue,
    // backgroundColor: "red",

  },
});
