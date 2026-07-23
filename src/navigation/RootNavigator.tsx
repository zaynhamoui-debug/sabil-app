import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import { colors, font } from '../theme'

import HomeScreen             from '../screens/HomeScreen'
import DonateScreen           from '../screens/DonateScreen'
import VolunteerScreen        from '../screens/VolunteerScreen'
import ServicesScreen         from '../screens/ServicesScreen'
import FoodAssistanceScreen   from '../screens/FoodAssistanceScreen'
import RentalAssistanceScreen from '../screens/RentalAssistanceScreen'
import AboutScreen            from '../screens/AboutScreen'
import { useLang }            from '../context/LanguageContext'

export type ServicesStackParamList = {
  ServicesHub:      undefined
  FoodAssistance:   undefined
  RentalAssistance: undefined
}

export type TabParamList = {
  Home:      undefined
  Donate:    undefined
  Volunteer: undefined
  Services:  undefined
  About:     undefined
}

const Tab      = createBottomTabNavigator<TabParamList>()
const ServicesStack = createNativeStackNavigator<ServicesStackParamList>()

type IoniconsName = React.ComponentProps<typeof Ionicons>['name']

function ServicesNavigator() {
  return (
    <ServicesStack.Navigator screenOptions={{ headerShown: false }}>
      <ServicesStack.Screen name="ServicesHub"      component={ServicesScreen} />
      <ServicesStack.Screen name="FoodAssistance"   component={FoodAssistanceScreen} />
      <ServicesStack.Screen name="RentalAssistance" component={RentalAssistanceScreen} />
    </ServicesStack.Navigator>
  )
}

export default function RootNavigator() {
  const { t } = useLang()

  const TAB_CONFIG: Record<keyof TabParamList, { icon: IoniconsName; iconFocused: IoniconsName; label: string }> = {
    Home:      { icon: 'home-outline',               iconFocused: 'home',               label: t.home },
    Donate:    { icon: 'heart-outline',              iconFocused: 'heart',              label: t.donate },
    Volunteer: { icon: 'people-outline',             iconFocused: 'people',             label: t.volunteer },
    Services:  { icon: 'apps-outline',               iconFocused: 'apps',               label: t.services },
    About:     { icon: 'information-circle-outline', iconFocused: 'information-circle', label: t.about },
  }

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
              backgroundColor: colors.white,
              borderTopColor:  colors.border,
              borderTopWidth:  1,
              height:          84,
              paddingBottom:   20,
              paddingTop:      8,
            },
            tabBarLabel: cfg.label,
          }
        }}
      >
        <Tab.Screen name="Home"      component={HomeScreen} />
        <Tab.Screen name="Donate"    component={DonateScreen} />
        <Tab.Screen name="Volunteer" component={VolunteerScreen} />
        <Tab.Screen name="Services"  component={ServicesNavigator} />
        <Tab.Screen name="About"     component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
