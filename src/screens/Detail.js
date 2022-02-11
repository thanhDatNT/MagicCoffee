import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GBButton from '../utils/GBButton';
import SQLite from 'react-native-sqlite-storage';
import PushNotification from 'react-native-push-notification';
import {useSelector, useDispatch} from 'react-redux';
import {setOrders} from '../redux/actions';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const Line = () => <View style={styles.separator} />;

export default function Detail({route, navigation}) {
  const {orders} = useSelector(state => state.productReducer);
  const dispatch = useDispatch();
  const {name, price, image} = route.params;
  const [quantity, setQuantity] = useState(1);

  var subTotal = price * quantity;
  var total = subTotal + 20000;
  const date = new Date();
  const time =
    date.getHours() +
    ':' +
    date.getMinutes() +
    ' ' +
    date.getDay() +
    '/' +
    date.getMonth() +
    '/' +
    date.getFullYear();

  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Orders ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Total INTEGER, Quantity INTEGER, Image TEXT, Date TEXT);',
      );
    });
  };

  const setData = async () => {
    try {
      var Order = {
        Name: name,
        Total: total,
        Quantity: quantity,
        Photo: image,
        Date: time,
      };
      let newOrder = [...orders, Order];
      dispatch(setOrders(newOrder));
      await db.transaction(async tx => {
        await tx.executeSql(
          "INSERT INTO Orders (Name, Total, Quantity, Image, Date) VALUES ('" +
            name +
            "'," +
            total +
            ',' +
            quantity +
            ",'" +
            image +
            "'" +
            ",'" +
            time +
            "')",
        );
      });

      HandleNotification();
      navigation.navigate('Intro');
    } catch (error) {
      console.log(error);
    }
  };

  const HandleNotification = () => {
    PushNotification.localNotification({
      channelId: 'order',
      title: 'Order successfully',
      message: 'We are preparing to send your beverages',
      color: 'yellow',
      bigText: name + ' is coming, just take a while.',
      bigPictureUrl: image,
    });
  };

  return (
    <View style={styles.body}>
      <View style={styles.body}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.image_view}>
              <Image style={styles.photo} source={{uri: image}} />
            </View>
            <View style={styles.line}>
              <Text style={styles.text_name}>
                {name} | {price}
              </Text>
              <View style={styles.line_inner}>
                <TouchableOpacity
                  style={styles.btn_quantity}
                  onPress={() => {
                    setQuantity(count => (count = count <= 1 ? 1 : count - 1));
                  }}>
                  <Text style={styles.text_content}>-</Text>
                </TouchableOpacity>
                <Text style={styles.input}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.btn_quantity}
                  onPress={() => {
                    setQuantity(count => count + 1);
                  }}>
                  <Text style={styles.text_content}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Line />
            <View style={styles.line}>
              <Text style={styles.text}>Onsite/Take away</Text>
              <View style={styles.line_inner}>
                <TouchableOpacity style={styles.item}>
                  <FontAwesome5 name={'coffee'} size={32} color={'#A92F01'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <FontAwesome5
                    name={'shopping-bag'}
                    size={32}
                    color={'#FFBAAA'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Line />
            <View style={styles.line}>
              <Text style={styles.text}>Hot/Cold</Text>
              <View style={styles.line_inner}>
                <TouchableOpacity style={styles.item}>
                  <FontAwesome5 name={'mug-hot'} size={32} color={'#FFBAAA'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                  <FontAwesome5
                    name={'snowflake'}
                    size={32}
                    color={'#A92F01'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Line />
            <View style={styles.line}>
              <Text style={styles.text}>Subtotal:</Text>
              <Text style={styles.text_price}>{subTotal}</Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.text}>Discount:</Text>
              <Text style={styles.text_price}>0</Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.text}>Delivery fee:</Text>
              <Text style={styles.text_price}>20000</Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.text}>Total amount:</Text>
              <Text style={styles.text_price}>{total}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <Line />
      <View style={styles.float}>
        <GBButton
          title="Buy now"
          color="#A92F01"
          style={{width: '100%'}}
          onPressFunction={setData}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  btn_quantity: {
    width: 32,
    backgroundColor: '#fff',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 4,
  },
  container: {
    padding: 10,
  },
  float: {
    height: 50,
    elevation: 4,
    margin: 10,
  },
  image_view: {
    width: '100%',
    backgroundColor: '#FFBAAA',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
  },
  input: {
    width: 42,
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
  },
  item: {
    marginHorizontal: 4,
  },
  line: {
    width: '100%',
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line_inner: {
    flexDirection: 'row',
  },
  photo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  text_name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  text_content: {
    fontSize: 16,
    textAlign: 'center',
  },
  text_price: {
    fontSize: 24,
    color: '#A92F01',
    fontWeight: 'bold',
  },
});
