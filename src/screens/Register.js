import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/todoLogo.png';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleRegister = () => {
    if (!email || !nama || !password) {
      // console.log('Please fill in all fields');
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }
    axios
      .post(
        'https://modern-popular-coral.ngrok-free.app/users/register',
        // 'http://192.168.1.2:3000/users/register',
        {
          email,
          nama,
          password,
        },
      )
      .then(res => {
        // console.log(res.data.metadata);
        ToastAndroid.show('Account successfully created!', ToastAndroid.SHORT);
        navigation.navigate('Login');
      })
      .catch(err => {
        // console.log('User already exists!');
        ToastAndroid.show('User already exists!', ToastAndroid.SHORT);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subTitle}>One task closer to planning</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={styles.fieldInput}
            placeholderTextColor={'#000'}
            onChangeText={text => setEmail(text)}
            setEmail={setEmail}
          />
          <TextInput
            placeholder="Name"
            style={styles.fieldInput}
            placeholderTextColor={'#000'}
            onChangeText={text => setNama(text)}
            setNama={setNama}
          />
          <TextInput
            placeholder="Password"
            style={styles.fieldInput}
            placeholderTextColor={'#000'}
            onChangeText={text => setPassword(text)}
            setPassword={setPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleRegister(email, nama, password);
          }}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.subContainer}>
          <Text style={styles.subText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.subLink}>Log In</Text>
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
    top: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'UbuntuSans-SemiBold',
    fontSize: 32,
    textAlign: 'center',
    color: 'violet',
  },
  subTitle: {
    fontFamily: 'UbuntuSans-Medium',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
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
    color: '#42c983',
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

export default Register;
