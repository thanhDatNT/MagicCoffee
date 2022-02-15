import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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

export default function Order() {
  const [isFill, setFill] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [remove, setRemove] = useState(false);
  const {orders} = useSelector(state => state.productReducer);
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);

  var orderList = [];
  useEffect(() => {
    getData();
    getHistoryOrder();
  }, []);

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Orders', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            setFill(true);
            for (var i = 0; i < len; i++) {
              orderList.push(results.rows.item(i));
            }
          } else {
            setFill(false);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = name => {
    const filteredItems = orders.filter(order => order.Name !== name);
    dispatch(setOrders(filteredItems));
    try {
      db.transaction(tx => {
        tx.executeSql(
          "DELETE FROM Orders WHERE Name = '" + name + "'",
          [],
          () => {
            console.log(name + ' was deleted');
          },
          error => {
            console.log(error);
          },
        );
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const createHistoryOrders = async item => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'History ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Total INTEGER, Quantity INTEGER, Image TEXT, Date TEXT);',
      );
    });
    await db.transaction(async tx => {
      await tx.executeSql(
        "INSERT INTO History (Name, Total, Quantity, Image, Date) VALUES ('" +
          item.Name +
          "'," +
          item.Total +
          ',' +
          item.Quantity +
          ",'" +
          item.Photo +
          "'" +
          ",'" +
          item.Date +
          "')",
      );
    });
    getHistoryOrder();
  };

  const getHistoryOrder = () => {
    let historyInvoice = [];
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM History', [], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          for (var i = 0; i < len; i++) {
            historyInvoice.push(results.rows.item(i));
            console.log(results.rows.item(i));
          }
          setHistory(historyInvoice);
        }
      });
    });
  };
  return (
    <View>
      <Modal
        visible={showModal}
        transparent
        onRequestClose={() => setShowModal(false)}
        animationType="slide"
        hardwareAccelerated>
        <View style={styles.centered_view}>
          <View style={styles.delete_modal}>
            <View style={styles.modal_body}>
              <Text style={styles.text_modal}>Are you sure?</Text>
              <Text style={styles.text_modal}>This item will be removed</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.btn_cancel_button}
                onPress={() => {
                  setShowModal(false);
                }}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn_ok_button}
                onPress={() => {
                  setRemove(true);
                  setShowModal(false);
                }}>
                <Text style={styles.text}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.header_text}>
        <FontAwesome5 name={'truck'} size={18} color={'#A92F01'} />
        --- On going
      </Text>
      {!isFill ? (
        <Text style={styles.text_alert}>You haven't had any order</Text>
      ) : null}
      <View style={styles.container}>
        <FlatList
          data={orders}
          renderItem={({item}) => (
            <View style={styles.items}>
              <Image style={styles.photo} source={{uri: `${item.Photo}`}} />
              <View style={styles.content}>
                <Text style={styles.text_name}>{item.Name}</Text>
                <Text>x{item.Quantity}</Text>
                <Text style={styles.text_date}>{item.Date}</Text>
              </View>
              <View style={[styles.content, styles.content_right]}>
                <Text style={styles.text_price}>{item.Total}</Text>
                <Text style={styles.text_state}>Delivering</Text>
              </View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  setShowModal(true);
                  if (remove) {
                    deleteItem(item.Name);
                    createHistoryOrders(item);
                  }
                }}>
                <Text>Cancel </Text>
                <FontAwesome5 name={'times'} size={20} color={'#A92F01'} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Text style={styles.header_text}>
        <FontAwesome5 name={'history'} size={18} color={'#A92F01'} />
        --- History
      </Text>
      <View style={styles.container}>
        <FlatList
          data={history}
          renderItem={({item}) => (
            <View style={styles.items}>
              <Image style={styles.photo} source={{uri: `${item.Image}`}} />
              <View style={styles.content}>
                <Text style={styles.text_name}>{item.Name}</Text>
                <Text>x{item.Quantity}</Text>
                <Text style={styles.text_date}>{item.Date}</Text>
              </View>
              <View style={[styles.content, styles.content_right]}>
                <Text style={styles.text_price}>{item.Total}</Text>
                <Text style={styles.text_delete}>Canceled</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    height: 50,
  },
  btn_cancel_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A92F01',
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_ok_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A92F01',
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFBAAA',
  },
  centered_view: {
    flex: 1,
    backgroundColor: '#00000090',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: 250,
    marginHorizontal: 12,
  },
  content: {
    margin: 10,
    width: 115,
  },
  content_right: {
    position: 'absolute',
    right: 10,
    top: 0,
    textAlign: 'right',
  },
  delete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  delete_modal: {
    width: 300,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A92F01',
  },
  header_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A92F01',
    margin: 10,
  },
  items: {
    width: '95%',
    height: 120,
    borderRadius: 10,
    backgroundColor: '#FFBAAA',
    marginVertical: 8,
    flexDirection: 'row',
  },
  modal_body: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },
  text_alert: {
    textAlign: 'center',
    fontSize: 18,
    margin: 14,
  },
  text_date: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  text_delete: {
    color: 'red',
    fontSize: 14,
    textAlign: 'right',
  },
  text_name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  text_price: {
    color: '#A92F01',
    fontSize: 24,
    textAlign: 'right',
  },
  text_state: {
    color: 'green',
    fontSize: 14,
    textAlign: 'right',
  },
  text_modal: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
});
