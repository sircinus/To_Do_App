import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

const AddTask = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {email} = route.params;
  const [taskTitle, setTaskTitle] = useState('');
  const [taskNote, setTaskNote] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleAddTask = () => {
    if (!taskTitle) {
      ToastAndroid.show('Please fill in the task Title', ToastAndroid.SHORT);
      return;
    }

    const reqData = {
      email: email,
      taskTitle: taskTitle,
      taskNote: taskNote,
      due_date: dueDate,
    };

    console.log(reqData);

    axios
      .post(
        'https://modern-popular-coral.ngrok-free.app/users/addTask',
        // 'http://192.168.1.2:3000/users/addTask',
        reqData,
      )
      .then(res => {
        ToastAndroid.show('Added Task', ToastAndroid.SHORT);
        navigation.navigate('Home');
      })
      .catch(err => {
        ToastAndroid.show('Try Again', ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" style={styles.chevronIcon} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add Task</Text>
      </View>

      <Text style={styles.subText}>Title:</Text>
      <TextInput
        style={styles.noteContainer}
        multiline={true}
        placeholder="Insert Title"
        onChangeText={text => setTaskTitle(text)}
        setTaskTitle={setTaskTitle}
      />
      <Text style={styles.subText}>Task Note:</Text>
      <TextInput
        style={styles.noteContainer}
        multiline={true}
        placeholder="Insert Note Here"
        onChangeText={text => setTaskNote(text)}
        setTaskNote={setTaskNote}
      />
      <View style={styles.flexContainer}>
        <Text style={styles.subDateText}>Due Date:</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setOpen(true)}>
          <Icon2 name="calendar-check-o" style={styles.dateIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.datePicker}>
        <DatePicker
          modal
          open={open}
          date={dueDate}
          mode="date"
          title="Change Due Date"
          onConfirm={dueDate => {
            setOpen(false);
            setDueDate(dueDate);
            console.log(dueDate);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={() => handleAddTask(email, taskTitle, taskNote, dueDate)}>
          <Icon3 name="check" style={styles.addLogo} />
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
  headerContainer: {
    backgroundColor: '#42c983',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'UbuntuSans-Bold',
    color: '#0c1d23',
    fontSize: 20,
  },
  chevronIcon: {
    fontSize: 32,
    padding: 10,
    color: 'black',
  },
  subText: {
    fontFamily: 'UbuntuSans-SemiBold',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  subDateText: {
    fontFamily: 'UbuntuSans-SemiBold',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  dateText: {
    marginHorizontal: 20,
    marginVertical: 10,
    color: 'white',
    fontFamily: 'UbuntuSans-Regular',
    fontSize: 18,
  },
  statusText: {
    marginHorizontal: 20,
    color: 'white',
    fontFamily: 'UbuntuSans-Regular',
    fontSize: 18,
  },
  noteContainer: {
    marginHorizontal: 20,
    color: 'white',
    fontFamily: 'UbuntuSans-Regular',
    fontSize: 18,
    padding: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    textAlign: 'justify',
  },
  addButtonContainer: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    backgroundColor: '#42c983',
    borderRadius: 50,
    padding: 20,
  },
  addLogo: {
    fontSize: 40,
    color: 'white',
  },
  datePicker: {
    marginLeft: 30,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  dateButton: {
    padding: 5,
  },
  dateIcon: {
    fontSize: 20,
    color: '#42c983',
  },
});

export default AddTask;
