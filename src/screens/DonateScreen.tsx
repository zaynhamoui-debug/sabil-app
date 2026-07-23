import React, { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, TextInput, Linking, Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, font, radius } from '../theme'
import Logo from '../components/Logo'
import LanguagePicker from '../components/LanguagePicker'
import { useLang } from '../context/LanguageContext'

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500]
type Frequency = 'one-time' | 'monthly'

export default function DonateScreen() {
  const { t, isRTL } = useLang()
  const [selected, setSelected]   = useState<number>(25)
  const [custom, setCustom]       = useState('')
  const [frequency, setFrequency] = useState<Frequency>('one-time')
  const [loading, setLoading]     = useState(false)

  const amount = custom ? parseFloat(custom) || 0 : selected

  const IMPACT: Record<number, string> = {
    10: t.impact_10, 25: t.impact_25, 50: t.impact_50,
    100: t.impact_100, 250: t.impact_250, 500: t.impact_500,
  }
  const impact = IMPACT[selected]

  async function handleDonate() {
    if (amount <= 0) {
      Alert.alert(t.invalidAmount, t.invalidAmountMsg)
      return
    }
    setLoading(true)
    try {
      await Linking.openURL('https://www.sabil.us/donate-today/')
    } catch {
      Alert.alert('Error', 'Could not open donation page. Please visit sabil.us to donate.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={[styles.header, isRTL && styles.rowReverse]}>
          <Logo width={140} height={52} />
          <LanguagePicker />
        </View>

        <View style={styles.titleBlock}>
          <Ionicons name="heart" size={32} color={colors.primary} />
          <Text style={[styles.title, isRTL && styles.textRight]}>{t.makeADifference}</Text>
          <Text style={[styles.subtitle, isRTL && styles.textRight]}>{t.donateSubtitle}</Text>
        </View>

        {/* Frequency Toggle */}
        <View style={styles.frequencyRow}>
          {(['one-time', 'monthly'] as Frequency[]).map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.freqBtn, frequency === f && styles.freqBtnActive]}
              onPress={() => setFrequency(f)}
            >
              <Text style={[styles.freqText, frequency === f && styles.freqTextActive]}>
                {f === 'one-time' ? t.oneTime : t.monthly}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preset Amounts */}
        <Text style={[styles.label, isRTL && styles.textRight]}>{t.selectAmount}</Text>
        <View style={styles.amountsGrid}>
          {PRESET_AMOUNTS.map(a => (
            <TouchableOpacity
              key={a}
              style={[styles.amountBtn, selected === a && !custom && styles.amountBtnActive]}
              onPress={() => { setSelected(a); setCustom('') }}
            >
              <Text style={[styles.amountText, selected === a && !custom && styles.amountTextActive]}>
                ${a}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom Amount */}
        <Text style={[styles.label, isRTL && styles.textRight]}>{t.customAmount}</Text>
        <View style={[styles.customRow, isRTL && styles.rowReverse]}>
          <Text style={styles.dollarSign}>$</Text>
          <TextInput
            style={[styles.customInput, isRTL && styles.textRight]}
            value={custom}
            onChangeText={v => { setCustom(v.replace(/[^0-9.]/g, '')); setSelected(0) }}
            placeholder="0.00"
            placeholderTextColor={colors.textMuted}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Impact Message */}
        {impact && !custom && (
          <View style={[styles.impactCard, isRTL && styles.rowReverse]}>
            <Ionicons name="sparkles" size={16} color={colors.primary} />
            <Text style={[styles.impactText, isRTL && styles.textRight]}>{impact}</Text>
          </View>
        )}

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={[styles.summaryRow, isRTL && styles.rowReverse]}>
            <Text style={styles.summaryLabel}>{t.amountLabel}</Text>
            <Text style={styles.summaryValue}>${amount > 0 ? amount.toFixed(2) : '0.00'}</Text>
          </View>
          <View style={[styles.summaryRow, isRTL && styles.rowReverse]}>
            <Text style={styles.summaryLabel}>{t.frequencyLabel}</Text>
            <Text style={styles.summaryValue}>{frequency === 'one-time' ? t.oneTime : t.monthly}</Text>
          </View>
          <View style={[styles.summaryRow, { borderBottomWidth: 0 }, isRTL && styles.rowReverse]}>
            <Text style={styles.summaryLabel}>{t.taxDeductible}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>501(c)(3)</Text>
            </View>
          </View>
        </View>

        {/* Donate Button */}
        <TouchableOpacity
          style={[styles.donateBtn, loading && { opacity: 0.7 }]}
          onPress={handleDonate}
          disabled={loading}
        >
          <Ionicons name="heart" size={20} color={colors.text} />
          <Text style={styles.donateBtnText}>
            {loading
              ? t.opening
              : `${t.donate} $${amount > 0 ? amount.toFixed(2) : '0.00'}${frequency === 'monthly' ? '/mo' : ''}`}
          </Text>
        </TouchableOpacity>

        {/* Trust Signals */}
        <View style={styles.trustRow}>
          <View style={styles.trustItem}>
            <Ionicons name="shield-checkmark" size={16} color={colors.green} />
            <Text style={styles.trustText}>{t.securePayment}</Text>
          </View>
          <View style={styles.trustItem}>
            <Ionicons name="document-text" size={16} color={colors.green} />
            <Text style={styles.trustText}>{t.taxDeductible}</Text>
          </View>
          <View style={styles.trustItem}>
            <Ionicons name="people" size={16} color={colors.green} />
            <Text style={styles.trustText}>{t.toPrograms}</Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: colors.offWhite },
  scroll:      { padding: 20 },
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  rowReverse:  { flexDirection: 'row-reverse' },
  textRight:   { textAlign: 'right' },
  titleBlock:  { alignItems: 'center', marginBottom: 28, gap: 8 },
  title:       { fontSize: font.xxl, fontWeight: '800', color: colors.text },
  subtitle:    { fontSize: font.base, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
  label:       { fontSize: font.sm, fontWeight: '600', color: colors.textMuted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  frequencyRow: { flexDirection: 'row', backgroundColor: colors.lightGray, borderRadius: radius.full, padding: 4, marginBottom: 24 },
  freqBtn:     { flex: 1, paddingVertical: 10, borderRadius: radius.full, alignItems: 'center' },
  freqBtnActive: { backgroundColor: colors.primary },
  freqText:    { fontSize: font.base, fontWeight: '600', color: colors.textMuted },
  freqTextActive: { color: colors.text },
  amountsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  amountBtn: {
    width: '30%', paddingVertical: 14, borderRadius: radius.md,
    alignItems: 'center', backgroundColor: colors.white,
    borderWidth: 2, borderColor: colors.border,
  },
  amountBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  amountText:      { fontSize: font.md, fontWeight: '700', color: colors.text },
  amountTextActive: { color: colors.text },
  customRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.white, borderRadius: radius.md,
    borderWidth: 2, borderColor: colors.border, paddingHorizontal: 16, marginBottom: 20,
  },
  dollarSign:  { fontSize: font.lg, fontWeight: '700', color: colors.textMuted, marginRight: 6 },
  customInput: { flex: 1, fontSize: font.lg, fontWeight: '700', color: colors.text, paddingVertical: 14 },
  impactCard: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.primary + '20', borderRadius: radius.md,
    padding: 12, marginBottom: 20,
  },
  impactText:  { flex: 1, fontSize: font.sm, color: colors.text, lineHeight: 18 },
  summaryCard: {
    backgroundColor: colors.white, borderRadius: radius.lg,
    padding: 16, marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  summaryRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  summaryLabel: { fontSize: font.base, color: colors.textMuted },
  summaryValue: { fontSize: font.base, fontWeight: '700', color: colors.text },
  badge:       { backgroundColor: colors.green + '20', borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText:   { fontSize: font.sm, fontWeight: '700', color: colors.green },
  donateBtn: {
    backgroundColor: colors.primary, borderRadius: radius.lg,
    paddingVertical: 18, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 10, marginBottom: 20,
  },
  donateBtnText: { fontSize: font.md, fontWeight: '800', color: colors.text },
  trustRow:    { flexDirection: 'row', justifyContent: 'space-around' },
  trustItem:   { alignItems: 'center', gap: 4 },
  trustText:   { fontSize: 11, color: colors.textMuted },
})
