import React, { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, TextInput, Alert, KeyboardAvoidingView,
  Platform, Switch,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors, font, radius } from '../theme'
import Logo from '../components/Logo'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1 – Personal
  firstName: string; middleName: string; lastName: string
  dob: string; gender: string; maritalStatus: string; headOfHousehold: string
  spouseName: string; spouseDL: string; spouseDLState: string

  // Step 2 – Contact & Address
  homeless: string; phone: string; email: string
  street: string; apartment: string; city: string; state: string; zip: string; county: string

  // Step 3 – Household
  totalInHousehold: string; under18: string; age1959: string; age60plus: string
  childrenBornUSA: string; howManyUSABorn: string

  // Step 4 – Identification
  dlNumber: string; dlState: string; altIDType: string; altIDNumber: string
  countryOfOrigin: string; nationality: string; race: string
  legalStatus: string; dateOfEntry: string; timeInUSA: string

  // Step 5 – Background
  primaryLanguage: string; englishProficiency: string
  whyLeftCountry: string; asylumReasons: string[]

  // Step 6 – Health & Living
  hasInsurance: string; medicalConditions: string; medicalFees: string
  disabledMember: string; receivingCounseling: string
  livingSituation: string; educationLevel: string

  // Step 7 – Financial
  employmentStatus: string; occupation: string
  monthlyIncome: string; incomeSources: string[]

  // Step 8 – Assistance & Agreement
  assistanceNeeded: string[]; otherAssistance: string
  howDidYouHear: string; additionalNotes: string
  todayDate: string; agreed: boolean
}

const EMPTY: FormData = {
  firstName: '', middleName: '', lastName: '', dob: '', gender: '', maritalStatus: '', headOfHousehold: '',
  spouseName: '', spouseDL: '', spouseDLState: '',
  homeless: '', phone: '', email: '', street: '', apartment: '', city: '', state: '', zip: '', county: '',
  totalInHousehold: '', under18: '', age1959: '', age60plus: '', childrenBornUSA: '', howManyUSABorn: '',
  dlNumber: '', dlState: '', altIDType: '', altIDNumber: '', countryOfOrigin: '', nationality: '', race: '',
  legalStatus: '', dateOfEntry: '', timeInUSA: '',
  primaryLanguage: '', englishProficiency: '', whyLeftCountry: '', asylumReasons: [],
  hasInsurance: '', medicalConditions: '', medicalFees: '', disabledMember: '', receivingCounseling: '',
  livingSituation: '', educationLevel: '',
  employmentStatus: '', occupation: '', monthlyIncome: '', incomeSources: [],
  assistanceNeeded: [], otherAssistance: '', howDidYouHear: '', additionalNotes: '',
  todayDate: new Date().toLocaleDateString('en-US'), agreed: false,
}

const TOTAL_STEPS = 8

const STEP_TITLES = [
  'Personal Information',
  'Contact & Address',
  'Household Members',
  'Identification',
  'Background & Language',
  'Health & Living',
  'Employment & Income',
  'Assistance Needed',
]

// ─── Reusable Field Components ────────────────────────────────────────────────

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <View style={f.wrap}>
      <Text style={f.label}>{label}{required && <Text style={f.req}> *</Text>}</Text>
      {children}
    </View>
  )
}

function Input({ value, onChangeText, placeholder, keyboardType, multiline, numberOfLines }: {
  value: string; onChangeText: (t: string) => void; placeholder?: string
  keyboardType?: any; multiline?: boolean; numberOfLines?: number
}) {
  return (
    <TextInput
      style={[f.input, multiline && { minHeight: numberOfLines ? numberOfLines * 22 + 24 : 80, textAlignVertical: 'top' }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  )
}

function ChoiceGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <View style={f.choiceRow}>
      {options.map(o => (
        <TouchableOpacity
          key={o} style={[f.choiceBtn, value === o && f.choiceBtnActive]}
          onPress={() => onChange(o)}
        >
          <Text style={[f.choiceText, value === o && f.choiceTextActive]}>{o}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

function DropdownGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <View style={f.dropdownWrap}>
      {options.map(o => (
        <TouchableOpacity
          key={o} style={[f.dropItem, value === o && f.dropItemActive]}
          onPress={() => onChange(o)}
        >
          <View style={[f.dropRadio, value === o && f.dropRadioActive]}>
            {value === o && <View style={f.dropRadioDot} />}
          </View>
          <Text style={[f.dropText, value === o && f.dropTextActive]}>{o}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

function CheckGroup({ options, values, onChange }: { options: string[]; values: string[]; onChange: (v: string[]) => void }) {
  function toggle(o: string) {
    onChange(values.includes(o) ? values.filter(x => x !== o) : [...values, o])
  }
  return (
    <View style={f.checkWrap}>
      {options.map(o => (
        <TouchableOpacity key={o} style={f.checkItem} onPress={() => toggle(o)}>
          <View style={[f.checkbox, values.includes(o) && f.checkboxActive]}>
            {values.includes(o) && <Ionicons name="checkmark" size={13} color={colors.white} />}
          </View>
          <Text style={f.checkText}>{o}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ApplyScreen() {
  const [step, setStep]         = useState(1)
  const [form, setForm]         = useState<FormData>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  function set(field: keyof FormData, value: any) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function validateStep(): boolean {
    switch (step) {
      case 1: return !!(form.firstName && form.lastName && form.dob)
      case 2: return !!(form.phone && form.email && form.street && form.city && form.state && form.zip)
      case 3: return true
      case 4: return !!(form.countryOfOrigin && form.race)
      case 5: return true
      case 6: return true
      case 7: return true
      case 8: return form.agreed
      default: return true
    }
  }

  function next() {
    if (!validateStep()) {
      Alert.alert('Required Fields', 'Please fill in all required fields before continuing.')
      return
    }
    if (step < TOTAL_STEPS) setStep(s => s + 1)
    else submit()
  }

  async function submit() {
    setLoading(true)
    // TODO: Replace with actual API submission (Supabase, email service, etc.)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.successContainer}>
          <Logo width={160} height={60} style={{ marginBottom: 8 }} />
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={64} color={colors.green} />
          </View>
          <Text style={styles.successTitle}>Application Submitted!</Text>
          <Text style={styles.successText}>
            Thank you, {form.firstName}. We've received your application for assistance. Our team will review it and contact you at {form.email} within 3-5 business days.
          </Text>
          <View style={styles.successRef}>
            <Text style={styles.successRefLabel}>Reference</Text>
            <Text style={styles.successRefNum}>SAB-{Date.now().toString().slice(-6)}</Text>
          </View>
          <TouchableOpacity style={styles.successBtn} onPress={() => { setSubmitted(false); setForm(EMPTY); setStep(1) }}>
            <Text style={styles.successBtnText}>Submit Another Application</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        {/* Top Bar */}
        <View style={styles.topBar}>
          <Logo width={110} height={40} />
          <Text style={styles.stepCount}>Step {step} of {TOTAL_STEPS}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${(step / TOTAL_STEPS) * 100}%` as any }]} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Step Title */}
          <View style={styles.stepHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>{step}</Text>
            </View>
            <View>
              <Text style={styles.stepTitle}>{STEP_TITLES[step - 1]}</Text>
              <Text style={styles.stepSubtitle}>Application for Assistance</Text>
            </View>
          </View>

          {/* ── Step 1: Personal Information ──────────────────────────────── */}
          {step === 1 && (
            <View style={styles.fields}>
              <View style={f.row}>
                <View style={{ flex: 1 }}>
                  <Field label="First Name" required>
                    <Input value={form.firstName} onChangeText={v => set('firstName', v)} placeholder="Jane" />
                  </Field>
                </View>
                <View style={{ flex: 1 }}>
                  <Field label="Middle Name">
                    <Input value={form.middleName} onChangeText={v => set('middleName', v)} placeholder="M." />
                  </Field>
                </View>
              </View>
              <Field label="Last Name" required>
                <Input value={form.lastName} onChangeText={v => set('lastName', v)} placeholder="Smith" />
              </Field>
              <Field label="Date of Birth" required>
                <Input value={form.dob} onChangeText={v => set('dob', v)} placeholder="MM/DD/YYYY" keyboardType="numeric" />
              </Field>
              <Field label="Gender">
                <ChoiceGroup options={['Female', 'Male']} value={form.gender} onChange={v => set('gender', v)} />
              </Field>
              <Field label="Marital Status">
                <DropdownGroup
                  options={['Single', 'Married', 'Divorced', 'Widowed', 'Separated']}
                  value={form.maritalStatus} onChange={v => set('maritalStatus', v)}
                />
              </Field>
              <Field label="Are you the head of the household?">
                <ChoiceGroup options={['Yes', 'No']} value={form.headOfHousehold} onChange={v => set('headOfHousehold', v)} />
              </Field>
              {form.maritalStatus === 'Married' && <>
                <Field label="Spouse Name">
                  <Input value={form.spouseName} onChangeText={v => set('spouseName', v)} placeholder="Full name" />
                </Field>
                <View style={f.row}>
                  <View style={{ flex: 1 }}>
                    <Field label="Spouse DL #">
                      <Input value={form.spouseDL} onChangeText={v => set('spouseDL', v)} placeholder="DL number" />
                    </Field>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Field label="DL State">
                      <Input value={form.spouseDLState} onChangeText={v => set('spouseDLState', v)} placeholder="CA" />
                    </Field>
                  </View>
                </View>
              </>}
            </View>
          )}

          {/* ── Step 2: Contact & Address ─────────────────────────────────── */}
          {step === 2 && (
            <View style={styles.fields}>
              <Field label="Are you currently homeless?">
                <ChoiceGroup options={['Yes', 'No']} value={form.homeless} onChange={v => set('homeless', v)} />
              </Field>
              <Field label="Mobile Phone" required>
                <Input value={form.phone} onChangeText={v => set('phone', v)} placeholder="(555) 000-0000" keyboardType="phone-pad" />
              </Field>
              <Field label="Email Address" required>
                <Input value={form.email} onChangeText={v => set('email', v)} placeholder="jane@email.com" keyboardType="email-address" />
              </Field>
              {form.homeless !== 'Yes' && <>
                <Field label="Street Address" required>
                  <Input value={form.street} onChangeText={v => set('street', v)} placeholder="123 Main St" />
                </Field>
                <Field label="Apartment / Unit">
                  <Input value={form.apartment} onChangeText={v => set('apartment', v)} placeholder="Apt 4B" />
                </Field>
                <View style={f.row}>
                  <View style={{ flex: 2 }}>
                    <Field label="City" required>
                      <Input value={form.city} onChangeText={v => set('city', v)} placeholder="Los Angeles" />
                    </Field>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Field label="State" required>
                      <Input value={form.state} onChangeText={v => set('state', v)} placeholder="CA" />
                    </Field>
                  </View>
                </View>
                <View style={f.row}>
                  <View style={{ flex: 1 }}>
                    <Field label="Zip Code" required>
                      <Input value={form.zip} onChangeText={v => set('zip', v)} placeholder="90001" keyboardType="numeric" />
                    </Field>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Field label="County">
                      <Input value={form.county} onChangeText={v => set('county', v)} placeholder="Los Angeles" />
                    </Field>
                  </View>
                </View>
              </>}
            </View>
          )}

          {/* ── Step 3: Household Members ─────────────────────────────────── */}
          {step === 3 && (
            <View style={styles.fields}>
              <View style={styles.infoBox}>
                <Ionicons name="people-outline" size={16} color={colors.teal} />
                <Text style={styles.infoText}>Tell us about everyone living in your household.</Text>
              </View>
              <Field label="Total number of people in household">
                <Input value={form.totalInHousehold} onChangeText={v => set('totalInHousehold', v)} placeholder="e.g. 4" keyboardType="numeric" />
              </Field>
              <Field label="Number of people ages 0–18">
                <Input value={form.under18} onChangeText={v => set('under18', v)} placeholder="e.g. 2" keyboardType="numeric" />
              </Field>
              <Field label="Number of people ages 19–59">
                <Input value={form.age1959} onChangeText={v => set('age1959', v)} placeholder="e.g. 1" keyboardType="numeric" />
              </Field>
              <Field label="Number of people ages 60+">
                <Input value={form.age60plus} onChangeText={v => set('age60plus', v)} placeholder="e.g. 1" keyboardType="numeric" />
              </Field>
              <Field label="Were any of your children born in the USA?">
                <ChoiceGroup options={['Yes', 'No']} value={form.childrenBornUSA} onChange={v => set('childrenBornUSA', v)} />
              </Field>
              {form.childrenBornUSA === 'Yes' && (
                <Field label="If yes, how many?">
                  <Input value={form.howManyUSABorn} onChangeText={v => set('howManyUSABorn', v)} placeholder="e.g. 2" keyboardType="numeric" />
                </Field>
              )}
            </View>
          )}

          {/* ── Step 4: Identification ────────────────────────────────────── */}
          {step === 4 && (
            <View style={styles.fields}>
              <View style={styles.infoBox}>
                <Ionicons name="lock-closed-outline" size={16} color={colors.teal} />
                <Text style={styles.infoText}>Your information is kept strictly confidential.</Text>
              </View>
              <View style={f.row}>
                <View style={{ flex: 2 }}>
                  <Field label="Driver's License / ID Number">
                    <Input value={form.dlNumber} onChangeText={v => set('dlNumber', v)} placeholder="DL number" />
                  </Field>
                </View>
                <View style={{ flex: 1 }}>
                  <Field label="Issuing State">
                    <Input value={form.dlState} onChangeText={v => set('dlState', v)} placeholder="CA" />
                  </Field>
                </View>
              </View>
              <Field label="Alternate ID Type">
                <ChoiceGroup
                  options={['N/A', 'Passport', 'Green Card', 'Govt ID Card']}
                  value={form.altIDType} onChange={v => set('altIDType', v)}
                />
              </Field>
              {form.altIDType && form.altIDType !== 'N/A' && (
                <Field label="Alternate ID Number">
                  <Input value={form.altIDNumber} onChangeText={v => set('altIDNumber', v)} placeholder="ID number" />
                </Field>
              )}
              <Field label="Country of Origin" required>
                <Input value={form.countryOfOrigin} onChangeText={v => set('countryOfOrigin', v)} placeholder="e.g. Mexico" />
              </Field>
              <Field label="Nationality">
                <Input value={form.nationality} onChangeText={v => set('nationality', v)} placeholder="e.g. Mexican" />
              </Field>
              <Field label="Race / Ethnicity" required>
                <DropdownGroup
                  options={['White/Caucasian', 'Arab', 'Asian', 'Southeast Asian', 'Black or African American', 'Hispanic or Latino', 'Multi-Race', 'Other']}
                  value={form.race} onChange={v => set('race', v)}
                />
              </Field>
              <Field label="Legal Status in the USA">
                <DropdownGroup
                  options={['Citizen', 'Permanent Resident', 'Refugee/Asylee', 'Visa Holder', 'Other']}
                  value={form.legalStatus} onChange={v => set('legalStatus', v)}
                />
              </Field>
              <View style={f.row}>
                <View style={{ flex: 1 }}>
                  <Field label="Date of Entry into USA">
                    <Input value={form.dateOfEntry} onChangeText={v => set('dateOfEntry', v)} placeholder="MM/DD/YYYY" keyboardType="numeric" />
                  </Field>
                </View>
                <View style={{ flex: 1 }}>
                  <Field label="Time in the USA">
                    <Input value={form.timeInUSA} onChangeText={v => set('timeInUSA', v)} placeholder="e.g. 5 years" />
                  </Field>
                </View>
              </View>
            </View>
          )}

          {/* ── Step 5: Background & Language ─────────────────────────────── */}
          {step === 5 && (
            <View style={styles.fields}>
              <Field label="Primary Language Spoken at Home">
                <Input value={form.primaryLanguage} onChangeText={v => set('primaryLanguage', v)} placeholder="e.g. Spanish" />
              </Field>
              <Field label="Can you read and write in English?">
                <ChoiceGroup options={['Yes', 'No']} value={form.englishProficiency} onChange={v => set('englishProficiency', v)} />
              </Field>
              <Field label="Why did you leave your country? (if applicable)">
                <Input value={form.whyLeftCountry} onChangeText={v => set('whyLeftCountry', v)} placeholder="Please describe..." multiline numberOfLines={4} />
              </Field>
              <Field label="If seeking Asylum, reason for persecution">
                <CheckGroup
                  options={['Race', 'Religion', 'Nationality', 'Member of a particular social group', 'Political opinion']}
                  values={form.asylumReasons} onChange={v => set('asylumReasons', v)}
                />
              </Field>
            </View>
          )}

          {/* ── Step 6: Health & Living ───────────────────────────────────── */}
          {step === 6 && (
            <View style={styles.fields}>
              <Field label="Do you have health insurance?">
                <ChoiceGroup options={['Yes', 'No']} value={form.hasInsurance} onChange={v => set('hasInsurance', v)} />
              </Field>
              <Field label="Known medical conditions (if any)">
                <Input value={form.medicalConditions} onChangeText={v => set('medicalConditions', v)} placeholder="List any known conditions..." multiline numberOfLines={3} />
              </Field>
              <Field label="Medical fees you are struggling with">
                <Input value={form.medicalFees} onChangeText={v => set('medicalFees', v)} placeholder="Describe medical expenses..." multiline numberOfLines={3} />
              </Field>
              <Field label="Is there a mentally or physically disabled family member at home?">
                <ChoiceGroup options={['Yes', 'No']} value={form.disabledMember} onChange={v => set('disabledMember', v)} />
              </Field>
              <Field label="Are you currently receiving counseling?">
                <ChoiceGroup options={['Yes', 'No']} value={form.receivingCounseling} onChange={v => set('receivingCounseling', v)} />
              </Field>
              <Field label="Current Living Situation">
                <DropdownGroup
                  options={['Relatives', 'Friends', 'Alone', 'Temporary Housing', 'Permanent Housing', 'Other']}
                  value={form.livingSituation} onChange={v => set('livingSituation', v)}
                />
              </Field>
              <Field label="Highest Level of Education">
                <DropdownGroup
                  options={['Elementary', 'High School', 'College / University', 'Graduate School']}
                  value={form.educationLevel} onChange={v => set('educationLevel', v)}
                />
              </Field>
            </View>
          )}

          {/* ── Step 7: Employment & Income ───────────────────────────────── */}
          {step === 7 && (
            <View style={styles.fields}>
              <Field label="Employment Status">
                <DropdownGroup
                  options={['Employed Full Time', 'Employed Part Time', 'Unemployed']}
                  value={form.employmentStatus} onChange={v => set('employmentStatus', v)}
                />
              </Field>
              <Field label="Current Occupation">
                <Input value={form.occupation} onChangeText={v => set('occupation', v)} placeholder="e.g. Cashier, Driver, etc." />
              </Field>
              <Field label="Gross Total Monthly Household Income">
                <Input value={form.monthlyIncome} onChangeText={v => set('monthlyIncome', v)} placeholder="e.g. $2,500" keyboardType="numeric" />
              </Field>
              <Field label="Sources of Income (select all that apply)">
                <CheckGroup
                  options={['Jobs', 'EDD (Unemployment)', 'Social Security', 'SSI', 'Workers Comp', 'Family Support', 'CalWORKs (Cashaid)', 'CalFresh', 'In-Kind Support', 'Other']}
                  values={form.incomeSources} onChange={v => set('incomeSources', v)}
                />
              </Field>
            </View>
          )}

          {/* ── Step 8: Assistance Needed & Agreement ─────────────────────── */}
          {step === 8 && (
            <View style={styles.fields}>
              <Field label="I need assistance with (select all that apply)">
                <CheckGroup
                  options={['Nutritious Food', 'Education', 'Employment', 'Counselling Services', 'Appropriate Clothing', 'Other']}
                  values={form.assistanceNeeded} onChange={v => set('assistanceNeeded', v)}
                />
              </Field>
              {form.assistanceNeeded.includes('Other') && (
                <Field label="Please specify other assistance needed">
                  <Input value={form.otherAssistance} onChangeText={v => set('otherAssistance', v)} placeholder="Describe..." multiline numberOfLines={3} />
                </Field>
              )}
              <Field label="How did you hear about Sabil USA?">
                <Input value={form.howDidYouHear} onChangeText={v => set('howDidYouHear', v)} placeholder="e.g. Friend, social media, flyer..." />
              </Field>
              <Field label="Is there anything else you'd like us to know?">
                <Input value={form.additionalNotes} onChangeText={v => set('additionalNotes', v)} placeholder="Any additional information..." multiline numberOfLines={4} />
              </Field>
              <Field label="Today's Date" required>
                <Input value={form.todayDate} onChangeText={v => set('todayDate', v)} placeholder="MM/DD/YYYY" />
              </Field>

              {/* Agreement */}
              <View style={styles.agreementCard}>
                <Text style={styles.agreementTitle}>Application Agreement</Text>
                <Text style={styles.agreementText}>
                  I certify that the information provided in this application is true and accurate to the best of my knowledge. I understand that Sabil USA will use this information to assess my eligibility for assistance programs. I consent to the collection and use of this data for program purposes.
                </Text>
                <TouchableOpacity style={styles.agreementCheck} onPress={() => set('agreed', !form.agreed)}>
                  <View style={[f.checkbox, form.agreed && f.checkboxActive]}>
                    {form.agreed && <Ionicons name="checkmark" size={13} color={colors.white} />}
                  </View>
                  <Text style={styles.agreementCheckText}>
                    I agree to the application terms <Text style={{ color: colors.error }}>*</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Navigation Buttons */}
          <View style={styles.navRow}>
            {step > 1 && (
              <TouchableOpacity style={styles.backBtn} onPress={() => setStep(s => s - 1)}>
                <Ionicons name="arrow-back" size={18} color={colors.gray} />
                <Text style={styles.backBtnText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.nextBtn, step === 1 && { flex: 1 }, loading && { opacity: 0.7 }]}
              onPress={next}
              disabled={loading}
            >
              <Text style={styles.nextBtnText}>
                {loading ? 'Submitting...' : step === TOTAL_STEPS ? 'Submit Application' : 'Continue'}
              </Text>
              {!loading && <Ionicons name={step === TOTAL_STEPS ? 'send' : 'arrow-forward'} size={18} color={colors.white} />}
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

// ─── Field Styles ─────────────────────────────────────────────────────────────

const f = StyleSheet.create({
  row:      { flexDirection: 'row', gap: 10 },
  wrap:     { marginBottom: 18 },
  label:    { fontSize: font.sm, fontWeight: '600', color: colors.text, marginBottom: 8 },
  req:      { color: colors.error },
  input: {
    backgroundColor: colors.white, borderRadius: radius.md,
    borderWidth: 1.5, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 13,
    fontSize: font.base, color: colors.text,
  },
  choiceRow:     { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choiceBtn:     { paddingHorizontal: 18, paddingVertical: 10, borderRadius: radius.full, backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border },
  choiceBtnActive: { backgroundColor: colors.teal, borderColor: colors.teal },
  choiceText:    { fontSize: font.sm, fontWeight: '600', color: colors.gray },
  choiceTextActive: { color: colors.white },
  dropdownWrap:  { gap: 2 },
  dropItem:      { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 11, paddingHorizontal: 12, borderRadius: radius.md, backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border },
  dropItemActive: { borderColor: colors.teal, backgroundColor: colors.teal + '0A' },
  dropRadio:     { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  dropRadioActive: { borderColor: colors.teal },
  dropRadioDot:  { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.teal },
  dropText:      { fontSize: font.sm, fontWeight: '500', color: colors.gray },
  dropTextActive: { color: colors.teal, fontWeight: '600' },
  checkWrap:     { gap: 4 },
  checkItem:     { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 9 },
  checkbox:      { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.border, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: colors.green, borderColor: colors.green },
  checkText:     { fontSize: font.sm, color: colors.text, flex: 1 },
})

// ─── Screen Styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: colors.offWhite },
  topBar:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border },
  stepCount:    { fontSize: font.sm, fontWeight: '600', color: colors.textMuted },
  progressBg:   { height: 3, backgroundColor: colors.border },
  progressFill: { height: 3, backgroundColor: colors.primary },
  scroll:       { padding: 20 },
  stepHeader:   { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: colors.border },
  stepBadge:    { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  stepBadgeText: { fontSize: font.base, fontWeight: '800', color: colors.text },
  stepTitle:    { fontSize: font.lg, fontWeight: '800', color: colors.text },
  stepSubtitle: { fontSize: font.sm, color: colors.textMuted, marginTop: 1 },
  fields:       { gap: 0 },
  infoBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: colors.teal + '10', borderRadius: radius.md,
    padding: 12, marginBottom: 20,
  },
  infoText:     { flex: 1, fontSize: font.sm, color: colors.teal, lineHeight: 18 },
  navRow:       { flexDirection: 'row', gap: 10, marginTop: 28 },
  backBtn:      { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 20, paddingVertical: 16, borderRadius: radius.lg, backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border },
  backBtnText:  { fontSize: font.base, fontWeight: '600', color: colors.gray },
  nextBtn:      { flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.green, borderRadius: radius.lg, paddingVertical: 16 },
  nextBtnText:  { fontSize: font.base, fontWeight: '800', color: colors.white },
  agreementCard: { backgroundColor: colors.white, borderRadius: radius.lg, padding: 16, borderWidth: 1.5, borderColor: colors.border, gap: 12 },
  agreementTitle: { fontSize: font.base, fontWeight: '700', color: colors.text },
  agreementText:  { fontSize: font.sm, color: colors.textMuted, lineHeight: 20 },
  agreementCheck: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  agreementCheckText: { flex: 1, fontSize: font.sm, color: colors.text, fontWeight: '500', lineHeight: 20 },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, gap: 16 },
  successIcon:  { marginVertical: 8 },
  successTitle: { fontSize: font.xl, fontWeight: '900', color: colors.text },
  successText:  { fontSize: font.base, color: colors.textMuted, textAlign: 'center', lineHeight: 24 },
  successRef:   { backgroundColor: colors.green + '12', borderRadius: radius.md, paddingHorizontal: 20, paddingVertical: 12, alignItems: 'center', gap: 4 },
  successRefLabel: { fontSize: font.sm, color: colors.textMuted },
  successRefNum: { fontSize: font.lg, fontWeight: '800', color: colors.green, fontVariant: ['tabular-nums'] },
  successBtn:   { backgroundColor: colors.green, borderRadius: radius.lg, paddingHorizontal: 28, paddingVertical: 14 },
  successBtnText: { fontSize: font.base, fontWeight: '700', color: colors.white },
})
