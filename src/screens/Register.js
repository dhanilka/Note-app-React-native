import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import { URL } from 'react-native-dotenv';

export default function Register({ navigation }) {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isLoading, setisLoading] = useState(false);

  function register() {
    if (name == '' || email == '' || password == '') {
      alert('Please fill all the fields');
      return;
    }
    setisLoading(true);
    axios
      .post(`${URL}/register`, {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        setTimeout(() => {
          setisLoading(false);
          alert(res.data.message);
          navigation.replace('Login');
        }, 1500);
      });
  }
  return (
    <View style={styles.main}>
      <View style={styles.logArea}>
        <Text style={styles.boxText}>Name</Text>
        <TextInput
          style={styles.emailBox}
          placeholder='Enter your name'
          value={name}
          onChangeText={(text) => setname(text)}
        />

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
          placeholder='Enter your password'
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setpassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={register}>
        {isLoading ? (
          <ActivityIndicator size='large' color='#fff' />
        ) : (
          <Text style={styles.loginBtnText}>Register</Text>
        )}
      </TouchableOpacity>

      <View style={styles.register}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>Login</Text>
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
    width: '95%',
    height: 50,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    margin: 10,
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
