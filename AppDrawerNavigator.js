import * as React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import {Image} from 'react-native'; 
import SettingsScreen from '../screens/SettingsScreen';
import MyBarters from '../screens/MyBarters';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppTabNavigator,
        navigationOptions: {
        title: "HOME ACTIVITY"
    }},
    MyBarters: {
        screen: MyBarters,
        navigationOptions: {
        title: "MY BARTERS"
    }},
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
        title: "SETTINGS"
    }},
},
{
    contentComponent: CustomSideBarMenu
},
{
    initialRouteName: "Home ",
}
)