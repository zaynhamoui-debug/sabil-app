import React, { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, font, radius } from '../theme'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const INTERESTS = [
  { id: 'food',    label: 'Food Distribution',    icon: 'basket-outline' as const },
  { id: 'admin',   label: 'Admin & Office',        icon: 'document-text-outline' as const },
  { id: 'events',  label: 'Events & Outreach',     icon: 'megaphone-outline' as const },
  { id: 'health',  label: 'Health Programs',       icon: 'heart-outline' as const },
  { id: 'youth',   label: 'Youth Programs',        icon: 'people-outline' as const },
  { id: 'driving', label: 'Driving & Delivery',    icon: 'car-outline' as const },
]

interface Form {
  firstName: string
  lastName:  string
  email:     string
  phone:     string
  message:   string
}

export default function VolunteerScreen() {
  const [form, setForm]         = useState<Form>({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const [days, setDays]         = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  function toggleDay(d: string) {
    setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }
  function toggleInterest(id: string) {
    setInterests(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  async function handleSubmit() {
    if (!form.firstName || !form.lastName || !form.email) {
      Alert.alert('Missing Info', 'Please fill in your name and email to continue.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.')
      return
    }
    setLoading(true)
    // Simulate network request — replace with actual API call (Supabase, email service, etc.)
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
          <Text style={styles.successTitle}>Thank You!</Text>
          <Text style={styles.successText}>
            We've received your volunteer application, {form.firstName}. Our team will reach out within 2-3 business days to get you started.
          </Text>
          <TouchableOpacity style={styles.successBtn} onPress={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' }); setDays([]); setInterests([]) }}>
            <Text style={styles.successBtnText}>Submit Another</Text>
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
          <View style={styles.header}>
            <View style={[styles.headerIcon, { backgroundColor: colors.green }]}>
              <Ionicons name="people" size={28} color={colors.white} />
            </View>
            <Text style={styles.title}>Volunteer With Us</Text>
            <Text style={styles.subtitle}>
              Join our community of dedicated volunteers making a real difference in families' lives.
            </Text>
          </View>

          {/* Why Volunteer */}
          <View style={styles.whyCard}>
            {[
              'Make a direct impact in your community',
              'Build meaningful connections',
              'Gain skills and experience',
            ].map(t => (
              <View key={t} style={styles.whyRow}>
                <Ionicons name="checkmark-circle" size={18} color={colors.green} />
                <Text style={styles.whyText}>{t}</Text>
              </View>
            ))}
          </View>

          {/* Personal Info */}
          <Text style={styles.sectionLabel}>Your Information</Text>
          <View style={styles.row}>
            <View style={[styles.inputWrap, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>First Name *</Text>
              <TextInput
                style={styles.input}
                value={form.firstName}
                onChangeText={t => setForm(f => ({ ...f, firstName: t }))}
                placeholder="Jane"
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={[styles.inputWrap, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Last Name *</Text>
              <TextInput
                style={styles.input}
                value={form.lastName}
                onChangeText={t => setForm(f => ({ ...f, lastName: t }))}
                placeholder="Smith"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.fieldLabel}>Email Address *</Text>
            <TextInput
              style={styles.input}
              value={form.email}
              onChangeText={t => setForm(f => ({ ...f, email: t }))}
              placeholder="jane@email.com"
              placeholderTextColor={colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={form.phone}
              onChangeText={t => setForm(f => ({ ...f, phone: t }))}
              placeholder="(555) 000-0000"
              placeholderTextColor={colors.textMuted}
              keyboardType="phone-pad"
            />
          </View>

          {/* Availability */}
          <Text style={styles.sectionLabel}>Availability</Text>
          <View style={styles.daysRow}>
            {DAYS.map(d => (
              <TouchableOpacity
                key={d}
                style={[styles.dayBtn, days.includes(d) && styles.dayBtnActive]}
                onPress={() => toggleDay(d)}
              >
                <Text style={[styles.dayText, days.includes(d) && styles.dayTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Areas of Interest */}
          <Text style={styles.sectionLabel}>Areas of Interest</Text>
          <View style={styles.interestsGrid}>
            {INTERESTS.map(i => (
              <TouchableOpacity
                key={i.id}
                style={[styles.interestBtn, interests.includes(i.id) && styles.interestBtnActive]}
                onPress={() => toggleInterest(i.id)}
              >
                <Ionicons
                  name={i.icon}
                  size={20}
                  color={interests.includes(i.id) ? colors.white : colors.gray}
                />
                <Text style={[styles.interestText, interests.includes(i.id) && styles.interestTextActive]}>
                  {i.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Message */}
          <View style={styles.inputWrap}>
            <Text style={styles.fieldLabel}>Anything Else You'd Like Us to Know?</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={form.message}
              onChangeText={t => setForm(f => ({ ...f, message: t }))}
              placeholder="Skills, experience, questions..."
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
            <Text style={styles.submitBtnText}>{loading ? 'Submitting...' : 'Submit Application'}</Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: colors.offWhite },
  scroll:           { padding: 20 },
  header:           { alignItems: 'center', marginBottom: 24, gap: 10 },
  headerIcon:       { width: 64, height: 64, borderRadius: radius.xl, alignItems: 'center', justifyContent: 'center' },
  title:            { fontSize: font.xxl, fontWeight: '800', color: colors.text },
  subtitle:         { fontSize: font.base, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
  whyCard: {
    backgroundColor: colors.green + '10', borderRadius: radius.lg,
    padding: 16, marginBottom: 24, gap: 10,
  },
  whyRow:           { flexDirection: 'row', alignItems: 'center', gap: 8 },
  whyText:          { fontSize: font.base, color: colors.green, fontWeight: '500' },
  sectionLabel:     { fontSize: font.sm, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 },
  row:              { flexDirection: 'row', gap: 10 },
  inputWrap:        { marginBottom: 16 },
  fieldLabel:       { fontSize: font.sm, fontWeight: '600', color: colors.text, marginBottom: 6 },
  input: {
    backgroundColor: colors.white, borderRadius: radius.md,
    borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 13,
    fontSize: font.base, color: colors.text,
  },
  textarea:         { minHeight: 100, paddingTop: 13 },
  daysRow:          { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  dayBtn:           { paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.full, backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border },
  dayBtnActive:     { backgroundColor: colors.green, borderColor: colors.green },
  dayText:          { fontSize: font.sm, fontWeight: '600', color: colors.gray },
  dayTextActive:    { color: colors.white },
  interestsGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  interestBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.md,
    backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border,
  },
  interestBtnActive: { backgroundColor: colors.green, borderColor: colors.green },
  interestText:     { fontSize: font.sm, fontWeight: '600', color: colors.gray },
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
