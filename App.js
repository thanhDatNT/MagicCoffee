import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Intro from './src/screens/Intro';
import Profile from './src/screens/Profile';
import Camera from './src/screens/Camera';
import Order from './src/screens/Order';
import Detail from './src/screens/Detail';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import {enableScreens} from 'react-native-screens';

enableScreens();
const topTab = createMaterialTopTabNavigator();

function AuthScreen() {
  return (
    <topTab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarPressColor: '#FFBAAA',
        tabBarActiveTintColor: '#A92F01',
        tabBarIndicatorStyle: {backgroundColor: '#A92F01'},
      }}>
      <topTab.Screen
        name="Login"
        component={Login}
        options={{tabBarLabel: 'Login'}}
      />
      <topTab.Screen
        name="Register"
        component={Register}
        options={{tabBarLabel: 'Register'}}
      />
    </topTab.Navigator>
  );
}

const bottomTab = createBottomTabNavigator();

function MainScreen() {
  return (
    <bottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
            size = focused ? 22 : 18;
          } else if (route.name === 'Profile') {
            iconName = 'user';
            size = focused ? 22 : 18;
          } else if (route.name === 'Order') {
            iconName = 'file-invoice-dollar';
            size = focused ? 22 : 18;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#A92F01',
        inactiveTintColor: '#777777',
        labelStyle: {fontSize: 15},
      }}
      elevation={4}>
      <bottomTab.Screen
        name={'Home'}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <bottomTab.Screen
        name={'Order'}
        component={Order}
        options={{
          headerTitle: 'My Order',
          headerTitleAlign: 'center',
          headerTintColor: '#A92F01',
        }}
      />
      <bottomTab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: '#A92F01',
        }}
      />
    </bottomTab.Navigator>
  );
}

const RootStack = createStackNavigator();

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Splash">
          <RootStack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Intro"
            component={Intro}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Main"
            component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Auth"
            component={AuthScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Detail"
            component={Detail}
            options={{
              headerTitle: 'Product Detail',
              headerTitleAlign: 'center',
            }}
          />
          <RootStack.Screen
            name="Camera"
            component={Camera}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
