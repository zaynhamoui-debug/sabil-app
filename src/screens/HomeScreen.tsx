import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions, Linking, Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { TabParamList } from '../navigation/RootNavigator'
import { colors, font, radius } from '../theme'
import Logo from '../components/Logo'
import LanguagePicker from '../components/LanguagePicker'
import { useLang } from '../context/LanguageContext'

const { width } = Dimensions.get('window')
type Nav = BottomTabNavigationProp<TabParamList>

const HERO_IMAGE    = 'https://www.sabil.us/wp-content/uploads/2023/07/ggg.png'
const ABOUT_PHOTO   = 'https://www.sabil.us/wp-content/uploads/2026/03/PHOTO-2023-06-19-09-35-25-1.webp'
const EVENT_IMAGE   = 'https://www.sabil.us/wp-content/uploads/2026/03/2024-10-20-Day-of-Dignity-128-scaled-1.webp'

export default function HomeScreen() {
  const navigation = useNavigation<Nav>()
  const { t } = useLang()

  const PROGRAMS = [
    { icon: 'basket-outline' as const, title: t.prog_food,    description: t.prog_food_desc,    color: colors.green },
    { icon: 'home-outline' as const,   title: t.prog_rental,  description: t.prog_rental_desc,  color: colors.teal },
    { icon: 'medkit-outline' as const, title: t.prog_health,  description: t.prog_health_desc,  color: '#E05A2B' },
    { icon: 'cash-outline' as const,   title: t.prog_finance, description: t.prog_finance_desc, color: '#7B5EA7' },
  ]

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Logo width={130} height={50} />
          <View style={styles.headerRight}>
            <LanguagePicker />
            <TouchableOpacity style={styles.donateBtn} onPress={() => navigation.navigate('Donate')}>
              <Ionicons name="heart" size={14} color={colors.text} />
              <Text style={styles.donateBtnText}>{t.donate}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero — full-width image with overlay */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay}>
            <View style={styles.heroBadge}>
              <Ionicons name="leaf" size={11} color={colors.white} />
              <Text style={styles.heroBadgeText}>{t.healthHumanServices}</Text>
            </View>
            <Text style={styles.heroTitle}>{t.heroTitle}</Text>
            <Text style={styles.heroSub}>{t.heroSub}</Text>
            <View style={styles.heroActions}>
              <TouchableOpacity style={styles.heroPrimaryBtn} onPress={() => navigation.navigate('Services')}>
                <Text style={styles.heroPrimaryBtnText}>{t.applyForAssistance}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroSecondaryBtn} onPress={() => navigation.navigate('Donate')}>
                <Text style={styles.heroSecondaryBtnText}>{t.donate}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickGrid}>
          {[
            { icon: 'heart' as const,         label: t.donate,    tab: 'Donate' as const,    bg: colors.primary, fg: colors.text },
            { icon: 'people' as const,         label: t.volunteer, tab: 'Volunteer' as const, bg: colors.green,   fg: colors.white },
            { icon: 'apps' as const,           label: t.services,  tab: 'Services' as const,  bg: colors.teal,    fg: colors.white },
            { icon: 'information-circle' as const, label: t.about, tab: 'About' as const,     bg: '#EDEDED',      fg: colors.gray },
          ].map(a => (
            <TouchableOpacity key={a.label} style={[styles.quickCard, { backgroundColor: a.bg }]} onPress={() => navigation.navigate(a.tab)}>
              <Ionicons name={a.icon} size={26} color={a.fg} />
              <Text style={[styles.quickLabel, { color: a.fg }]}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mission */}
        <View style={styles.missionCard}>
          <Text style={styles.missionEyebrow}>{t.ourMission}</Text>
          <Text style={styles.missionText}>{t.missionQuote}</Text>
        </View>

        {/* Impact Stats */}
        <View style={styles.statsRow}>
          {[
            { num: '500+', label: t.familiesServed },
            { num: '10K+', label: t.mealsDistributed },
            { num: '100+', label: t.communityVolunteers },
          ].map(s => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statNum}>{s.num}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Community Photo */}
        <View style={styles.photoSection}>
          <Image source={{ uri: ABOUT_PHOTO }} style={styles.communityPhoto} resizeMode="cover" />
          <View style={styles.photoCaption}>
            <Ionicons name="people" size={14} color={colors.green} />
            <Text style={styles.photoCaptionText}>{t.buildingStrongerCommunities}</Text>
          </View>
        </View>

        {/* Programs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t.ourPrograms}</Text>
          <View style={styles.underline} />
        </View>
        {PROGRAMS.map(p => (
          <View key={p.title} style={styles.programCard}>
            <View style={[styles.programIcon, { backgroundColor: p.color + '18' }]}>
              <Ionicons name={p.icon} size={24} color={p.color} />
            </View>
            <View style={styles.programText}>
              <Text style={styles.programTitle}>{p.title}</Text>
              <Text style={styles.programDesc}>{p.description}</Text>
            </View>
          </View>
        ))}

        {/* Event Photo Banner */}
        <View style={styles.eventWrap}>
          <Image source={{ uri: EVENT_IMAGE }} style={styles.eventImage} resizeMode="cover" />
          <View style={styles.eventOverlay}>
            <Text style={styles.eventLabel}>{t.dayOfDignityEvent}</Text>
            <Text style={styles.eventSub}>{t.servingWithDignity}</Text>
            <TouchableOpacity style={styles.eventBtn} onPress={() => navigation.navigate('Volunteer')}>
              <Text style={styles.eventBtnText}>{t.joinAsVolunteer}</Text>
              <Ionicons name="arrow-forward" size={14} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Apply CTA */}
        <TouchableOpacity style={styles.applyCTA} onPress={() => navigation.navigate('Services')}>
          <View>
            <Text style={styles.applyTitle}>{t.needAssistance}</Text>
            <Text style={styles.applySub}>{t.submitApplicationToday}</Text>
          </View>
          <View style={styles.applyArrow}>
            <Ionicons name="arrow-forward" size={18} color={colors.text} />
          </View>
        </TouchableOpacity>

        {/* Footer Contact */}
        <View style={styles.footer}>
          <Logo width={100} height={38} />
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.sabil.us')}>
              <Text style={styles.footerLink}>www.sabil.us</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>·</Text>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:info@sabil.us')}>
              <Text style={styles.footerLink}>info@sabil.us</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: colors.offWhite },
  scroll:  { paddingBottom: 20 },
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  donateBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: 14, paddingVertical: 8 },
  donateBtnText: { fontSize: font.sm, fontWeight: '700', color: colors.text },

  // Hero
  heroWrap:    { marginHorizontal: 16, borderRadius: radius.xl, overflow: 'hidden', marginBottom: 20, height: 380 },
  heroImage:   { position: 'absolute', width: '100%', height: '100%' },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(15,40,20,0.62)', padding: 22, justifyContent: 'flex-end' },
  heroBadge:   { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 14 },
  heroBadgeText: { fontSize: 11, color: colors.white, fontWeight: '600' },
  heroTitle:   { fontSize: 26, fontWeight: '900', color: colors.white, lineHeight: 32, marginBottom: 10 },
  heroSub:     { fontSize: font.sm, color: 'rgba(255,255,255,0.80)', lineHeight: 20, marginBottom: 20 },
  heroActions: { flexDirection: 'row', gap: 10 },
  heroPrimaryBtn:  { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: 18, paddingVertical: 11 },
  heroPrimaryBtnText: { fontSize: font.sm, fontWeight: '800', color: colors.text },
  heroSecondaryBtn:  { backgroundColor: 'rgba(255,255,255,0.20)', borderRadius: radius.full, paddingHorizontal: 18, paddingVertical: 11, borderWidth: 1, borderColor: 'rgba(255,255,255,0.40)' },
  heroSecondaryBtnText: { fontSize: font.sm, fontWeight: '700', color: colors.white },

  // Quick Grid
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 16, marginBottom: 20 },
  quickCard: { width: (width - 52) / 2, borderRadius: radius.lg, padding: 18, alignItems: 'center', gap: 8 },
  quickLabel: { fontSize: font.base, fontWeight: '700' },

  // Mission
  missionCard: { marginHorizontal: 16, backgroundColor: colors.green, borderRadius: radius.xl, padding: 20, marginBottom: 20 },
  missionEyebrow: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  missionText: { fontSize: font.base, color: colors.white, lineHeight: 24, fontStyle: 'italic' },

  // Stats
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: colors.primary + '20', borderRadius: radius.md, padding: 14, alignItems: 'center' },
  statNum:  { fontSize: 22, fontWeight: '900', color: colors.green },
  statLabel: { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginTop: 3, lineHeight: 14 },

  // Community Photo
  photoSection: { marginHorizontal: 16, marginBottom: 24 },
  communityPhoto: { width: '100%', height: 200, borderRadius: radius.xl, backgroundColor: colors.lightGray },
  photoCaption: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, paddingHorizontal: 4 },
  photoCaptionText: { fontSize: font.sm, color: colors.textMuted, fontStyle: 'italic' },

  // Programs
  sectionHeader: { paddingHorizontal: 16, marginBottom: 14 },
  sectionTitle:  { fontSize: font.lg, fontWeight: '800', color: colors.text },
  underline:     { width: 36, height: 3, backgroundColor: colors.primary, borderRadius: 2, marginTop: 4 },
  programCard: {
    flexDirection: 'row', gap: 14, alignItems: 'flex-start',
    backgroundColor: colors.white, borderRadius: radius.md,
    marginHorizontal: 16, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  programIcon: { width: 48, height: 48, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  programText: { flex: 1 },
  programTitle: { fontSize: font.base, fontWeight: '700', color: colors.text, marginBottom: 3 },
  programDesc:  { fontSize: font.sm, color: colors.textMuted, lineHeight: 18 },

  // Event Photo Banner
  eventWrap:    { marginHorizontal: 16, borderRadius: radius.xl, overflow: 'hidden', marginTop: 10, marginBottom: 16, height: 220 },
  eventImage:   { position: 'absolute', width: '100%', height: '100%', backgroundColor: colors.lightGray },
  eventOverlay: { flex: 1, backgroundColor: 'rgba(10,30,18,0.60)', padding: 20, justifyContent: 'flex-end' },
  eventLabel:   { fontSize: font.md, fontWeight: '800', color: colors.white, marginBottom: 4 },
  eventSub:     { fontSize: font.sm, color: 'rgba(255,255,255,0.75)', marginBottom: 14 },
  eventBtn:     { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.primary, borderRadius: radius.full, alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 9 },
  eventBtnText: { fontSize: font.sm, fontWeight: '700', color: colors.text },

  // Apply CTA
  applyCTA: {
    marginHorizontal: 16, backgroundColor: colors.primary, borderRadius: radius.lg,
    padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20,
  },
  applyTitle: { fontSize: font.md, fontWeight: '800', color: colors.text },
  applySub:   { fontSize: font.sm, color: colors.text + 'BB', marginTop: 2 },
  applyArrow: { width: 40, height: 40, borderRadius: radius.full, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },

  // Footer
  footer:      { alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingTop: 8 },
  footerLinks: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  footerLink:  { fontSize: font.sm, color: colors.teal, fontWeight: '500' },
  footerDot:   { fontSize: font.sm, color: colors.border },
})
