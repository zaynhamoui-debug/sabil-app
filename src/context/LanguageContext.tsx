import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type LangCode = 'en' | 'ar' | 'fa' | 'es'

export interface Translations {
  // Navigation
  home: string; donate: string; volunteer: string; services: string; about: string

  // Home
  heroTitle: string; heroSub: string; missionQuote: string
  applyForAssistance: string; ourMission: string; ourPrograms: string
  needAssistance: string; submitApplicationToday: string; joinAsVolunteer: string
  dayOfDignityEvent: string; servingWithDignity: string; buildingStrongerCommunities: string
  familiesServed: string; mealsDistributed: string; communityVolunteers: string
  healthHumanServices: string

  // Services hub
  getHelp: string; chooseService: string
  foodAssistance: string; foodAssistanceDesc: string
  rentalAssistance: string; rentalAssistanceDesc: string; applyNow: string

  // Food screen
  foodAssistanceTitle: string; foodHeroSub: string
  readyToApplyFood: string; foodFormTime: string; openFoodForm: string; officialFoodForm: string
  whatWeProvide: string
  weeklyGroceries: string; weeklyGroceriesDesc: string
  emergencyFood: string; emergencyFoodDesc: string
  nutritionSupport: string; nutritionSupportDesc: string
  communityPantry: string; communityPantryDesc: string
  docsToPrep: string; docsSpeedUp: string
  doc_id: string; doc_income: string; doc_household: string; doc_address: string
  startFoodApp: string

  // Rental screen
  rentalAssistanceTitle: string; rentalHeroSub: string
  readyToApplyRental: string; rentalFormTime: string; openRentalForm: string; officialRentalForm: string
  whatWeHelpWith: string
  rentalDoc_id: string; rentalDoc_income: string; rentalDoc_lease: string
  rentalDoc_eviction: string; rentalDoc_ssn: string; rentalDoc_address: string
  startRentalApp: string

  // Shared
  haveQuestions: string; teamHereToHelp: string; emailUs: string; visitWebsite: string

  // Volunteer
  volunteerWithUs: string; volunteerSubtitle: string
  directImpact: string; meaningfulConnections: string; gainSkills: string
  yourInformation: string; firstName: string; lastName: string
  emailAddress: string; phoneNumber: string; availability: string
  areasOfInterest: string; anythingElse: string; anythingPlaceholder: string
  submitApplication: string; submitting: string
  thankYou: string; volunteerSuccessText: string; submitAnother: string
  missingInfo: string; missingInfoMsg: string; invalidEmail: string; invalidEmailMsg: string
  days: string[]
  interest_food: string; interest_admin: string; interest_events: string
  interest_health: string; interest_youth: string; interest_driving: string

  // Donate
  makeADifference: string; donateSubtitle: string
  selectAmount: string; customAmount: string; oneTime: string; monthly: string
  amountLabel: string; frequencyLabel: string
  taxDeductible: string; securePayment: string; toPrograms: string
  opening: string; invalidAmount: string; invalidAmountMsg: string
  impact_10: string; impact_25: string; impact_50: string
  impact_100: string; impact_250: string; impact_500: string

  // About
  ourValues: string; whatWeDo: string; getInTouch: string
  website: string; email: string; volunteerInquiries: string
  nonprofitTitle: string; nonprofitDesc: string; supportMission: string; appVersion: string
  val_dignity: string; val_dignity_desc: string
  val_equity: string; val_equity_desc: string
  val_integrity: string; val_integrity_desc: string
  val_community: string; val_community_desc: string
  prog_food: string; prog_food_desc: string
  prog_rental: string; prog_rental_desc: string
  prog_health: string; prog_health_desc: string
  prog_finance: string; prog_finance_desc: string

  // Notifications
  notifTitle: string; notifBody: string
  enableNotifications: string; notifPromptTitle: string; notifPromptDesc: string
  notifEnable: string; notifSkip: string; notifEnabled: string; notifDayLabel: string
}

// ─── English ───────────────────────────────────────────────────────────────
const EN: Translations = {
  home: 'Home', donate: 'Donate', volunteer: 'Volunteer', services: 'Services', about: 'About',
  heroTitle: 'Serving Our\nCommunity With\nDignity & Respect',
  heroSub: 'Providing equitable food, health, and financial security to families in need.',
  missionQuote: "\"Sabil is a health and human services nonprofit that strives to improve an individual and family's quality of life by readily providing them with equitable food, health, and financial security with dignity and respect.\"",
  applyForAssistance: 'Apply for Assistance', ourMission: 'Our Mission', ourPrograms: 'Our Programs',
  needAssistance: 'Need Assistance?', submitApplicationToday: 'Submit an application today',
  joinAsVolunteer: 'Join as Volunteer', dayOfDignityEvent: 'Day of Dignity Event',
  servingWithDignity: 'Serving the community with dignity & respect',
  buildingStrongerCommunities: 'Building stronger communities together',
  familiesServed: 'Families\nServed', mealsDistributed: 'Meals\nDistributed', communityVolunteers: 'Community\nVolunteers',
  healthHumanServices: 'Health & Human Services Nonprofit',
  getHelp: 'Get Help', chooseService: 'Choose the type of assistance you need.',
  foodAssistance: 'Food Assistance', foodAssistanceDesc: 'Weekly food pantry, emergency groceries & nutritional support for families.',
  rentalAssistance: 'Rental Assistance', rentalAssistanceDesc: 'Emergency financial support to prevent eviction and keep your family housed.',
  applyNow: 'Apply Now',
  foodAssistanceTitle: 'Food Assistance\nApplication', foodHeroSub: 'Apply for our food pantry, emergency groceries, and nutritional programs.',
  readyToApplyFood: 'Ready to Apply for Food?', foodFormTime: 'Our food assistance application takes about 5–10 minutes.',
  openFoodForm: 'Open Food Assistance Form', officialFoodForm: 'Opens the official Sabil USA food assistance application',
  whatWeProvide: 'What We Provide',
  weeklyGroceries: 'Weekly Groceries', weeklyGroceriesDesc: 'Fresh produce, pantry staples, and household essentials every week.',
  emergencyFood: 'Emergency Food Boxes', emergencyFoodDesc: 'Immediate food support for families in crisis situations.',
  nutritionSupport: 'Nutrition Support', nutritionSupportDesc: 'Guidance on healthy eating and access to specialized dietary items.',
  communityPantry: 'Community Pantry', communityPantryDesc: 'Walk-in pantry access during distribution hours for qualified households.',
  docsToPrep: 'Documents to Prepare', docsSpeedUp: 'Having these ready will speed up your application:',
  doc_id: 'Government-issued photo ID', doc_income: 'Proof of income or benefits letter',
  doc_household: 'Proof of household size (birth certificates, school records)',
  doc_address: 'Proof of current address (utility bill or lease)',
  startFoodApp: 'Start Food Assistance Application',
  rentalAssistanceTitle: 'Rental Assistance\nApplication', rentalHeroSub: 'Apply for emergency rental support to prevent eviction and stay housed.',
  readyToApplyRental: 'Ready to Apply for Rental Help?', rentalFormTime: 'Our application takes about 10–15 minutes to complete.',
  openRentalForm: 'Open Rental Assistance Form', officialRentalForm: 'Opens the official Sabil USA rental assistance application',
  whatWeHelpWith: 'What We Help With',
  rentalDoc_id: "Government-issued photo ID (driver's license, passport, or state ID)",
  rentalDoc_income: 'Proof of income (pay stubs, benefits letters, or bank statements)',
  rentalDoc_lease: 'Copy of your current lease or rental agreement',
  rentalDoc_eviction: 'Any eviction notices or utility shut-off notices (if applicable)',
  rentalDoc_ssn: 'Social Security cards for all household members',
  rentalDoc_address: 'Proof of address (utility bill or bank statement)',
  startRentalApp: 'Start Rental Assistance Application',
  haveQuestions: 'Have Questions?', teamHereToHelp: 'Our team is here to help walk you through the process.',
  emailUs: 'Email Us', visitWebsite: 'Visit Website',
  volunteerWithUs: 'Volunteer With Us', volunteerSubtitle: "Join our community of dedicated volunteers making a real difference in families' lives.",
  directImpact: 'Make a direct impact in your community', meaningfulConnections: 'Build meaningful connections', gainSkills: 'Gain skills and experience',
  yourInformation: 'Your Information', firstName: 'First Name', lastName: 'Last Name',
  emailAddress: 'Email Address', phoneNumber: 'Phone Number', availability: 'Availability',
  areasOfInterest: 'Areas of Interest', anythingElse: "Anything Else You'd Like Us to Know?",
  anythingPlaceholder: 'Skills, experience, questions...',
  submitApplication: 'Submit Application', submitting: 'Submitting...',
  thankYou: 'Thank You!', volunteerSuccessText: "We've received your volunteer application. Our team will reach out within 2–3 business days.",
  submitAnother: 'Submit Another',
  missingInfo: 'Missing Info', missingInfoMsg: 'Please fill in your name and email to continue.',
  invalidEmail: 'Invalid Email', invalidEmailMsg: 'Please enter a valid email address.',
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  interest_food: 'Food Distribution', interest_admin: 'Admin & Office', interest_events: 'Events & Outreach',
  interest_health: 'Health Programs', interest_youth: 'Youth Programs', interest_driving: 'Driving & Delivery',
  makeADifference: 'Make a Difference', donateSubtitle: 'Your donation helps Sabil USA provide food, housing, and health support to families in need.',
  selectAmount: 'Select an Amount', customAmount: 'Or Enter Custom Amount', oneTime: 'One-Time', monthly: 'Monthly',
  amountLabel: 'Amount', frequencyLabel: 'Frequency',
  taxDeductible: 'Tax Deductible', securePayment: 'Secure Payment', toPrograms: '100% to Programs',
  opening: 'Opening...', invalidAmount: 'Invalid Amount', invalidAmountMsg: 'Please enter a valid donation amount.',
  impact_10: 'Provides a week of groceries for one person',
  impact_25: "Covers a family's emergency food for a week",
  impact_50: 'Helps with one month of utility assistance',
  impact_100: 'Contributes toward one month of rent support',
  impact_250: 'Funds a full month of meals for a family of four',
  impact_500: 'Provides comprehensive support for one family in need',
  ourValues: 'Our Values', whatWeDo: 'What We Do', getInTouch: 'Get in Touch',
  website: 'Website', email: 'Email', volunteerInquiries: 'Volunteer Inquiries',
  nonprofitTitle: '501(c)(3) Nonprofit', nonprofitDesc: 'Sabil USA is a registered nonprofit. All donations are tax-deductible to the fullest extent permitted by law.',
  supportMission: 'Support Our Mission', appVersion: 'Sabil USA App · v1.0.0',
  val_dignity: 'Dignity', val_dignity_desc: 'Every person deserves to be treated with respect and compassion.',
  val_equity: 'Equity', val_equity_desc: 'We meet each family where they are with individualized support.',
  val_integrity: 'Integrity', val_integrity_desc: 'We are accountable to our community and transparent in all we do.',
  val_community: 'Community', val_community_desc: 'Rooted in the belief that strong communities lift everyone up.',
  prog_food: 'Food Distribution', prog_food_desc: 'Weekly food pantry and emergency groceries for families facing food insecurity.',
  prog_rental: 'Rental Assistance', prog_rental_desc: 'Emergency financial support to prevent evictions and keep families housed.',
  prog_health: 'Health Services', prog_health_desc: 'Connecting community members to health resources, screenings, and referrals.',
  prog_finance: 'Financial Security', prog_finance_desc: 'Counseling and direct assistance to build long-term economic stability.',
  notifTitle: 'Food Distribution Day!', notifBody: 'Today is a Sabil USA food distribution day. Come pick up your groceries!',
  enableNotifications: 'Enable Notifications', notifPromptTitle: 'Stay Informed', notifDayLabel: 'Notify me on distribution days',
  notifPromptDesc: 'Get reminders on food distribution days so you never miss a pickup.',
  notifEnable: 'Enable Reminders', notifSkip: 'Not Now', notifEnabled: 'Reminders Enabled ✓',
}

// ─── Arabic ────────────────────────────────────────────────────────────────
const AR: Translations = {
  home: 'الرئيسية', donate: 'تبرع', volunteer: 'تطوع', services: 'الخدمات', about: 'عن سبيل',
  heroTitle: 'نخدم مجتمعنا\nبكرامة\nواحترام',
  heroSub: 'نوفر الغذاء والصحة والأمن المالي للعائلات المحتاجة بشكل عادل.',
  missionQuote: '«سبيل منظمة غير ربحية للصحة والخدمات الإنسانية تسعى إلى تحسين جودة حياة الأفراد والأسر من خلال توفير الغذاء والصحة والأمن المالي بكرامة واحترام.»',
  applyForAssistance: 'التقدم للمساعدة', ourMission: 'مهمتنا', ourPrograms: 'برامجنا',
  needAssistance: 'هل تحتاج مساعدة؟', submitApplicationToday: 'قدّم طلبك اليوم',
  joinAsVolunteer: 'انضم كمتطوع', dayOfDignityEvent: 'يوم الكرامة',
  servingWithDignity: 'نخدم مجتمعنا بكرامة واحترام',
  buildingStrongerCommunities: 'نبني مجتمعات أقوى معاً',
  familiesServed: 'عائلة\nتمت خدمتها', mealsDistributed: 'وجبة\nتم توزيعها', communityVolunteers: 'متطوع\nمجتمعي',
  healthHumanServices: 'منظمة غير ربحية للصحة والخدمات الإنسانية',
  getHelp: 'احصل على مساعدة', chooseService: 'اختر نوع المساعدة التي تحتاجها.',
  foodAssistance: 'مساعدة غذائية', foodAssistanceDesc: 'بقالة أسبوعية ومساعدات غذائية طارئة ودعم تغذوي للعائلات.',
  rentalAssistance: 'مساعدة سكنية', rentalAssistanceDesc: 'دعم مالي طارئ لمنع الإخلاء والحفاظ على سكن عائلتك.',
  applyNow: 'قدّم الآن',
  foodAssistanceTitle: 'طلب المساعدة\nالغذائية', foodHeroSub: 'قدّم طلبك لمخزن الطعام والبقالة الطارئة والبرامج الغذائية.',
  readyToApplyFood: 'هل أنت مستعد للتقدم للمساعدة الغذائية؟', foodFormTime: 'يستغرق طلب المساعدة الغذائية من 5 إلى 10 دقائق.',
  openFoodForm: 'فتح نموذج المساعدة الغذائية', officialFoodForm: 'يفتح نموذج طلب المساعدة الغذائية الرسمي من سبيل',
  whatWeProvide: 'ما نقدمه',
  weeklyGroceries: 'بقالة أسبوعية', weeklyGroceriesDesc: 'خضروات طازجة ومواد أساسية كل أسبوع.',
  emergencyFood: 'صناديق طعام طارئة', emergencyFoodDesc: 'دعم غذائي فوري للعائلات في أوضاع الأزمات.',
  nutritionSupport: 'دعم تغذوي', nutritionSupportDesc: 'إرشادات للأكل الصحي والوصول إلى عناصر غذائية متخصصة.',
  communityPantry: 'مستودع مجتمعي', communityPantryDesc: 'الوصول إلى المستودع خلال ساعات التوزيع للأسر المؤهلة.',
  docsToPrep: 'الوثائق المطلوبة', docsSpeedUp: 'تجهيز هذه الوثائق سيسرّع طلبك:',
  doc_id: 'هوية شخصية صادرة عن الحكومة', doc_income: 'إثبات الدخل أو خطاب المزايا',
  doc_household: 'إثبات حجم الأسرة (شهادات ميلاد، سجلات مدرسية)',
  doc_address: 'إثبات العنوان الحالي (فاتورة مرافق أو عقد إيجار)',
  startFoodApp: 'ابدأ طلب المساعدة الغذائية',
  rentalAssistanceTitle: 'طلب المساعدة\nالسكنية', rentalHeroSub: 'قدّم طلبك للحصول على دعم إيجار طارئ لمنع الإخلاء.',
  readyToApplyRental: 'هل أنت مستعد للتقدم للمساعدة السكنية؟', rentalFormTime: 'يستغرق الطلب من 10 إلى 15 دقيقة.',
  openRentalForm: 'فتح نموذج المساعدة السكنية', officialRentalForm: 'يفتح نموذج طلب المساعدة السكنية الرسمي من سبيل',
  whatWeHelpWith: 'ما نساعد فيه',
  rentalDoc_id: 'هوية صادرة عن الحكومة (رخصة قيادة، جواز سفر، أو بطاقة ولاية)',
  rentalDoc_income: 'إثبات الدخل (كشوف رواتب، خطابات مزايا، أو كشوف بنكية)',
  rentalDoc_lease: 'نسخة من عقد الإيجار الحالي',
  rentalDoc_eviction: 'أي إشعارات إخلاء أو قطع خدمات (إن وجدت)',
  rentalDoc_ssn: 'بطاقات الضمان الاجتماعي لجميع أفراد الأسرة',
  rentalDoc_address: 'إثبات العنوان (فاتورة مرافق أو كشف حساب بنكي)',
  startRentalApp: 'ابدأ طلب المساعدة السكنية',
  haveQuestions: 'هل لديك أسئلة؟', teamHereToHelp: 'فريقنا هنا لمساعدتك في العملية.',
  emailUs: 'راسلنا', visitWebsite: 'زيارة الموقع',
  volunteerWithUs: 'تطوع معنا', volunteerSubtitle: 'انضم إلى مجتمعنا من المتطوعين المتفانين.',
  directImpact: 'أحدث تأثيراً مباشراً في مجتمعك', meaningfulConnections: 'بناء علاقات هادفة', gainSkills: 'اكتسب مهارات وخبرات',
  yourInformation: 'معلوماتك الشخصية', firstName: 'الاسم الأول', lastName: 'الاسم الأخير',
  emailAddress: 'البريد الإلكتروني', phoneNumber: 'رقم الهاتف', availability: 'الإتاحة',
  areasOfInterest: 'مجالات الاهتمام', anythingElse: 'هل هناك ما تودّ إضافته؟',
  anythingPlaceholder: 'مهارات، خبرات، أسئلة...',
  submitApplication: 'إرسال الطلب', submitting: 'جارٍ الإرسال...',
  thankYou: 'شكراً لك!', volunteerSuccessText: 'استلمنا طلبك للتطوع. سيتواصل معك فريقنا خلال 2-3 أيام عمل.',
  submitAnother: 'تقديم طلب آخر',
  missingInfo: 'معلومات ناقصة', missingInfoMsg: 'يرجى ملء اسمك وبريدك الإلكتروني للمتابعة.',
  invalidEmail: 'بريد إلكتروني غير صالح', invalidEmailMsg: 'يرجى إدخال عنوان بريد إلكتروني صالح.',
  days: ['الإث', 'الثل', 'الأر', 'الخم', 'الجم', 'السب', 'الأح'],
  interest_food: 'توزيع الطعام', interest_admin: 'الإدارة والمكتب', interest_events: 'الفعاليات والتوعية',
  interest_health: 'برامج الصحة', interest_youth: 'برامج الشباب', interest_driving: 'القيادة والتوصيل',
  makeADifference: 'أحدث فرقاً', donateSubtitle: 'تبرعك يساعد سبيل على تقديم الغذاء والسكن والدعم الصحي للعائلات.',
  selectAmount: 'اختر مبلغاً', customAmount: 'أو أدخل مبلغاً مخصصاً', oneTime: 'مرة واحدة', monthly: 'شهرياً',
  amountLabel: 'المبلغ', frequencyLabel: 'التكرار',
  taxDeductible: 'معفى من الضرائب', securePayment: 'دفع آمن', toPrograms: '100% للبرامج',
  opening: 'جارٍ الفتح...', invalidAmount: 'مبلغ غير صالح', invalidAmountMsg: 'يرجى إدخال مبلغ تبرع صالح.',
  impact_10: 'توفر بقالة أسبوع لشخص واحد',
  impact_25: 'تغطي الغذاء الطارئ لعائلة لمدة أسبوع',
  impact_50: 'تساعد في مرفق خدمات لمدة شهر',
  impact_100: 'تساهم في دعم إيجار لمدة شهر',
  impact_250: 'تموّل وجبات كاملة لعائلة من أربعة لشهر',
  impact_500: 'توفر دعماً شاملاً لعائلة محتاجة',
  ourValues: 'قيمنا', whatWeDo: 'ما نفعله', getInTouch: 'تواصل معنا',
  website: 'الموقع الإلكتروني', email: 'البريد الإلكتروني', volunteerInquiries: 'استفسارات التطوع',
  nonprofitTitle: 'منظمة غير ربحية 501(c)(3)', nonprofitDesc: 'سبيل منظمة غير ربحية مسجلة. جميع التبرعات معفاة من الضرائب.',
  supportMission: 'ادعم مهمتنا', appVersion: 'تطبيق سبيل · الإصدار 1.0.0',
  val_dignity: 'الكرامة', val_dignity_desc: 'كل شخص يستحق أن يُعامَل باحترام وتعاطف.',
  val_equity: 'العدالة', val_equity_desc: 'نلتقي بكل عائلة حيث هي بدعم فردي مخصص.',
  val_integrity: 'النزاهة', val_integrity_desc: 'نحن مسؤولون أمام مجتمعنا وشفافون في كل ما نفعله.',
  val_community: 'المجتمع', val_community_desc: 'راسخون في الاعتقاد بأن المجتمعات القوية ترفع الجميع.',
  prog_food: 'توزيع الطعام', prog_food_desc: 'مخزن طعام أسبوعي وبقالة طارئة للعائلات التي تعاني من انعدام الأمن الغذائي.',
  prog_rental: 'مساعدة الإيجار', prog_rental_desc: 'دعم مالي طارئ لمنع الإخلاء والحفاظ على سكن الأسر.',
  prog_health: 'الخدمات الصحية', prog_health_desc: 'ربط أفراد المجتمع بالموارد الصحية والفحوصات والإحالات.',
  prog_finance: 'الأمن المالي', prog_finance_desc: 'الإرشاد والمساعدة المباشرة لبناء الاستقرار الاقتصادي على المدى الطويل.',
  notifTitle: 'يوم توزيع الطعام!', notifBody: 'اليوم هو يوم توزيع الطعام من سبيل. تعال لاستلام بقالتك!',
  enableNotifications: 'تفعيل الإشعارات', notifPromptTitle: 'ابقَ على اطلاع', notifDayLabel: 'أشعرني في أيام التوزيع',
  notifPromptDesc: 'احصل على تذكيرات في أيام توزيع الطعام حتى لا تفوتك أي توزيعة.',
  notifEnable: 'تفعيل التذكيرات', notifSkip: 'ليس الآن', notifEnabled: 'التذكيرات مفعّلة ✓',
}

// ─── Farsi ─────────────────────────────────────────────────────────────────
const FA: Translations = {
  home: 'خانه', donate: 'کمک مالی', volunteer: 'داوطلب', services: 'خدمات', about: 'درباره ما',
  heroTitle: 'خدمت به جامعه‌مان\nبا کرامت\nو احترام',
  heroSub: 'ارائه غذا، سلامت و امنیت مالی برابر به خانواده‌های نیازمند.',
  missionQuote: '«سبیل یک سازمان غیرانتفاعی بهداشت و خدمات انسانی است که تلاش می‌کند با ارائه غذا، سلامت و امنیت مالی برابر با کرامت و احترام، کیفیت زندگی افراد و خانواده‌ها را بهبود بخشد.»',
  applyForAssistance: 'درخواست کمک', ourMission: 'مأموریت ما', ourPrograms: 'برنامه‌های ما',
  needAssistance: 'نیاز به کمک دارید؟', submitApplicationToday: 'امروز درخواست دهید',
  joinAsVolunteer: 'به عنوان داوطلب بپیوندید', dayOfDignityEvent: 'روز کرامت',
  servingWithDignity: 'خدمت به جامعه با کرامت و احترام',
  buildingStrongerCommunities: 'ساختن جوامع قوی‌تر با هم',
  familiesServed: 'خانواده\nتحت پوشش', mealsDistributed: 'وعده غذایی\nتوزیع شده', communityVolunteers: 'داوطلب\nجامعه',
  healthHumanServices: 'سازمان غیرانتفاعی بهداشت و خدمات انسانی',
  getHelp: 'دریافت کمک', chooseService: 'نوع کمک مورد نیاز خود را انتخاب کنید.',
  foodAssistance: 'کمک غذایی', foodAssistanceDesc: 'خواربار هفتگی، کمک غذایی اضطراری و پشتیبانی تغذیه‌ای برای خانواده‌ها.',
  rentalAssistance: 'کمک اجاره', rentalAssistanceDesc: 'حمایت مالی اضطراری برای جلوگیری از اخراج و حفظ مسکن خانواده‌تان.',
  applyNow: 'همین الان درخواست دهید',
  foodAssistanceTitle: 'درخواست کمک\nغذایی', foodHeroSub: 'برای پانتری غذا، خواربار اضطراری و برنامه‌های تغذیه‌ای درخواست دهید.',
  readyToApplyFood: 'آماده درخواست کمک غذایی هستید؟', foodFormTime: 'درخواست کمک غذایی حدود ۵ تا ۱۰ دقیقه طول می‌کشد.',
  openFoodForm: 'باز کردن فرم کمک غذایی', officialFoodForm: 'فرم رسمی درخواست کمک غذایی سبیل را باز می‌کند',
  whatWeProvide: 'آنچه ارائه می‌دهیم',
  weeklyGroceries: 'خواربار هفتگی', weeklyGroceriesDesc: 'محصولات تازه و اقلام ضروری هر هفته.',
  emergencyFood: 'جعبه‌های غذای اضطراری', emergencyFoodDesc: 'حمایت فوری غذایی برای خانواده‌ها در شرایط بحران.',
  nutritionSupport: 'پشتیبانی تغذیه‌ای', nutritionSupportDesc: 'راهنمایی برای تغذیه سالم و دسترسی به اقلام غذایی تخصصی.',
  communityPantry: 'پانتری جامعه', communityPantryDesc: 'دسترسی به پانتری در ساعات توزیع برای خانوارهای واجد شرایط.',
  docsToPrep: 'مدارک مورد نیاز', docsSpeedUp: 'آماده داشتن این مدارک درخواست شما را تسریع می‌کند:',
  doc_id: 'شناسنامه عکس‌دار دولتی', doc_income: 'مدرک درآمد یا نامه مزایا',
  doc_household: 'مدرک اندازه خانوار (شناسنامه، مدارک مدرسه)',
  doc_address: 'مدرک آدرس فعلی (قبض آب و برق یا اجاره‌نامه)',
  startFoodApp: 'شروع درخواست کمک غذایی',
  rentalAssistanceTitle: 'درخواست کمک\nاجاره', rentalHeroSub: 'برای حمایت اجاره اضطراری جهت جلوگیری از اخراج درخواست دهید.',
  readyToApplyRental: 'آماده درخواست کمک اجاره هستید؟', rentalFormTime: 'درخواست حدود ۱۰ تا ۱۵ دقیقه طول می‌کشد.',
  openRentalForm: 'باز کردن فرم کمک اجاره', officialRentalForm: 'فرم رسمی درخواست کمک اجاره سبیل را باز می‌کند',
  whatWeHelpWith: 'آنچه کمک می‌کنیم',
  rentalDoc_id: 'شناسنامه عکس‌دار دولتی (گواهینامه، پاسپورت یا کارت شناسایی ایالتی)',
  rentalDoc_income: 'مدرک درآمد (فیش حقوقی، نامه مزایا یا صورت‌حساب بانکی)',
  rentalDoc_lease: 'نسخه‌ای از اجاره‌نامه فعلی',
  rentalDoc_eviction: 'هرگونه اخطار اخراج یا قطع خدمات (در صورت وجود)',
  rentalDoc_ssn: 'کارت‌های تأمین اجتماعی برای تمام اعضای خانوار',
  rentalDoc_address: 'مدرک آدرس (قبض آب و برق یا صورت‌حساب بانکی)',
  startRentalApp: 'شروع درخواست کمک اجاره',
  haveQuestions: 'سؤال دارید؟', teamHereToHelp: 'تیم ما اینجاست تا شما را در فرآیند راهنمایی کند.',
  emailUs: 'ایمیل بزنید', visitWebsite: 'بازدید از وبسایت',
  volunteerWithUs: 'با ما داوطلب شوید', volunteerSubtitle: 'به جامعه داوطلبان فداکار ما بپیوندید.',
  directImpact: 'تأثیر مستقیم در جامعه‌تان', meaningfulConnections: 'ایجاد ارتباطات معنادار', gainSkills: 'کسب مهارت و تجربه',
  yourInformation: 'اطلاعات شما', firstName: 'نام', lastName: 'نام خانوادگی',
  emailAddress: 'آدرس ایمیل', phoneNumber: 'شماره تلفن', availability: 'در دسترس بودن',
  areasOfInterest: 'حوزه‌های مورد علاقه', anythingElse: 'چیز دیگری می‌خواهید اضافه کنید؟',
  anythingPlaceholder: 'مهارت‌ها، تجربیات، سؤالات...',
  submitApplication: 'ارسال درخواست', submitting: 'در حال ارسال...',
  thankYou: 'ممنون!', volunteerSuccessText: 'درخواست داوطلبانه شما دریافت شد. تیم ما ظرف ۲-۳ روز کاری با شما تماس خواهد گرفت.',
  submitAnother: 'ارسال درخواست دیگر',
  missingInfo: 'اطلاعات ناقص', missingInfoMsg: 'لطفاً نام و ایمیل خود را برای ادامه پر کنید.',
  invalidEmail: 'ایمیل نامعتبر', invalidEmailMsg: 'لطفاً یک آدرس ایمیل معتبر وارد کنید.',
  days: ['دوش', 'سه‌ش', 'چهار', 'پنج', 'جمعه', 'شنبه', 'یکشن'],
  interest_food: 'توزیع غذا', interest_admin: 'اداری و دفتری', interest_events: 'رویدادها و آگاهی‌رسانی',
  interest_health: 'برنامه‌های بهداشتی', interest_youth: 'برنامه‌های جوانان', interest_driving: 'رانندگی و تحویل',
  makeADifference: 'تفاوت ایجاد کنید', donateSubtitle: 'کمک مالی شما به سبیل امکان می‌دهد غذا، مسکن و حمایت بهداشتی ارائه دهد.',
  selectAmount: 'مبلغ را انتخاب کنید', customAmount: 'یا مبلغ دلخواه وارد کنید', oneTime: 'یک‌بار', monthly: 'ماهانه',
  amountLabel: 'مبلغ', frequencyLabel: 'دوره پرداخت',
  taxDeductible: 'معاف از مالیات', securePayment: 'پرداخت امن', toPrograms: '۱۰۰٪ برای برنامه‌ها',
  opening: 'در حال باز شدن...', invalidAmount: 'مبلغ نامعتبر', invalidAmountMsg: 'لطفاً مبلغ معتبری برای کمک مالی وارد کنید.',
  impact_10: 'خواربار یک هفته برای یک نفر فراهم می‌کند',
  impact_25: 'غذای اضطراری یک هفته یک خانواده را تأمین می‌کند',
  impact_50: 'با یک ماه کمک هزینه آب و برق کمک می‌کند',
  impact_100: 'به حمایت اجاره یک ماه کمک می‌کند',
  impact_250: 'یک ماه وعده غذایی کامل برای خانواده چهار نفره تأمین می‌کند',
  impact_500: 'حمایت جامع برای یک خانواده نیازمند فراهم می‌کند',
  ourValues: 'ارزش‌های ما', whatWeDo: 'آنچه انجام می‌دهیم', getInTouch: 'تماس با ما',
  website: 'وبسایت', email: 'ایمیل', volunteerInquiries: 'استعلامات داوطلبی',
  nonprofitTitle: 'سازمان غیرانتفاعی ۵۰۱(ج)(۳)', nonprofitDesc: 'سبیل یک سازمان غیرانتفاعی ثبت شده است. تمام کمک‌های مالی از مالیات معاف هستند.',
  supportMission: 'از مأموریت ما حمایت کنید', appVersion: 'اپلیکیشن سبیل · نسخه ۱.۰.۰',
  val_dignity: 'کرامت', val_dignity_desc: 'هر انسانی لایق رفتار محترمانه و دلسوزانه است.',
  val_equity: 'برابری', val_equity_desc: 'هر خانواده را آنجا که هست با حمایت فردی ملاقات می‌کنیم.',
  val_integrity: 'صداقت', val_integrity_desc: 'در برابر جامعه‌مان پاسخگو و در همه کارها شفاف هستیم.',
  val_community: 'جامعه', val_community_desc: 'ریشه در این باور داریم که جوامع قوی همه را بالا می‌برند.',
  prog_food: 'توزیع غذا', prog_food_desc: 'پانتری غذایی هفتگی و خواربار اضطراری برای خانواده‌های دچار ناامنی غذایی.',
  prog_rental: 'کمک اجاره', prog_rental_desc: 'حمایت مالی اضطراری برای جلوگیری از اخراج و حفظ مسکن خانواده‌ها.',
  prog_health: 'خدمات بهداشتی', prog_health_desc: 'اتصال اعضای جامعه به منابع بهداشتی، غربالگری و ارجاعات.',
  prog_finance: 'امنیت مالی', prog_finance_desc: 'مشاوره و کمک مستقیم برای ایجاد ثبات اقتصادی بلندمدت.',
  notifTitle: 'روز توزیع غذا!', notifBody: 'امروز روز توزیع غذای سبیل است. بیایید خواربارتان را دریافت کنید!',
  enableNotifications: 'فعال‌سازی اعلان‌ها', notifPromptTitle: 'مطلع بمانید', notifDayLabel: 'در روزهای توزیع به من اطلاع بده',
  notifPromptDesc: 'یادآوری‌هایی در روزهای توزیع غذا دریافت کنید تا هیچ توزیعی را از دست ندهید.',
  notifEnable: 'فعال‌سازی یادآورها', notifSkip: 'الان نه', notifEnabled: 'یادآورها فعال شدند ✓',
}

// ─── Spanish ───────────────────────────────────────────────────────────────
const ES: Translations = {
  home: 'Inicio', donate: 'Donar', volunteer: 'Voluntario', services: 'Servicios', about: 'Acerca de',
  heroTitle: 'Sirviendo a\nNuestra Comunidad\ncon Dignidad',
  heroSub: 'Brindando alimentos, salud y seguridad financiera equitativa a familias en necesidad.',
  missionQuote: '"Sabil es una organización sin fines de lucro de salud y servicios humanos que se esfuerza por mejorar la calidad de vida de individuos y familias proporcionándoles alimentos, salud y seguridad financiera con dignidad y respeto."',
  applyForAssistance: 'Solicitar Ayuda', ourMission: 'Nuestra Misión', ourPrograms: 'Nuestros Programas',
  needAssistance: '¿Necesitas Ayuda?', submitApplicationToday: 'Envía una solicitud hoy',
  joinAsVolunteer: 'Únete como Voluntario', dayOfDignityEvent: 'Día de Dignidad',
  servingWithDignity: 'Sirviendo a la comunidad con dignidad y respeto',
  buildingStrongerCommunities: 'Construyendo comunidades más fuertes juntos',
  familiesServed: 'Familias\nAtendidas', mealsDistributed: 'Comidas\nDistribuidas', communityVolunteers: 'Voluntarios\nComunitarios',
  healthHumanServices: 'Organización sin Fines de Lucro de Salud y Servicios Humanos',
  getHelp: 'Obtener Ayuda', chooseService: 'Elige el tipo de asistencia que necesitas.',
  foodAssistance: 'Asistencia Alimentaria', foodAssistanceDesc: 'Despensa semanal, comestibles de emergencia y apoyo nutricional para familias.',
  rentalAssistance: 'Asistencia de Renta', rentalAssistanceDesc: 'Apoyo financiero de emergencia para prevenir el desalojo y mantener a tu familia en casa.',
  applyNow: 'Solicitar Ahora',
  foodAssistanceTitle: 'Solicitud de\nAsistencia Alimentaria', foodHeroSub: 'Solicita nuestra despensa comunitaria, comestibles de emergencia y programas nutricionales.',
  readyToApplyFood: '¿Listo para Solicitar Alimentos?', foodFormTime: 'La solicitud tarda aproximadamente 5–10 minutos.',
  openFoodForm: 'Abrir Formulario de Alimentos', officialFoodForm: 'Abre la solicitud oficial de asistencia alimentaria de Sabil USA',
  whatWeProvide: 'Lo Que Ofrecemos',
  weeklyGroceries: 'Comestibles Semanales', weeklyGroceriesDesc: 'Productos frescos y artículos esenciales cada semana.',
  emergencyFood: 'Cajas de Emergencia', emergencyFoodDesc: 'Apoyo alimentario inmediato para familias en situaciones de crisis.',
  nutritionSupport: 'Apoyo Nutricional', nutritionSupportDesc: 'Orientación sobre alimentación saludable y acceso a artículos dietéticos especializados.',
  communityPantry: 'Despensa Comunitaria', communityPantryDesc: 'Acceso a la despensa durante las horas de distribución para hogares calificados.',
  docsToPrep: 'Documentos a Preparar', docsSpeedUp: 'Tenerlos listos acelerará tu solicitud:',
  doc_id: 'Identificación con foto emitida por el gobierno', doc_income: 'Comprobante de ingresos o carta de beneficios',
  doc_household: 'Comprobante del tamaño del hogar (actas de nacimiento, registros escolares)',
  doc_address: 'Comprobante de domicilio actual (recibo de servicios o contrato)',
  startFoodApp: 'Iniciar Solicitud de Asistencia Alimentaria',
  rentalAssistanceTitle: 'Solicitud de\nAsistencia de Renta', rentalHeroSub: 'Solicita apoyo de renta de emergencia para prevenir el desalojo.',
  readyToApplyRental: '¿Listo para Solicitar Ayuda con la Renta?', rentalFormTime: 'La solicitud tarda aproximadamente 10–15 minutos.',
  openRentalForm: 'Abrir Formulario de Renta', officialRentalForm: 'Abre la solicitud oficial de asistencia de renta de Sabil USA',
  whatWeHelpWith: 'Cómo Ayudamos',
  rentalDoc_id: 'Identificación con foto del gobierno (licencia, pasaporte o ID estatal)',
  rentalDoc_income: 'Comprobante de ingresos (talones de pago, cartas de beneficios o estados de cuenta)',
  rentalDoc_lease: 'Copia de tu contrato de arrendamiento actual',
  rentalDoc_eviction: 'Avisos de desalojo o corte de servicios (si aplica)',
  rentalDoc_ssn: 'Tarjetas de Seguro Social para todos los miembros del hogar',
  rentalDoc_address: 'Comprobante de domicilio (recibo de servicios o estado de cuenta bancario)',
  startRentalApp: 'Iniciar Solicitud de Asistencia de Renta',
  haveQuestions: '¿Tienes Preguntas?', teamHereToHelp: 'Nuestro equipo está aquí para guiarte en el proceso.',
  emailUs: 'Envíanos un Correo', visitWebsite: 'Visitar Sitio Web',
  volunteerWithUs: 'Voluntario con Nosotros', volunteerSubtitle: 'Únete a nuestra comunidad de voluntarios dedicados.',
  directImpact: 'Genera un impacto directo en tu comunidad', meaningfulConnections: 'Construye conexiones significativas', gainSkills: 'Gana habilidades y experiencia',
  yourInformation: 'Tu Información', firstName: 'Nombre', lastName: 'Apellido',
  emailAddress: 'Correo Electrónico', phoneNumber: 'Número de Teléfono', availability: 'Disponibilidad',
  areasOfInterest: 'Áreas de Interés', anythingElse: '¿Algo más que quieras contarnos?',
  anythingPlaceholder: 'Habilidades, experiencia, preguntas...',
  submitApplication: 'Enviar Solicitud', submitting: 'Enviando...',
  thankYou: '¡Gracias!', volunteerSuccessText: 'Recibimos tu solicitud de voluntariado. Nuestro equipo se comunicará contigo en 2–3 días hábiles.',
  submitAnother: 'Enviar Otra',
  missingInfo: 'Información Incompleta', missingInfoMsg: 'Por favor completa tu nombre y correo para continuar.',
  invalidEmail: 'Correo Inválido', invalidEmailMsg: 'Por favor ingresa un correo electrónico válido.',
  days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  interest_food: 'Distribución de Alimentos', interest_admin: 'Administración', interest_events: 'Eventos y Divulgación',
  interest_health: 'Programas de Salud', interest_youth: 'Programas Juveniles', interest_driving: 'Conducción y Entrega',
  makeADifference: 'Marca la Diferencia', donateSubtitle: 'Tu donación ayuda a Sabil USA a brindar alimentos, vivienda y apoyo de salud.',
  selectAmount: 'Selecciona un Monto', customAmount: 'O Ingresa un Monto Personalizado', oneTime: 'Una Vez', monthly: 'Mensual',
  amountLabel: 'Monto', frequencyLabel: 'Frecuencia',
  taxDeductible: 'Deducible de Impuestos', securePayment: 'Pago Seguro', toPrograms: '100% a Programas',
  opening: 'Abriendo...', invalidAmount: 'Monto Inválido', invalidAmountMsg: 'Por favor ingresa un monto de donación válido.',
  impact_10: 'Provee comestibles por una semana para una persona',
  impact_25: 'Cubre alimentos de emergencia para una familia por una semana',
  impact_50: 'Ayuda con un mes de asistencia de servicios públicos',
  impact_100: 'Contribuye a un mes de apoyo de renta',
  impact_250: 'Financia un mes completo de comidas para una familia de cuatro',
  impact_500: 'Brinda apoyo integral para una familia en necesidad',
  ourValues: 'Nuestros Valores', whatWeDo: 'Lo Que Hacemos', getInTouch: 'Contáctanos',
  website: 'Sitio Web', email: 'Correo', volunteerInquiries: 'Consultas de Voluntariado',
  nonprofitTitle: 'Organización sin Fines de Lucro 501(c)(3)', nonprofitDesc: 'Sabil USA es una organización sin fines de lucro registrada. Todas las donaciones son deducibles de impuestos.',
  supportMission: 'Apoya Nuestra Misión', appVersion: 'App Sabil USA · v1.0.0',
  val_dignity: 'Dignidad', val_dignity_desc: 'Toda persona merece ser tratada con respeto y compasión.',
  val_equity: 'Equidad', val_equity_desc: 'Nos encontramos con cada familia donde está con apoyo individualizado.',
  val_integrity: 'Integridad', val_integrity_desc: 'Somos responsables ante nuestra comunidad y transparentes en todo lo que hacemos.',
  val_community: 'Comunidad', val_community_desc: 'Arraigados en la creencia de que las comunidades fuertes elevan a todos.',
  prog_food: 'Distribución de Alimentos', prog_food_desc: 'Despensa semanal y comestibles de emergencia para familias con inseguridad alimentaria.',
  prog_rental: 'Asistencia de Renta', prog_rental_desc: 'Apoyo financiero de emergencia para prevenir desalojos y mantener a las familias en casa.',
  prog_health: 'Servicios de Salud', prog_health_desc: 'Conectar a los miembros de la comunidad con recursos de salud, exámenes y referencias.',
  prog_finance: 'Seguridad Financiera', prog_finance_desc: 'Asesoramiento y asistencia directa para construir estabilidad económica a largo plazo.',
  notifTitle: '¡Día de Distribución de Alimentos!', notifBody: 'Hoy es el día de distribución de alimentos de Sabil USA. ¡Ven a recoger tus comestibles!',
  enableNotifications: 'Activar Notificaciones', notifPromptTitle: 'Mantente Informado', notifDayLabel: 'Notificarme en días de distribución',
  notifPromptDesc: 'Recibe recordatorios en los días de distribución de alimentos para no perderte ninguna entrega.',
  notifEnable: 'Activar Recordatorios', notifSkip: 'Ahora No', notifEnabled: 'Recordatorios Activados ✓',
}

export const TRANSLATIONS: Record<LangCode, Translations> = { en: EN, ar: AR, fa: FA, es: ES }
export const LANG_LABELS: Record<LangCode, string> = { en: 'English', ar: 'العربية', fa: 'فارسی', es: 'Español' }
export const RTL_LANGS: LangCode[] = ['ar', 'fa']

interface LanguageContextType {
  lang: LangCode; t: Translations; setLang: (l: LangCode) => void; isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'en', t: EN, setLang: () => {}, isRTL: false })
const STORAGE_KEY = 'sabil_language'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en')

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(saved => {
      if (saved && saved in TRANSLATIONS) setLangState(saved as LangCode)
    })
  }, [])

  function setLang(l: LangCode) {
    setLangState(l)
    AsyncStorage.setItem(STORAGE_KEY, l)
  }

  return (
    <LanguageContext.Provider value={{ lang, t: TRANSLATIONS[lang], setLang, isRTL: RTL_LANGS.includes(lang) }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() { return useContext(LanguageContext) }
