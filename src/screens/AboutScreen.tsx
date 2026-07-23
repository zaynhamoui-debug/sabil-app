import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Linking, Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, font, radius } from '../theme'
import Logo from '../components/Logo'
import LanguagePicker from '../components/LanguagePicker'
import { useLang } from '../context/LanguageContext'

async function openLink(url: string) {
  try { await Linking.openURL(url) } catch { Alert.alert('Error', 'Could not open this link.') }
}

export default function AboutScreen() {
  const { t, isRTL } = useLang()

  const VALUES = [
    { icon: 'heart-outline' as const,            title: t.val_dignity,   desc: t.val_dignity_desc },
    { icon: 'people-outline' as const,           title: t.val_equity,    desc: t.val_equity_desc },
    { icon: 'shield-checkmark-outline' as const, title: t.val_integrity, desc: t.val_integrity_desc },
    { icon: 'globe-outline' as const,            title: t.val_community, desc: t.val_community_desc },
  ]

  const PROGRAMS = [
    { icon: 'basket-outline' as const, color: colors.green, title: t.prog_food,    desc: t.prog_food_desc },
    { icon: 'home-outline' as const,   color: colors.teal,  title: t.prog_rental,  desc: t.prog_rental_desc },
    { icon: 'medkit-outline' as const, color: '#E05A2B',    title: t.prog_health,  desc: t.prog_health_desc },
    { icon: 'cash-outline' as const,   color: '#7B5EA7',    title: t.prog_finance, desc: t.prog_finance_desc },
  ]

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Top header with language picker */}
        <View style={[styles.topHeader, isRTL && styles.rowReverse]}>
          <View style={{ flex: 1 }} />
          <LanguagePicker />
        </View>

        {/* Logo Block */}
        <View style={styles.logoBlock}>
          <Logo width={200} height={76} style={{ marginBottom: 4 }} />
          <Text style={styles.orgTagline}>{t.healthHumanServices}</Text>
        </View>

        {/* Mission */}
        <View style={styles.missionCard}>
          <Text style={[styles.missionLabel, isRTL && styles.textRight]}>{t.ourMission}</Text>
          <Text style={[styles.missionText, isRTL && styles.textRight]}>
            "Sabil is a health and human services nonprofit that strives to improve an individual and family's quality of life by readily providing them with equitable food, health, and financial security with dignity and respect."
          </Text>
        </View>

        {/* Values */}
        <Text style={[styles.sectionTitle, isRTL && styles.textRight]}>{t.ourValues}</Text>
        <View style={styles.valuesGrid}>
          {VALUES.map(v => (
            <View key={v.title} style={styles.valueCard}>
              <View style={styles.valueIcon}>
                <Ionicons name={v.icon} size={22} color={colors.primary} />
              </View>
              <Text style={[styles.valueTitle, isRTL && styles.textRight]}>{v.title}</Text>
              <Text style={[styles.valueDesc, isRTL && styles.textRight]}>{v.desc}</Text>
            </View>
          ))}
        </View>

        {/* Programs */}
        <Text style={[styles.sectionTitle, isRTL && styles.textRight]}>{t.whatWeDo}</Text>
        {PROGRAMS.map(p => (
          <View key={p.title} style={[styles.programRow, isRTL && styles.rowReverse]}>
            <View style={[styles.programIcon, { backgroundColor: p.color + '18' }]}>
              <Ionicons name={p.icon} size={22} color={p.color} />
            </View>
            <View style={styles.programText}>
              <Text style={[styles.programTitle, isRTL && styles.textRight]}>{p.title}</Text>
              <Text style={[styles.programDesc, isRTL && styles.textRight]}>{p.desc}</Text>
            </View>
          </View>
        ))}

        {/* Contact */}
        <Text style={[styles.sectionTitle, isRTL && styles.textRight]}>{t.getInTouch}</Text>
        <View style={styles.contactCard}>
          <TouchableOpacity style={[styles.contactRow, isRTL && styles.rowReverse]} onPress={() => openLink('https://www.sabil.us')}>
            <View style={[styles.contactIcon, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="globe-outline" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.contactLabel, isRTL && styles.textRight]}>{t.website}</Text>
              <Text style={[styles.contactValue, isRTL && styles.textRight]}>www.sabil.us</Text>
            </View>
            <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={[styles.contactRow, isRTL && styles.rowReverse]} onPress={() => openLink('mailto:info@sabil.us')}>
            <View style={[styles.contactIcon, { backgroundColor: colors.teal + '20' }]}>
              <Ionicons name="mail-outline" size={20} color={colors.teal} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.contactLabel, isRTL && styles.textRight]}>{t.email}</Text>
              <Text style={[styles.contactValue, isRTL && styles.textRight]}>info@sabil.us</Text>
            </View>
            <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={[styles.contactRow, isRTL && styles.rowReverse]} onPress={() => openLink('https://www.sabil.us/volunteer/')}>
            <View style={[styles.contactIcon, { backgroundColor: colors.green + '20' }]}>
              <Ionicons name="people-outline" size={20} color={colors.green} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.contactLabel, isRTL && styles.textRight]}>{t.volunteerInquiries}</Text>
              <Text style={[styles.contactValue, isRTL && styles.textRight]}>www.sabil.us/volunteer</Text>
            </View>
            <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={16} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Tax Info */}
        <View style={[styles.taxCard, isRTL && styles.rowReverse]}>
          <Ionicons name="document-text-outline" size={20} color={colors.green} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.taxTitle, isRTL && styles.textRight]}>{t.nonprofitTitle}</Text>
            <Text style={[styles.taxDesc, isRTL && styles.textRight]}>{t.nonprofitDesc}</Text>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.ctaBtn} onPress={() => openLink('https://www.sabil.us/donate-today/')}>
          <Ionicons name="heart" size={18} color={colors.text} />
          <Text style={styles.ctaBtnText}>{t.supportMission}</Text>
        </TouchableOpacity>

        <Text style={styles.version}>{t.appVersion}</Text>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: colors.offWhite },
  scroll:       { padding: 20 },
  topHeader:    { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8 },
  rowReverse:   { flexDirection: 'row-reverse' },
  textRight:    { textAlign: 'right' },
  logoBlock:    { alignItems: 'center', marginBottom: 28, gap: 8 },
  orgTagline:   { fontSize: font.base, color: colors.textMuted, textAlign: 'center' },
  missionCard:  { backgroundColor: colors.green, borderRadius: radius.xl, padding: 20, marginBottom: 28 },
  missionLabel: { fontSize: font.sm, fontWeight: '700', color: colors.white + 'BB', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  missionText:  { fontSize: font.base, color: colors.white, lineHeight: 24, fontStyle: 'italic' },
  sectionTitle: { fontSize: font.md, fontWeight: '700', color: colors.text, marginBottom: 14 },
  valuesGrid:   { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 },
  valueCard: {
    width: '47%', backgroundColor: colors.white, borderRadius: radius.lg,
    padding: 16, gap: 6,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  valueIcon:    { width: 40, height: 40, borderRadius: radius.md, backgroundColor: colors.primary + '20', alignItems: 'center', justifyContent: 'center' },
  valueTitle:   { fontSize: font.base, fontWeight: '700', color: colors.text },
  valueDesc:    { fontSize: font.sm, color: colors.textMuted, lineHeight: 17 },
  programRow: {
    flexDirection: 'row', gap: 14, alignItems: 'center',
    backgroundColor: colors.white, borderRadius: radius.md, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
  },
  programIcon:  { width: 48, height: 48, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  programText:  { flex: 1 },
  programTitle: { fontSize: font.base, fontWeight: '700', color: colors.text, marginBottom: 2 },
  programDesc:  { fontSize: font.sm, color: colors.textMuted, lineHeight: 17 },
  contactCard:  { backgroundColor: colors.white, borderRadius: radius.lg, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, overflow: 'hidden' },
  contactRow:   { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  contactIcon:  { width: 40, height: 40, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  contactLabel: { fontSize: font.sm, color: colors.textMuted },
  contactValue: { fontSize: font.base, fontWeight: '600', color: colors.text },
  divider:      { height: 1, backgroundColor: colors.border, marginHorizontal: 16 },
  taxCard:      { flexDirection: 'row', gap: 12, alignItems: 'flex-start', backgroundColor: colors.green + '10', borderRadius: radius.lg, padding: 16, marginBottom: 20 },
  taxTitle:     { fontSize: font.base, fontWeight: '700', color: colors.green, marginBottom: 4 },
  taxDesc:      { fontSize: font.sm, color: colors.textMuted, lineHeight: 18 },
  ctaBtn:       { backgroundColor: colors.primary, borderRadius: radius.lg, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 },
  ctaBtnText:   { fontSize: font.md, fontWeight: '800', color: colors.text },
  version:      { textAlign: 'center', fontSize: font.sm, color: colors.textMuted },
})
