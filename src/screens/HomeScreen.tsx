import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions, Linking,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { TabParamList } from '../navigation/RootNavigator'
import { colors, font, radius } from '../theme'
import Logo from '../components/Logo'

const { width } = Dimensions.get('window')
type Nav = BottomTabNavigationProp<TabParamList>

const PROGRAMS = [
  {
    icon: 'basket-outline' as const,
    title: 'Food Distribution',
    description: 'Food distribution being one of our biggest services. We provide nutritious groceries to families facing food insecurity.',
    color: colors.green,
  },
  {
    icon: 'home-outline' as const,
    title: 'Rental Assistance',
    description: 'Emergency financial support to help families avoid eviction and maintain stable housing.',
    color: colors.teal,
  },
  {
    icon: 'medkit-outline' as const,
    title: 'Health Services',
    description: 'Connecting community members with equitable health resources, screenings, and referrals.',
    color: '#E05A2B',
  },
  {
    icon: 'cash-outline' as const,
    title: 'Financial Security',
    description: 'Counseling and direct assistance to build long-term financial stability for individuals and families.',
    color: '#7B5EA7',
  },
]

export default function HomeScreen() {
  const navigation = useNavigation<Nav>()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Logo width={140} height={52} />
          <TouchableOpacity style={styles.donateHeaderBtn} onPress={() => navigation.navigate('Donate')}>
            <Text style={styles.donateHeaderText}>Donate</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Ionicons name="leaf" size={12} color={colors.green} />
            <Text style={styles.heroBadgeText}>Health & Human Services Nonprofit</Text>
          </View>
          <Text style={styles.heroTitle}>Serving Our{'\n'}Community With{'\n'}Dignity & Respect</Text>
          <Text style={styles.heroText}>
            Providing equitable food, health, and financial security to individuals and families in need.
          </Text>
          <View style={styles.heroActions}>
            <TouchableOpacity style={styles.heroBtn} onPress={() => navigation.navigate('Apply')}>
              <Text style={styles.heroBtnText}>Apply for Assistance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroSecondBtn} onPress={() => navigation.navigate('Donate')}>
              <Ionicons name="heart" size={16} color={colors.primary} />
              <Text style={styles.heroSecondBtnText}>Donate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickGrid}>
          {[
            { icon: 'heart' as const,     label: 'Donate',    tab: 'Donate' as const,    bg: colors.primary, fg: colors.text },
            { icon: 'people' as const,    label: 'Volunteer', tab: 'Volunteer' as const, bg: colors.green,   fg: colors.white },
            { icon: 'document-text' as const, label: 'Apply',  tab: 'Apply' as const,   bg: colors.teal,    fg: colors.white },
            { icon: 'information-circle' as const, label: 'About Us', tab: 'About' as const, bg: '#F2F2F2', fg: colors.gray },
          ].map(a => (
            <TouchableOpacity key={a.label} style={[styles.quickCard, { backgroundColor: a.bg }]} onPress={() => navigation.navigate(a.tab)}>
              <Ionicons name={a.icon} size={26} color={a.fg} />
              <Text style={[styles.quickLabel, { color: a.fg }]}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mission */}
        <View style={styles.missionBlock}>
          <View style={styles.missionHeader}>
            <View style={styles.missionLine} />
            <Text style={styles.missionLabel}>Our Mission</Text>
            <View style={styles.missionLine} />
          </View>
          <Text style={styles.missionText}>
            "Sabil is a health and human services nonprofit that strives to improve an individual and family's quality of life by readily providing them with equitable food, health, and financial security with dignity and respect."
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { num: '500+', label: 'Families\nServed' },
            { num: '10K+', label: 'Meals\nDistributed' },
            { num: '100+', label: 'Community\nVolunteers' },
          ].map(s => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statNum}>{s.num}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Programs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Programs</Text>
          <View style={styles.sectionTitleUnderline} />
        </View>

        {PROGRAMS.map(p => (
          <View key={p.title} style={styles.programCard}>
            <View style={[styles.programIconWrap, { backgroundColor: p.color + '18' }]}>
              <Ionicons name={p.icon} size={26} color={p.color} />
            </View>
            <View style={styles.programContent}>
              <Text style={styles.programTitle}>{p.title}</Text>
              <Text style={styles.programDesc}>{p.description}</Text>
            </View>
          </View>
        ))}

        {/* CTA Banner */}
        <TouchableOpacity style={styles.ctaBanner} onPress={() => navigation.navigate('Apply')}>
          <View>
            <Text style={styles.ctaTitle}>Need Assistance?</Text>
            <Text style={styles.ctaSubtitle}>Apply for our programs today</Text>
          </View>
          <View style={styles.ctaArrow}>
            <Ionicons name="arrow-forward" size={20} color={colors.text} />
          </View>
        </TouchableOpacity>

        {/* Volunteer Banner */}
        <TouchableOpacity style={styles.volunteerBanner} onPress={() => navigation.navigate('Volunteer')}>
          <Ionicons name="people-outline" size={24} color={colors.white} />
          <View style={{ flex: 1 }}>
            <Text style={styles.volunteerTitle}>Become a Volunteer</Text>
            <Text style={styles.volunteerSub}>Join our community and make a difference</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.white + 'AA'} />
        </TouchableOpacity>

        {/* Contact */}
        <View style={styles.contactBar}>
          <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('https://www.sabil.us')}>
            <Ionicons name="globe-outline" size={16} color={colors.teal} />
            <Text style={styles.contactText}>www.sabil.us</Text>
          </TouchableOpacity>
          <View style={styles.contactDot} />
          <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('mailto:info@sabil.us')}>
            <Ionicons name="mail-outline" size={16} color={colors.teal} />
            <Text style={styles.contactText}>info@sabil.us</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: colors.offWhite },
  scroll:       { padding: 20 },
  header:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  donateHeaderBtn: { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: 16, paddingVertical: 8 },
  donateHeaderText: { fontSize: font.sm, fontWeight: '700', color: colors.text },
  hero: {
    backgroundColor: colors.green, borderRadius: radius.xl,
    padding: 24, marginBottom: 20,
  },
  heroBadge:    { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.white + '25', borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start', marginBottom: 14 },
  heroBadgeText: { fontSize: 11, color: colors.white, fontWeight: '600' },
  heroTitle:    { fontSize: 28, fontWeight: '900', color: colors.white, lineHeight: 34, marginBottom: 12 },
  heroText:     { fontSize: font.base, color: colors.white + 'CC', lineHeight: 22, marginBottom: 22 },
  heroActions:  { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  heroBtn:      { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: 20, paddingVertical: 12 },
  heroBtnText:  { fontSize: font.sm, fontWeight: '800', color: colors.text },
  heroSecondBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.white, borderRadius: radius.full, paddingHorizontal: 18, paddingVertical: 12 },
  heroSecondBtnText: { fontSize: font.sm, fontWeight: '700', color: colors.primary },
  quickGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  quickCard:    { width: (width - 50) / 2, borderRadius: radius.lg, padding: 18, alignItems: 'center', gap: 8 },
  quickLabel:   { fontSize: font.base, fontWeight: '700' },
  missionBlock: { backgroundColor: colors.white, borderRadius: radius.lg, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  missionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  missionLine:  { flex: 1, height: 1, backgroundColor: colors.border },
  missionLabel: { fontSize: font.sm, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
  missionText:  { fontSize: font.base, color: colors.text, lineHeight: 24, fontStyle: 'italic' },
  statsRow:     { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: {
    flex: 1, backgroundColor: colors.primary + '18',
    borderRadius: radius.md, padding: 14, alignItems: 'center',
  },
  statNum:      { fontSize: font.xl, fontWeight: '900', color: colors.green },
  statLabel:    { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginTop: 3, lineHeight: 14 },
  sectionHeader: { marginBottom: 14 },
  sectionTitle:  { fontSize: font.lg, fontWeight: '800', color: colors.text },
  sectionTitleUnderline: { width: 40, height: 3, backgroundColor: colors.primary, borderRadius: 2, marginTop: 4 },
  programCard: {
    backgroundColor: colors.white, borderRadius: radius.md,
    padding: 16, flexDirection: 'row', gap: 14, alignItems: 'flex-start',
    marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  programIconWrap: { width: 50, height: 50, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  programContent:  { flex: 1 },
  programTitle:    { fontSize: font.base, fontWeight: '700', color: colors.text, marginBottom: 4 },
  programDesc:     { fontSize: font.sm, color: colors.textMuted, lineHeight: 18 },
  ctaBanner: {
    backgroundColor: colors.primary, borderRadius: radius.lg,
    padding: 20, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginTop: 10, marginBottom: 10,
  },
  ctaTitle:    { fontSize: font.md, fontWeight: '800', color: colors.text },
  ctaSubtitle: { fontSize: font.sm, color: colors.text + 'BB', marginTop: 2 },
  ctaArrow:    { width: 40, height: 40, borderRadius: radius.full, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  volunteerBanner: {
    backgroundColor: colors.green, borderRadius: radius.lg,
    padding: 18, flexDirection: 'row', alignItems: 'center',
    gap: 12, marginBottom: 16,
  },
  volunteerTitle: { fontSize: font.base, fontWeight: '700', color: colors.white },
  volunteerSub:   { fontSize: font.sm, color: colors.white + 'BB', marginTop: 1 },
  contactBar:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  contactItem:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  contactText:    { fontSize: font.sm, color: colors.teal, fontWeight: '500' },
  contactDot:     { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.border },
})
