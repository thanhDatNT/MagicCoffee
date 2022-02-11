import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  ToastAndroid,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import GBButton from '../utils/GBButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({navigation}) {
  const [userName, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const photo =
    'https://img3.wallspic.com/previews/5/9/1/4/6/164195/164195-coffee_cup-turkish_coffee-espresso-tea-coffee-x750.jpg';

  const saveAccount = async () => {
    if (
      userName.length == 0 ||
      phone.length == 0 ||
      email.length == 0 ||
      password.length == 0
    ) {
      Alert.alert('Warning!', 'Please type your data.');
    } else {
      try {
        var user = {
          Name: userName,
          Phone: phone,
          Email: email,
          Password: password,
          Photo: photo,
        };
        await AsyncStorage.clear();
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
        ToastAndroid.showWithGravity(
          'Your account was saved successfully',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        navigation.navigate('Intro');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Create an account here</Text>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          placeholder="User name"
          onChangeText={value => setName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          onChangeText={value => setPhone(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email address"
          keyboardType="email-address"
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />
        <View>
          <Text style={styles.policy}>
            By clicking register, You agree with Magic coffee's Terms of Uses
          </Text>
        </View>
      </View>
      <GBButton
        title="Register"
        color="#A92F01"
        style={{width: '100%'}}
        onPressFunction={() => saveAccount()}
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
  policy: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
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
    marginVertical: 12,
  },
  logo: {
    width: '100%',
    height: 150,
    margin: 20,
    resizeMode: 'contain',
  },
});
