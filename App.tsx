import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { LanguageProvider } from './src/context/LanguageContext'
import RootNavigator from './src/navigation/RootNavigator'

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
  })

  // Render once loaded OR if font failed (app works, icons just invisible)
  if (!fontsLoaded && !fontError) return null

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </LanguageProvider>
    </SafeAreaProvider>
  )
}
