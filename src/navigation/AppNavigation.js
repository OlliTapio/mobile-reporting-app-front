import React from 'react';
import { StackNavigator, DrawerNavigator, HeaderBackButton, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { View, Text } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import TemplateScreen from '../screens/TemplateScreen';
import PreviewScreen from '../screens/PreviewScreen';
import ReportScreen from '../screens/ReportScreen';
import navigationStyles from './navigationStyles';
import Sidebar from '../navigation/Sidebar';
//import connectionReducer from '../redux/reducers/connection';
import { strings } from '../locales/i18n';
import OfflineNotice from '../components/OfflineNotice/OfflineNotice';
import { ReportEditingBackButton } from '../components/ReportEditingBackButton';

export const LOGGED_OUT_ROUTE_NAME = 'loginScreen';
export const LOGGED_IN_ROUTE_NAME = 'loggedInDrawer';

// The stack that is contained within the logged in drawer
const TemplateStack = StackNavigator({
    //TODO pressing Icon does nothing on IOS - fix bug, navigation problems?.
    Templates: {
        screen: TemplateScreen,
        navigationOptions: ({ navigation }) => ({
            flex: 0.3,
            header:
                <View style={ navigationStyles.HeaderContainer}>
                    <OfflineNotice />
                    <View style={ navigationStyles.titleContainer }>
                        <Text style={ navigationStyles.ScreenHeader }>{ strings('templates.templates') }</Text>
                    </View>
                    <Icon
                        name={'menu'}
                        type={'feather'}
                        iconStyle={navigationStyles.menuIcon}
                        containerStyle={navigationStyles.menuIconContainer}
                        onPress={() => { navigation.navigate('DrawerOpen'); }}>
                    </Icon>
                </View>
        })
    },
    //TODO add save property to Save?
    Report: {
        screen: ReportScreen,
        navigationOptions: () => ({
            flex: 0.3,
            drawerLockMode: 'locked-closed',
            header:
               <View style={ navigationStyles.HeaderContainer}>
                   <OfflineNotice
                       hidden={false}
                       barStyle="light-content"/>
                   <View style={ navigationStyles.titleContainer }>
                       {/*TODO: header title needs to be chosen based on the report being new or already sent.
                          Possible solution: https://reactnavigation.org/docs/headers.html#using-params-in-the-title */}
                       <Text style={ navigationStyles.ScreenHeader }>{ strings('templates.report') }</Text>
                   </View>
                   <View style={ navigationStyles.backButtonContainer }>
                       <ReportEditingBackButton
                           tintColor='#fff'
                           style={ navigationStyles.headerBackStyle }
                       />
                   </View>
               </View>,
        })
    },
    Preview: {
        screen: PreviewScreen,
        navigationOptions: ({ navigation }) => ({
            flex: 0.3,
            drawerLockMode: 'locked-closed',
            header:
                <View style={ navigationStyles.HeaderContainer}>
                    <OfflineNotice />
                    <View style={ navigationStyles.titleContainer }>
                        <Text style={ navigationStyles.ScreenHeader }>{strings('templates.preview')}</Text>
                    </View>
                    <View style={ navigationStyles.backButtonContainer }>
                        <HeaderBackButton
                            tintColor='#fff'
                            style={ navigationStyles.headerBackStyle }
                            onPress={() => navigation.goBack(null) }/>
                    </View>
                </View>,
        })
    },

},
);

const LoggedInDrawer = DrawerNavigator({
    Menu: {
        screen: TemplateStack,
        navigationOptions: {
            title: strings('templates.templates'),
        }
    },
}, {
    // This loads the contents of the drawer from the custom Sidebar
    contentComponent: Sidebar,
    // These fix a bug with the drawer navigator
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
});


// Manifest of possible screens
const MainScreenNavigator = StackNavigator({
    loginScreen: { screen: LoginScreen },
    loggedInDrawer: { screen: LoggedInDrawer },
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: LOGGED_OUT_ROUTE_NAME,
});

/*
  Prevents navigating multiple times if this.props.navigation.navigate is triggered multiples times in a short
  period of time inside TemplateStack by comparing current and previous navigation routes. Router action and state
  are provided as parameters.
*/

const prevGetStateForActionTemplateStack = TemplateStack.router.getStateForAction;
TemplateStack.router.getStateForAction = (action, state) => {
    // Action type and routeName
    const { type, routeName } = action;
    /*
      If navigating to the same route after already navigating there, null is returned to prevent multiple navigations.
      Prevents from navigating to the same route in TemplateStack if already in the corresponding screen.
    */
    if (state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName) {
        return null;
    // Else add a screen to the stack - i.e. call default action for navigating.
    } else {
        return prevGetStateForActionTemplateStack(action, state);
    }
};

export default MainScreenNavigator;
