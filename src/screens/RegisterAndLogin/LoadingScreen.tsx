import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Affinity_Logo } from '../../theme/images';



const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer} testID="loading-container">
      <Image source={Affinity_Logo} style={styles.image} testID="loading-image"/>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex:1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    // height:"100%"
   
    // borderWidth:1,
    // borderColor:"red"
  },
  image:{
    resizeMode:"contain",
    // height: 100,
    width: 150,
  }
});
