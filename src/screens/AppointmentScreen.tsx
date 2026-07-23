import React, { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, font, radius } from '../theme'

const SERVICE_TYPES = [
  { id: 'rental',    label: 'Rental Assistance',     icon: 'home-outline' as const,    color: colors.teal },
  { id: 'food',      label: 'Food Assistance',        icon: 'basket-outline' as const,  color: colors.green },
  { id: 'health',    label: 'Health Services',        icon: 'medkit-outline' as const,  color: '#E05A2B' },
  { id: 'financial', label: 'Financial Counseling',   icon: 'cash-outline' as const,    color: '#7B5EA7' },
  { id: 'other',     label: 'Other Support',          icon: 'help-circle-outline' as const, color: colors.gray },
]

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

const DAYS_FROM_NOW = Array.from({ length: 14 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i + 1)
  // Skip Sundays
  if (d.getDay() === 0) return null
  return {
    label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    value: d.toISOString().split('T')[0],
  }
}).filter(Boolean) as { label: string; value: string }[]

interface Form {
  firstName: string
  lastName:  string
  email:     string
  phone:     string
  address:   string
  situation: string
}

export default function AppointmentScreen() {
  const [service, setService]   = useState<string>('rental')
  const [form, setForm]         = useState<Form>({ firstName: '', lastName: '', email: '', phone: '', address: '', situation: '' })
  const [date, setDate]         = useState<string>('')
  const [time, setTime]         = useState<string>('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  const selectedService = SERVICE_TYPES.find(s => s.id === service)

  async function handleSubmit() {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      Alert.alert('Missing Information', 'Please fill in all required fields.')
      return
    }
    if (!date || !time) {
      Alert.alert('Select Appointment Time', 'Please choose a preferred date and time.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.')
      return
    }
    setLoading(true)
    // Replace with actual API call — Supabase, Calendly, etc.
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    const d = DAYS_FROM_NOW.find(x => x.value === date)
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.successContainer}>
          <View style={[styles.successIcon, { backgroundColor: colors.teal }]}>
            <Ionicons name="calendar-check" size={44} color={colors.white} />
          </View>
          <Text style={styles.successTitle}>Appointment Requested!</Text>
          <View style={styles.confirmCard}>
            <ConfirmRow icon="person-outline" label="Name" value={`${form.firstName} ${form.lastName}`} />
            <ConfirmRow icon="construct-outline" label="Service" value={selectedService?.label ?? ''} />
            <ConfirmRow icon="calendar-outline" label="Date" value={d?.label ?? date} />
            <ConfirmRow icon="time-outline" label="Time" value={time} />
          </View>
          <Text style={styles.successText}>
            We'll confirm your appointment within 1 business day at {form.email}.
          </Text>
          <TouchableOpacity
            style={[styles.successBtn, { backgroundColor: colors.teal }]}
            onPress={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', phone: '', address: '', situation: '' }); setDate(''); setTime('') }}
          >
            <Text style={styles.successBtnText}>Book Another</Text>
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
            <View style={[styles.headerIcon, { backgroundColor: colors.teal }]}>
              <Ionicons name="calendar" size={28} color={colors.white} />
            </View>
            <Text style={styles.title}>Book an Appointment</Text>
            <Text style={styles.subtitle}>
              Schedule a session with our support team. All appointments are confidential.
            </Text>
          </View>

          {/* Service Type */}
          <Text style={styles.sectionLabel}>What do you need help with?</Text>
          <View style={styles.servicesGrid}>
            {SERVICE_TYPES.map(s => (
              <TouchableOpacity
                key={s.id}
                style={[styles.serviceBtn, service === s.id && { borderColor: s.color, backgroundColor: s.color + '12' }]}
                onPress={() => setService(s.id)}
              >
                <Ionicons name={s.icon} size={22} color={service === s.id ? s.color : colors.gray} />
                <Text style={[styles.serviceText, service === s.id && { color: s.color }]}>{s.label}</Text>
                {service === s.id && (
                  <Ionicons name="checkmark-circle" size={16} color={s.color} style={{ position: 'absolute', top: 8, right: 8 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Info banner for rental assistance */}
          {service === 'rental' && (
            <View style={styles.infoBanner}>
              <Ionicons name="information-circle" size={16} color={colors.teal} />
              <Text style={styles.infoText}>
                For rental assistance, please bring proof of income, a copy of your lease, and any eviction notices to your appointment.
              </Text>
            </View>
          )}

          {/* Contact Info */}
          <Text style={styles.sectionLabel}>Your Information</Text>
          <View style={styles.row}>
            <View style={[styles.inputWrap, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>First Name *</Text>
              <TextInput style={styles.input} value={form.firstName} onChangeText={t => setForm(f => ({ ...f, firstName: t }))} placeholder="Jane" placeholderTextColor={colors.textMuted} />
            </View>
            <View style={[styles.inputWrap, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Last Name *</Text>
              <TextInput style={styles.input} value={form.lastName} onChangeText={t => setForm(f => ({ ...f, lastName: t }))} placeholder="Smith" placeholderTextColor={colors.textMuted} />
            </View>
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.fieldLabel}>Email *</Text>
            <TextInput style={styles.input} value={form.email} onChangeText={t => setForm(f => ({ ...f, email: t }))} placeholder="jane@email.com" placeholderTextColor={colors.textMuted} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.fieldLabel}>Phone Number *</Text>
            <TextInput style={styles.input} value={form.phone} onChangeText={t => setForm(f => ({ ...f, phone: t }))} placeholder="(555) 000-0000" placeholderTextColor={colors.textMuted} keyboardType="phone-pad" />
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.fieldLabel}>Home Address</Text>
            <TextInput style={styles.input} value={form.address} onChangeText={t => setForm(f => ({ ...f, address: t }))} placeholder="123 Main St, City, State" placeholderTextColor={colors.textMuted} />
          </View>

          {/* Preferred Date */}
          <Text style={styles.sectionLabel}>Preferred Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
            {DAYS_FROM_NOW.slice(0, 10).map(d => (
              <TouchableOpacity
                key={d.value}
                style={[styles.dateBtn, date === d.value && styles.dateBtnActive]}
                onPress={() => setDate(d.value)}
              >
                <Text style={[styles.dateBtnText, date === d.value && styles.dateBtnTextActive]}>{d.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Preferred Time */}
          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Preferred Time</Text>
          <View style={styles.timesGrid}>
            {TIME_SLOTS.map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.timeBtn, time === t && styles.timeBtnActive]}
                onPress={() => setTime(t)}
              >
                <Text style={[styles.timeText, time === t && styles.timeTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Situation */}
          <View style={styles.inputWrap}>
            <Text style={styles.fieldLabel}>Briefly describe your situation</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={form.situation}
              onChangeText={t => setForm(f => ({ ...f, situation: t }))}
              placeholder="Tell us a bit about what's going on so we can better prepare to help you..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Privacy note */}
          <View style={styles.privacyNote}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.textMuted} />
            <Text style={styles.privacyText}>Your information is kept strictly confidential.</Text>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: selectedService?.color ?? colors.teal }, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Ionicons name={loading ? 'hourglass-outline' : 'calendar'} size={18} color={colors.white} />
            <Text style={styles.submitBtnText}>{loading ? 'Booking...' : 'Request Appointment'}</Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

function ConfirmRow({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <Ionicons name={icon} size={16} color={colors.textMuted} />
      <Text style={{ fontSize: font.sm, color: colors.textMuted, width: 70 }}>{label}</Text>
      <Text style={{ fontSize: font.sm, fontWeight: '600', color: colors.text, flex: 1 }}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: colors.offWhite },
  scroll:           { padding: 20 },
  header:           { alignItems: 'center', marginBottom: 24, gap: 10 },
  headerIcon:       { width: 64, height: 64, borderRadius: radius.xl, alignItems: 'center', justifyContent: 'center' },
  title:            { fontSize: font.xxl, fontWeight: '800', color: colors.text },
  subtitle:         { fontSize: font.base, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
  sectionLabel:     { fontSize: font.sm, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 },
  servicesGrid:     { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  serviceBtn: {
    width: '47%', padding: 14, borderRadius: radius.md,
    backgroundColor: colors.white, borderWidth: 2, borderColor: colors.border,
    gap: 6, position: 'relative',
  },
  serviceText:      { fontSize: font.sm, fontWeight: '600', color: colors.gray },
  infoBanner: {
    flexDirection: 'row', gap: 8, backgroundColor: colors.teal + '12',
    borderRadius: radius.md, padding: 12, marginBottom: 20, alignItems: 'flex-start',
  },
  infoText:         { flex: 1, fontSize: font.sm, color: colors.teal, lineHeight: 18 },
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
  dateScroll:       { gap: 8, paddingBottom: 4 },
  dateBtn:          { paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.md, backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border },
  dateBtnActive:    { backgroundColor: colors.teal, borderColor: colors.teal },
  dateBtnText:      { fontSize: font.sm, fontWeight: '600', color: colors.gray, whiteSpace: 'nowrap' },
  dateBtnTextActive: { color: colors.white },
  timesGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  timeBtn:          { paddingHorizontal: 16, paddingVertical: 10, borderRadius: radius.md, backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border },
  timeBtnActive:    { backgroundColor: colors.teal, borderColor: colors.teal },
  timeText:         { fontSize: font.sm, fontWeight: '600', color: colors.gray },
  timeTextActive:   { color: colors.white },
  privacyNote:      { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  privacyText:      { fontSize: font.sm, color: colors.textMuted },
  submitBtn: {
    borderRadius: radius.lg, paddingVertical: 18,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 10,
  },
  submitBtnText:    { fontSize: font.md, fontWeight: '800', color: colors.white },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, gap: 16 },
  successIcon:      { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
  successTitle:     { fontSize: font.xxl, fontWeight: '800', color: colors.text },
  confirmCard: {
    width: '100%', backgroundColor: colors.white, borderRadius: radius.lg,
    padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  successText:      { fontSize: font.base, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
  successBtn:       { borderRadius: radius.lg, paddingHorizontal: 32, paddingVertical: 14, marginTop: 4 },
  successBtnText:   { fontSize: font.base, fontWeight: '700', color: colors.white },
})
