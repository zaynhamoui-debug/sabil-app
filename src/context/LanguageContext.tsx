import React, { createContext, useContext, useState, useEffect } from 'react'
import { I18nManager } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type LangCode = 'en' | 'ar' | 'fa' | 'es'

export interface Translations {
  // Navigation
  home: string
  donate: string
  volunteer: string
  services: string
  about: string

  // Home
  applyForAssistance: string
  ourMission: string
  ourPrograms: string
  needAssistance: string
  submitApplicationToday: string
  joinAsVolunteer: string
  dayOfDignityEvent: string
  servingWithDignity: string
  buildingStrongerCommunities: string
  familiesServed: string
  mealsDistributed: string
  communityVolunteers: string

  // Services hub
  getHelp: string
  chooseService: string
  foodAssistance: string
  foodAssistanceDesc: string
  rentalAssistance: string
  rentalAssistanceDesc: string
  applyNow: string

  // Food screen
  foodAssistanceTitle: string
  foodHeroSub: string
  readyToApplyFood: string
  foodFormTime: string
  openFoodForm: string
  officialFoodForm: string
  whatWeProvide: string
  weeklyGroceries: string
  weeklyGroceriesDesc: string
  emergencyFood: string
  emergencyFoodDesc: string
  nutritionSupport: string
  nutritionSupportDesc: string
  communityPantry: string
  communityPantryDesc: string
  docsToPrep: string
  docsSpeedUp: string
  doc_id: string
  doc_income: string
  doc_household: string
  doc_address: string
  startFoodApp: string

  // Rental screen
  rentalAssistanceTitle: string
  rentalHeroSub: string
  readyToApplyRental: string
  rentalFormTime: string
  openRentalForm: string
  officialRentalForm: string
  whatWeHelpWith: string
  rentalDoc_id: string
  rentalDoc_income: string
  rentalDoc_lease: string
  rentalDoc_eviction: string
  rentalDoc_ssn: string
  rentalDoc_address: string
  startRentalApp: string

  // Shared
  haveQuestions: string
  teamHereToHelp: string
  emailUs: string
  visitWebsite: string

  // Volunteer
  volunteerWithUs: string
  volunteerSubtitle: string
  directImpact: string
  meaningfulConnections: string
  gainSkills: string
  yourInformation: string
  firstName: string
  lastName: string
  emailAddress: string
  phoneNumber: string
  availability: string
  areasOfInterest: string
  anythingElse: string
  submitApplication: string
  submitting: string
  thankYou: string
  volunteerSuccessText: string
  submitAnother: string

  // Donate
  makeADifference: string
  donateSubtitle: string
  selectAmount: string
  customAmount: string
  oneTime: string
  monthly: string
  taxDeductible: string
  securePayment: string
  toPrograms: string

  // About
  healthHumanServices: string
  ourValues: string
  whatWeDo: string
  getInTouch: string
  website: string
  email: string
  volunteerInquiries: string
  nonprofitTitle: string
  nonprofitDesc: string
  supportMission: string

  // Notifications
  notifTitle: string
  notifBody: string
  enableNotifications: string
  notifPromptTitle: string
  notifPromptDesc: string
  notifEnable: string
  notifSkip: string
  notifEnabled: string
  notifDayLabel: string
}

const EN: Translations = {
  home: 'Home', donate: 'Donate', volunteer: 'Volunteer', services: 'Services', about: 'About',
  applyForAssistance: 'Apply for Assistance', ourMission: 'Our Mission', ourPrograms: 'Our Programs',
  needAssistance: 'Need Assistance?', submitApplicationToday: 'Submit an application today',
  joinAsVolunteer: 'Join as Volunteer', dayOfDignityEvent: 'Day of Dignity Event',
  servingWithDignity: 'Serving the community with dignity & respect',
  buildingStrongerCommunities: 'Building stronger communities together',
  familiesServed: 'Families\nServed', mealsDistributed: 'Meals\nDistributed', communityVolunteers: 'Community\nVolunteers',
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
  rentalDoc_id: 'Government-issued photo ID (driver\'s license, passport, or state ID)',
  rentalDoc_income: 'Proof of income (pay stubs, benefits letters, or bank statements)',
  rentalDoc_lease: 'Copy of your current lease or rental agreement',
  rentalDoc_eviction: 'Any eviction notices or utility shut-off notices (if applicable)',
  rentalDoc_ssn: 'Social Security cards for all household members',
  rentalDoc_address: 'Proof of address (utility bill or bank statement)',
  startRentalApp: 'Start Rental Assistance Application',
  haveQuestions: 'Have Questions?', teamHereToHelp: 'Our team is here to help walk you through the process.',
  emailUs: 'Email Us', visitWebsite: 'Visit Website',
  volunteerWithUs: 'Volunteer With Us', volunteerSubtitle: 'Join our community of dedicated volunteers making a real difference in families\' lives.',
  directImpact: 'Make a direct impact in your community', meaningfulConnections: 'Build meaningful connections', gainSkills: 'Gain skills and experience',
  yourInformation: 'Your Information', firstName: 'First Name', lastName: 'Last Name',
  emailAddress: 'Email Address', phoneNumber: 'Phone Number', availability: 'Availability',
  areasOfInterest: 'Areas of Interest', anythingElse: 'Anything Else You\'d Like Us to Know?',
  submitApplication: 'Submit Application', submitting: 'Submitting...',
  thankYou: 'Thank You!', volunteerSuccessText: 'We\'ve received your volunteer application. Our team will reach out within 2–3 business days.',
  submitAnother: 'Submit Another',
  makeADifference: 'Make a Difference', donateSubtitle: 'Your donation helps Sabil USA provide food, housing, and health support to families in need.',
  selectAmount: 'Select an Amount', customAmount: 'Or Enter Custom Amount',
  oneTime: 'One-Time', monthly: 'Monthly', taxDeductible: 'Tax Deductible', securePayment: 'Secure Payment', toPrograms: '100% to Programs',
  healthHumanServices: 'Health & Human Services Nonprofit', ourValues: 'Our Values', whatWeDo: 'What We Do',
  getInTouch: 'Get in Touch', website: 'Website', email: 'Email', volunteerInquiries: 'Volunteer Inquiries',
  nonprofitTitle: '501(c)(3) Nonprofit', nonprofitDesc: 'Sabil USA is a registered nonprofit. All donations are tax-deductible to the fullest extent permitted by law.',
  supportMission: 'Support Our Mission',
  notifTitle: 'Food Distribution Day!', notifBody: 'Today is a Sabil USA food distribution day. Come pick up your groceries!',
  enableNotifications: 'Enable Notifications', notifPromptTitle: 'Stay Informed', notifDayLabel: 'Notify me on distribution days',
  notifPromptDesc: 'Get reminders on food distribution days so you never miss a pickup.',
  notifEnable: 'Enable Reminders', notifSkip: 'Not Now', notifEnabled: 'Reminders Enabled ✓',
}

const AR: Translations = {
  home: 'الرئيسية', donate: 'تبرع', volunteer: 'تطوع', services: 'الخدمات', about: 'عن سبيل',
  applyForAssistance: 'التقدم للمساعدة', ourMission: 'مهمتنا', ourPrograms: 'برامجنا',
  needAssistance: 'هل تحتاج مساعدة؟', submitApplicationToday: 'قدّم طلبك اليوم',
  joinAsVolunteer: 'انضم كمتطوع', dayOfDignityEvent: 'يوم الكرامة',
  servingWithDignity: 'نخدم مجتمعنا بكرامة واحترام',
  buildingStrongerCommunities: 'نبني مجتمعات أقوى معاً',
  familiesServed: 'عائلة\nتمت خدمتها', mealsDistributed: 'وجبة\nتم توزيعها', communityVolunteers: 'متطوع\nمجتمعي',
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
  submitApplication: 'إرسال الطلب', submitting: 'جارٍ الإرسال...',
  thankYou: 'شكراً لك!', volunteerSuccessText: 'استلمنا طلبك للتطوع. سيتواصل معك فريقنا خلال 2-3 أيام عمل.',
  submitAnother: 'تقديم طلب آخر',
  makeADifference: 'أحدث فرقاً', donateSubtitle: 'تبرعك يساعد سبيل على تقديم الغذاء والسكن والدعم الصحي للعائلات.',
  selectAmount: 'اختر مبلغاً', customAmount: 'أو أدخل مبلغاً مخصصاً',
  oneTime: 'مرة واحدة', monthly: 'شهرياً', taxDeductible: 'معفى من الضرائب', securePayment: 'دفع آمن', toPrograms: '100% للبرامج',
  healthHumanServices: 'منظمة غير ربحية للصحة والخدمات الإنسانية', ourValues: 'قيمنا', whatWeDo: 'ما نفعله',
  getInTouch: 'تواصل معنا', website: 'الموقع الإلكتروني', email: 'البريد الإلكتروني', volunteerInquiries: 'استفسارات التطوع',
  nonprofitTitle: 'منظمة غير ربحية 501(c)(3)', nonprofitDesc: 'سبيل منظمة غير ربحية مسجلة. جميع التبرعات معفاة من الضرائب.',
  supportMission: 'ادعم مهمتنا',
  notifTitle: 'يوم توزيع الطعام!', notifBody: 'اليوم هو يوم توزيع الطعام من سبيل. تعال لاستلام بقالتك!',
  enableNotifications: 'تفعيل الإشعارات', notifPromptTitle: 'ابقَ على اطلاع', notifDayLabel: 'أشعرني في أيام التوزيع',
  notifPromptDesc: 'احصل على تذكيرات في أيام توزيع الطعام حتى لا تفوتك أي توزيعة.',
  notifEnable: 'تفعيل التذكيرات', notifSkip: 'ليس الآن', notifEnabled: 'التذكيرات مفعّلة ✓',
}

const FA: Translations = {
  home: 'خانه', donate: 'کمک مالی', volunteer: 'داوطلب', services: 'خدمات', about: 'درباره ما',
  applyForAssistance: 'درخواست کمک', ourMission: 'مأموریت ما', ourPrograms: 'برنامه‌های ما',
  needAssistance: 'نیاز به کمک دارید؟', submitApplicationToday: 'امروز درخواست دهید',
  joinAsVolunteer: 'به عنوان داوطلب بپیوندید', dayOfDignityEvent: 'روز کرامت',
  servingWithDignity: 'خدمت به جامعه با کرامت و احترام',
  buildingStrongerCommunities: 'ساختن جوامع قوی‌تر با هم',
  familiesServed: 'خانواده\nتحت پوشش', mealsDistributed: 'وعده غذایی\nتوزیع شده', communityVolunteers: 'داوطلب\nجامعه',
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
  submitApplication: 'ارسال درخواست', submitting: 'در حال ارسال...',
  thankYou: 'ممنون!', volunteerSuccessText: 'درخواست داوطلبانه شما دریافت شد. تیم ما ظرف ۲-۳ روز کاری با شما تماس خواهد گرفت.',
  submitAnother: 'ارسال درخواست دیگر',
  makeADifference: 'تفاوت ایجاد کنید', donateSubtitle: 'کمک مالی شما به سبیل امکان می‌دهد غذا، مسکن و حمایت بهداشتی ارائه دهد.',
  selectAmount: 'مبلغ را انتخاب کنید', customAmount: 'یا مبلغ دلخواه وارد کنید',
  oneTime: 'یک‌بار', monthly: 'ماهانه', taxDeductible: 'معاف از مالیات', securePayment: 'پرداخت امن', toPrograms: '۱۰۰٪ برای برنامه‌ها',
  healthHumanServices: 'سازمان غیرانتفاعی بهداشت و خدمات انسانی', ourValues: 'ارزش‌های ما', whatWeDo: 'آنچه انجام می‌دهیم',
  getInTouch: 'تماس با ما', website: 'وبسایت', email: 'ایمیل', volunteerInquiries: 'استعلامات داوطلبی',
  nonprofitTitle: 'سازمان غیرانتفاعی ۵۰۱(ج)(۳)', nonprofitDesc: 'سبیل یک سازمان غیرانتفاعی ثبت شده است. تمام کمک‌های مالی از مالیات معاف هستند.',
  supportMission: 'از مأموریت ما حمایت کنید',
  notifTitle: 'روز توزیع غذا!', notifBody: 'امروز روز توزیع غذای سبیل است. بیایید خواربارتان را دریافت کنید!',
  enableNotifications: 'فعال‌سازی اعلان‌ها', notifPromptTitle: 'مطلع بمانید', notifDayLabel: 'در روزهای توزیع به من اطلاع بده',
  notifPromptDesc: 'یادآوری‌هایی در روزهای توزیع غذا دریافت کنید تا هیچ توزیعی را از دست ندهید.',
  notifEnable: 'فعال‌سازی یادآورها', notifSkip: 'الان نه', notifEnabled: 'یادآورها فعال شدند ✓',
}

const ES: Translations = {
  home: 'Inicio', donate: 'Donar', volunteer: 'Voluntario', services: 'Servicios', about: 'Acerca de',
  applyForAssistance: 'Solicitar Ayuda', ourMission: 'Nuestra Misión', ourPrograms: 'Nuestros Programas',
  needAssistance: '¿Necesitas Ayuda?', submitApplicationToday: 'Envía una solicitud hoy',
  joinAsVolunteer: 'Únete como Voluntario', dayOfDignityEvent: 'Día de Dignidad',
  servingWithDignity: 'Sirviendo a la comunidad con dignidad y respeto',
  buildingStrongerCommunities: 'Construyendo comunidades más fuertes juntos',
  familiesServed: 'Familias\nAtendidas', mealsDistributed: 'Comidas\nDistribuidas', communityVolunteers: 'Voluntarios\nComunitarios',
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
  submitApplication: 'Enviar Solicitud', submitting: 'Enviando...',
  thankYou: '¡Gracias!', volunteerSuccessText: 'Recibimos tu solicitud de voluntariado. Nuestro equipo se comunicará contigo en 2–3 días hábiles.',
  submitAnother: 'Enviar Otra',
  makeADifference: 'Marca la Diferencia', donateSubtitle: 'Tu donación ayuda a Sabil USA a brindar alimentos, vivienda y apoyo de salud.',
  selectAmount: 'Selecciona un Monto', customAmount: 'O Ingresa un Monto Personalizado',
  oneTime: 'Una Vez', monthly: 'Mensual', taxDeductible: 'Deducible de Impuestos', securePayment: 'Pago Seguro', toPrograms: '100% a Programas',
  healthHumanServices: 'Organización sin Fines de Lucro de Salud y Servicios Humanos', ourValues: 'Nuestros Valores', whatWeDo: 'Lo Que Hacemos',
  getInTouch: 'Contáctanos', website: 'Sitio Web', email: 'Correo', volunteerInquiries: 'Consultas de Voluntariado',
  nonprofitTitle: 'Organización sin Fines de Lucro 501(c)(3)', nonprofitDesc: 'Sabil USA es una organización sin fines de lucro registrada. Todas las donaciones son deducibles de impuestos.',
  supportMission: 'Apoya Nuestra Misión',
  notifTitle: '¡Día de Distribución de Alimentos!', notifBody: 'Hoy es el día de distribución de alimentos de Sabil USA. ¡Ven a recoger tus comestibles!',
  enableNotifications: 'Activar Notificaciones', notifPromptTitle: 'Mantente Informado', notifDayLabel: 'Notificarme en días de distribución',
  notifPromptDesc: 'Recibe recordatorios en los días de distribución de alimentos para no perderte ninguna entrega.',
  notifEnable: 'Activar Recordatorios', notifSkip: 'Ahora No', notifEnabled: 'Recordatorios Activados ✓',
}

export const TRANSLATIONS: Record<LangCode, Translations> = { en: EN, ar: AR, fa: FA, es: ES }

export const LANG_LABELS: Record<LangCode, string> = {
  en: 'English', ar: 'العربية', fa: 'فارسی', es: 'Español',
}

export const RTL_LANGS: LangCode[] = ['ar', 'fa']

interface LanguageContextType {
  lang: LangCode
  t: Translations
  setLang: (l: LangCode) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en', t: EN, setLang: () => {}, isRTL: false,
})

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

  const isRTL = RTL_LANGS.includes(lang)

  return (
    <LanguageContext.Provider value={{ lang, t: TRANSLATIONS[lang], setLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
