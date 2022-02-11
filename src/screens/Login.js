import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import GBButton from '../utils/GBButton';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    createChannel();
    getUserData();
  }, []);

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'login',
      channelName: 'Login channel',
    });
  };

  const HandleNotification = () => {
    PushNotification.localNotification({
      channelId: 'login',
      title: 'Welcome back!',
      message: 'Login successfully! Enjoy your day',
      color: 'green',
    });
    PushNotification.localNotificationSchedule({
      channelId: 'login',
      title: 'You got a big deal!',
      message: 'Order now to receive a discount upto 10%',
      date: new Date(Date.now() + 10 * 1000),
      allowWhileIdle: true,
    });
  };

  const getUserData = () => {
    AsyncStorage.getItem('UserData')
      .then(users => {
        setUser(JSON.parse(users));
      })
      .catch(err => console.log(err));
  };
  const checkCredential = () => {
    console.log(user);
    if (name === user.Name && password === user.Password) {
      HandleNotification();
      navigation.navigate('Intro');
    } else {
      console.log(name);
      console.log(password);
      Alert.alert('Login failed', 'Please check your credential again!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome back</Text>
      <View style={styles.body}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo-main.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="User name"
          onChangeText={value => setName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />
        <Text style={styles.forgot}>Forgot Password?</Text>
      </View>
      <GBButton
        title="Login"
        color="#A92F01"
        style={{width: '100%'}}
        onPressFunction={() => checkCredential()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
  },
  body: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItem: 'center',
    marginVertical: 32,
  },
  forgot: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#A92F01',
    fontSize: 14,
    paddingHorizontal: 12,
    marginVertical: 16,
  },
  logo: {
    width: '100%',
    height: 150,
    margin: 20,
    resizeMode: 'contain',
  },
});
