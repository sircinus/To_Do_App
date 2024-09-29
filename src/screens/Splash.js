import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import Logo from '../../assets/todoLogo.png';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Login');
  }, 3000);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1d23',
  },
  titleContainer: {
    alignSelf: 'center',
    top: 200,
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});

export default Splash;
