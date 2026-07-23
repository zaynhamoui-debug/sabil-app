import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LanguageProvider } from './src/context/LanguageContext'
import RootNavigator from './src/navigation/RootNavigator'

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </LanguageProvider>
    </SafeAreaProvider>
  )
}
