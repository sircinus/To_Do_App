import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../assets/todoLogo.png';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      // console.log('Please fill in all fields');
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }
    axios
      .post(
        'https://modern-popular-coral.ngrok-free.app/users/login',
        // 'http://192.168.1.2:3000/users/login',
        {
          email,
          password,
        },
      )
      .then(res => {
        ToastAndroid.show('Login Success', ToastAndroid.SHORT);
        navigation.navigate('Home', {
          screen: 'HomeTab',
          params: {email: email, nama: res.data.user.nama},
        });
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('password', password);
        AsyncStorage.setItem('nama', res.data.user.nama);
        console.log(password);
        console.log(email);
        console.log(res.data.user.nama);
      })
      .catch(err => {
        ToastAndroid.show('Wrong Email Or Password', ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>To Do</Text>
        <Text style={styles.subTitle}>Productivity at your fingertips</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={styles.fieldInput}
            placeholderTextColor={'#000'}
            onChangeText={text => setEmail(text)}
            setEmail={setEmail}
          />
          <TextInput
            placeholder="Password"
            style={styles.fieldInput}
            placeholderTextColor={'#000'}
            onChangeText={text => setPassword(text)}
            setPassword={setPassword}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleLogin(email, password);
          }}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.subContainer}>
          <Text style={styles.subText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.subLink}>Register</Text>
          </TouchableOpacity>
        </View>
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
    top: 30,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'UbuntuSans-ExtraBold',
    fontSize: 50,
    textAlign: 'center',
    color: '#42c983',
  },
  subTitle: {
    fontFamily: 'UbuntuSans-Medium',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  inputContainer: {
    backgroundColor: 'rgba(241, 245, 143, 1)',
    paddingHorizontal: 10,
    marginTop: 30,
    paddingBottom: 10,
    width: 300,
  },
  fieldInput: {
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    fontFamily: 'UbuntuSans-Light',
    color: '#000',
    fontSize: 16,
  },
  subContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  subText: {
    fontFamily: 'UbuntuSans-Regular',
    color: 'white',
  },
  subLink: {
    fontFamily: 'UbuntuSans-SemiBold',
    color: 'violet',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#42c983',
    padding: 10,
    borderRadius: 10,
    margin: 40,
    width: 150,
  },
  loginText: {
    fontFamily: 'UbuntuSans-Bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
});
export default Login;
