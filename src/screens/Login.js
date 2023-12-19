import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { URL } from 'react-native-dotenv';

export default function Login({ navigation }) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isLoading, setisLoading] = useState(false);

  function login() {
    if (email == '' || password == '') {
      Alert.alert('Please fill all the fields');

      return;
    }
    setisLoading(true);
    axios
      .post(`${URL}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.message) {
          setTimeout(() => {
            setisLoading(false);
            alert(res.data.message);
          }, 1500);
        } else {
          setTimeout(() => {
            setisLoading(false);
            navigation.replace('Dashboard', { user_id: res.data[0].user_id });
            console.log(res.data[0].user_id);
          }, 1500);
        }
      });
  }

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />
      <View style={styles.logArea}>
        <Text style={styles.boxText}>Email</Text>
        <TextInput
          style={styles.emailBox}
          placeholder='Enter your email'
          keyboardType='email-address'
          value={email}
          onChangeText={(text) => setemail(text)}
        />
        <Text style={styles.boxText}>Password</Text>
        <TextInput
          style={styles.passwordBox}
          secureTextEntry={true}
          placeholder='Enter your password'
          value={password}
          onChangeText={(text) => setpassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        {isLoading ? (
          <ActivityIndicator size='large' color='#fff' />
        ) : (
          <Text style={styles.loginBtnText} onPress={login}>
            Login
          </Text>
        )}
      </TouchableOpacity>
      <View style={styles.register}>
        <Text>Dont have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    height: '100%',
  },
  emailBox: {
    width: '95%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  passwordBox: {
    width: '95%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  boxText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  logArea: {
    marginTop: '10%',
  },
  loginBtn: {
    width: '50%',
    height: 50,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '2%',
  },
  registerText: {
    marginLeft: 5,

    fontWeight: 'bold',
    color: 'blue',
  },
});
