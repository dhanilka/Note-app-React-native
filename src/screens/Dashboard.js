import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import { URL } from 'react-native-dotenv';
import { BlurView } from 'expo-blur';
export default function Dashboard({ route, navigation }) {
  const user_id = route.params?.user_id;
  const [userName, setuserName] = useState('Error');
  const [isModalVisible, setModalVisible] = useState(false);
  const [noteTitle, setnoteTitle] = useState('');
  const [note, setnote] = useState('');
  const [notes, setnotes] = useState([]);

  function getUserData() {
    axios
      .post(`${URL}/getUserData`, {
        user_id: user_id,
      })
      .then((res) => {
        setuserName(res.data[0].user_name);
      });
  }
  function getNotes() {
    axios
      .post(`${URL}/getNotes`, {
        user_id: user_id,
      })
      .then((res) => {
        setnotes(res.data);
      });
  }
  useEffect(() => {
    getNotes();
  }, [isModalVisible]);
  function saveNote() {
    if (noteTitle == '' || note == '') {
      Alert.alert('Please fill all the fields');
      return;
    }
    axios
      .post(`${URL}/save-note`, {
        user_id: user_id,
        note_title: noteTitle,
        note: note,
      })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          setModalVisible(false);
        }
      });
  }
  getUserData();

  function logOutConfirmation() {
    Alert.alert('Log out', 'Are sure you want log out ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          navigation.replace('Login');
        },
      },
    ]);
  }

  function cancelModal() {
    if (noteTitle == '' && note == '') {
      setModalVisible(false);
    } else {
      Alert.alert('Cancel', 'Are you sure you want to cancel?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            setnoteTitle('');
            setnote('');
            setModalVisible(false);
          },
        },
      ]);
    }
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor='#fff' barStyle={'dark-content'} />
      <View style={styles.userArea}>
        <Text style={styles.userName}>{userName}</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={logOutConfirmation}>
          <MIcon name='logout' size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.addNoteBtn} onPress={toggleModal}>
          <Text style={styles.addNoteText}>
            Add Note <FIcon name='plus' />
          </Text>
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={true}
          visible={isModalVisible}
        >
          <BlurView style={styles.modalContainer} intensity={40} tint='light'>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Add new note </Text>
              <TouchableOpacity style={styles.closeBtn} onPress={cancelModal}>
                <MIcon name='close' color='#fff' size={40} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.newNoteTitle}>Title</Text>
              <TextInput
                style={styles.newNoteTitleBox}
                placeholder='Enter note title'
                value={noteTitle}
                onChangeText={(text) => setnoteTitle(text)}
              ></TextInput>

              <Text style={styles.newNoteTitle}>Note</Text>
              <TextInput
                style={styles.newNoteBox}
                placeholder='Enter note'
                multiline={true}
                numberOfLines={10}
                value={note}
                onChangeText={(text) => setnote(text)}
              ></TextInput>

              <TouchableOpacity style={styles.saveNoteBtn} onPress={saveNote}>
                <Text style={styles.saveNoteText}>
                  Save <MIcon name='save' size={12} />
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </View>
      <View>
        <Text style={styles.yourNote}>
          Your Notes <FIcon name='sticky-note' />
        </Text>
        <View style={styles.line}></View>
      </View>
      <ScrollView>
        <View style={styles.cardArea}>
          {notes.map((item, index) => {
            return (
              <View style={styles.card} key={index}>
                <View style={styles.noteTitle}>
                  <Text>{item.note_title}</Text>
                </View>
                <View style={styles.noteDate}>
                  <Text>{item.noted_date}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    height: '100%',
  },
  userName: {
    fontSize: 20,

    marginTop: '5%',
    marginLeft: '2%',
  },
  userArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoutBtn: {
    marginTop: '4%',
    marginRight: '2%',
  },
  addNoteBtn: {
    backgroundColor: 'green',
    width: '30%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2%',
    marginTop: '3%',
  },
  addNoteText: {
    color: '#fff',
  },
  yourNote: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: '4%',
    marginLeft: '2%',
  },
  line: {
    backgroundColor: '#000',
    height: 1,
    width: '96%',
    alignSelf: 'center',
  },
  cardArea: {
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(235, 242, 141, 0.3)',
    width: '96%',
    height: 60,
    borderWidth: 1,
    borderColor: '#9e9e9d',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: '3%',
  },
  noteDate: {
    marginTop: '3%',
    marginRight: '3%',
    alignSelf: 'flex-end',
  },
  noteTitle: {
    marginTop: 3,
    marginLeft: '3%',
    maxWidth: '80%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalHeader: {
    marginTop: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalHeaderText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
    marginLeft: '5%',
  },
  closeBtn: {
    marginRight: 8,
  },
  newNoteTitle: {
    color: '#fff',
    fontSize: 15,
    marginLeft: '5%',
    marginTop: 10,
  },
  newNoteTitleBox: {
    backgroundColor: '#fff',
    width: '90%',
    height: 40,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 10,
  },
  newNoteBox: {
    backgroundColor: '#fff',
    width: '90%',
    height: 250,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 10,
  },
  saveNoteBtn: {
    backgroundColor: 'green',
    width: '30%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  saveNoteText: {
    color: '#fff',
    fontSize: 15,
  },
});
