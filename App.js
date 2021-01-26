// Import Libraries
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// Import Screens
import OverviewScreen from './screens/OverviewScreen';
import ChatScreen from './screens/ChatScreen';
import TimeCardScreen from './screens/TimeCardScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import ComplianceScreen from './screens/ComplianceScreen';

// Icons
import { faHome, faComment, faHardHat, faMapMarked, faUser, faChartPie } from '@fortawesome/free-solid-svg-icons'

// Import Constants
import GLOBALS from './globals';

const Tab = createBottomTabNavigator();

var headerTitleStyle = {
    fontSize: 20,
    fontWeight: 'bold',
}

const OverviewStack = createStackNavigator();
function OverviewStackScreen() {
    return (
        <OverviewStack.Navigator>
            <OverviewStack.Screen name={GLOBALS.SCREENS.OVERVIEW.TITLE} component={OverviewScreen} options={{headerTitleStyle: headerTitleStyle}}
            />
        </OverviewStack.Navigator>
    );
}

const ChatStack = createStackNavigator();
function ChatStackScreen() {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen name={GLOBALS.SCREENS.CHAT.TITLE} component={ChatScreen} options={{ headerTitleStyle: headerTitleStyle }} />
            <ChatStack.Screen name={GLOBALS.SCREENS.PROFILE.TITLE} component={ProfileScreen} options={{ headerTitleStyle: headerTitleStyle }} />
        </ChatStack.Navigator>
    );
}

const TimeCardStack = createStackNavigator();
function TimeCardStackScreen() {
    return (
        <TimeCardStack.Navigator>
            <TimeCardStack.Screen name={GLOBALS.SCREENS.TIMECARD.TITLE} component={TimeCardScreen} options={{ headerTitleStyle: headerTitleStyle }} />
        </TimeCardStack.Navigator>
    );
}
const MapStack = createStackNavigator();
function MapStackScreen() {
    return (
        <MapStack.Navigator>
            <MapStack.Screen name={GLOBALS.SCREENS.MAP.TITLE} component={MapScreen} options={{ headerTitleStyle: headerTitleStyle }} />
        </MapStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name={GLOBALS.SCREENS.PROFILE.TITLE} component={ProfileScreen} options={{ headerTitleStyle: headerTitleStyle }} />
        </ProfileStack.Navigator>
    );
}

const ComplianceStack = createStackNavigator();
function ComplianceStackScreen() {
    return (
        <ComplianceStack.Navigator>
            <ComplianceStack.Screen name={GLOBALS.SCREENS.COMPLIANCE.TITLE} component={ComplianceScreen} options={{ headerTitleStyle: headerTitleStyle }} />
        </ComplianceStack.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={GLOBALS.SCREENS.OVERVIEW.ROUTE}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {

                        let icon;
                        switch (route.name) {
                            case GLOBALS.SCREENS.OVERVIEW.ROUTE:
                                icon = faHome;
                                break;
                            case GLOBALS.SCREENS.CHAT.ROUTE:
                                icon = faComment;
                                break;
                            case GLOBALS.SCREENS.TIMECARD.ROUTE:
                                icon = faChartPie;
                                break;
                            case GLOBALS.SCREENS.MAP.ROUTE:
                                icon = faMapMarked;
                                break;
                            case GLOBALS.SCREENS.PROFILE.ROUTE:
                                icon = faUser;
                                break;
                            case GLOBALS.SCREENS.COMPLIANCE.ROUTE:
                                icon = faHardHat;
                                break;
                        }

                        if (focused === true) {
                            size += 4;
                        }

                        return <FontAwesomeIcon icon={icon} style={{color: color}} size={size} />
                    },
                })}
                tabBarOptions={{
                    activeTintColor: GLOBALS.COLORS.PRIMARY,
                    inactiveTintColor: GLOBALS.COLORS.INACTIVE,
                    showLabel: false
                }}
            >
	          
                <Tab.Screen 
                    name={GLOBALS.SCREENS.OVERVIEW.ROUTE}
                    component={OverviewStackScreen} 
                    options={{ title: GLOBALS.SCREENS.OVERVIEW.TITLE, }}
                />

                <Tab.Screen
                    name={GLOBALS.SCREENS.TIMECARD.ROUTE}
                    component={TimeCardStackScreen}
                    options={{ title: GLOBALS.SCREENS.TIMECARD.TITLE }}
                />

                <Tab.Screen
                    name={GLOBALS.SCREENS.COMPLIANCE.ROUTE}
                    component={ComplianceStackScreen}
                    options={{ title: GLOBALS.SCREENS.COMPLIANCE.TITLE }}
                />

                <Tab.Screen
                    name={GLOBALS.SCREENS.MAP.ROUTE}
                    component={MapStackScreen}
                    options={{ title: GLOBALS.SCREENS.MAP.TITLE }}
                />
	        	
	        	<Tab.Screen 
	        		name={GLOBALS.SCREENS.CHAT.ROUTE}
                    component={ChatStackScreen} 
                    options={{ title: GLOBALS.SCREENS.CHAT.TITLE, tabBarBadge: 1 }}
                />

                <Tab.Screen
                    name={GLOBALS.SCREENS.PROFILE.ROUTE}
                    component={ProfileStackScreen}
                    options={{ title: GLOBALS.SCREENS.PROFILE.TITLE }}
                />
	        	
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;
