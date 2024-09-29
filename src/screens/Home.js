import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';

const Home = ({route}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {email} = route.params;

  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [nama, setNama] = useState('');

  useEffect(() => {
    if (isFocused) {
      fetchTasks();
      fetchName();
    }
  }, [isFocused]);

  const handleCheckboxToggle = async (index, checked) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = checked ? 1 : 0;
    setTasks(updatedTasks);
    try {
      await axios.put(
        'https://modern-popular-coral.ngrok-free.app/users/updateTask',
        // 'http://192.168.1.2:3000/users/updateTask',
        {
          email: updatedTasks[index].email,
          taskTitle: updatedTasks[index].taskTitle,
          status: JSON.stringify(updatedTasks[index].status),
        },
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const fetchName = async () => {
    try {
      const res = await axios.get(
        `https://modern-popular-coral.ngrok-free.app/users/${email}`,
        // `http://192.168.1.2:3000/users/${email}`,
      );
      console.log(res.data.name);
      setNama(res.data.name);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async (query = '') => {
    try {
      const res = await axios.get(
        // 'http://192.168.181.109:3000/users/tasks/${email}${
        //   query ? `?title=${query}` : ''
        // }',
        `https://modern-popular-coral.ngrok-free.app/users/tasks/${email}${
          query ? `?title=${query}` : ''
        }`,
      );
      setTasks(res.data.tasks);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSearch = () => {
    fetchTasks(searchQuery);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>Welcome, {nama}</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchText}
          placeholder="Search Task Title"
          placeholderTextColor="white"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {tasks.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.taskContainer}
            onPress={() =>
              navigation.navigate('Detail', {item: item, email: email})
            }>
            <View style={styles.flexContainer}>
              <Text style={styles.taskTitle}>{item.taskTitle}</Text>
              <Checkbox
                status={item.status == 1 ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxToggle(index, item.status !== 1)}
                color="#42c983"
              />
            </View>

            <Text style={styles.taskDate}>Due date: {item.due_date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddTask', {email: email});
          }}>
          <Icon2 name="plus" style={styles.addLogo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1d23',
  },
  searchContainer: {
    backgroundColor: '#265c6f',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  searchText: {
    fontFamily: 'UbuntuSans-SemiBold',
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    flex: 1,
  },
  searchIcon: {
    fontSize: 28,
    color: 'white',
  },
  taskTitle: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 10,
    borderBottomColor: '#37474f',
    marginVertical: 10,
    fontFamily: 'UbuntuSans-Bold',
  },
  taskNote: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 10,
    borderBottomColor: '#37474f',
    marginBottom: 10,
    fontFamily: 'UbuntuSans-Regular',
  },
  taskContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  emailText: {
    fontFamily: 'UbuntuSans-SemiBold',
    color: 'white',
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  taskDate: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 10,
    borderBottomColor: '#37474f',
    marginVertical: 5,
    fontFamily: 'UbuntuSans-Italic',
  },
  addButtonContainer: {
    position: 'absolute',

    right: 20,
    bottom: 30,
    backgroundColor: '#42c983',
    borderRadius: 50,
    padding: 20,
  },
  addLogo: {
    fontSize: 40,
    color: 'white',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Home;
