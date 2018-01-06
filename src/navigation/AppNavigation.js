import React from 'react';
import { Text } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';

import TemplateScreen from '../screens/TemplateScreen';
import NewFormScreen from '../screens/NewFormScreen';
import ReportsScreen from '../screens/ReportsScreen';

import navigationStyles from '../screens/style/navigationStyles'


const TemplateStack = StackNavigator({
    Templates: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Forms',
            headerTitleStyle: navigationStyles.formHeaderTitle,
            headerStyle: navigationStyles.formHeader ,
            headerLeft:
                <Text
                    style={navigationStyles.headerLeft}
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
    ReportsPage: {
        screen: ReportsScreen,
        navigationOptions: { title: 'List of reports'}
    },

}, {
    // is this part necessary?
});

const DrawerStack = DrawerNavigator({
    Menu: {
        screen: TemplateStack,
        navigationOptions: { title: 'Templates' }
    },
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
