import React from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import GBButton from '../utils/GBButton';

export default function Splash({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo-main.png')}
        />
        <Text style={[styles.logoText]}>Magic Coffee</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.headerText}>Feel yourself like</Text>
        <Text style={styles.headerText}>a barista!</Text>
        <Text style={styles.text}>Magic coffee on order</Text>
        <View style={styles.indicators}>
          <View style={[styles.indicator, styles.indicator_active]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
      </View>
      <GBButton
        title="Get Started"
        color="#A92F01"
        style={{width: 150}}
        onPressFunction={() => navigation.navigate('Auth')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 320,
    alignItems: 'center',
    backgroundColor: '#FFBAAA',
    justifyContent: 'center',
  },
  body: {
    marginVertical: 25,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator_active: {
    backgroundColor: '#A92F01',
    width: 14,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFBAAA',
    margin: 4,
  },
  indicators: {
    flexDirection: 'row',
    marginTop: 12,
  },
  logo: {
    width: 180,
    height: 180,
    margin: 20,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Pacifico',
  },
  headerText: {
    fontSize: 30,
    color: '#A92F01',
  },
  text: {
    fontSize: 16,
    marginTop: 14,
  },
});
