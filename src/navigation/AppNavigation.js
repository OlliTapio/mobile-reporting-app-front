import React from 'react';
import { Text, View, AppRegistry } from 'react-native';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';

import MockFormScreen from '../screens/MockFormScreen';
import TemplateScreen from '../screens/TemplateScreen';
import NewFormScreen from '../screens/NewFormScreen';

import Sidebar from '../navigation/Sidebar';

//The stack that is contained within the drawer stack
const TemplateStack = StackNavigator({
    Templates: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Forms',
            headerTitleStyle: { color: '#fff' },
            headerStyle: { backgroundColor: '#3d4f7c', borderBottomWidth: 1, borderBottomColor: '#fff' },
            headerLeft:
                <Text
                    style={{ fontSize: 30, fontWeight:'bold', paddingLeft: 15, color: '#fff' }}
                    onPress={() => { navigation.navigate('DrawerOpen'); }}>
                    ☰
                </Text>
        })
    },
    Reports: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({ title: navigation.state.routeName })
    },
    NewForm: {
        screen: NewFormScreen,
        navigationOptions: { title: 'Create new report' }
    },
});

const DrawerStack = DrawerNavigator({
    Menu: {
        screen: TemplateStack,
        navigationOptions: { title: 'Templates' }
    },
    MockForms: {
        screen: MockFormScreen,
        navigationOptions: { title: 'Mock forms' }
    },
}, {
    //This loads the contents of the drawer from the custom Sidebar
    contentComponent: Sidebar,
});

const LoginStack = StackNavigator({
    loginScreen: {
        screen: LoginScreen
    },
    signUpScreen: {
        screen: SignUpScreen,
        navigationOptions: { title: 'Create an account' }
    },
    forgottenPasswordScreen: {
        screen: ForgottenPasswordScreen,
        navigationOptions: { title: 'Forgot Password' }
    },
}, {
    headerMode: 'screen',
    navigationOptions: {
        headerStyle: { backgroundColor: '#f0f8ff' },
        header: null
    }
});

// Manifest of possible screens
const MainScreenNavigator = StackNavigator({
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerStack },
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack'
});

export default MainScreenNavigator;
