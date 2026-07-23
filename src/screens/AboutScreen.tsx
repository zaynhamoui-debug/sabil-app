import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Linking, Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, font, radius } from '../theme'

const VALUES = [
  { icon: 'heart-outline' as const,         title: 'Dignity',      desc: 'Every person deserves to be treated with respect and compassion.' },
  { icon: 'people-outline' as const,        title: 'Equity',       desc: 'We meet each family where they are with individualized support.' },
  { icon: 'shield-checkmark-outline' as const, title: 'Integrity',  desc: 'We are accountable to our community and transparent in all we do.' },
  { icon: 'globe-outline' as const,         title: 'Community',    desc: 'Rooted in the belief that strong communities lift everyone up.' },
]

async function openLink(url: string) {
  try {
    await Linking.openURL(url)
  } catch {
    Alert.alert('Error', 'Could not open this link.')
  }
}

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Logo Block */}
        <View style={styles.logoBlock}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoLetter}>S</Text>
          </View>
          <Text style={styles.orgName}>SABIL USA</Text>
          <Text style={styles.orgTagline}>Health & Human Services</Text>
        </View>

        {/* Mission */}
        <View style={styles.missionCard}>
          <Text style={styles.missionLabel}>Our Mission</Text>
          <Text style={styles.missionText}>
            "Sabil is a health and human services nonprofit that strives to improve an individual and family's quality of life by readily providing them with equitable food, health, and financial security with dignity and respect."
          </Text>
        </View>

        {/* Values */}
        <Text style={styles.sectionTitle}>Our Values</Text>
        <View style={styles.valuesGrid}>
          {VALUES.map(v => (
            <View key={v.title} style={styles.valueCard}>
              <View style={styles.valueIcon}>
                <Ionicons name={v.icon} size={22} color={colors.primary} />
              </View>
              <Text style={styles.valueTitle}>{v.title}</Text>
              <Text style={styles.valueDesc}>{v.desc}</Text>
            </View>
          ))}
        </View>

        {/* Programs */}
        <Text style={styles.sectionTitle}>What We Do</Text>
        {[
          { icon: 'basket-outline' as const,       color: colors.green,  title: 'Food Distribution',     desc: 'Weekly food pantry and emergency groceries for families facing food insecurity.' },
          { icon: 'home-outline' as const,          color: colors.teal,   title: 'Rental Assistance',     desc: 'Emergency financial support to prevent evictions and keep families housed.' },
          { icon: 'medkit-outline' as const,        color: '#E05A2B',     title: 'Health Services',       desc: 'Connecting community members to health resources, screenings, and referrals.' },
          { icon: 'cash-outline' as const,          color: '#7B5EA7',     title: 'Financial Security',    desc: 'Counseling and direct assistance to build long-term economic stability.' },
        ].map(p => (
          <View key={p.title} style={styles.programRow}>
            <View style={[styles.programIcon, { backgroundColor: p.color + '18' }]}>
              <Ionicons name={p.icon} size={22} color={p.color} />
            </View>
            <View style={styles.programText}>
              <Text style={styles.programTitle}>{p.title}</Text>
              <Text style={styles.programDesc}>{p.desc}</Text>
            </View>
          </View>
        ))}

        {/* Contact */}
        <Text style={styles.sectionTitle}>Get in Touch</Text>
        <View style={styles.contactCard}>
          <TouchableOpacity style={styles.contactRow} onPress={() => openLink('https://www.sabil.us')}>
            <View style={[styles.contactIcon, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="globe-outline" size={20} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.contactLabel}>Website</Text>
              <Text style={styles.contactValue}>www.sabil.us</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.contactRow} onPress={() => openLink('mailto:info@sabil.us')}>
            <View style={[styles.contactIcon, { backgroundColor: colors.teal + '20' }]}>
              <Ionicons name="mail-outline" size={20} color={colors.teal} />
            </View>
            <View>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>info@sabil.us</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.contactRow} onPress={() => openLink('https://www.sabil.us/volunteer/')}>
            <View style={[styles.contactIcon, { backgroundColor: colors.green + '20' }]}>
              <Ionicons name="people-outline" size={20} color={colors.green} />
            </View>
            <View>
              <Text style={styles.contactLabel}>Volunteer Inquiries</Text>
              <Text style={styles.contactValue}>www.sabil.us/volunteer</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        {/* Tax Info */}
        <View style={styles.taxCard}>
          <Ionicons name="document-text-outline" size={20} color={colors.green} />
          <View style={{ flex: 1 }}>
            <Text style={styles.taxTitle}>501(c)(3) Nonprofit</Text>
            <Text style={styles.taxDesc}>Sabil USA is a registered nonprofit. All donations are tax-deductible to the fullest extent permitted by law.</Text>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.ctaBtn} onPress={() => openLink('https://www.sabil.us/donate-today/')}>
          <Ionicons name="heart" size={18} color={colors.text} />
          <Text style={styles.ctaBtnText}>Support Our Mission</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Sabil USA App · v1.0.0</Text>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: colors.offWhite },
  scroll:       { padding: 20 },
  logoBlock:    { alignItems: 'center', marginBottom: 28, gap: 8 },
  logoCircle:   { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  logoLetter:   { fontSize: 40, fontWeight: '900', color: colors.text },
  orgName:      { fontSize: font.xl, fontWeight: '900', color: colors.text, letterSpacing: 2 },
  orgTagline:   { fontSize: font.base, color: colors.textMuted },
  missionCard: {
    backgroundColor: colors.green, borderRadius: radius.xl,
    padding: 20, marginBottom: 28,
  },
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
  programIcon:  { width: 48, height: 48, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  programText:  { flex: 1 },
  programTitle: { fontSize: font.base, fontWeight: '700', color: colors.text, marginBottom: 2 },
  programDesc:  { fontSize: font.sm, color: colors.textMuted, lineHeight: 17 },
  contactCard: {
    backgroundColor: colors.white, borderRadius: radius.lg, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
    overflow: 'hidden',
  },
  contactRow:   { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  contactIcon:  { width: 40, height: 40, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  contactLabel: { fontSize: font.sm, color: colors.textMuted },
  contactValue: { fontSize: font.base, fontWeight: '600', color: colors.text },
  divider:      { height: 1, backgroundColor: colors.border, marginHorizontal: 16 },
  taxCard: {
    flexDirection: 'row', gap: 12, alignItems: 'flex-start',
    backgroundColor: colors.green + '10', borderRadius: radius.lg,
    padding: 16, marginBottom: 20,
  },
  taxTitle:     { fontSize: font.base, fontWeight: '700', color: colors.green, marginBottom: 4 },
  taxDesc:      { fontSize: font.sm, color: colors.textMuted, lineHeight: 18 },
  ctaBtn: {
    backgroundColor: colors.primary, borderRadius: radius.lg,
    paddingVertical: 16, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8, marginBottom: 20,
  },
  ctaBtnText:   { fontSize: font.md, fontWeight: '800', color: colors.text },
  version:      { textAlign: 'center', fontSize: font.sm, color: colors.textMuted },
})
