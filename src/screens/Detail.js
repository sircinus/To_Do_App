import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

const Detail = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const detail = props.route.params.item;
  const {email} = route.params;
  const [taskNote, setTaskNote] = useState(detail.taskNote);
  const [taskTitleBaru, setTaskTitleBaru] = useState(detail.taskTitle);
  const [dueDate, setDueDate] = useState(new Date(detail.due_date));
  const [open, setOpen] = useState(false);

  const handleUpdate = async () => {
    console.log(dueDate);
    const updatedTask = {
      email: email,
      taskTitle: detail.taskTitle,
      taskTitleBaru: taskTitleBaru,
      taskNote: taskNote,
      due_date: dueDate,
    };

    try {
      const res = await axios.put(
        'https://modern-popular-coral.ngrok-free.app/users/updateTask',
        // 'http://192.168.1.2:3000/users/updateTask',
        updatedTask,
      );
      ToastAndroid.show('Task Updated', ToastAndroid.SHORT);
      navigation.navigate('Home');
    } catch (err) {
      ToastAndroid.show('Please Try Again', ToastAndroid.SHORT);
    }
  };

  const handleDelete = async () => {
    const data = {
      email: email,
      taskTitle: detail.taskTitle,
    };

    try {
      const res = await axios.delete(
        'https://modern-popular-coral.ngrok-free.app/users/deleteTask',
        // 'http://192.168.1.2:3000/users/deleteTask',
        {data: data},
      );
      ToastAndroid.show('Task Deleted', ToastAndroid.SHORT);
      navigation.navigate('Home');
    } catch (err) {
      ToastAndroid.show('Please Try Again', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" style={styles.chevronIcon} />
        </TouchableOpacity>

        <TextInput
          style={styles.headerTitle}
          onChangeText={text => setTaskTitleBaru(text)}
          value={taskTitleBaru}
        />
      </View>

      <Text style={styles.subText}>Note:</Text>
      <TextInput
        style={styles.noteContainer}
        multiline={true}
        placeholder="Insert Notes Here"
        onChangeText={text => setTaskNote(text)}
        value={taskNote}
      />
      <Text style={styles.subText}>Due Date:</Text>

      <View style={styles.flexContainer}>
        <Text style={styles.dateText}>{detail.due_date}</Text>
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
      <View style={styles.updateButtonContainer}>
        <TouchableOpacity onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <Icon3 name="trash" style={styles.addLogo} />
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
    marginTop: 30,
  },
  subDateText: {
    fontFamily: 'UbuntuSans-SemiBold',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center',
  },
  dateText: {
    marginHorizontal: 20,
    marginVertical: 10,
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
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 20,
  },
  updateButtonContainer: {
    backgroundColor: '#42c983',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'black',
    fontFamily: 'UbuntuSans-Bold',
    fontSize: 20,
  },
  addLogo: {
    fontSize: 40,
    color: 'white',
  },
  datePicker: {
    marginLeft: 0,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateButton: {
    marginRight: 20,
    padding: 5,
  },
  dateIcon: {
    fontSize: 20,
    color: '#42c983',
  },
});

export default Detail;
