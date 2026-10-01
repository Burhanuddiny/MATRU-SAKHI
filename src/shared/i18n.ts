/**
 * Complete multilingual translations for Matru Sakhi (मातृ सखी) across 7 Indian languages:
 * hi (Hindi), mr (Marathi), bn (Bengali), ta (Tamil), te (Telugu), kn (Kannada), en (English)
 */

import { LanguageCode } from './types.js';

export interface Translations {
  appName: string;
  tagline: string;
  tapToTalk: string;
  listening: string;
  speaking: string;
  processing: string;
  repeat: string;
  back: string;
  next: string;
  yes: string;
  no: string;
  eligibleBadge: string;
  conditionalBadge: string;
  notEligibleBadge: string;
  rupees: string;
  documentsTitle: string;
  centreTitle: string;
  slipTitle: string;
  safetyNotice: string;
  helpline: string;
  resumeCodeNotice: string;
  resumePrompt: string;
  typeFallbackPlaceholder: string;
  takePhoto: string;
  closeCamera: string;
  portalTour: string;
  readAloud: string;
  voiceOn: string;
  voiceOff: string;

  // Landing Page
  welcomeGreeting: string;
  welcomeSubtitle: string;
  tapToSpeakSub: string;
  viewDetailsBtn: string;
  testAudioBtn: string;
  chooseLanguage: string;
  freeGovtHelp: string;

  // Header
  helplineLabel: string;
  journeyStages: {
    start: string;
    scheme: string;
    check: string;
    docs: string;
    slip: string;
  };

  // About Screen
  step1Badge: string;
  maternityBenefitTitle: string;
  maternityBenefitDesc: string;
  govtAidBadge: string;
  directBankTransfer: string;
  firstChildAmountLabel: string;
  secondChildAmountLabel: string;
  checkEligibilityPrompt: string;
  yesCheckEligibility: string;

  // Eligibility Screen
  step2StageTitle: string;
  step2StageSubtitle: string;
  pregnantTitle: string;
  pregnantDesc: string;
  deliveredTitle: string;
  deliveredDesc: string;
  childOrderTitle: string;
  childOrderSubtitle: string;
  firstBornChild: string;
  firstBornDesc: string;
  secondBornChild: string;
  secondBornDesc: string;
  secondChildGirlQuestion: string;
  yesGirl: string;
  boy: string;
  qualifyingCardQuestion: string;
  qualifyingCardSubtitle: string;
  rationOrEshramPrompt: string;
  rationOrEshramSub: string;
  yesIHaveItProceed: string;
  orSelectOtherCard: string;
  viewEligibilityResult: string;

  // Result Screen
  resultHeaderTitle: string;
  totalAidAmount: string;
  aidDirectToBankNote: string;
  viewRequiredDocsBtn: string;
  viewNearestCentreBtn: string;

  // Documents Screen
  step3DocsBadge: string;
  checkWithPhotoNotice: string;
  prepareSlipButton: string;
  readyCountSuffix: string;

  // Prepare Screen
  step4PrepareBadge: string;
  slipDetailsTitle: string;
  slipDetailsSubtitle: string;
  motherNameLabel: string;
  motherNamePlaceholder: string;
  bankNameLabel: string;
  bankNamePlaceholder: string;
  pincodeLabel: string;
  pincodePlaceholder: string;
  privacyAssurance: string;
  findNearestCentreBtn: string;

  // Centre Screen
  step5CentreBadge: string;
  verifiedOfficialBadge: string;
  takeSlipToCentreSub: string;
  pincodeTag: string;
  viewOnMapsBtn: string;
  phoneLabel: string;
  getSlipBtn: string;

  // Done Screen
  slipReadyBadge: string;
  slipReadyHeading: string;
  slipReadySubtitle: string;
  startNewChatBtn: string;

  // Soundwave Indicator
  soundwaveLabel: string;
  soundwaveSpeakPrompt: string;
  soundwaveListenPrompt: string;
  soundwaveIdlePrompt: string;

  // Prompts & Speech
  quickPrompts: {
    tellMeAbout: string;
    howDoIGet: string;
    whichDocs: string;
  };
  greetingVoice: string;
  stepNarrations: {
    about: string;
    eligibility: string;
    documents: string;
    prepare: string;
    centre: string;
    done: string;
  };
}

export const I18N: Record<LanguageCode, Translations> = {
  hi: {
    appName: 'मातृ सखी',
    tagline: 'मातृ वंदना योजना (PMMVY) में आपकी मददगार सखी',
    tapToTalk: 'बोलने के लिए यहाँ छुएँ',
    listening: 'मातृ सखी सुन रही है...',
    speaking: 'मातृ सखी बोल रही है...',
    processing: 'कृपया एक क्षण रुकें...',
    repeat: 'फिर से बोलें',
    back: 'पीछे जाएँ',
    next: 'आगे बढ़ें',
    yes: 'हाँ',
    no: 'नहीं',
    eligibleBadge: 'बधाई! आप पात्र हैं',
    conditionalBadge: 'आंगनवाड़ी में पुष्टि करें',
    notEligibleBadge: 'इस योजना में पात्र नहीं',
    rupees: '₹',
    documentsTitle: 'ज़रूरी कागज़ात',
    centreTitle: 'नज़दीकी आंगनवाड़ी केंद्र',
    slipTitle: 'आंगनवाड़ी पर्ची',
    safetyNotice: 'सुरक्षा नियम: अपना आधार नंबर, बैंक पिन या OTP किसी को न दें।',
    helpline: 'मातृ वंदना हेल्पलाइन: 14445 | महिला हेल्पलाइन: 181',
    resumeCodeNotice: 'आपका 6-अंकों का कोड: यह कोड लिखकर रख लें',
    resumePrompt: 'पिछली बातचीत जारी रखें',
    typeFallbackPlaceholder: 'यहाँ अपनी बात लिखें या बोलें...',
    takePhoto: 'कागज़ की फ़ोटो दिखाएँ',
    closeCamera: 'कैमरा बंद करें',
    portalTour: 'सरकारी पोर्टल देखें (Dekho)',
    readAloud: 'बोलकर सुनें',
    voiceOn: 'आवाज़ चालू',
    voiceOff: 'आवाज़ बंद',

    welcomeGreeting: 'नमस्ते! मैं मातृ सखी हूँ',
    welcomeSubtitle: 'सरकारी योजना से ₹5,000 से ₹6,000 की सहायता पाने के लिए बात करें',
    tapToSpeakSub: 'बस बटन छुएँ और बोलें',
    viewDetailsBtn: 'सीधे योजना देखें (View Details)',
    testAudioBtn: 'आवाज़ सुनें (Listen)',
    chooseLanguage: 'अपनी भाषा चुनें (Choose Language)',
    freeGovtHelp: 'निःशुल्क व सुरक्षित सरकारी सहायता',

    helplineLabel: '14445 / 181',
    journeyStages: {
      start: 'शुरुआत',
      scheme: 'योजना',
      check: 'पात्रता',
      docs: 'कागज़ात',
      slip: 'पर्ची',
    },

    step1Badge: 'कदम १ : योजना की जानकारी',
    maternityBenefitTitle: 'मातृत्व सहायता योजना',
    maternityBenefitDesc: 'गर्भवती और नई माताओं के पोषण और स्वास्थ्य के लिए भारत सरकार की सीधी मदद।',
    govtAidBadge: 'सरकारी सहायता',
    directBankTransfer: 'सीधे आपके बैंक खाते में (Direct Bank Transfer)',
    firstChildAmountLabel: 'पहला बच्चा: ₹5,000',
    secondChildAmountLabel: 'दूसरी बेटी: ₹6,000',
    checkEligibilityPrompt: 'क्या आप देखना चाहती हैं कि आपको यह लाभ मिलेगा?',
    yesCheckEligibility: 'हाँ, पात्रता देखें',

    step2StageTitle: 'आपकी वर्तमान स्थिति क्या है?',
    step2StageSubtitle: 'दोनों में से एक विकल्प पर छुएँ',
    pregnantTitle: 'गर्भवती हूँ',
    pregnantDesc: 'अभी पेट में बच्चा है',
    deliveredTitle: 'जन्म हो चुका है',
    deliveredDesc: 'बच्चे का जन्म हो गया है',
    childOrderTitle: 'यह आपका कौन सा बच्चा है?',
    childOrderSubtitle: 'योजना पहले बच्चे और दूसरी बेटी के लिए लागू है',
    firstBornChild: 'पहला बच्चा (1st Child)',
    firstBornDesc: '₹5,000 की पूरी सहायता',
    secondBornChild: 'दूसरा बच्चा (2nd Child)',
    secondBornDesc: 'बेटी होने पर ₹6,000',
    secondChildGirlQuestion: 'क्या दूसरा बच्चा बेटी है? (नियम अनुसार दूसरी संतान कन्या होने पर लाभ मिलता है)',
    yesGirl: 'हाँ, बेटी है (Girl)',
    boy: 'बेटा है (Boy)',
    qualifyingCardQuestion: 'क्या आपके पास कोई सरकारी कार्ड है?',
    qualifyingCardSubtitle: 'राशन कार्ड / ई-श्रम / बीपीएल आदि',
    rationOrEshramPrompt: '🌾 राशन कार्ड या ई-श्रम कार्ड है?',
    rationOrEshramSub: 'अधिकांश माताओं के पास राशन कार्ड या ई-श्रम कार्ड होता है',
    yesIHaveItProceed: 'हाँ, मेरे पास है (आगे बढ़ें)',
    orSelectOtherCard: 'या अन्य कार्ड चुनें',
    viewEligibilityResult: 'पात्रता परिणाम देखें',

    resultHeaderTitle: 'पात्रता परिणाम',
    totalAidAmount: 'कुल सहायता राशि (DBT)',
    aidDirectToBankNote: 'यह राशि सीधे आपके आधार से जुड़े बैंक खाते में किस्तों में आएगी',
    viewRequiredDocsBtn: 'ज़रूरी कागज़ात देखें (Documents)',
    viewNearestCentreBtn: 'नज़दीकी आंगनवाड़ी केंद्र देखें',

    step3DocsBadge: 'कदम २ : कागज़ात की जाँच',
    checkWithPhotoNotice: '💡 किसी कागज़ पर संदेह हो तो फ़ोटो से जाँचें बटन दबाकर दिखा सकती हैं।',
    prepareSlipButton: 'पर्ची तैयार करें',
    readyCountSuffix: 'तैयार',

    step4PrepareBadge: 'कदम ३ : सामान्य जानकारी',
    slipDetailsTitle: 'आपकी पर्ची की जानकारी',
    slipDetailsSubtitle: 'आंगनवाड़ी कार्यकर्ता के लिए सामान्य विवरण (कोई पासवर्ड या पिन नहीं)',
    motherNameLabel: 'माता का नाम (Mother’s Name)',
    motherNamePlaceholder: 'उदा. सुनीता देवी',
    bankNameLabel: 'बैंक का नाम (आधार से लिंक खाता)',
    bankNamePlaceholder: 'उदा. स्टेट बैंक / बैंक ऑफ बड़ौदा / पोस्ट ऑफिस',
    pincodeLabel: 'पिन कोड (६ अंकों का PIN Code)',
    pincodePlaceholder: 'उदा. 400001',
    privacyAssurance: 'मातृ सखी कभी भी आधार नंबर, बैंक खाता संख्या या OTP नहीं पूछती।',
    findNearestCentreBtn: 'नज़दीकी केंद्र खोजें',

    step5CentreBadge: 'कदम ४ : कहाँ जाना है',
    verifiedOfficialBadge: 'सत्यापित सरकारी केंद्र (Verified)',
    takeSlipToCentreSub: 'यहाँ जाकर आंगनवाड़ी कार्यकर्ता को अपनी पर्ची दिखाएँ',
    pincodeTag: 'पिन कोड:',
    viewOnMapsBtn: 'रास्ता देखें (Google Maps)',
    phoneLabel: 'फोन:',
    getSlipBtn: 'मेरी पर्ची देखें (Get Slip)',

    slipReadyBadge: 'पर्ची तैयार है (Completed)',
    slipReadyHeading: 'आपकी आंगनवाड़ी पर्ची तैयार है',
    slipReadySubtitle: 'यह पर्ची लेकर नज़दीकी आंगनवाड़ी केंद्र या स्वास्थ्य उप-केंद्र पर जाएँ',
    startNewChatBtn: 'नई बातचीत शुरू करें (Start Over)',

    soundwaveLabel: 'ध्वनि तरंग (Soundwave)',
    soundwaveSpeakPrompt: 'बोलना जारी रखें...',
    soundwaveListenPrompt: 'बीच में रोकने के लिए बटन छुएँ',
    soundwaveIdlePrompt: 'स्पष्ट आवाज़ में बात करें',

    quickPrompts: {
      tellMeAbout: 'योजना के बारे में बताएं',
      howDoIGet: 'मुझे ₹5,000 कैसे मिलेंगे?',
      whichDocs: 'कौन-से कागज़ चाहिए?',
    },
    greetingVoice: 'नमस्ते बहन! मैं आपकी मातृ सखी हूँ। सरकारी योजना से ₹6,000 तक की सहायता पाने के लिए मैं आपकी पूरी मदद करूँगी।',
    stepNarrations: {
      about: 'प्रधानमंत्री मातृ वंदना योजना में आपको 5,000 से 6,000 रुपये सीधे आपके बैंक खाते में मिलते हैं। क्या आप देखना चाहती हैं कि आपको यह लाभ मिलेगा?',
      eligibility: 'कृपया अपनी स्थिति बताएं। क्या आप गर्भवती हैं या बच्चे का जन्म हो चुका है?',
      documents: 'आंगनवाड़ी में फॉर्म भरने के लिए आपको ये कागज़ात साथ ले जाने होंगे। जो कागज़ आपके पास हैं, उन पर टिक करें।',
      prepare: 'आंगनवाड़ी जाने से पहले अपनी पर्ची में नाम और पिन कोड भर लें ताकि आपका समय बचे।',
      centre: 'यह आपके घर के सबसे पास का आंगनवाड़ी केंद्र है। यहाँ जाकर अपनी पर्ची दिखाएं।',
      done: 'आपकी आंगनवाड़ी सहायता पर्ची तैयार है। यह 6 अंकों का सुरक्षित कोड लिख लें।',
    },
  },

  mr: {
    appName: 'मातृ सखी',
    tagline: 'मातृ वंदना योजनेसाठी तुमची सखी',
    tapToTalk: 'बोलण्यासाठी येथे स्पर्श करा',
    listening: 'मातृ सखी ऐकत आहे...',
    speaking: 'मातृ सखी बोलत आहे...',
    processing: 'कृपया एक क्षण थांबा...',
    repeat: 'पुन्हा सांगा',
    back: 'मागे जा',
    next: 'पुढे जा',
    yes: 'होय',
    no: 'नाही',
    eligibleBadge: 'अभिनंदन! आपण पात्र आहात',
    conditionalBadge: 'अंगणवाडीत विचारून घ्या',
    notEligibleBadge: 'या योजनेत पात्र नाही',
    rupees: '₹',
    documentsTitle: 'आवश्यक कागदपत्रे',
    centreTitle: 'जवळचे अंगणवाडी केंद्र',
    slipTitle: 'अंगणवाडी पावती',
    safetyNotice: 'सुरक्षा नियम: आपला आधार क्रमांक, बँक पिन किंवा OTP कोणालाही देऊ नका.',
    helpline: 'मातृ वंदना हेल्पलाइन: 14445 | महिला हेल्पलाइन: १८१',
    resumeCodeNotice: 'तुमचा ६ अंकी कोड: हा कोड लिहून ठेवा',
    resumePrompt: 'मागील माहिती पुन्हा सुरू करा',
    typeFallbackPlaceholder: 'येथे लिहा किंवा बोला...',
    takePhoto: 'कागदपत्राचा फोटो दाखवा',
    closeCamera: 'कॅमेरा बंद करा',
    portalTour: 'सरकारी पोर्टल पहा (Dekho)',
    readAloud: 'ऐका',
    voiceOn: 'आवाज सुरू',
    voiceOff: 'आवाज बंद',

    welcomeGreeting: 'नमस्कार! मी मातृ सखी',
    welcomeSubtitle: 'सरकारी योजनेतून ₹५,००० ते ₹६,००० चे अनुदान मिळवण्यासाठी बोला',
    tapToSpeakSub: 'फक्त बटण दाबा आणि बोला',
    viewDetailsBtn: 'थेट योजना पहा (View Details)',
    testAudioBtn: 'आवाज ऐका (Listen)',
    chooseLanguage: 'आपली भाषा निवडा (Choose Language)',
    freeGovtHelp: 'मोफत आणि सुरक्षित सरकारी मदत',

    helplineLabel: '14445 / १८१',
    journeyStages: {
      start: 'सुरुवात',
      scheme: 'योजना',
      check: 'पात्रता',
      docs: 'कागदपत्रे',
      slip: 'पावती',
    },

    step1Badge: 'पायरी १ : योजनेची माहिती',
    maternityBenefitTitle: 'मातृत्व वंदना योजना',
    maternityBenefitDesc: 'गर्भवती आणि नवीन मातांच्या पोषणासाठी भारत सरकारचे थेट आर्थिक साहाय्य.',
    govtAidBadge: 'सरकारी साहाय्य',
    directBankTransfer: 'थेट आपल्या बँक खात्यात (Direct Bank Transfer)',
    firstChildAmountLabel: 'पहिले मूल: ₹५,०००',
    secondChildAmountLabel: 'दुसरी मुलगी: ₹६,०००',
    checkEligibilityPrompt: 'तुम्हाला हे अनुदान मिळेल का ते तपासायचे आहे का?',
    yesCheckEligibility: 'होय, पात्रता तपासा',

    step2StageTitle: 'आपली सद्यस्थिती काय आहे?',
    step2StageSubtitle: 'दोन्हीपैकी एका पर्यायावर स्पर्श करा',
    pregnantTitle: 'गर्भवती आहे',
    pregnantDesc: 'सध्या पोटात बाळ आहे',
    deliveredTitle: 'बाळाचा जन्म झाला आहे',
    deliveredDesc: 'बाळ जन्माला आले आहे',
    childOrderTitle: 'हे आपले कितवे मूल आहे?',
    childOrderSubtitle: 'योजना पहिल्या बाळासाठी आणि दुसऱ्या मुलीसाठी लागू आहे',
    firstBornChild: 'पहिले मूल (1st Child)',
    firstBornDesc: '₹५,००० ची पूर्ण मदत',
    secondBornChild: 'दुसरे मूल (2nd Child)',
    secondBornDesc: 'मुलगी असल्यास ₹६,०००',
    secondChildGirlQuestion: 'दुसरे मूल मुलगी आहे का? (नियमानुसार दुसरी कन्या असल्यास लाभ मिळतो)',
    yesGirl: 'होय, मुलगी आहे (Girl)',
    boy: 'मुलगा आहे (Boy)',
    qualifyingCardQuestion: 'आपल्याकडे कोणते सरकारी कार्ड आहे का?',
    qualifyingCardSubtitle: 'रेशन कार्ड / ई-श्रम / बीपीएल इत्यादी',
    rationOrEshramPrompt: '🌾 रेशन कार्ड किंवा ई-श्रम कार्ड आहे का?',
    rationOrEshramSub: 'बहुतांश मातांकडे रेशन कार्ड किंवा ई-श्रम कार्ड असते',
    yesIHaveItProceed: 'होय, माझ्याकडे आहे (पुढे जा)',
    orSelectOtherCard: 'किंवा इतर कार्ड निवडा',
    viewEligibilityResult: 'पात्रता निकाल पहा',

    resultHeaderTitle: 'पात्रता निकाल',
    totalAidAmount: 'एकूण साहाय्य रक्कम (DBT)',
    aidDirectToBankNote: 'ही रक्कम थेट आपल्या आधार लिंक बँक खात्यात येईल',
    viewRequiredDocsBtn: 'कागदपत्रे पहा (Documents)',
    viewNearestCentreBtn: 'जवळचे अंगणवाडी केंद्र पहा',

    step3DocsBadge: 'पायरी २ : कागदपत्रांची तपासणी',
    checkWithPhotoNotice: '💡 कागदपत्राविषयी शंका असल्यास फोटो दाखवून खात्री करू शकता.',
    prepareSlipButton: 'पावती तयार करा',
    readyCountSuffix: 'तयार',

    step4PrepareBadge: 'पायरी ३ : सामान्य माहिती',
    slipDetailsTitle: 'आपल्या पावतीची माहिती',
    slipDetailsSubtitle: 'अंगणवाडी ताईसाठी सामान्य माहिती (पासवर्ड किंवा पिन नाही)',
    motherNameLabel: 'मातेचे नाव (Mother’s Name)',
    motherNamePlaceholder: 'उदा. सुनीता देवी',
    bankNameLabel: 'बँकेचे नाव (आधार लिंक खाते)',
    bankNamePlaceholder: 'उदा. स्टेट बँक ऑफ इंडिया',
    pincodeLabel: 'पिन कोड (६ अंकी PIN Code)',
    pincodePlaceholder: 'उदा. ४००००१',
    privacyAssurance: 'मातृ सखी कधीही आधार क्रमांक, बँक खाते किंवा OTP विचारत नाही.',
    findNearestCentreBtn: 'जवळचे केंद्र शोधा',

    step5CentreBadge: 'पायरी ४ : कुठे जायचे',
    verifiedOfficialBadge: 'सत्यापित शासकीय केंद्र (Verified)',
    takeSlipToCentreSub: 'येथे जाऊन अंगणवाडी सेविकेला आपली पावती दाखवा',
    pincodeTag: 'पिन कोड:',
    viewOnMapsBtn: 'नकाशा पहा (Google Maps)',
    phoneLabel: 'फोन:',
    getSlipBtn: 'माझी पावती पहा (Get Slip)',

    slipReadyBadge: 'पावती तयार आहे (Completed)',
    slipReadyHeading: 'आपली अंगणवाडी पावती तयार झाली आहे',
    slipReadySubtitle: 'ही पावती घेऊन जवळच्या अंगणवाडी केंद्रात जा',
    startNewChatBtn: 'नवीन संभाषण सुरू करा (Start Over)',

    soundwaveLabel: 'ध्वनि तरंग (Soundwave)',
    soundwaveSpeakPrompt: 'बोलत राहा...',
    soundwaveListenPrompt: 'थांबवण्यासाठी बटण दाबा',
    soundwaveIdlePrompt: 'स्पष्ट आवाजात बोला',

    quickPrompts: {
      tellMeAbout: 'योजनेबद्दल माहिती द्या',
      howDoIGet: 'मला ₹५,००० कसे मिळतील?',
      whichDocs: 'कोणती कागदपत्रे हवीत?',
    },
    greetingVoice: 'नमस्कार ताई! मी तुमची मातृ सखी. मातृ वंदना योजनेतून ₹६,००० चे अनुदान मिळवण्यासाठी मी तुमची मदत करेन.',
    stepNarrations: {
      about: 'मातृ वंदना योजनेत थेट तुमच्या बँक खात्यात ₹५,००० ते ₹६,००० मिळतात. तुम्हाला हे अनुदान हवे आहे का?',
      eligibility: 'कृपया आपली स्थिती सांगा. आपण गर्भवती आहात की बाळाचा जन्म झाला आहे?',
      documents: 'अंगणवाडीत नेण्यासाठी लागणारी कागदपत्रे येथे तपासा.',
      prepare: 'अंगणवाडीत दाखवण्यासाठी तुमची पावती तयार करा.',
      centre: 'हे तुमचे सर्वात जवळचे अंगणवाडी केंद्र आहे.',
      done: 'तुमची पावती तयार झाली आहे. हा कोड लक्षात ठेवा.',
    },
  },

  bn: {
    appName: 'মাতৃ সখী',
    tagline: 'মাতৃ বন্দনা যোজনায় আপনার বিশ্বস্ত সখী',
    tapToTalk: 'কথা বলতে এখানে চাপুন',
    listening: 'মাতৃ সখী শুনছে...',
    speaking: 'মাতৃ সখী বলছে...',
    processing: 'একটু অপেক্ষা করুন...',
    repeat: 'আবার বলুন',
    back: 'পিছনে যান',
    next: 'এগিয়ে যান',
    yes: 'হ্যাঁ',
    no: 'না',
    eligibleBadge: 'অভিনন্দন! আপনি যোগ্য',
    conditionalBadge: 'অঙ্গনওয়াড়িতে যাচাই করুন',
    notEligibleBadge: 'এই প্রকল্পে যোগ্য নন',
    rupees: '₹',
    documentsTitle: 'প্রয়োজনীয় কাগজপত্র',
    centreTitle: 'নিকটবর্তী অঙ্গনওয়াড়ি কেন্দ্র',
    slipTitle: 'অঙ্গনওয়াড়ি স্লিপ',
    safetyNotice: 'সুরক্ষা নিয়ম: আপনার আধার নম্বর, ব্যাঙ্ক পিন বা ওটিপি কাউকে দেবেন না।',
    helpline: 'মাতৃ বন্দনা হেল্পলাইন: 14445 | মহিলা হেল্পলাইন: ১৮১',
    resumeCodeNotice: 'আপনার ৬ সংখ্যার কোড: এটি লিখে রাখুন',
    resumePrompt: 'পূর্বের সেশন चालू করুন',
    typeFallbackPlaceholder: 'এখানে লিখুন বা বলুন...',
    takePhoto: 'কাগজের ছবি দেখান',
    closeCamera: 'ক্যামেরা বন্ধ করুন',
    portalTour: 'সরকারি পোর্টাল দেখুন (Dekho)',
    readAloud: 'শুনুন',
    voiceOn: 'ভয়েস অন',
    voiceOff: 'ভয়েস বন্ধ',

    welcomeGreeting: 'নমস্কার! আমি মাতৃ সখী',
    welcomeSubtitle: 'সরকারি প্রকল্পে ₹৫,০০০ থেকে ₹৬,০০০ অনুদান পেতে কথা বলুন',
    tapToSpeakSub: 'শুধু বোতাম স্পর্শ করুন এবং বলুন',
    viewDetailsBtn: 'সরাসরি প্রকল্প দেখুন (View Details)',
    testAudioBtn: 'শব্দ শুনুন (Listen)',
    chooseLanguage: 'আপনার ভাষা বেছে নিন (Choose Language)',
    freeGovtHelp: 'বিনামূল্যে এবং নিরাপদ সরকারি সহায়তা',

    helplineLabel: '14445 / ১৮১',
    journeyStages: {
      start: 'শুরু',
      scheme: 'প্রকল্প',
      check: 'যোগ্যতা',
      docs: 'কাগজপত্র',
      slip: 'স্লিপ',
    },

    step1Badge: 'ধাপ ১ : প্রকল্পের বিবরণ',
    maternityBenefitTitle: 'মাতৃত্ব বন্দনা প্রকল্প',
    maternityBenefitDesc: 'গর্ভবতী এবং নতুন মায়েদের পুষ্টি ও স্বাস্থ্যের জন্য ভারত সরকারের প্রত্যক্ষ আর্থিক সাহায্য।',
    govtAidBadge: 'সরকারি সহায়তা',
    directBankTransfer: 'সরাসরি আপনার ব্যাঙ্ক অ্যাকাউন্টে (Direct Bank Transfer)',
    firstChildAmountLabel: 'প্রথম সন্তান: ₹৫,০০০',
    secondChildAmountLabel: 'দ্বিতীয় কন্যা: ₹৬,০০০',
    checkEligibilityPrompt: 'আপনি কি দেখতে চান যে আপনি এই সুবিধা পাবেন কি না?',
    yesCheckEligibility: 'হ্যাঁ, যোগ্যতা যাচাই করুন',

    step2StageTitle: 'আপনার বর্তমান অবস্থা কী?',
    step2StageSubtitle: 'দুটির মধ্যে একটি বিকল্প স্পর্শ করুন',
    pregnantTitle: 'গর্ভবতী',
    pregnantDesc: 'এখনও পেটে সন্তান আছে',
    deliveredTitle: 'সন্তানের জন্ম হয়েছে',
    deliveredDesc: 'সন্তান জন্ম গ্রহণ করেছে',
    childOrderTitle: 'এটি আপনার কততম সন্তান?',
    childOrderSubtitle: 'প্রকল্পটি প্রথম সন্তান এবং দ্বিতীয় কন্যার জন্য প্রযোজ্য',
    firstBornChild: 'প্রথম সন্তান (1st Child)',
    firstBornDesc: '₹৫,০০০ এর সম্পূর্ণ সহায়তা',
    secondBornChild: 'দ্বিতীয় সন্তান (2nd Child)',
    secondBornDesc: 'কন্যা হলে ₹৬,০০০',
    secondChildGirlQuestion: 'দ্বিতীয় সন্তানটি কি মেয়ে? (নিয়ম অনুযায়ী দ্বিতীয় কন্যা হলে সুবিধা মেলে)',
    yesGirl: 'হ্যাঁ, মেয়ে (Girl)',
    boy: 'ছেলে (Boy)',
    qualifyingCardQuestion: 'আপনার কি কোনো সরকারি কার্ড আছে?',
    qualifyingCardSubtitle: 'রেশন কার্ড / ই-শ্রম / বিপিএল ইত্যাদি',
    rationOrEshramPrompt: '🌾 রেশন কার্ড বা ই-শ্রম কার্ড আছে কি?',
    rationOrEshramSub: 'অধিকাংশ মায়ের রেশন কার্ড বা ই-শ্রম কার্ড থাকে',
    yesIHaveItProceed: 'হ্যাঁ, আমার আছে (এগিয়ে যান)',
    orSelectOtherCard: 'অথবা অন্য কার্ড বেছে নিন',
    viewEligibilityResult: 'যোগ্যতার ফলাফল দেখুন',

    resultHeaderTitle: 'যোগ্যতার ফলাফল',
    totalAidAmount: 'মোট আর্থিক সাহায্য (DBT)',
    aidDirectToBankNote: 'এই টাকা সরাসরি আপনার আধার লিংকড ব্যাঙ্ক অ্যাকাউন্টে কিস্তিতে আসবে',
    viewRequiredDocsBtn: 'কাগজপত্র দেখুন (Documents)',
    viewNearestCentreBtn: 'নিকটবর্তী কেন্দ্র দেখুন',

    step3DocsBadge: 'ধাপ ২ : নথিপত্র পরীক্ষা',
    checkWithPhotoNotice: '💡 কোনো নথিতে সন্দেহ থাকলে ছবি দেখিয়ে যাচাই করতে পারেন।',
    prepareSlipButton: 'স্লিপ প্রস্তুত করুন',
    readyCountSuffix: 'প্রস্তুত',

    step4PrepareBadge: 'ধাপ ৩ : সাধারণ বিবরণ',
    slipDetailsTitle: 'আপনার প্রস্তুতি স্লিপের বিবরণ',
    slipDetailsSubtitle: 'অঙ্গনওয়াড়ি দিদির জন্য সাধারণ তথ্য (পাসওয়ার্ড বা পিন নয়)',
    motherNameLabel: 'মায়ের নাম (Mother’s Name)',
    motherNamePlaceholder: 'উদাঃ সুনীতা দেবী',
    bankNameLabel: 'ব্যাঙ্কের নাম (আধার সংযুক্ত অ্যাকাউন্ট)',
    bankNamePlaceholder: 'উদাঃ স্টেট ব্যাঙ্ক অফ ইন্ডিয়া',
    pincodeLabel: 'পিন কোড (৬ সংখ্যার PIN Code)',
    pincodePlaceholder: 'উদাঃ ৭০০০০১',
    privacyAssurance: 'মাতৃ সখী কখনও আধার নম্বর, ব্যাঙ্ক অ্যাকাউন্ট বা ওটিপি চায় না।',
    findNearestCentreBtn: 'নিকটবর্তী কেন্দ্র খুঁজুন',

    step5CentreBadge: 'ধাপ ৪ : কোথায় যাবেন',
    verifiedOfficialBadge: 'সরকারি যাচাইকৃত কেন্দ্র (Verified)',
    takeSlipToCentreSub: 'এখানে গিয়ে অঙ্গনওয়াড়ি কর্মীকে আপনার স্লিপ দেখান',
    pincodeTag: 'পিন কোড:',
    viewOnMapsBtn: 'মানচিত্র দেখুন (Google Maps)',
    phoneLabel: 'ফোন:',
    getSlipBtn: 'আমার স্লিপ দেখুন (Get Slip)',

    slipReadyBadge: 'স্লিপ প্রস্তুত (Completed)',
    slipReadyHeading: 'আপনার অঙ্গনওয়াড়ি স্লিপ প্রস্তুত হয়েছে',
    slipReadySubtitle: 'এই স্লিপ নিয়ে নিকটবর্তী অঙ্গনওয়াড়ি কেন্দ্রে যান',
    startNewChatBtn: 'নতুন আলাপ শুরু করুন (Start Over)',

    soundwaveLabel: 'শব্দ তরঙ্গ (Soundwave)',
    soundwaveSpeakPrompt: 'বলতে থাকুন...',
    soundwaveListenPrompt: 'থামাতে বোতাম স্পর্শ করুন',
    soundwaveIdlePrompt: 'স্পষ্ট কণ্ঠে কথা বলুন',

    quickPrompts: {
      tellMeAbout: 'প্রকল্প সম্পর্কে বলুন',
      howDoIGet: 'আমি কীভাবে ₹৫,০০০ পাব?',
      whichDocs: 'কী কী কাগজ লাগবে?',
    },
    greetingVoice: 'নমস্কার দিদি! আমি আপনার মাতৃ সখী। সরকারি মাতৃত্বকালীন ভাতা পেতে আমি আপনাকে সাহায্য করব।',
    stepNarrations: {
      about: 'মাতৃ বন্দনা প্রকল্পে ৫,০০০ থেকে ৬,০০০ টাকা সরাসরি আপনার ব্যাঙ্ক অ্যাকাউন্টে পাবেন।',
      eligibility: 'আপনি কি গর্ভবতী নাকি সন্তানের জন্ম হয়েছে?',
      documents: 'অঙ্গনওয়াড়িতে দেখানোর জন্য প্রয়োজনীয় কাগজপত্র প্রস্তুত রাখুন।',
      prepare: 'অঙ্গনওয়াড়ির জন্য প্রস্তুতি স্লিপ তৈরি করুন।',
      centre: 'এটি আপনার নিকটবর্তী অঙ্গনওয়াড়ি কেন্দ্র।',
      done: 'আপনার প্রস্তুতি স্লিপ প্রস্তুত হয়েছে।',
    },
  },

  ta: {
    appName: 'மாத்ரு சகி',
    tagline: 'பிரதான் மந்திரி மாத்ரு வந்தனா தோழி',
    tapToTalk: 'பேச இங்கே தட்டவும்',
    listening: 'மாத்ரு சகி கேட்கிறது...',
    speaking: 'மாத்ரு சகி பேசுகிறது...',
    processing: 'ஒரு நிமிடம் காத்திருக்கவும்...',
    repeat: 'மீண்டும் சொல்லுங்கள்',
    back: 'பின்னே செல்லவும்',
    next: 'அடுத்து',
    yes: 'ஆம்',
    no: 'இல்லை',
    eligibleBadge: 'வாழ்த்துகள்! நீங்கள் தகுதியானவர்',
    conditionalBadge: 'அங்கன்வாடியில் சரிபார்க்கவும்',
    notEligibleBadge: 'இந்த திட்டத்திற்கு தகுதி இல்லை',
    rupees: '₹',
    documentsTitle: 'தேவையான ஆவணங்கள்',
    centreTitle: 'அருகிலுள்ள அங்கன்வாடி மையம்',
    slipTitle: 'அங்கன்வாடி சீட்டு',
    safetyNotice: 'பாதுகாப்பு: ஆதார் எண், வங்கி பின் அல்லது OTP ஐ யாரிடமும் பகிர வேண்டாம்.',
    helpline: 'மாத்ரு வந்தனா உதவி எண்: 14445 | பெண்கள் உதவி: 181',
    resumeCodeNotice: 'உங்கள் 6 இலக்க குறியீடு',
    resumePrompt: 'முந்தைய அமர்வை தொடரவும்',
    typeFallbackPlaceholder: 'இங்கே தட்டச்சு செய்யவும் அல்லது பேசவும்...',
    takePhoto: 'ஆவண புகைப்படத்தை காட்டவும்',
    closeCamera: 'கேமராவை மூடு',
    portalTour: 'அரசு தளத்தை காண்க (Dekho)',
    readAloud: 'கேளுங்கள்',
    voiceOn: 'குரல் ஆன்',
    voiceOff: 'குரல் ஆஃப்',

    welcomeGreeting: 'வணக்கம்! நான் மாத்ரு சகி',
    welcomeSubtitle: 'அரசு திட்டத்தில் ₹5,000 முதல் ₹6,000 வரை உதவி பெற பேசவும்',
    tapToSpeakSub: 'பொத்தானைத் தட்டி பேசவும்',
    viewDetailsBtn: 'நேரடியாக திட்டத்தை காண்க (View Details)',
    testAudioBtn: 'குரலைக் கேளுங்கள் (Listen)',
    chooseLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும் (Choose Language)',
    freeGovtHelp: 'இலவச மற்றும் பாதுகாப்பான அரசு உதவி',

    helplineLabel: '14445 / 181',
    journeyStages: {
      start: 'தொடக்கம்',
      scheme: 'திட்டம்',
      check: 'தகுதி',
      docs: 'ஆவணங்கள்',
      slip: 'சீட்டு',
    },

    step1Badge: 'படி 1 : திட்ட விவரம்',
    maternityBenefitTitle: 'மாத்ரு வந்தனா திட்டம்',
    maternityBenefitDesc: 'கர்ப்பிணிகள் மற்றும் பாலூட்டும் தாய்மார்களுக்கு மத்திய அரசின் நேரடி நிதி உதவி.',
    govtAidBadge: 'அரசு உதவித்தொகை',
    directBankTransfer: 'நேரடியாக உங்கள் வங்கி கணக்கில் (Direct Bank Transfer)',
    firstChildAmountLabel: 'முதல் குழந்தை: ₹5,000',
    secondChildAmountLabel: 'இரண்டாவது பெண் குழந்தை: ₹6,000',
    checkEligibilityPrompt: 'உங்களுக்கு உதவித்தொகை கிடைக்குமா என்பதை சரிபார்க்க விருப்பமா?',
    yesCheckEligibility: 'ஆம், தகுதியை சரிபார்க்கவும்',

    step2StageTitle: 'உங்கள் தற்போதைய நிலை என்ன?',
    step2StageSubtitle: 'ஏதேனும் ஒரு விருப்பத்தை தேர்ந்தெடுக்கவும்',
    pregnantTitle: 'கர்ப்பமாக உள்ளேன்',
    pregnantDesc: 'தற்போது கர்ப்பிணி',
    deliveredTitle: 'குழந்தை பிறந்துவிட்டது',
    deliveredDesc: 'பிரசவம் முடிந்தது',
    childOrderTitle: 'இது எத்தனையாவது குழந்தை?',
    childOrderSubtitle: 'முதல் குழந்தைக்கும் இரண்டாவது பெண் குழந்தைக்கும் உதவி உண்டு',
    firstBornChild: 'முதல் குழந்தை (1st Child)',
    firstBornDesc: '₹5,000 முழு உதவித்தொகை',
    secondBornChild: 'இரண்டாவது குழந்தை (2nd Child)',
    secondBornDesc: 'பெண் குழந்தையாக இருந்தால் ₹6,000',
    secondChildGirlQuestion: 'இரண்டாவது குழந்தை பெண்ணா? (இரண்டாவது பெண் குழந்தைக்கு மட்டும் நிதி உதவி கிடைக்கும்)',
    yesGirl: 'ஆம், பெண் குழந்தை (Girl)',
    boy: 'ஆண் குழந்தை (Boy)',
    qualifyingCardQuestion: 'உங்களிடம் ஏதேனும் அரசு அட்டை உள்ளதா?',
    qualifyingCardSubtitle: 'ரேஷன் அட்டை / இ-ஷ்ரம் / பிபிஎல் அட்டை',
    rationOrEshramPrompt: '🌾 ரேஷன் அட்டை அல்லது இ-ஷ்ரம் அட்டை உள்ளதா?',
    rationOrEshramSub: 'பெரும்பாலான தாய்மார்களிடம் ரேஷன் அட்டை உள்ளது',
    yesIHaveItProceed: 'ஆம், என்னிடம் உள்ளது (தொடரவும்)',
    orSelectOtherCard: 'அல்லது வேறு அட்டையைத் தேர்ந்தெடுக்கவும்',
    viewEligibilityResult: 'தகுதி முடிவை காண்க',

    resultHeaderTitle: 'தகுதி முடிவு',
    totalAidAmount: 'மொத்த உதவித்தொகை (DBT)',
    aidDirectToBankNote: 'இந்த தொகை உங்கள் ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கில் தவணையாக வரும்',
    viewRequiredDocsBtn: 'தேவையான ஆவணங்களை காண்க (Documents)',
    viewNearestCentreBtn: 'அருகிலுள்ள அங்கன்வாடி மையத்தை காண்க',

    step3DocsBadge: 'படி 2 : ஆவண சரிபார்ப்பு',
    checkWithPhotoNotice: '💡 ஏதேனும் ஆவணத்தில் சந்தேகம் இருந்தால் புகைப்படம் மூலம் சரிபார்க்கலாம்.',
    prepareSlipButton: 'சீட்டைத் தயார் செய்க',
    readyCountSuffix: 'தயார்',

    step4PrepareBadge: 'படி 3 : அடிப்படை விவரம்',
    slipDetailsTitle: 'உங்கள் சீட்டின் விவரங்கள்',
    slipDetailsSubtitle: 'அங்கன்வாடி பணியாளருக்கான எளிய விவரம் (கடவுச்சொல் அல்லது பின் தேவையில்லை)',
    motherNameLabel: 'தாயின் பெயர் (Mother’s Name)',
    motherNamePlaceholder: 'உதா. சுனிதா தேவி',
    bankNameLabel: 'வங்கியின் பெயர் (ஆதார் இணைக்கப்பட்ட கணக்கு)',
    bankNamePlaceholder: 'உதா. ஸ்டேட் பாங்க் ஆப் இந்தியா',
    pincodeLabel: 'அஞ்சல் குறியீடு (6 இலக்க PIN Code)',
    pincodePlaceholder: 'உதா. 600001',
    privacyAssurance: 'மாத்ரு சகி ஒருபோதும் ஆதார் எண், வங்கி கணக்கு எண் அல்லது OTP ஐ கேட்காது.',
    findNearestCentreBtn: 'அருகிலுள்ள மையத்தை தேடுக',

    step5CentreBadge: 'படி 4 : எங்கு செல்ல வேண்டும்',
    verifiedOfficialBadge: 'அரசு அங்கீகரிக்கப்பட்ட மையம் (Verified)',
    takeSlipToCentreSub: 'இங்கு சென்று அங்கன்வாடி பணியாளரிடம் உங்கள் சீட்டைக் காட்டவும்',
    pincodeTag: 'பின்கோடு:',
    viewOnMapsBtn: 'வழியை காண்க (Google Maps)',
    phoneLabel: 'தொலைபேசி:',
    getSlipBtn: 'என் சீட்டை காண்க (Get Slip)',

    slipReadyBadge: 'சீட்டு தயார் (Completed)',
    slipReadyHeading: 'உங்கள் அங்கன்வாடி சீட்டு தயாராக உள்ளது',
    slipReadySubtitle: 'இந்த சீட்டை எடுத்துக்கொண்டு அருகிலுள்ள அங்கன்வாடி மையத்திற்கு செல்லவும்',
    startNewChatBtn: 'புதிய உரையாடலை தொடங்குங்கள் (Start Over)',

    soundwaveLabel: 'ஒலி அலை (Soundwave)',
    soundwaveSpeakPrompt: 'பேசுங்கள்...',
    soundwaveListenPrompt: 'நிறுத்த பொத்தானை அழுத்தவும்',
    soundwaveIdlePrompt: 'தெளிவாக பேசவும்',

    quickPrompts: {
      tellMeAbout: 'திட்டம் பற்றி சொல்லுங்கள்',
      howDoIGet: 'நான் ₹5,000 எப்படி பெறுவது?',
      whichDocs: 'என்ன ஆவணங்கள் தேவை?',
    },
    greetingVoice: 'வணக்கம் சகோதரி! நான் மாத்ரு சகி. அரசு உதவித்தொகை பெற நான் உங்களுக்கு உதவுவேன்.',
    stepNarrations: {
      about: 'இத்திட்டத்தில் உங்கள் வங்கி கணக்கில் ₹5,000 முதல் ₹6,000 வரை உதவித்தொகை கிடைக்கும்.',
      eligibility: 'நீங்கள் கர்ப்பமாக இருக்கிறீர்களா அல்லது குழந்தை பிறந்துவிட்டதா?',
      documents: 'அங்கன்வாடிக்கு கொண்டு செல்ல வேண்டிய ஆவணங்களை சரிபார்க்கவும்.',
      prepare: 'அங்கன்வாடி சீட்டை நிரப்பவும்.',
      centre: 'இது உங்கள் அருகிலுள்ள அங்கன்வாடி மையம்.',
      done: 'உங்கள் உதவி சீட்டு தயாராகிவிட்டது.',
    },
  },

  te: {
    appName: 'మాతృ సఖి',
    tagline: 'మాతృ వందన యోజనలో మీ స్నేహితురాలు',
    tapToTalk: 'మాట్లాడటానికి ఇక్కడ నొక్కండి',
    listening: 'మాతృ సఖి వింటోంది...',
    speaking: 'మాతృ సఖి మాట్లాడుతోంది...',
    processing: 'ఒక్క క్షణం వేచి ఉండండి...',
    repeat: 'మళ్లీ చెప్పండి',
    back: 'వెనక్కి వెళ్లండి',
    next: 'ముందుకు వెళ్లండి',
    yes: 'అవును',
    no: 'కాదు',
    eligibleBadge: 'అభినందనలు! మీరు అర్హులు',
    conditionalBadge: 'అంగన్‌వాడీలో నిర్ధారించుకోండి',
    notEligibleBadge: 'ఈ పథకానికి అర్హత లేదు',
    rupees: '₹',
    documentsTitle: 'కావలసిన పత్రాలు',
    centreTitle: 'సమీప అంగన్‌వాడీ కేంద్రం',
    slipTitle: 'అంగన్‌వాడీ రశీదు',
    safetyNotice: 'భద్రతా నియమం: మీ ఆధార్, బ్యాంక్ పిన్ లేదా OTP ఎవరికీ చెప్పవద్దు.',
    helpline: 'మాతృ వందన హెల్ప్‌లైన్: 14445 | మహిళా హెల్ప్‌లైన్: 181',
    resumeCodeNotice: 'మీ 6 అంకెల కోడ్',
    resumePrompt: 'గత సమాచారాన్ని తిరిగి పొందండి',
    typeFallbackPlaceholder: 'ఇక్కడ రాయండి లేదా మాట్లాడండి...',
    takePhoto: 'పత్రం ఫోటో చూపించండి',
    closeCamera: 'కెమెరా మూసివేయండి',
    portalTour: 'ప్రభుత్వ పోర్టల్ చూడండి (Dekho)',
    readAloud: 'వినండి',
    voiceOn: 'వాయిస్ ఆన్',
    voiceOff: 'వాయిస్ ఆఫ్',

    welcomeGreeting: 'నమస్కారం! నేను మాతృ సఖిని',
    welcomeSubtitle: 'ప్రభుత్వ పథకం ద్వారా ₹5,000 నుంచి ₹6,000 సహాయం పొందడానికి మాట్లాడండి',
    tapToSpeakSub: 'బటన్ నొక్కి మాట్లాడండి',
    viewDetailsBtn: 'పథకాన్ని నేరుగా చూడండి (View Details)',
    testAudioBtn: 'వాయిస్ వినండి (Listen)',
    chooseLanguage: 'మీ భాషను ఎంచుకోండి (Choose Language)',
    freeGovtHelp: 'ఉచిత మరియు సురక్షితమైన ప్రభుత్వ సహాయం',

    helplineLabel: '14445 / 181',
    journeyStages: {
      start: 'ప్రారంభం',
      scheme: 'పథకం',
      check: 'అర్హత',
      docs: 'పత్రాలు',
      slip: 'రశీదు',
    },

    step1Badge: 'దశ 1 : పథకం వివరాలు',
    maternityBenefitTitle: 'మాతృ వందన పథకం',
    maternityBenefitDesc: 'గర్భిణులు మరియు బాలింతల పోషణ మరియు ఆరోగ్యం కోసం భారత ప్రభుత్వం నేరుగా అందించే ఆర్థిక సహాయం.',
    govtAidBadge: 'ప్రభుత్వ సహాయం',
    directBankTransfer: 'నేరుగా మీ బ్యాంక్ ఖాతాలో (Direct Bank Transfer)',
    firstChildAmountLabel: 'మొదటి బిడ్డ: ₹5,000',
    secondChildAmountLabel: 'రెండవ ఆడబిడ్డ: ₹6,000',
    checkEligibilityPrompt: 'మీకు ఈ సహాయం అందుతుందో లేదో చూడాలనుకుంటున్నారా?',
    yesCheckEligibility: 'అవును, అర్హత చూడండి',

    step2StageTitle: 'మీ ప్రస్తుత పరిస్థితి ఏమిటి?',
    step2StageSubtitle: 'రెండింటిలో ఒక ఎంపికను తాకండి',
    pregnantTitle: 'గర్భవతిని',
    pregnantDesc: 'ప్రస్తుతం గర్భంతో ఉన్నాను',
    deliveredTitle: 'ప్రసవం జరిగింది',
    deliveredDesc: 'బిడ్డ జన్మించింది',
    childOrderTitle: 'ఇది మీ ఎన్నవ బిడ్డ?',
    childOrderSubtitle: 'మొదటి బిడ్డకు మరియు రెండవ ఆడబిడ్డకు ఈ పథకం వర్తిస్తుంది',
    firstBornChild: 'మొదటి బిడ్డ (1st Child)',
    firstBornDesc: '₹5,000 పూర్తి సహాయం',
    secondBornChild: 'రెండవ బిడ్డ (2nd Child)',
    secondBornDesc: 'ఆడబిడ్డ అయితే ₹6,000',
    secondChildGirlQuestion: 'రెండవ బిడ్డ ఆడపిల్లా? (నిబంధనల ప్రకారం రెండవ సంతానం ఆడపిల్ల అయితేనే వర్తిస్తుంది)',
    yesGirl: 'అవును, ఆడపిల్ల (Girl)',
    boy: 'మగపిల్లాడు (Boy)',
    qualifyingCardQuestion: 'మీ వద్ద ఏదైనా ప్రభుత్వ కార్డు ఉందా?',
    qualifyingCardSubtitle: 'రేషన్ కార్డు / ఈ-శ్రమ్ / బీపీఎల్ కార్డు',
    rationOrEshramPrompt: '🌾 రేషన్ కార్డు లేదా ఈ-శ్రమ్ కార్డు ఉందా?',
    rationOrEshramSub: 'చాలామంది తల్లుల వద్ద రేషన్ కార్డు ఉంటుంది',
    yesIHaveItProceed: 'అవును, నా వద్ద ఉంది (ముందుకు వెళ్లండి)',
    orSelectOtherCard: 'లేదా ఇతర కార్డును ఎంచుకోండి',
    viewEligibilityResult: 'అర్హత ఫలితం చూడండి',

    resultHeaderTitle: 'అర్హత ఫలితం',
    totalAidAmount: 'మొత్తం సహాయ మొత్తం (DBT)',
    aidDirectToBankNote: 'ఈ మొత్తం నేరుగా మీ ఆధార్ అనుసంధానిత బ్యాంకు ఖాతాలో జమ అవుతుంది',
    viewRequiredDocsBtn: 'కావలసిన పత్రాలు చూడండి (Documents)',
    viewNearestCentreBtn: 'సమీప అంగన్‌వాడీ కేంద్రం చూడండి',

    step3DocsBadge: 'దశ 2 : పత్రాల పరిశీలన',
    checkWithPhotoNotice: '💡 ఏదైనా పత్రంపై సందేహం ఉంటే ఫోటో చూపించి సరిచూసుకోవచ్చు.',
    prepareSlipButton: 'రశీదు తయారు చేయండి',
    readyCountSuffix: 'సిద్ధం',

    step4PrepareBadge: 'దశ 3 : సాధారణ వివరాలు',
    slipDetailsTitle: 'మీ రశీదు వివరాలు',
    slipDetailsSubtitle: 'అంగన్‌వాడీ కార్యకర్త కోసం ప్రాథమిక వివరాలు (పాస్‌వర్డ్ లేదా పిన్ అవసరం లేదు)',
    motherNameLabel: 'తల్లి పేరు (Mother’s Name)',
    motherNamePlaceholder: 'ఉదా. సునీతా దేవి',
    bankNameLabel: 'బ్యాంకు పేరు (ఆధార్ లింక్ ఖాతా)',
    bankNamePlaceholder: 'ఉదా. స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా',
    pincodeLabel: 'పిన్ కోడ్ (6 అంకెల PIN Code)',
    pincodePlaceholder: 'ఉదా. 500001',
    privacyAssurance: 'మాతృ సఖి ఎన్నడూ ఆధార్ నంబర్, బ్యాంక్ ఖాతా లేదా OTP అడగదు.',
    findNearestCentreBtn: 'సమీప కేంద్రాన్ని కనుగొనండి',

    step5CentreBadge: 'దశ 4 : ఎక్కడికి వెళ్లాలి',
    verifiedOfficialBadge: 'ప్రభుత్వ గుర్తింపు పొందిన కేంద్రం (Verified)',
    takeSlipToCentreSub: 'ఇక్కడికి వెళ్లి అంగన్‌వాడీ కార్యకర్తకు మీ రశీదు చూపించండి',
    pincodeTag: 'పిన్ కోడ్:',
    viewOnMapsBtn: 'దారి చూడండి (Google Maps)',
    phoneLabel: 'ఫోన్:',
    getSlipBtn: 'నా రశీదు చూడండి (Get Slip)',

    slipReadyBadge: 'రశీదు సిద్ధం (Completed)',
    slipReadyHeading: 'మీ అంగన్‌వాడీ రశీదు సిద్ధమైంది',
    slipReadySubtitle: 'ఈ రశీదును తీసుకొని సమీప అంగన్‌వాడీ కేంద్రానికి వెళ్లండి',
    startNewChatBtn: 'కొత్త సంభాషణ ప్రారంభించండి (Start Over)',

    soundwaveLabel: 'ధ్వని తరంగం (Soundwave)',
    soundwaveSpeakPrompt: 'మాట్లాడటం కొనసాగించండి...',
    soundwaveListenPrompt: 'ఆపడానికి బటన్ నొక్కండి',
    soundwaveIdlePrompt: 'స్పష్టమైన స్వరంతో మాట్లాడండి',

    quickPrompts: {
      tellMeAbout: 'పథకం గురించి చెప్పండి',
      howDoIGet: 'నాకు ₹5,000 ఎలా వస్తాయి?',
      whichDocs: 'ఏ పత్రాలు కావాలి?',
    },
    greetingVoice: 'నమస్కారం సోదరి! నేను మీ మాతృ సఖిని. మాతృ వందన యోజన ద్వారా ప్రభుత్వ సహాయం పొందడంలో నేను మీకు సహాయం చేస్తాను.',
    stepNarrations: {
      about: 'ఈ పథకం ద్వారా నేరుగా మీ బ్యాంకు ఖాతాలో ₹5,000 నుంచి ₹6,000 వరకు జమ అవుతాయి.',
      eligibility: 'మీరు గర్భవతిగా ఉన్నారా లేక ప్రసవం జరిగిందా?',
      documents: 'అంగన్‌వాడీకి తీసుకువెళ్లాల్సిన పత్రాలను సరిచూసుకోండి.',
      prepare: 'అంగన్‌వాడీ తయారీ రశీదును సిద్ధం చేసుకోండి.',
      centre: 'ఇది మీ సమీపంలోని అంగన్‌వాడీ కేంద్రం.',
      done: 'మీ రశీదు సిద్ధమైంది. ఈ కోడ్‌ను భద్రపరుచుకోండి.',
    },
  },

  kn: {
    appName: 'ಮಾತೃ ಸಖಿ',
    tagline: 'ಮಾತೃ ವಂದನಾ ಯೋಜನೆಯಲ್ಲಿ ನಿಮ್ಮ ಒಡನಾಡಿ',
    tapToTalk: 'ಮಾನಾಡಲು ಇಲ್ಲಿ ಸ್ಪರ್ಶಿಸಿ',
    listening: 'ಮಾತೃ ಸಖಿ ಆಲಿಸುತ್ತಿದೆ...',
    speaking: 'ಮಾತೃ ಸಖಿ ಮಾತನಾಡುತ್ತಿದೆ...',
    processing: 'ಒಂದು ಕ್ಷಣ ನಿರೀಕ್ಷಿಸಿ...',
    repeat: 'ಮತ್ತೆ ಹೇಳಿ',
    back: 'ಹಿಂದಕ್ಕೆ ಹೋಗಿ',
    next: 'ಮುಂದೆ ಹೋಗಿ',
    yes: 'ಹೌದು',
    no: 'ಇಲ್ಲ',
    eligibleBadge: 'ಅಭಿನಂದನೆಗಳು! ನೀವು ಅರ್ಹರು',
    conditionalBadge: 'ಅಂಗನವಾಡಿಯಲ್ಲಿ ಪರಿಶೀಲಿಸಿ',
    notEligibleBadge: 'ಈ ಯೋಜನೆಗೆ ಅರ್ಹರಲ್ಲ',
    rupees: '₹',
    documentsTitle: 'ಅಗತ್ಯ ದಾಖಲೆಗಳು',
    centreTitle: 'ಹತ್ತಿರದ ಅಂಗನವಾಡಿ ಕೇಂದ್ರ',
    slipTitle: 'ಅಂಗನವಾಡಿ ಚೀಟಿ',
    safetyNotice: 'ಸುರಕ್ಷತೆ: ನಿಮ್ಮ ಆಧಾರ್, ಬ್ಯಾಂಕ್ ಪಿನ್ ಅಥವಾ OTP ಅನ್ನು ಯಾರಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.',
    helpline: 'ಮಾತೃ ವಂದನಾ ಸಹಾಯವಾಣಿ: 14445 | ಮಹಿಳಾ ಸಹಾಯವಾಣಿ: 181',
    resumeCodeNotice: 'ನಿಮ್ಮ 6 ಅಂಕಿಯ ಕೋಡ್',
    resumePrompt: 'ಹಿಂದಿನ ವಿವರ ಮುಂದುವರಿಸಿ',
    typeFallbackPlaceholder: 'ಇಲ್ಲಿ ಬರೆಯಿರಿ ಅಥವಾ ಮಾತನಾಡಿ...',
    takePhoto: 'ದಾಖಲೆಯ ಫೋಟೋ ತೋರಿಸಿ',
    closeCamera: 'ಕ್ಯಾಮೆರಾ ಮುಚ್ಚಿ',
    portalTour: 'ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ವೀಕ್ಷಿಸಿ (Dekho)',
    readAloud: 'ಕೇಳಿ',
    voiceOn: 'ಧ್ವನಿ ಆನ್',
    voiceOff: 'ಧ್ವನಿ ಆಫ್',

    welcomeGreeting: 'ನಮಸ್ಕಾರ! ನಾನು ಮಾತೃ ಸಖಿ',
    welcomeSubtitle: 'ಸರ್ಕಾರಿ ಯೋಜನೆಯಿಂದ ₹೫,೦೦೦ ರಿಂದ ₹೬,೦೦೦ ನೆರವು ಪಡೆಯಲು ಮಾತನಾಡಿ',
    tapToSpeakSub: 'ಕೇವಲ ಬಟನ್ ಒತ್ತಿ ಮಾತನಾಡಿ',
    viewDetailsBtn: 'ನೇರವಾಗಿ ಯೋಜನೆಯನ್ನು ನೋಡಿ (View Details)',
    testAudioBtn: 'ಧ್ವನಿ ಕೇಳಿ (Listen)',
    chooseLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ (Choose Language)',
    freeGovtHelp: 'ಉಚಿತ ಮತ್ತು ಸುರಕ್ಷಿತ ಸರ್ಕಾರಿ ನೆರವು',

    helplineLabel: '14445 / 181',
    journeyStages: {
      start: 'ಪ್ರಾರಂಭ',
      scheme: 'ಯೋಜನೆ',
      check: 'ಅರ್ಹತೆ',
      docs: 'ದಾಖಲೆಗಳು',
      slip: 'ಚೀಟಿ',
    },

    step1Badge: 'ಹಂತ ೧ : ಯೋಜನೆಯ ಮಾಹಿತಿ',
    maternityBenefitTitle: 'ಮಾತೃ ವಂದನಾ ಯೋಜನೆ',
    maternityBenefitDesc: 'ಗರ್ಭಿಣಿಯರು ಮತ್ತು ತಾಯಂದಿರ ಪೋಷಣೆಗಾಗಿ ಭಾರತ ಸರ್ಕಾರದ ನೇರ ಆರ್ಥಿಕ ನೆರವು.',
    govtAidBadge: 'ಸರ್ಕಾರಿ ನೆರವು',
    directBankTransfer: 'ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ (Direct Bank Transfer)',
    firstChildAmountLabel: 'ಮೊದಲ ಮಗು: ₹೫,೦೦೦',
    secondChildAmountLabel: 'ಎರಡನೇ ಹೆಣ್ಣು ಮಗು: ₹೬,೦೦೦',
    checkEligibilityPrompt: 'ನಿಮಗೆ ಈ ನೆರವು ಸಿಗುತ್ತದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಲು ಬಯಸುವಿರಾ?',
    yesCheckEligibility: 'ಹೌದು, ಅರ್ಹತೆ ನೋಡಿ',

    step2StageTitle: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ ಏನು?',
    step2StageSubtitle: 'ಎರಡರಲ್ಲಿ ಒಂದನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    pregnantTitle: 'ಗರ್ಭಿಣಿ',
    pregnantDesc: 'ಪ್ರಸ್ತುತ ಗರ್ಭ ಧರಿಸಿದ್ದೇನೆ',
    deliveredTitle: 'ಮಗುವಿನ ಜನನವಾಗಿದೆ',
    deliveredDesc: 'ಮಗು ಜನಿಸಿದೆ',
    childOrderTitle: 'ಇದು ನಿಮ್ಮ ಎಷ್ಟನೇ ಮಗು?',
    childOrderSubtitle: 'ಮೊದಲ ಮಗು ಮತ್ತು ಎರಡನೇ ಹೆಣ್ಣು ಮಗುವಿಗೆ ಈ ಯೋಜನೆ ಅನ್ವಯಿಸುತ್ತದೆ',
    firstBornChild: 'ಮೊದಲ ಮಗು (1st Child)',
    firstBornDesc: '₹೫,೦೦೦ ಪೂರ್ಣ ನೆರವು',
    secondBornChild: 'ಎರಡನೇ ಮಗು (2nd Child)',
    secondBornDesc: 'ಹೆಣ್ಣು ಮಗುವಾಗಿದ್ದರೆ ₹೬,೦೦೦',
    secondChildGirlQuestion: 'ಎರಡನೇ ಮಗು ಹೆಣ್ಣು ಮಗುವೇ? (ನಿಯಮದ ಪ್ರಕಾರ ಎರಡನೇ ಹೆಣ್ಣು ಮಗುವಿಗೆ ಮಾತ್ರ ನೆರವು ಸಿಗುತ್ತದೆ)',
    yesGirl: 'ಹೌದು, ಹೆಣ್ಣು ಮಗು (Girl)',
    boy: 'ಗಂಡು ಮಗು (Boy)',
    qualifyingCardQuestion: 'ನಿಮ್ಮ ಬಳಿ ಯಾವುದೇ ಸರ್ಕಾರಿ ಕಾರ್ಡ್ ಇದೆಯೇ?',
    qualifyingCardSubtitle: 'ರೇಷನ್ ಕಾರ್ಡ್ / ಇ-ಶ್ರಮ್ / ಬಿಪಿಎಲ್ ಕಾರ್ಡ್',
    rationOrEshramPrompt: '🌾 ರೇಷನ್ ಕಾರ್ಡ್ ಅಥವಾ ಇ-ಶ್ರಮ್ ಕಾರ್ಡ್ ಇದೆಯೇ?',
    rationOrEshramSub: 'ಹೆಚ್ಚಿನ ತಾಯಂದಿರ ಬಳಿ ರೇಷನ್ ಕಾರ್ಡ್ ಇರುತ್ತದೆ',
    yesIHaveItProceed: 'ಹೌದು, ನನ್ನ ಬಳಿ ಇದೆ (ಮುಂದುವರಿಯಿರಿ)',
    orSelectOtherCard: 'ಅಥವಾ ಬೇರೆ ಕಾರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ',
    viewEligibilityResult: 'ಅರ್ಹತೆಯ ಫಲಿತಾಂಶ ನೋಡಿ',

    resultHeaderTitle: 'ಅರ್ಹತೆಯ ಫಲಿತಾಂಶ',
    totalAidAmount: 'ಒಟ್ಟು ನೆರವು ಮೊತ್ತ (DBT)',
    aidDirectToBankNote: 'ಈ ಮೊತ್ತವು ನೇರವಾಗಿ ನಿಮ್ಮ ಆಧಾರ್ ಲಿಂಕ್ಡ್ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆಯಾಗುತ್ತದೆ',
    viewRequiredDocsBtn: 'ದಾಖಲೆಗಳನ್ನು ನೋಡಿ (Documents)',
    viewNearestCentreBtn: 'ಹತ್ತಿರದ ಅಂಗನವಾಡಿ ಕೇಂದ್ರ ನೋಡಿ',

    step3DocsBadge: 'ಹಂತ ೨ : ದಾಖಲೆಗಳ ಪರಿಶೀಲನೆ',
    checkWithPhotoNotice: '💡 ಯಾವುದೇ ದಾಖಲೆಯ ಬಗ್ಗೆ ಸಂದೇಹವಿದ್ದರೆ ಫೋಟೋ ತೋರಿಸಿ ಪರಿಶೀಲಿಸಬಹುದು.',
    prepareSlipButton: 'ಚೀಟಿ ಸಿದ್ಧಪಡಿಸಿ',
    readyCountSuffix: 'ಸಿದ್ಧ',

    step4PrepareBadge: 'ಹಂತ ೩ : ಸಾಮಾನ್ಯ ಮಾಹಿತಿ',
    slipDetailsTitle: 'ನಿಮ್ಮ ಚೀಟಿಯ ವಿವರಗಳು',
    slipDetailsSubtitle: 'ಅಂಗನವಾಡಿ ಕಾರ್ಯಕರ್ತೆಗಾಗಿ ಸಾಮಾನ್ಯ ಮಾಹಿತಿ (ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಪಿನ್ ಅಗತ್ಯವಿಲ್ಲ)',
    motherNameLabel: 'ತಾಯಿಯ ಹೆಸರು (Mother’s Name)',
    motherNamePlaceholder: 'ಉದಾ. ಸುನೀತಾ ದೇವಿ',
    bankNameLabel: 'ಬ್ಯಾಂಕ್ ಹೆಸರು (ಆಧಾರ್ ಲಿಂಕ್ಡ್ ಖಾತೆ)',
    bankNamePlaceholder: 'ಉದಾ. ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ',
    pincodeLabel: 'ಪಿನ್ ಕೋಡ್ (೬ ಅಂಕಿಯ PIN Code)',
    pincodePlaceholder: 'ಉದಾ. ೫೬೦೦೦೧',
    privacyAssurance: 'ಮಾತೃ ಸಖಿ ಎಂದಿಗೂ ಆಧಾರ್ ಸಂಖ್ಯೆ, ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಥವಾ OTP ಕೇಳುವುದಿಲ್ಲ.',
    findNearestCentreBtn: 'ಹತ್ತಿರದ ಕೇಂದ್ರ ಹುಡುಕಿ',

    step5CentreBadge: 'ಹಂತ ೪ : ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು',
    verifiedOfficialBadge: 'ಸರ್ಕಾರಿ ಮಾನ್ಯತೆ ಪಡೆದ ಕೇಂದ್ರ (Verified)',
    takeSlipToCentreSub: 'ಇಲ್ಲಿಗೆ ಹೋಗಿ ಅಂಗನವಾಡಿ ಕಾರ್ಯಕರ್ತೆಗೆ ನಿಮ್ಮ ಚೀಟಿಯನ್ನು ತೋರಿಸಿ',
    pincodeTag: 'ಪಿನ್ ಕೋಡ್:',
    viewOnMapsBtn: 'ದಾರಿ ನೋಡಿ (Google Maps)',
    phoneLabel: 'ದೂರವಾಣಿ:',
    getSlipBtn: 'ನನ್ನ ಚೀಟಿ ನೋಡಿ (Get Slip)',

    slipReadyBadge: 'ಚೀಟಿ ಸಿದ್ಧ (Completed)',
    slipReadyHeading: 'ನಿಮ್ಮ ಅಂಗನವಾಡಿ ಚೀಟಿ ಸಿದ್ಧವಾಗಿದೆ',
    slipReadySubtitle: 'ಈ ಚೀಟಿಯನ್ನು ತೆಗೆದುಕೊಂಡು ಹತ್ತಿರದ ಅಂಗನವಾಡಿ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ',
    startNewChatBtn: 'ಹೊಸ ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ (Start Over)',

    soundwaveLabel: 'ಧ್ವನಿ ತರಂಗ (Soundwave)',
    soundwaveSpeakPrompt: 'ಮಾತನಾಡುವುದನ್ನು ಮುಂದುವರಿಸಿ...',
    soundwaveListenPrompt: 'ನಿಲ್ಲಿಸಲು ಬಟನ್ ಒತ್ತಿ',
    soundwaveIdlePrompt: 'ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ',

    quickPrompts: {
      tellMeAbout: 'ಯೋಜನೆಯ ಬಗ್ಗೆ ತಿಳಿಸಿ',
      howDoIGet: 'ನನಗೆ ₹೫,೦೦೦ ಹೇಗೆ ದೊರೆಯುತ್ತದೆ?',
      whichDocs: 'ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?',
    },
    greetingVoice: 'ನಮಸ್ಕಾರ ತಂಗಿ! ನಾನು ಮಾತೃ ಸಖಿ. ಮಾತೃ ವಂದನಾ ಯೋಜನೆಯಿಂದ ಸರ್ಕಾರದ ನೆರವು ಪಡೆಯಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.',
    stepNarrations: {
      about: 'ಮಾತೃ ವಂದನಾ ಯೋಜನೆಯಿಂದ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ₹೫,೦೦೦ ರಿಂದ ₹೬,೦೦೦ ಸಿಗುತ್ತದೆ.',
      eligibility: 'ನೀವು ಗರ್ಭಿಣಿಯಾಗಿದ್ದೀರಾ ಅಥವಾ ಮಗುವಿನ ಜನನವಾಗಿದೆಯೇ?',
      documents: 'ಅಂಗನವಾಡಿಗೆ ತೆಗೆದುಕೊಂಡು ಹೋಗಬೇಕಾದ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
      prepare: 'ಅಂಗನವಾಡಿ ಭೇಟಿಗಾಗಿ ಚೀಟಿ ತಯಾರಿಸಿಕೊಳ್ಳಿ.',
      centre: 'ಇದು ನಿಮ್ಮ ಹತ್ತಿರದ ಅಂಗನವಾಡಿ ಕೇಂದ್ರವಾಗಿದೆ.',
      done: 'ನಿಮ್ಮ ಚೀಟಿ ಸಿದ್ಧವಾಗಿದೆ. ಈ ಕೋಡ್ ನೆನಪಿನಲ್ಲಿಡಿ.',
    },
  },

  en: {
    appName: 'Matru Sakhi',
    tagline: 'Voice companion for maternity benefit (PMMVY)',
    tapToTalk: 'Tap here to speak',
    listening: 'Matru Sakhi is listening...',
    speaking: 'Matru Sakhi is speaking...',
    processing: 'One moment please...',
    repeat: 'Say it again',
    back: 'Go back',
    next: 'Next step',
    yes: 'Yes',
    no: 'No',
    eligibleBadge: 'You Qualify!',
    conditionalBadge: 'Confirm at Anganwadi',
    notEligibleBadge: 'Not Eligible',
    rupees: '₹',
    documentsTitle: 'Documents Needed',
    centreTitle: 'Nearest Anganwadi Centre',
    slipTitle: 'Anganwadi Slip',
    safetyNotice: 'Safety Rule: Never share your Aadhaar number, bank PIN, or OTP with anyone.',
    helpline: 'PMMVY Helpline: 14445 | Women Helpline: 181',
    resumeCodeNotice: 'Your 6-digit Resume Code: Write this down to continue later',
    resumePrompt: 'Resume with 6-digit Code',
    typeFallbackPlaceholder: 'Type or speak your answer here...',
    takePhoto: 'Show Document to Camera',
    closeCamera: 'Close Camera',
    portalTour: 'View Government Portal (Dekho)',
    readAloud: 'Read Aloud',
    voiceOn: 'Voice On',
    voiceOff: 'Muted',

    welcomeGreeting: 'Hello! I am Matru Sakhi',
    welcomeSubtitle: 'Talk with me to get ₹5,000 to ₹6,000 government maternity aid',
    tapToSpeakSub: 'Just tap the button and speak',
    viewDetailsBtn: 'View Scheme Details',
    testAudioBtn: 'Listen to Voice',
    chooseLanguage: 'Choose Your Language',
    freeGovtHelp: 'Free & Secure Government Assistance',

    helplineLabel: '14445 / 181',
    journeyStages: {
      start: 'Start',
      scheme: 'Scheme',
      check: 'Check',
      docs: 'Docs',
      slip: 'Slip',
    },

    step1Badge: 'Step 1 : Scheme Information',
    maternityBenefitTitle: 'Maternity Benefit Scheme',
    maternityBenefitDesc: 'Direct financial assistance from the Government of India for the nutrition and health of pregnant women and new mothers.',
    govtAidBadge: 'Government Aid',
    directBankTransfer: 'Direct Bank Transfer into your bank account',
    firstChildAmountLabel: 'First Baby: ₹5,000',
    secondChildAmountLabel: 'Second Baby Girl: ₹6,000',
    checkEligibilityPrompt: 'Would you like to check if you qualify for this benefit?',
    yesCheckEligibility: 'Yes, Check Eligibility',

    step2StageTitle: 'What is your current stage?',
    step2StageSubtitle: 'Tap one of the two choices below',
    pregnantTitle: 'Currently Pregnant',
    pregnantDesc: 'Baby is expected soon',
    deliveredTitle: 'Baby is Born',
    deliveredDesc: 'Delivery has already taken place',
    childOrderTitle: 'Which child is this for you?',
    childOrderSubtitle: 'The scheme applies to the first child and second girl child',
    firstBornChild: 'First Child (1st Child)',
    firstBornDesc: 'Full ₹5,000 assistance',
    secondBornChild: 'Second Child (2nd Child)',
    secondBornDesc: '₹6,000 if baby is a girl',
    secondChildGirlQuestion: 'Is the second baby a girl? (Under rules, benefit applies if second baby is a girl)',
    yesGirl: 'Yes, a Girl',
    boy: 'A Boy',
    qualifyingCardQuestion: 'Do you have any government entitlement card?',
    qualifyingCardSubtitle: 'Ration card / e-Shram / BPL card etc.',
    rationOrEshramPrompt: '🌾 Do you have a Ration Card or e-Shram Card?',
    rationOrEshramSub: 'Most mothers have a ration card or e-Shram card',
    yesIHaveItProceed: 'Yes, I have it (Proceed)',
    orSelectOtherCard: 'Or select other card',
    viewEligibilityResult: 'View Eligibility Result',

    resultHeaderTitle: 'Eligibility Result',
    totalAidAmount: 'Total Benefit Amount (DBT)',
    aidDirectToBankNote: 'This amount will be transferred in instalments into your Aadhaar-linked bank account',
    viewRequiredDocsBtn: 'View Required Documents',
    viewNearestCentreBtn: 'View Nearest Anganwadi Centre',

    step3DocsBadge: 'Step 2 : Documents Checklist',
    checkWithPhotoNotice: '💡 If you are unsure about any document, tap Check with Camera to show it.',
    prepareSlipButton: 'Prepare Anganwadi Slip',
    readyCountSuffix: 'ready',

    step4PrepareBadge: 'Step 3 : Basic Information',
    slipDetailsTitle: 'Preparation Slip Information',
    slipDetailsSubtitle: 'Basic details for the Anganwadi worker (no passwords or PINs)',
    motherNameLabel: 'Mother’s Name',
    motherNamePlaceholder: 'e.g. Sunita Devi',
    bankNameLabel: 'Bank Name (Aadhaar linked account)',
    bankNamePlaceholder: 'e.g. State Bank of India / Post Office Bank',
    pincodeLabel: 'Postal Pincode (6-digit PIN Code)',
    pincodePlaceholder: 'e.g. 400001',
    privacyAssurance: 'Matru Sakhi never asks for your Aadhaar number, full bank account, or OTP.',
    findNearestCentreBtn: 'Find Nearest Centre',

    step5CentreBadge: 'Step 4 : Where to Go',
    verifiedOfficialBadge: 'Official Verified Centre',
    takeSlipToCentreSub: 'Visit this centre and show your slip to the Anganwadi worker',
    pincodeTag: 'Pincode:',
    viewOnMapsBtn: 'Get Directions (Google Maps)',
    phoneLabel: 'Phone:',
    getSlipBtn: 'View My Slip',

    slipReadyBadge: 'Slip Ready (Completed)',
    slipReadyHeading: 'Your Anganwadi Slip is Ready',
    slipReadySubtitle: 'Take this slip to your nearest Anganwadi Centre or Health Sub-Centre',
    startNewChatBtn: 'Start New Conversation',

    soundwaveLabel: 'Soundwave',
    soundwaveSpeakPrompt: 'Keep speaking...',
    soundwaveListenPrompt: 'Tap button to pause',
    soundwaveIdlePrompt: 'Speak clearly into the microphone',

    quickPrompts: {
      tellMeAbout: 'Tell me about the scheme',
      howDoIGet: 'How do I get ₹5,000?',
      whichDocs: 'What documents do I need?',
    },
    greetingVoice: 'Namaste sister! I am Matru Sakhi. I will help you check and receive your government maternity benefit.',
    stepNarrations: {
      about: 'In the Matru Vandana scheme, you receive ₹5,000 to ₹6,000 directly in your bank account. Would you like to check if you qualify?',
      eligibility: 'Please tell me your current stage. Are you currently pregnant or has your baby already been born?',
      documents: 'These are the documents required when you visit the Anganwadi centre. Tick the ones you already have.',
      prepare: 'Fill in your name and pincode in the preparation slip to save time at the Anganwadi.',
      centre: 'Here is your nearest Anganwadi centre. Visit this centre and show your slip.',
      done: 'Your Anganwadi preparation slip is ready. Please write down this 6-digit code.',
    },
  },
};

export function getLanguageName(code: LanguageCode): string {
  switch (code) {
    case 'hi': return 'हिन्दी';
    case 'mr': return 'मराठी';
    case 'bn': return 'বাংলা';
    case 'ta': return 'தமிழ்';
    case 'te': return 'తెలుగు';
    case 'kn': return 'ಕನ್ನಡ';
    case 'en': return 'English';
  }
}
