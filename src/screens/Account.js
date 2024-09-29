import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

const Account = () => {
  const navigation = useNavigation();

  const [nama, setNama] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleUpdateName = async () => {
    const updated = {
      email: data.email,
      nama: nama,
    };
    try {
      const res = await axios.put(
        'https://modern-popular-coral.ngrok-free.app/users/updateName',
        // 'http://192.168.1.2:3000/users/updateName',
        updated,
      );
      ToastAndroid.show('Name Updated', ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show('Please Try Again', ToastAndroid.SHORT);
    }
  };

  const clearAll = async () => {
    await AsyncStorage.clear();
    ToastAndroid.show('Logged Out', ToastAndroid.SHORT);
    navigation.navigate('Login');
  };

  const resetPassword = async () => {
    const updated = {
      email: data.email,
      password: oldPass,
      passwordBaru: newPass,
    };
    console.log(oldPass);
    console.log(newPass);
    try {
      const res = await axios.put(
        'https://modern-popular-coral.ngrok-free.app/users/update',
        // 'http://192.168.1.2:3000/users/update',
        updated,
      );
      if ((res.data.status = 200)) {
        navigation.navigate('Login');
        ToastAndroid.show(
          'Password Updated! Please Log In!',
          ToastAndroid.LONG,
        );
      }
    } catch (error) {
      console.log(error.message);
      ToastAndroid.show('Please Try Again!', ToastAndroid.SHORT);
    }
  };

  const getData = async () => {
    try {
      let email = await AsyncStorage.getItem('email');
      let nama = await AsyncStorage.getItem('nama');
      let password = await AsyncStorage.getItem('password');
      if (email !== null) {
        setData({
          email: email,
          nama: nama,
          password: password,
        });
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
  });

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Text style={styles.emailTitle}>{data.email}</Text>
        <TouchableOpacity onPress={() => clearAll()}>
          <Icon name="logout" style={styles.logout} />
        </TouchableOpacity>
      </View>

      <Text style={styles.descText}>Name</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Nama"
        placeholderTextColor="gray"
        onChangeText={nama => setNama(nama)}
        defaultValue={data.nama}></TextInput>
      <TouchableOpacity
        style={styles.saveNameButton}
        onPress={() => {
          handleUpdateName(nama);
        }}>
        <Text style={styles.saveName}>Update Name</Text>
      </TouchableOpacity>
      <Text style={styles.descText}>Old Password</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Insert Old Password"
        placeholderTextColor="gray"
        // secureTextEntry={true}
        onChangeText={password => setOldPass(password)}
        value={oldPass}
      />
      <Text style={styles.descText}>New Password </Text>
      <TextInput
        style={styles.inputField}
        placeholder="Insert New Password"
        placeholderTextColor="gray"
        // secureTextEntry={true}
        onChangeText={password => setNewPass(password)}
        value={newPass}
      />
      <Text style={styles.descText}>Confirm New Password</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Confirm New Password"
        placeholderTextColor="gray"
        // secureTextEntry={true}
        onChangeText={password => setConfirmPass(password)}
        value={confirmPass}
      />
      <TouchableOpacity
        style={styles.savePasswordButton}
        onPress={async () => {
          if (oldPass == '' || newPass == '' || confirmPass == '') {
            ToastAndroid.show(
              'Please fill in all the fields',
              ToastAndroid.SHORT,
            );
          } else if (oldPass !== data.password) {
            ToastAndroid.show('Incorrect Old Password!', ToastAndroid.SHORT);
          } else if (newPass !== confirmPass) {
            ToastAndroid.show(
              'Incorrect Input For New Password',
              ToastAndroid.SHORT,
            );
          } else {
            await resetPassword({
              oldPass: oldPass,
              newPass: newPass,
            });
          }
        }}>
        <Text style={styles.saveName}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1d23',
  },
  emailTitle: {
    fontFamily: 'UbuntuSans-Bold',
    color: '#42c983',
    fontSize: 20,
    marginLeft: 10,
  },
  descText: {
    marginLeft: 10,
    color: 'white',
    marginTop: 10,
    fontFamily: 'UbuntuSans-SemiBold',
    fontSize: 18,
  },
  inputField: {
    marginHorizontal: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    fontFamily: 'UbuntuSans-Regular',
    fontSize: 16,
  },
  saveNameButton: {
    backgroundColor: '#42c983',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  savePasswordButton: {
    backgroundColor: 'red',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  saveName: {
    fontFamily: 'UbuntuSans-Bold',
    fontSize: 20,
    color: 'white',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  logout: {
    fontSize: 20,
    marginRight: 10,
    color: 'red',
  },
});
export default Account;
