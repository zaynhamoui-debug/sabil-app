import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Linking, Alert, Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { colors, font, radius } from '../theme'
import Logo from '../components/Logo'
import LanguagePicker from '../components/LanguagePicker'
import { useLang } from '../context/LanguageContext'

const RENTAL_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc4U5rgtTKy_74AFmUxYZXA2EQB_2o7oI_LVQKwdUbECv55tg/viewform'
const HERO_IMAGE      = 'https://www.sabil.us/wp-content/uploads/2026/03/PHOTO-2023-06-19-09-35-25-1.webp'

async function openRentalForm() {
  try {
    await Linking.openURL(RENTAL_FORM_URL)
  } catch {
    Alert.alert('Error', 'Could not open the form. Please visit sabil.us for assistance.')
  }
}

export default function RentalAssistanceScreen() {
  const navigation  = useNavigation()
  const { t, isRTL } = useLang()

  const services = [
    { icon: 'home-outline' as const,   color: colors.teal,    title: t.rentalAssistance,  desc: 'Emergency financial support to prevent evictions and keep families housed.' },
    { icon: 'flash-outline' as const,  color: '#E05A2B',       title: 'Utility Assistance', desc: 'Help covering overdue utility bills to avoid shut-offs.' },
    { icon: 'cash-outline' as const,   color: '#7B5EA7',       title: t.rentalAssistance + ' Counseling', desc: 'One-on-one guidance on navigating housing challenges.' },
    { icon: 'school-outline' as const, color: colors.primary as string, title: 'Education & Employment', desc: 'Resources to find employment and strengthen financial stability.' },
  ]

  const docs = [
    t.rentalDoc_id,
    t.rentalDoc_income,
    t.rentalDoc_lease,
    t.rentalDoc_eviction,
    t.rentalDoc_ssn,
    t.rentalDoc_address,
  ]

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={[styles.header, isRTL && styles.rowReverse]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name={isRTL ? 'arrow-forward' : 'arrow-back'} size={22} color={colors.text} />
          </TouchableOpacity>
          <Logo width={110} height={42} />
          <LanguagePicker />
        </View>

        {/* Hero */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay}>
            <Text style={[styles.heroTitle, isRTL && styles.textRight]}>{t.rentalAssistanceTitle}</Text>
            <Text style={[styles.heroSub, isRTL && styles.textRight]}>{t.rentalHeroSub}</Text>
          </View>
        </View>

        {/* Primary CTA */}
        <View style={styles.ctaBox}>
          <View style={[styles.ctaTop, isRTL && styles.rowReverse]}>
            <Ionicons name="document-text" size={28} color={colors.teal} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.ctaTitle, isRTL && styles.textRight]}>{t.readyToApplyRental}</Text>
              <Text style={[styles.ctaSub, isRTL && styles.textRight]}>{t.rentalFormTime}</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.applyBtn, { backgroundColor: colors.teal }]} onPress={openRentalForm}>
            <Ionicons name="open-outline" size={18} color={colors.white} />
            <Text style={styles.applyBtnText}>{t.openRentalForm}</Text>
          </TouchableOpacity>
          <Text style={[styles.ctaNote, isRTL && styles.textRight]}>{t.officialRentalForm}</Text>
        </View>

        {/* What We Help With */}
        <Text style={[styles.sectionTitle, isRTL && styles.textRight]}>{t.whatWeHelpWith}</Text>
        {services.map(s => (
          <View key={s.title} style={[styles.serviceCard, isRTL && styles.rowReverse]}>
            <View style={[styles.serviceIcon, { backgroundColor: s.color + '18' }]}>
              <Ionicons name={s.icon} size={22} color={s.color} />
            </View>
            <View style={styles.serviceText}>
              <Text style={[styles.serviceTitle, isRTL && styles.textRight]}>{s.title}</Text>
              <Text style={[styles.serviceDesc, isRTL && styles.textRight]}>{s.desc}</Text>
            </View>
          </View>
        ))}

        {/* Documents */}
        <View style={styles.docsCard}>
          <View style={[styles.docsHeader, isRTL && styles.rowReverse]}>
            <Ionicons name="folder-open-outline" size={20} color={colors.teal} />
            <Text style={[styles.docsTitle, isRTL && styles.textRight]}>{t.docsToPrep}</Text>
          </View>
          <Text style={[styles.docsSubtitle, isRTL && styles.textRight]}>{t.docsSpeedUp}</Text>
          {docs.map((d, i) => (
            <View key={i} style={[styles.docRow, isRTL && styles.rowReverse]}>
              <View style={styles.docBullet} />
              <Text style={[styles.docText, isRTL && styles.textRight]}>{d}</Text>
            </View>
          ))}
        </View>

        {/* Second CTA */}
        <TouchableOpacity style={styles.applyBtn2} onPress={openRentalForm}>
          <Ionicons name="open-outline" size={18} color={colors.white} />
          <Text style={styles.applyBtnText2}>{t.startRentalApp}</Text>
        </TouchableOpacity>

        {/* Contact */}
        <View style={styles.contactCard}>
          <Text style={[styles.contactTitle, isRTL && styles.textRight]}>{t.haveQuestions}</Text>
          <Text style={[styles.contactSub, isRTL && styles.textRight]}>{t.teamHereToHelp}</Text>
          <View style={[styles.contactBtns, isRTL && styles.rowReverse]}>
            <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL('mailto:info@sabil.us')}>
              <Ionicons name="mail-outline" size={16} color={colors.teal} />
              <Text style={styles.contactBtnText}>{t.emailUs}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL('https://www.sabil.us')}>
              <Ionicons name="globe-outline" size={16} color={colors.teal} />
              <Text style={styles.contactBtnText}>{t.visitWebsite}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: colors.offWhite },
  scroll: { paddingBottom: 20 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, gap: 12 },
  rowReverse: { flexDirection: 'row-reverse' },
  textRight: { textAlign: 'right' },
  backBtn: { padding: 4 },

  heroWrap:    { marginHorizontal: 16, borderRadius: radius.xl, overflow: 'hidden', height: 220, marginBottom: 20 },
  heroImage:   { position: 'absolute', width: '100%', height: '100%', backgroundColor: colors.lightGray },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(10,30,18,0.62)', padding: 22, justifyContent: 'flex-end' },
  heroTitle:   { fontSize: 24, fontWeight: '900', color: colors.white, lineHeight: 30, marginBottom: 8 },
  heroSub:     { fontSize: font.sm, color: 'rgba(255,255,255,0.80)', lineHeight: 20 },

  ctaBox: {
    marginHorizontal: 16, backgroundColor: colors.white,
    borderRadius: radius.xl, padding: 20, marginBottom: 28,
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 12, elevation: 3,
    borderWidth: 1.5, borderColor: colors.teal + '30',
  },
  ctaTop:   { flexDirection: 'row', gap: 14, alignItems: 'flex-start', marginBottom: 18 },
  ctaTitle: { fontSize: font.lg, fontWeight: '800', color: colors.text },
  ctaSub:   { fontSize: font.sm, color: colors.textMuted, marginTop: 3, lineHeight: 18 },
  ctaNote:  { textAlign: 'center', fontSize: 11, color: colors.textMuted },

  applyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    borderRadius: radius.lg, paddingVertical: 16, marginBottom: 10,
  },
  applyBtnText: { fontSize: font.md, fontWeight: '800', color: colors.white },

  sectionTitle: { fontSize: font.lg, fontWeight: '800', color: colors.text, paddingHorizontal: 16, marginBottom: 12 },
  serviceCard: {
    flexDirection: 'row', gap: 14, alignItems: 'flex-start',
    backgroundColor: colors.white, borderRadius: radius.md,
    marginHorizontal: 16, padding: 14, marginBottom: 8,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
  },
  serviceIcon:  { width: 46, height: 46, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  serviceText:  { flex: 1 },
  serviceTitle: { fontSize: font.base, fontWeight: '700', color: colors.text, marginBottom: 3 },
  serviceDesc:  { fontSize: font.sm, color: colors.textMuted, lineHeight: 18 },

  docsCard: {
    marginHorizontal: 16, backgroundColor: colors.teal + '0C',
    borderRadius: radius.xl, padding: 18, marginTop: 12, marginBottom: 20,
    borderWidth: 1, borderColor: colors.teal + '25',
  },
  docsHeader:   { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  docsTitle:    { fontSize: font.base, fontWeight: '700', color: colors.teal },
  docsSubtitle: { fontSize: font.sm, color: colors.textMuted, marginBottom: 14, lineHeight: 18 },
  docRow:       { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  docBullet:    { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.teal, marginTop: 6, flexShrink: 0 },
  docText:      { flex: 1, fontSize: font.sm, color: colors.text, lineHeight: 20 },

  applyBtn2: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: colors.teal, borderRadius: radius.lg, paddingVertical: 16,
    marginHorizontal: 16, marginBottom: 20,
  },
  applyBtnText2: { fontSize: font.md, fontWeight: '800', color: colors.white },

  contactCard: {
    marginHorizontal: 16, backgroundColor: colors.white,
    borderRadius: radius.xl, padding: 20, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1,
  },
  contactTitle:   { fontSize: font.md, fontWeight: '700', color: colors.text, marginBottom: 4 },
  contactSub:     { fontSize: font.sm, color: colors.textMuted, textAlign: 'center', lineHeight: 18, marginBottom: 16 },
  contactBtns:    { flexDirection: 'row', gap: 10 },
  contactBtn:     { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.teal + '10', borderRadius: radius.md, paddingVertical: 12, borderWidth: 1, borderColor: colors.teal + '30' },
  contactBtnText: { fontSize: font.sm, fontWeight: '600', color: colors.teal },
})
