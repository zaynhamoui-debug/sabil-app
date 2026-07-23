import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { colors, font } from '../theme'

import HomeScreen        from '../screens/HomeScreen'
import DonateScreen      from '../screens/DonateScreen'
import VolunteerScreen   from '../screens/VolunteerScreen'
import AppointmentScreen from '../screens/AppointmentScreen'
import AboutScreen       from '../screens/AboutScreen'

export type TabParamList = {
  Home:        undefined
  Donate:      undefined
  Volunteer:   undefined
  Appointment: undefined
  About:       undefined
}

const Tab = createBottomTabNavigator<TabParamList>()

type IoniconsName = React.ComponentProps<typeof Ionicons>['name']

const TAB_CONFIG: Record<keyof TabParamList, { icon: IoniconsName; iconFocused: IoniconsName; label: string }> = {
  Home:        { icon: 'home-outline',     iconFocused: 'home',            label: 'Home' },
  Donate:      { icon: 'heart-outline',    iconFocused: 'heart',           label: 'Donate' },
  Volunteer:   { icon: 'people-outline',   iconFocused: 'people',          label: 'Volunteer' },
  Appointment: { icon: 'calendar-outline', iconFocused: 'calendar',        label: 'Get Help' },
  About:       { icon: 'information-circle-outline', iconFocused: 'information-circle', label: 'About' },
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => {
          const cfg = TAB_CONFIG[route.name as keyof TabParamList]
          return {
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? cfg.iconFocused : cfg.icon} size={size} color={color} />
            ),
            tabBarActiveTintColor:   colors.green,
            tabBarInactiveTintColor: colors.gray,
            tabBarLabelStyle:        { fontSize: 11, fontWeight: '600' },
            tabBarStyle: {
              backgroundColor:   colors.white,
              borderTopColor:    colors.border,
              borderTopWidth:    1,
              height:            84,
              paddingBottom:     20,
              paddingTop:        8,
            },
            tabBarLabel: cfg.label,
          }
        }}
      >
        <Tab.Screen name="Home"        component={HomeScreen} />
        <Tab.Screen name="Donate"      component={DonateScreen} />
        <Tab.Screen name="Volunteer"   component={VolunteerScreen} />
        <Tab.Screen name="Appointment" component={AppointmentScreen} />
        <Tab.Screen name="About"       component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
