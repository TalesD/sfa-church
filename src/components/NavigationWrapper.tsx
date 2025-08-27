import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

// Import screens
import LoginScreen from '../features/auth/LoginScreen';
import HomeScreen from '../features/home/HomeScreen';
import GiveScreen from '../features/give/GiveScreen';
import EventsScreen from '../features/events/EventsScreen';
import GroupsScreen from '../features/groups/GroupsScreen';
import CheckInScreen from '../features/checkin/CheckInScreen';
import MoreScreen from '../features/more/MoreScreen';
import WorshipScreen from '../features/worship/WorshipScreen';
import ScheduleDetailScreen from '../features/worship/ScheduleDetailScreen';
import KidsScreen from '../features/kids/KidsScreen';
import DevotionalScreen from '../features/devotional/DevotionalScreen';
import ProfileScreen from '../features/profile/ProfileScreen';

const Stack = createStackNavigator();

export default function NavigationWrapper() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // You can add a loading screen here
    return null;
  }

  return (
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
      {!user ? (
        // Not authenticated - show login
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        // Authenticated - show main app
        <>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Worship" 
            component={WorshipScreen}
            options={{ 
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ScheduleDetail" 
            component={ScheduleDetailScreen}
            options={{ 
              headerShown: true,
              title: ''
            }}
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
        </>
      )}
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabsNavigator() {
  const { createBottomTabNavigator } = require('@react-navigation/bottom-tabs');
  const { Ionicons } = require('@expo/vector-icons');
  
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
              screenOptions={({ route }: any) => ({
          tabBarIcon: ({ focused, color, size }: any) => {
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
          paddingBottom: 15,
          paddingTop: 10,
          height: 80,
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
