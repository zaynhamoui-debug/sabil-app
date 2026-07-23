import React, { useState } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, Modal, Pressable,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useLang, LANG_LABELS, LangCode, TRANSLATIONS } from '../context/LanguageContext'
import { colors, font, radius } from '../theme'

const LANGS = Object.keys(LANG_LABELS) as LangCode[]

export default function LanguagePicker() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <>
      <TouchableOpacity style={styles.trigger} onPress={() => setOpen(true)}>
        <Ionicons name="globe-outline" size={16} color={colors.teal} />
        <Text style={styles.triggerText}>{LANG_LABELS[lang]}</Text>
        <Ionicons name="chevron-down" size={12} color={colors.teal} />
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Select Language</Text>
            {LANGS.map(l => (
              <TouchableOpacity
                key={l}
                style={[styles.option, l === lang && styles.optionActive]}
                onPress={() => { setLang(l); setOpen(false) }}
              >
                <Text style={[styles.optionText, l === lang && styles.optionTextActive]}>
                  {LANG_LABELS[l]}
                </Text>
                {l === lang && <Ionicons name="checkmark" size={18} color={colors.teal} />}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.teal + '15', borderRadius: radius.full,
    paddingHorizontal: 12, paddingVertical: 7,
    borderWidth: 1, borderColor: colors.teal + '30',
  },
  triggerText: { fontSize: font.sm, fontWeight: '600', color: colors.teal },
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center', alignItems: 'center', padding: 32,
  },
  sheet: {
    backgroundColor: colors.white, borderRadius: radius.xl,
    padding: 24, width: '100%', maxWidth: 340,
  },
  sheetTitle: { fontSize: font.md, fontWeight: '800', color: colors.text, marginBottom: 16, textAlign: 'center' },
  option: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 14, paddingHorizontal: 16, borderRadius: radius.md, marginBottom: 6,
  },
  optionActive: { backgroundColor: colors.teal + '12' },
  optionText: { fontSize: font.base, fontWeight: '500', color: colors.text },
  optionTextActive: { color: colors.teal, fontWeight: '700' },
})
