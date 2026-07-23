import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Linking, Alert, Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, font, radius } from '../theme'
import Logo from '../components/Logo'

const FORM_URL   = 'https://docs.google.com/forms/d/e/1FAIpQLSc4U5rgtTKy_74AFmUxYZXA2EQB_2o7oI_LVQKwdUbECv55tg/viewform'
const EVENT_IMAGE = 'https://www.sabil.us/wp-content/uploads/2026/03/2024-10-20-Day-of-Dignity-128-scaled-1.webp'

async function openForm() {
  try {
    await Linking.openURL(FORM_URL)
  } catch {
    Alert.alert('Error', 'Could not open the application form. Please visit sabil.us for assistance.')
  }
}

const SERVICES = [
  { icon: 'home-outline' as const,   color: colors.teal,   title: 'Rental Assistance',     desc: 'Emergency help to prevent eviction and keep families housed.' },
  { icon: 'basket-outline' as const, color: colors.green,  title: 'Food Assistance',        desc: 'Nutritious groceries and food pantry access for households in need.' },
  { icon: 'medkit-outline' as const, color: '#E05A2B',     title: 'Health Services',        desc: 'Connections to health screenings, resources, and referrals.' },
  { icon: 'cash-outline' as const,   color: '#7B5EA7',     title: 'Financial Counseling',   desc: 'Support to navigate financial challenges and build stability.' },
  { icon: 'school-outline' as const, color: colors.primary as string, title: 'Education & Employment', desc: 'Resources to help you find employment and educational opportunities.' },
]

const DOCS = [
  'Government-issued photo ID (driver\'s license, passport, or state ID)',
  'Proof of income (pay stubs, benefits letters, or bank statements)',
  'Copy of your current lease or rental agreement',
  'Any eviction notices or utility shut-off notices (if applicable)',
  'Social Security cards for all household members',
  'Proof of address (utility bill or bank statement)',
]

export default function ApplyScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Logo width={130} height={50} />
        </View>

        {/* Hero Image */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: EVENT_IMAGE }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Application for{'\n'}Assistance</Text>
            <Text style={styles.heroSub}>We're here to help. Apply for food, rental, health, and financial support.</Text>
          </View>
        </View>

        {/* Apply Button — prominent CTA */}
        <View style={styles.ctaBox}>
          <View style={styles.ctaTop}>
            <Ionicons name="document-text" size={28} color={colors.green} />
            <View style={{ flex: 1 }}>
              <Text style={styles.ctaTitle}>Ready to Apply?</Text>
              <Text style={styles.ctaSub}>Our application takes about 10–15 minutes to complete.</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.applyBtn} onPress={openForm}>
            <Ionicons name="open-outline" size={18} color={colors.text} />
            <Text style={styles.applyBtnText}>Open Application Form</Text>
          </TouchableOpacity>
          <Text style={styles.ctaNote}>Opens the official Sabil USA assistance application</Text>
        </View>

        {/* What We Help With */}
        <Text style={styles.sectionTitle}>What We Help With</Text>
        {SERVICES.map(s => (
          <View key={s.title} style={styles.serviceCard}>
            <View style={[styles.serviceIcon, { backgroundColor: s.color + '18' }]}>
              <Ionicons name={s.icon} size={22} color={s.color} />
            </View>
            <View style={styles.serviceText}>
              <Text style={styles.serviceTitle}>{s.title}</Text>
              <Text style={styles.serviceDesc}>{s.desc}</Text>
            </View>
          </View>
        ))}

        {/* Documents to Prepare */}
        <View style={styles.docsCard}>
          <View style={styles.docsHeader}>
            <Ionicons name="folder-open-outline" size={20} color={colors.teal} />
            <Text style={styles.docsTitle}>Documents to Prepare</Text>
          </View>
          <Text style={styles.docsSubtitle}>Having these ready will help speed up your application:</Text>
          {DOCS.map((d, i) => (
            <View key={i} style={styles.docRow}>
              <View style={styles.docBullet} />
              <Text style={styles.docText}>{d}</Text>
            </View>
          ))}
        </View>

        {/* Second Apply CTA */}
        <TouchableOpacity style={styles.applyBtn2} onPress={openForm}>
          <Ionicons name="open-outline" size={18} color={colors.text} />
          <Text style={styles.applyBtnText2}>Start Your Application</Text>
        </TouchableOpacity>

        {/* Questions? */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Have Questions?</Text>
          <Text style={styles.contactSub}>Our team is here to help walk you through the process.</Text>
          <View style={styles.contactBtns}>
            <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL('mailto:info@sabil.us')}>
              <Ionicons name="mail-outline" size={16} color={colors.teal} />
              <Text style={styles.contactBtnText}>Email Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL('https://www.sabil.us')}>
              <Ionicons name="globe-outline" size={16} color={colors.teal} />
              <Text style={styles.contactBtnText}>Visit Website</Text>
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
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },

  heroWrap:    { marginHorizontal: 16, borderRadius: radius.xl, overflow: 'hidden', height: 220, marginBottom: 20 },
  heroImage:   { position: 'absolute', width: '100%', height: '100%', backgroundColor: colors.lightGray },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(10,30,18,0.62)', padding: 22, justifyContent: 'flex-end' },
  heroTitle:   { fontSize: 24, fontWeight: '900', color: colors.white, lineHeight: 30, marginBottom: 8 },
  heroSub:     { fontSize: font.sm, color: 'rgba(255,255,255,0.80)', lineHeight: 20 },

  ctaBox: {
    marginHorizontal: 16, backgroundColor: colors.white,
    borderRadius: radius.xl, padding: 20, marginBottom: 28,
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 12, elevation: 3,
    borderWidth: 1.5, borderColor: colors.green + '30',
  },
  ctaTop:     { flexDirection: 'row', gap: 14, alignItems: 'flex-start', marginBottom: 18 },
  ctaTitle:   { fontSize: font.lg, fontWeight: '800', color: colors.text },
  ctaSub:     { fontSize: font.sm, color: colors.textMuted, marginTop: 3, lineHeight: 18 },
  applyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: colors.primary, borderRadius: radius.lg, paddingVertical: 16, marginBottom: 10,
  },
  applyBtnText: { fontSize: font.md, fontWeight: '800', color: colors.text },
  ctaNote:    { textAlign: 'center', fontSize: 11, color: colors.textMuted },

  sectionTitle: { fontSize: font.lg, fontWeight: '800', color: colors.text, paddingHorizontal: 16, marginBottom: 12 },
  serviceCard: {
    flexDirection: 'row', gap: 14, alignItems: 'flex-start',
    backgroundColor: colors.white, borderRadius: radius.md,
    marginHorizontal: 16, padding: 14, marginBottom: 8,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
  },
  serviceIcon: { width: 46, height: 46, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  serviceText: { flex: 1 },
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
    backgroundColor: colors.green, borderRadius: radius.lg, paddingVertical: 16,
    marginHorizontal: 16, marginBottom: 20,
  },
  applyBtnText2: { fontSize: font.md, fontWeight: '800', color: colors.white },

  contactCard: {
    marginHorizontal: 16, backgroundColor: colors.white,
    borderRadius: radius.xl, padding: 20, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1,
  },
  contactTitle: { fontSize: font.md, fontWeight: '700', color: colors.text, marginBottom: 4 },
  contactSub:   { fontSize: font.sm, color: colors.textMuted, textAlign: 'center', lineHeight: 18, marginBottom: 16 },
  contactBtns:  { flexDirection: 'row', gap: 10 },
  contactBtn:   { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.teal + '10', borderRadius: radius.md, paddingVertical: 12, borderWidth: 1, borderColor: colors.teal + '30' },
  contactBtnText: { fontSize: font.sm, fontWeight: '600', color: colors.teal },
})
