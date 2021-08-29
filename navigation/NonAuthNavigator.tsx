/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { NonAuthParamList } from '../types';
//  uncomment to use as default non auth screens
import { LoginScreen, RegisterScreen } from "../screens/Non-Auth/";
import ChatScreen from '../screens/Chat/ChatScreen';


const NonAuthStack = createStackNavigator<NonAuthParamList>();

export default function NonAuthNavigator() {
    return (
        <NonAuthStack.Navigator initialRouteName="Login"
            screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}>
            {/* <NonAuthStack.Screen
                name="Landing Page"
                component={LandingNavigator}
            /> */}
            <NonAuthStack.Screen
                name="Login"
                component={LoginScreen}
            />
            <NonAuthStack.Screen
                name="Register"
                component={RegisterScreen}
            />
            <NonAuthStack.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    headerShown: true,
                    headerLeftContainerStyle: { paddingLeft: 20 },
                    headerRightContainerStyle: { paddingRight: 20 },
                }}
            />
        </NonAuthStack.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
