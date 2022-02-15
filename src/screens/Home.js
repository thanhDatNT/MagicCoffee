import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {getProducts} from '../redux/actions';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Home({navigation}) {
  const [userName, setName] = useState('');
  const {products} = useSelector(state => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData();
    dispatch(getProducts());
  }, []);

  const getUserData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setName(user.Name);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.main_container}>
      <View style={styles.top_view}>
        <Text>Hello!</Text>
        <Text style={styles.text}>{userName}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text_white}>Select your coffee</Text>
        <FlatList
          data={products}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate('Detail', {
                  name: item.name,
                  price: item.price,
                  image: item.image,
                });
              }}>
              <Image style={styles.photo} source={{uri: `${item.image}`}} />
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.price}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container:{
    flex: 1,
    flexDirection: 'column'
  },
  container: {
    backgroundColor: '#A92F01',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 12,
    flex: 1
  },
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 20,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  photo: {
    width: 80,
    resizeMode: 'contain',
    height: 80,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  text_white: {
    color: 'white',
  },
  top_view: {
    padding: 10,
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
