import React, { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, font, radius } from '../theme'
import Logo from '../components/Logo'
import LanguagePicker from '../components/LanguagePicker'
import { useLang } from '../context/LanguageContext'

interface Form {
  firstName: string; lastName: string; email: string; phone: string; message: string
}

export default function VolunteerScreen() {
  const { t, isRTL } = useLang()
  const [form, setForm]           = useState<Form>({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const [days, setDays]           = useState<number[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const INTERESTS = [
    { id: 'food',    label: t.interest_food,    icon: 'basket-outline' as const },
    { id: 'admin',   label: t.interest_admin,   icon: 'document-text-outline' as const },
    { id: 'events',  label: t.interest_events,  icon: 'megaphone-outline' as const },
    { id: 'health',  label: t.interest_health,  icon: 'heart-outline' as const },
    { id: 'youth',   label: t.interest_youth,   icon: 'people-outline' as const },
    { id: 'driving', label: t.interest_driving, icon: 'car-outline' as const },
  ]

  function toggleDay(i: number) {
    setDays(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }
  function toggleInterest(id: string) {
    setInterests(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }
  function reset() {
    setSubmitted(false)
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' })
    setDays([]); setInterests([])
  }

  async function handleSubmit() {
    if (!form.firstName || !form.lastName || !form.email) {
      Alert.alert(t.missingInfo, t.missingInfoMsg); return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Alert.alert(t.invalidEmail, t.invalidEmailMsg); return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={48} color={colors.white} />
          </View>
          <Text style={styles.successTitle}>{t.thankYou}</Text>
          <Text style={[styles.successText, isRTL && styles.textRight]}>
            {t.volunteerSuccessText}
          </Text>
          <TouchableOpacity style={styles.successBtn} onPress={reset}>
            <Text style={styles.successBtnText}>{t.submitAnother}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {/* Header */}
          <View style={[styles.topHeader, isRTL && styles.rowReverse]}>
            <Logo width={140} height={52} />
            <LanguagePicker />
          </View>

          <View style={styles.header}>
            <View style={[styles.headerIcon, { backgroundColor: colors.green }]}>
              <Ionicons name="people" size={28} color={colors.white} />
            </View>
            <Text style={[styles.title, isRTL && styles.textRight]}>{t.volunteerWithUs}</Text>
            <Text style={[styles.subtitle, isRTL && styles.textRight]}>{t.volunteerSubtitle}</Text>
          </View>

          {/* Why Volunteer */}
          <View style={styles.whyCard}>
            {[t.directImpact, t.meaningfulConnections, t.gainSkills].map(text => (
              <View key={text} style={[styles.whyRow, isRTL && styles.rowReverse]}>
                <Ionicons name="checkmark-circle" size={18} color={colors.green} />
                <Text style={[styles.whyText, isRTL && styles.textRight]}>{text}</Text>
              </View>
            ))}
          </View>

          {/* Personal Info */}
          <Text style={[styles.sectionLabel, isRTL && styles.textRight]}>{t.yourInformation}</Text>
          <View style={[styles.row, isRTL && styles.rowReverse]}>
            <View style={[styles.inputWrap, { flex: 1 }]}>
              <Text style={[styles.fieldLabel, isRTL && styles.textRight]}>{t.firstName} *</Text>
              <TextInput
                style={[styles.input, isRTL && styles.textRight]}
                value={form.firstName}
                onChangeText={v => setForm(f => ({ ...f, firstName: v }))}
                placeholder="Jane"
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={[styles.inputWrap, { flex: 1 }]}>
              <Text style={[styles.fieldLabel, isRTL && styles.textRight]}>{t.lastName} *</Text>
              <TextInput
                style={[styles.input, isRTL && styles.textRight]}
                value={form.lastName}
                onChangeText={v => setForm(f => ({ ...f, lastName: v }))}
                placeholder="Smith"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </View>

          <View style={styles.inputWrap}>
            <Text style={[styles.fieldLabel, isRTL && styles.textRight]}>{t.emailAddress} *</Text>
            <TextInput
              style={[styles.input, isRTL && styles.textRight]}
              value={form.email}
              onChangeText={v => setForm(f => ({ ...f, email: v }))}
              placeholder="jane@email.com"
              placeholderTextColor={colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrap}>
            <Text style={[styles.fieldLabel, isRTL && styles.textRight]}>{t.phoneNumber}</Text>
            <TextInput
              style={[styles.input, isRTL && styles.textRight]}
              value={form.phone}
              onChangeText={v => setForm(f => ({ ...f, phone: v }))}
              placeholder="(555) 000-0000"
              placeholderTextColor={colors.textMuted}
              keyboardType="phone-pad"
            />
          </View>

          {/* Availability */}
          <Text style={[styles.sectionLabel, isRTL && styles.textRight]}>{t.availability}</Text>
          <View style={styles.daysRow}>
            {t.days.map((d, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.dayBtn, days.includes(i) && styles.dayBtnActive]}
                onPress={() => toggleDay(i)}
              >
                <Text style={[styles.dayText, days.includes(i) && styles.dayTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Areas of Interest */}
          <Text style={[styles.sectionLabel, isRTL && styles.textRight]}>{t.areasOfInterest}</Text>
          <View style={styles.interestsGrid}>
            {INTERESTS.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[styles.interestBtn, interests.includes(item.id) && styles.interestBtnActive, isRTL && styles.rowReverse]}
                onPress={() => toggleInterest(item.id)}
              >
                <Ionicons name={item.icon} size={20} color={interests.includes(item.id) ? colors.white : colors.gray} />
                <Text style={[styles.interestText, interests.includes(item.id) && styles.interestTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Message */}
          <View style={styles.inputWrap}>
            <Text style={[styles.fieldLabel, isRTL && styles.textRight]}>{t.anythingElse}</Text>
            <TextInput
              style={[styles.input, styles.textarea, isRTL && styles.textRight]}
              value={form.message}
              onChangeText={v => setForm(f => ({ ...f, message: v }))}
              placeholder={t.anythingPlaceholder}
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Ionicons name={loading ? 'hourglass-outline' : 'send'} size={18} color={colors.white} />
            <Text style={styles.submitBtnText}>{loading ? t.submitting : t.submitApplication}</Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: colors.offWhite },
  scroll:       { padding: 20 },
  topHeader:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  rowReverse:   { flexDirection: 'row-reverse' },
  textRight:    { textAlign: 'right' },
  header:       { alignItems: 'center', marginBottom: 24, gap: 10 },
  headerIcon:   { width: 64, height: 64, borderRadius: radius.xl, alignItems: 'center', justifyContent: 'center' },
  title:        { fontSize: font.xxl, fontWeight: '800', color: colors.text },
  subtitle:     { fontSize: font.base, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
  whyCard:      { backgroundColor: colors.green + '10', borderRadius: radius.lg, padding: 16, marginBottom: 24, gap: 10 },
  whyRow:       { flexDirection: 'row', alignItems: 'center', gap: 8 },
  whyText:      { fontSize: font.base, color: colors.green, fontWeight: '500', flex: 1 },
  sectionLabel: { fontSize: font.sm, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 },
  row:          { flexDirection: 'row', gap: 10 },
  inputWrap:    { marginBottom: 16 },
  fieldLabel:   { fontSize: font.sm, fontWeight: '600', color: colors.text, marginBottom: 6 },
  input: {
    backgroundColor: colors.white, borderRadius: radius.md,
    borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 13,
    fontSize: font.base, color: colors.text,
  },
  textarea:     { minHeight: 100, paddingTop: 13 },
  daysRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  dayBtn:       { paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.full, backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border },
  dayBtnActive: { backgroundColor: colors.green, borderColor: colors.green },
  dayText:      { fontSize: font.sm, fontWeight: '600', color: colors.gray },
  dayTextActive: { color: colors.white },
  interestsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  interestBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.md,
    backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border,
  },
  interestBtnActive: { backgroundColor: colors.green, borderColor: colors.green },
  interestText:      { fontSize: font.sm, fontWeight: '600', color: colors.gray },
  interestTextActive: { color: colors.white },
  submitBtn: {
    backgroundColor: colors.green, borderRadius: radius.lg,
    paddingVertical: 18, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 10, marginTop: 8,
  },
  submitBtnText:    { fontSize: font.md, fontWeight: '800', color: colors.white },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },
  successIcon:      { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  successTitle:     { fontSize: font.xxl, fontWeight: '800', color: colors.text },
  successText:      { fontSize: font.base, color: colors.textMuted, textAlign: 'center', lineHeight: 24 },
  successBtn:       { backgroundColor: colors.green, borderRadius: radius.lg, paddingHorizontal: 32, paddingVertical: 14, marginTop: 8 },
  successBtnText:   { fontSize: font.base, fontWeight: '700', color: colors.white },
})
