import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import GBButton from '../utils/GBButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Camera({navigation}) {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      updateUserData(data.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserData = async filePath => {
    try {
      var user = {
        Photo: filePath,
      };
      await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
      Alert.alert('Success!', 'Your data has been updated.');
      navigation.navigate('Intro');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.front}
        style={styles.preview}>
        <GBButton
          title="Capture"
          color="#A92F01"
          onPressFunction={() => captureHandle()}
        />
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
