import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/features/home/HomeScreen';
import GiveScreen from './src/features/give/GiveScreen';
import EventsScreen from './src/features/events/EventsScreen';
import GroupsScreen from './src/features/groups/GroupsScreen';
import CheckInScreen from './src/features/checkin/CheckInScreen';
import MoreScreen from './src/features/more/MoreScreen';
import WorshipScreen from './src/features/worship/WorshipScreen';
import KidsScreen from './src/features/kids/KidsScreen';
import DevotionalScreen from './src/features/devotional/DevotionalScreen';
import ProfileScreen from './src/features/profile/ProfileScreen';

// Import context
import { AuthProvider } from './src/contexts/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Give':
              iconName = focused ? 'card' : 'card-outline';
              break;
            case 'Events':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Check-in':
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
              break;
                     case 'More':
           iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal';
           break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'rgba(26, 26, 46, 0.95)',
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          borderTopWidth: 1,
          paddingBottom: 15, // Increase bottom padding
          paddingTop: 10, // Increase top padding
          height: 80, // Increase height
        },
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
             <Tab.Screen 
         name="Home" 
         component={HomeScreen}
         options={{ headerShown: false }}
       />
       <Tab.Screen 
         name="Give" 
         component={GiveScreen}
         options={{ headerShown: false }}
       />
       <Tab.Screen 
         name="Events" 
         component={EventsScreen}
         options={{ headerShown: false }}
       />
       <Tab.Screen 
         name="Check-in" 
         component={CheckInScreen}
         options={{ headerShown: false }}
       />
       <Tab.Screen 
         name="More" 
         component={MoreScreen}
         options={{ headerShown: false }}
       />
    </Tab.Navigator>
  );
}

// Main App
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
          style={{ flex: 1 }}
        >
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTransparent: true,
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="MainTabs" 
              component={TabNavigator}
              options={{ headerShown: false }}
            />
                         <Stack.Screen 
               name="Worship" 
               component={WorshipScreen}
               options={{ title: 'Worship' }}
             />
             <Stack.Screen 
               name="Kids" 
               component={KidsScreen}
               options={{ title: 'Kids Ministry' }}
             />
             <Stack.Screen 
               name="Devotional" 
               component={DevotionalScreen}
               options={{ title: 'Devotional' }}
             />
             <Stack.Screen 
               name="Profile" 
               component={ProfileScreen}
               options={{ title: 'Profile' }}
             />
          </Stack.Navigator>
          <StatusBar style="light" />
        </LinearGradient>
      </NavigationContainer>
    </AuthProvider>
  );
}


