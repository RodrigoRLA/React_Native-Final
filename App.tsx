/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Favoritos from './pages/Favoritos';
import Home from './pages/Home';
import HomeEditora from './pages/HomeEditora';
import HomeEditoras from './pages/HomeEditoras';
import HomeLivro from './pages/Livro';
import Login from './pages/Login';

import { DataProvider } from './context/DataContext';

const TabBottomNavigation = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <TabBottomNavigation.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle:{backgroundColor: '#f4511e'},
        tabBarLabelStyle:{fontSize: 16},
        tabBarActiveTintColor:'#000',
        tabInactiveTintColor: '#fff',
        tabBarLabelStyle:{fontSize:16},
      }}
    >
      <TabBottomNavigation.Screen name="HomeTabScreen" component={Home}
        options={{
          title:'Home',
          tabBarIcon: () => (<Ionicons name="home" color="#fff" size={24} />),
        }}
      />
      <TabBottomNavigation.Screen name="Favoritos" component={Favoritos}
        options={{
          title:'Favoritos',
          tabBarIcon: () => (<Ionicons name="heart" color="#fff" size={24} />),
        }}
      />
      <TabBottomNavigation.Screen name="HomeEditorasTabScreen" component={HomeEditoras}
        options={{
          title:'Home Editoras',
          tabBarIcon: () => (<Ionicons name="library" color="#fff" size={24} />),
        }}
      />
    </TabBottomNavigation.Navigator>
  );
};

const Stack = createNativeStackNavigator();
export default () => {

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}name="BottomNavigatorScreen" component={BottomNavigator} />
          <Stack.Screen options={{
            headerShown:false,
          }} name="Login" component={Login} />
          <Stack.Screen options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="HomeEditora" component={HomeEditora}/>
          <Stack.Screen options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="HomeLivro" component={HomeLivro}/>
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};



