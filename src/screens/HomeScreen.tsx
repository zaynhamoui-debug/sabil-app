import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { TabParamList } from '../navigation/RootNavigator'
import { colors, font, radius } from '../theme'

const { width } = Dimensions.get('window')

type Nav = BottomTabNavigationProp<TabParamList>

const programs = [
  {
    icon: 'basket-outline' as const,
    title: 'Food Distribution',
    description: 'Weekly food pantry providing nutritious groceries to families in need.',
    color: colors.green,
  },
  {
    icon: 'home-outline' as const,
    title: 'Rental Assistance',
    description: 'Emergency financial support to help families stay housed.',
    color: colors.teal,
  },
  {
    icon: 'heart-outline' as const,
    title: 'Health Services',
    description: 'Connecting community members with health resources and support.',
    color: '#E05A2B',
  },
  {
    icon: 'cash-outline' as const,
    title: 'Financial Security',
    description: 'Counseling and assistance to build long-term financial stability.',
    color: '#7B5EA7',
  },
]

export default function HomeScreen() {
  const navigation = useNavigation<Nav>()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>SABIL USA</Text>
            <Text style={styles.logoSub}>Health & Human Services</Text>
          </View>
          <View style={styles.headerBadge}>
            <Ionicons name="leaf" size={20} color={colors.green} />
          </View>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Serving With{'\n'}Dignity & Respect</Text>
          <Text style={styles.heroText}>
            Sabil USA improves the quality of life for individuals and families by providing equitable food, health, and financial security.
          </Text>
          <TouchableOpacity style={styles.heroBtn} onPress={() => navigation.navigate('Donate')}>
            <Text style={styles.heroBtnText}>Donate Today</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>How Can We Help?</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Donate')}>
            <Ionicons name="heart" size={28} color={colors.text} />
            <Text style={styles.actionLabel}>Donate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.green }]} onPress={() => navigation.navigate('Volunteer')}>
            <Ionicons name="people" size={28} color={colors.white} />
            <Text style={[styles.actionLabel, { color: colors.white }]}>Volunteer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.teal }]} onPress={() => navigation.navigate('Appointment')}>
            <Ionicons name="calendar" size={28} color={colors.white} />
            <Text style={[styles.actionLabel, { color: colors.white }]}>Get Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.lightGray }]} onPress={() => navigation.navigate('About')}>
            <Ionicons name="information-circle" size={28} color={colors.gray} />
            <Text style={[styles.actionLabel, { color: colors.gray }]}>About Us</Text>
          </TouchableOpacity>
        </View>

        {/* Impact Stats */}
        <View style={styles.statsRow}>
          {[
            { num: '500+', label: 'Families Served' },
            { num: '10K+', label: 'Meals Distributed' },
            { num: '100+', label: 'Volunteers' },
          ].map(s => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statNum}>{s.num}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Programs */}
        <Text style={styles.sectionTitle}>Our Programs</Text>
        {programs.map(p => (
          <View key={p.title} style={styles.programCard}>
            <View style={[styles.programIcon, { backgroundColor: p.color + '20' }]}>
              <Ionicons name={p.icon} size={24} color={p.color} />
            </View>
            <View style={styles.programText}>
              <Text style={styles.programTitle}>{p.title}</Text>
              <Text style={styles.programDesc}>{p.description}</Text>
            </View>
          </View>
        ))}

        {/* Mission Banner */}
        <View style={styles.missionBanner}>
          <Ionicons name="sparkles" size={20} color={colors.primary} />
          <Text style={styles.missionText}>
            "Providing equitable support with dignity and respect to every individual we serve."
          </Text>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: colors.offWhite },
  scroll:      { padding: 20 },
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  logo:        { fontSize: font.lg, fontWeight: '800', color: colors.text, letterSpacing: 1 },
  logoSub:     { fontSize: font.sm, color: colors.textMuted, marginTop: 2 },
  headerBadge: { width: 40, height: 40, borderRadius: radius.full, backgroundColor: colors.green + '15', alignItems: 'center', justifyContent: 'center' },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: 24,
    marginBottom: 28,
  },
  heroTitle:   { fontSize: font.xxl, fontWeight: '800', color: colors.text, lineHeight: 36, marginBottom: 10 },
  heroText:    { fontSize: font.base, color: colors.text + 'CC', lineHeight: 22, marginBottom: 20 },
  heroBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.white, alignSelf: 'flex-start',
    borderRadius: radius.full, paddingHorizontal: 18, paddingVertical: 10,
  },
  heroBtnText: { fontSize: font.base, fontWeight: '700', color: colors.text },
  sectionTitle: { fontSize: font.md, fontWeight: '700', color: colors.text, marginBottom: 14 },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 },
  actionCard: {
    width: (width - 50) / 2,
    borderRadius: radius.lg,
    padding: 18,
    alignItems: 'center',
    gap: 8,
  },
  actionLabel: { fontSize: font.base, fontWeight: '700', color: colors.text },
  statsRow:    { flexDirection: 'row', gap: 10, marginBottom: 28 },
  statCard: {
    flex: 1, backgroundColor: colors.white,
    borderRadius: radius.md, padding: 14, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  statNum:     { fontSize: font.xl, fontWeight: '800', color: colors.green },
  statLabel:   { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginTop: 2 },
  programCard: {
    backgroundColor: colors.white, borderRadius: radius.md,
    padding: 16, flexDirection: 'row', gap: 14, alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  programIcon:  { width: 48, height: 48, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  programText:  { flex: 1 },
  programTitle: { fontSize: font.base, fontWeight: '700', color: colors.text, marginBottom: 3 },
  programDesc:  { fontSize: font.sm, color: colors.textMuted, lineHeight: 18 },
  missionBanner: {
    backgroundColor: colors.green + '12',
    borderLeftWidth: 3, borderLeftColor: colors.green,
    borderRadius: radius.md, padding: 16, marginTop: 10, gap: 8,
  },
  missionText: { fontSize: font.base, color: colors.green, fontStyle: 'italic', lineHeight: 22 },
})
