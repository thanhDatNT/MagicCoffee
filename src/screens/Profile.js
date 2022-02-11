import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Profile({navigation}) {
  const [userName, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setName(user.Name);
          setPhone(user.Phone);
          setEmail(user.Email);
          setPassword(user.Password);
          setPhoto(user.Photo);
          console.log(user);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserData = async () => {
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
        };
        await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        Alert.alert('Success!', 'Your data has been updated.');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          style={styles.photo_bg}
          source={{
            uri: 'https://img.freepik.com/free-photo/coffee-beans-top-view-white-background-space-text_176474-5028.jpg?size=626&ext=jpg',
          }}>
          <View style={styles.line}>
            <Image style={styles.photo} source={{uri: photo}} />
            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
              <FontAwesome5 name={'camera'} size={25} color={'#777'} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.body}>
        <View style={styles.line}>
          <TextInput
            value={userName}
            style={styles.input}
            keyboardType="default"
            onChangeText={value => setName(value)}
          />
          <TouchableOpacity>
            <FontAwesome5 name={'pen'} size={20} color={'#777'} />
          </TouchableOpacity>
        </View>
        <View style={styles.line}>
          <TextInput
            value={phone}
            style={styles.input}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={value => setPhone(value)}
          />
          <TouchableOpacity>
            <FontAwesome5 name={'pen'} size={20} color={'#777'} />
          </TouchableOpacity>
        </View>
        <View style={styles.line}>
          <TextInput
            value={email}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={value => setEmail(value)}
          />
          <TouchableOpacity>
            <FontAwesome5 name={'pen'} size={20} color={'#777'} />
          </TouchableOpacity>
        </View>
        <View style={styles.line}>
          <TextInput
            value={password}
            style={styles.input}
            keyboardType="numeric"
            secureTextEntry={true}
            onChangeText={value => setPassword(value)}
          />
          <TouchableOpacity>
            <FontAwesome5 name={'pen'} size={20} color={'#777'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btn_update}
          onPress={() => updateUserData()}>
          <Text style={styles.text_log_out}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.line, styles.bottom]}>
        <Text style={styles.text_log_out}>Log out</Text>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => {
            navigation.navigate('Splash');
          }}>
          <FontAwesome5 name={'sign-out-alt'} size={20} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 10,
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 15,
    right: 10,
  },
  btn_update: {
    width: 120,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#A92F01',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#A92F01',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  input: {
    width: 300,
    height: 48,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#A92F01',
    fontSize: 14,
    paddingHorizontal: 12,
    marginVertical: 10,
    marginRight: 18,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo_bg: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginEnd: 10,
  },
  name: {
    fontSize: 28,
    color: '#A92F01',
    marginStart: 20,
    textDecorationLine: 'underline',
  },
  text_log_out: {
    fontSize: 20,
    color: '#A92F01',
    fontWeight: 'bold',
    marginEnd: 8,
  },
});
