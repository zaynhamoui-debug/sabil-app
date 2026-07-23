import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Linking, Alert, Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, font, radius } from '../theme'
import Logo from '../components/Logo'
import LanguagePicker from '../components/LanguagePicker'
import { useLang } from '../context/LanguageContext'

const VOLUNTEER_URL = 'https://www.sabil.us/volunteer/'
const HERO_IMAGE    = 'https://www.sabil.us/wp-content/uploads/2026/03/2024-10-20-Day-of-Dignity-128-scaled-1.webp'

async function openVolunteerPage() {
  try {
    await Linking.openURL(VOLUNTEER_URL)
  } catch {
    Alert.alert('Error', 'Could not open the volunteer page. Please visit sabil.us/volunteer')
  }
}

export default function VolunteerScreen() {
  const { t, isRTL } = useLang()

  const WHY = [t.directImpact, t.meaningfulConnections, t.gainSkills]

  const ROLES = [
    { icon: 'basket-outline' as const,        color: colors.green,   label: t.interest_food },
    { icon: 'document-text-outline' as const, color: colors.teal,    label: t.interest_admin },
    { icon: 'megaphone-outline' as const,     color: '#E05A2B',      label: t.interest_events },
    { icon: 'heart-outline' as const,         color: '#7B5EA7',      label: t.interest_health },
    { icon: 'people-outline' as const,        color: colors.green,   label: t.interest_youth },
    { icon: 'car-outline' as const,           color: colors.teal,    label: t.interest_driving },
  ]

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={[styles.header, isRTL && styles.rowReverse]}>
          <Logo width={130} height={50} />
          <LanguagePicker />
        </View>

        {/* Hero */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay}>
            <View style={[styles.heroBadge, isRTL && styles.selfEnd]}>
              <Ionicons name="people" size={12} color={colors.white} />
              <Text style={styles.heroBadgeText}>{t.volunteer}</Text>
            </View>
            <Text style={[styles.heroTitle, isRTL && styles.textRight]}>{t.volunteerWithUs}</Text>
            <Text style={[styles.heroSub, isRTL && styles.textRight]}>{t.volunteerSubtitle}</Text>
          </View>
        </View>

        {/* Primary CTA */}
        <View style={styles.ctaBox}>
          <View style={[styles.ctaTop, isRTL && styles.rowReverse]}>
            <Ionicons name="people" size={28} color={colors.green} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.ctaTitle, isRTL && styles.textRight]}>{t.volunteerWithUs}</Text>
              <Text style={[styles.ctaSub, isRTL && styles.textRight]}>{t.volunteerSubtitle}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.volunteerBtn} onPress={openVolunteerPage}>
            <Ionicons name="open-outline" size={18} color={colors.white} />
            <Text style={styles.volunteerBtnText}>{t.volunteer} — sabil.us/volunteer</Text>
          </TouchableOpacity>
          <Text style={[styles.ctaNote, isRTL && styles.textRight]}>Opens the official Sabil USA volunteer page</Text>
        </View>

        {/* Why Volunteer */}
        <Text style={[styles.sectionTitle, isRTL && styles.textRight]}>Why Volunteer?</Text>
        <View style={styles.whyCard}>
          {WHY.map(text => (
            <View key={text} style={[styles.whyRow, isRTL && styles.rowReverse]}>
              <Ionicons name="checkmark-circle" size={20} color={colors.green} />
              <Text style={[styles.whyText, isRTL && styles.textRight]}>{text}</Text>
            </View>
          ))}
        </View>

        {/* Volunteer Roles */}
        <Text style={[styles.sectionTitle, isRTL && styles.textRight]}>{t.areasOfInterest}</Text>
        <View style={styles.rolesGrid}>
          {ROLES.map(r => (
            <View key={r.label} style={[styles.roleCard, isRTL && styles.rowReverse]}>
              <View style={[styles.roleIcon, { backgroundColor: r.color + '18' }]}>
                <Ionicons name={r.icon} size={22} color={r.color} />
              </View>
              <Text style={[styles.roleLabel, isRTL && styles.textRight]}>{r.label}</Text>
            </View>
          ))}
        </View>

        {/* Second CTA */}
        <TouchableOpacity style={styles.volunteerBtn2} onPress={openVolunteerPage}>
          <Ionicons name="open-outline" size={18} color={colors.white} />
          <Text style={styles.volunteerBtnText}>{t.volunteer} at sabil.us/volunteer</Text>
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
  safe:       { flex: 1, backgroundColor: colors.offWhite },
  scroll:     { paddingBottom: 20 },
  header:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  rowReverse: { flexDirection: 'row-reverse' },
  textRight:  { textAlign: 'right' },
  selfEnd:    { alignSelf: 'flex-end' },

  heroWrap:    { marginHorizontal: 16, borderRadius: radius.xl, overflow: 'hidden', height: 260, marginBottom: 20 },
  heroImage:   { position: 'absolute', width: '100%', height: '100%' },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(10,40,15,0.62)', padding: 22, justifyContent: 'flex-end' },
  heroBadge:   { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 12 },
  heroBadgeText: { fontSize: 11, color: colors.white, fontWeight: '600' },
  heroTitle:   { fontSize: 26, fontWeight: '900', color: colors.white, marginBottom: 8 },
  heroSub:     { fontSize: font.sm, color: 'rgba(255,255,255,0.82)', lineHeight: 20 },

  ctaBox: {
    marginHorizontal: 16, backgroundColor: colors.white,
    borderRadius: radius.xl, padding: 20, marginBottom: 24,
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 12, elevation: 3,
    borderWidth: 1.5, borderColor: colors.green + '30',
  },
  ctaTop:   { flexDirection: 'row', gap: 14, alignItems: 'flex-start', marginBottom: 16 },
  ctaTitle: { fontSize: font.lg, fontWeight: '800', color: colors.text },
  ctaSub:   { fontSize: font.sm, color: colors.textMuted, marginTop: 3, lineHeight: 18 },
  ctaNote:  { textAlign: 'center', fontSize: 11, color: colors.textMuted, marginTop: 8 },

  volunteerBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: colors.green, borderRadius: radius.lg, paddingVertical: 16,
  },
  volunteerBtnText: { fontSize: font.md, fontWeight: '800', color: colors.white },

  sectionTitle: { fontSize: font.lg, fontWeight: '800', color: colors.text, paddingHorizontal: 16, marginBottom: 12 },

  whyCard: {
    marginHorizontal: 16, backgroundColor: colors.green + '10',
    borderRadius: radius.lg, padding: 16, marginBottom: 24, gap: 12,
  },
  whyRow:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
  whyText: { fontSize: font.base, color: colors.green, fontWeight: '500', flex: 1 },

  rolesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 16, marginBottom: 24 },
  roleCard:  {
    width: '47%', flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.white, borderRadius: radius.md, padding: 12,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
  },
  roleIcon:  { width: 40, height: 40, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  roleLabel: { fontSize: font.sm, fontWeight: '600', color: colors.text, flex: 1 },

  volunteerBtn2: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: colors.green, borderRadius: radius.lg, paddingVertical: 16,
    marginHorizontal: 16, marginBottom: 20,
  },

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
