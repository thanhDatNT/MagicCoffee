import React, {useEffect} from 'react';
import {ImageBackground, Text, StyleSheet} from 'react-native';
import CustomFont from '../utils/CustomFont';
import PushNotification from 'react-native-push-notification';

export default function Intro({navigation}) {
  useEffect(() => {
    createChannel();
    setTimeout(() => {
      navigation.replace('Main');
    }, 1500);
  }, []);

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'order',
      channelName: 'Order channel',
    });
  };

  return (
    <ImageBackground
      style={styles.body}
      source={require('../../assets/images/bg_coffee.jpg')}>
      <Text style={[CustomFont.GFont, styles.text]}>Magic coffee</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
    color: 'white',
  },
});
