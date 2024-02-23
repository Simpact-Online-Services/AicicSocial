import {Animated, StyleSheet} from 'react-native';
import {colors, sizes} from '../constants/theme';

import Favorite from '../screens/FavoriteScreen';
import Home from '../screens/HomeScreen';
import Icon from '../components/shared/Icon';
import React from 'react';
import Search from '../screens/SearchScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const tabs = [
  {
    name: 'Home',
    screen: Home,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Search',
    screen: Search,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Favorite',
    screen: Favorite,
  },
];

const Tab = createBottomTabNavigator();

const Root = () => {
  const offsetAnimation = React.useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        initialRouteName="Search"
        shifting={false}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        {tabs.map(({name, screen}, index) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={screen}
              options={{
                tabBarIcon: ({focused}) => {
                  return (
                    <Icon
                      icon={name}
                      size={40}
                      style={{
                        tintColor: focused ? colors.primary : colors.gray,
                      }}
                    />
                  );
                },
              }}
              listeners={{
                focus: () => {
                  Animated.spring(offsetAnimation, {
                    toValue: index * (sizes.width / tabs.length),
                    useNativeDriver: true,
                  }).start();
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [
              {
                translateX: offsetAnimation,
              },
            ],
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    width: 10,
    height: 2,
    left: sizes.width / tabs.length / 2 - 5,
    bottom: 30,
    backgroundColor: colors.primary,
    zIndex: 100,
  },
});

export default Root;
