import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const NOTIF_KEY = 'sabil_notifs_enabled'
// Food distribution: every Saturday at 9 AM
const DISTRIBUTION_DAY = 7   // Saturday (1=Sun, 7=Sat)
const DISTRIBUTION_HOUR = 9
const DISTRIBUTION_MIN  = 0

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge:  false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false
  const { status: existing } = await Notifications.getPermissionsAsync()
  if (existing === 'granted') return true
  const { status } = await Notifications.requestPermissionsAsync()
  return status === 'granted'
}

export async function areNotificationsEnabled(): Promise<boolean> {
  const val = await AsyncStorage.getItem(NOTIF_KEY)
  return val === 'true'
}

export async function scheduleDistributionReminders(title: string, body: string): Promise<void> {
  if (Platform.OS === 'web') return
  // Cancel any existing distribution notifications first
  await cancelDistributionReminders()

  // Schedule a weekly repeating notification every Saturday at 9 AM
  await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: true },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      weekday: DISTRIBUTION_DAY,
      hour: DISTRIBUTION_HOUR,
      minute: DISTRIBUTION_MIN,
    },
  })

  await AsyncStorage.setItem(NOTIF_KEY, 'true')
}

export async function cancelDistributionReminders(): Promise<void> {
  if (Platform.OS === 'web') return
  await Notifications.cancelAllScheduledNotificationsAsync()
  await AsyncStorage.setItem(NOTIF_KEY, 'false')
}
