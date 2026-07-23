import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ServicesStackParamList } from '../navigation/RootNavigator'
import { colors, font, radius } from '../theme'
import Logo from '../components/Logo'
import LanguagePicker from '../components/LanguagePicker'
import { useLang } from '../context/LanguageContext'

type Nav = NativeStackNavigationProp<ServicesStackParamList>

const HERO = 'https://www.sabil.us/wp-content/uploads/2026/03/2024-10-20-Day-of-Dignity-128-scaled-1.webp'

export default function ServicesScreen() {
  const navigation = useNavigation<Nav>()
  const { t, isRTL } = useLang()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, isRTL && styles.rowReverse]}>
        <Logo width={130} height={50} />
        <LanguagePicker />
      </View>

      {/* Hero */}
      <View style={styles.heroWrap}>
        <Image source={{ uri: HERO }} style={styles.heroImage} resizeMode="cover" />
        <View style={styles.heroOverlay}>
          <Text style={[styles.heroTitle, isRTL && styles.textRight]}>{t.getHelp}</Text>
          <Text style={[styles.heroSub, isRTL && styles.textRight]}>{t.chooseService}</Text>
        </View>
      </View>

      {/* Service Cards */}
      <View style={styles.cards}>
        <TouchableOpacity
          style={[styles.card, { borderTopColor: colors.green }]}
          onPress={() => navigation.navigate('FoodAssistance')}
        >
          <View style={[styles.iconBg, { backgroundColor: colors.green + '18' }]}>
            <Ionicons name="basket" size={32} color={colors.green} />
          </View>
          <View style={styles.cardText}>
            <Text style={[styles.cardTitle, isRTL && styles.textRight]}>{t.foodAssistance}</Text>
            <Text style={[styles.cardDesc, isRTL && styles.textRight]}>{t.foodAssistanceDesc}</Text>
          </View>
          <View style={[styles.applyChip, { backgroundColor: colors.green }]}>
            <Text style={styles.applyChipText}>{t.applyNow}</Text>
            <Ionicons name={isRTL ? 'arrow-back' : 'arrow-forward'} size={14} color={colors.white} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { borderTopColor: colors.teal }]}
          onPress={() => navigation.navigate('RentalAssistance')}
        >
          <View style={[styles.iconBg, { backgroundColor: colors.teal + '18' }]}>
            <Ionicons name="home" size={32} color={colors.teal} />
          </View>
          <View style={styles.cardText}>
            <Text style={[styles.cardTitle, isRTL && styles.textRight]}>{t.rentalAssistance}</Text>
            <Text style={[styles.cardDesc, isRTL && styles.textRight]}>{t.rentalAssistanceDesc}</Text>
          </View>
          <View style={[styles.applyChip, { backgroundColor: colors.teal }]}>
            <Text style={styles.applyChipText}>{t.applyNow}</Text>
            <Ionicons name={isRTL ? 'arrow-back' : 'arrow-forward'} size={14} color={colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: colors.offWhite },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  rowReverse: { flexDirection: 'row-reverse' },
  textRight: { textAlign: 'right' },

  heroWrap:    { marginHorizontal: 16, borderRadius: radius.xl, overflow: 'hidden', height: 200, marginBottom: 28 },
  heroImage:   { position: 'absolute', width: '100%', height: '100%' },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(10,30,18,0.60)', padding: 22, justifyContent: 'flex-end' },
  heroTitle:   { fontSize: 28, fontWeight: '900', color: colors.white, marginBottom: 6 },
  heroSub:     { fontSize: font.sm, color: 'rgba(255,255,255,0.82)', lineHeight: 20 },

  cards: { flex: 1, paddingHorizontal: 16, gap: 14, justifyContent: 'flex-start' },
  card: {
    backgroundColor: colors.white, borderRadius: radius.xl, padding: 20,
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 12, elevation: 3,
    borderTopWidth: 4, gap: 14,
  },
  iconBg:     { width: 60, height: 60, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center' },
  cardText:   { flex: 1 },
  cardTitle:  { fontSize: font.lg, fontWeight: '800', color: colors.text, marginBottom: 6 },
  cardDesc:   { fontSize: font.sm, color: colors.textMuted, lineHeight: 20 },
  applyChip:  { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', borderRadius: radius.full, paddingHorizontal: 16, paddingVertical: 9 },
  applyChipText: { fontSize: font.sm, fontWeight: '700', color: colors.white },
})
