import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Affinity_Logo } from '../../../theme/images';
import colors from '../../../theme/colors';



const CarouselContainer = () => {
  return (
    <View >
      <View style={{margin: 'auto', marginVertical: 3}} testID="logo-container">
        <Image
          source={Affinity_Logo}
          style={{resizeMode: 'contain', width: 140}}
          testID="logo-image"
        />
      </View>
      <View style={styles.carosoul} testID="carousel-container">
        <Text style={{color: colors.black}} testID="carousel-text"></Text>
      </View>
    </View>
  );
};

export default CarouselContainer;

const styles = StyleSheet.create({
    carosoul: {
        marginHorizontal: 100,
        backgroundColor: colors.progressGray,
        // borderWidth:1,
        borderRadius: 10,
        height: 80,
      },
});
