/**
 * DailyMaternityTip: Encouraging, daily rotating maternal health & PMMVY benefit tip
 * Features 1-tap voice audio narration in all 7 languages and day-based rotation.
 */

import React, { useState, useMemo } from 'react';
import { LanguageCode } from '../../shared/types.js';
import { speechHelper } from '../voice/speechHelper.js';
import {
  Sparkles,
  Volume2,
  VolumeX,
  RotateCw,
  Heart,
  ShieldCheck,
  Apple,
  Baby,
  Stethoscope,
  Coins,
  Droplets,
} from 'lucide-react';

interface DailyMaternityTipProps {
  language: LanguageCode;
  className?: string;
}

interface TipData {
  id: string;
  category: 'health' | 'benefit' | 'nutrition' | 'baby';
  categoryLabel: Record<LanguageCode, string>;
  title: Record<LanguageCode, string>;
  content: Record<LanguageCode, string>;
  audioNarration: Record<LanguageCode, string>;
}

const TIPS: TipData[] = [
  {
    id: 'ifa_nutrition',
    category: 'nutrition',
    categoryLabel: {
      hi: 'पोषण व स्वास्थ्य',
      mr: 'पोषण आणि आरोग्य',
      bn: 'পুষ্টি ও স্বাস্থ্য',
      ta: 'ஊட்டச்சத்து & சுகாதாரம்',
      te: 'పోషకాహారం & ఆరోగ్యం',
      kn: 'ಪೋಷಕಾಂಶ ಮತ್ತು ಆರೋಗ್ಯ',
      en: 'Nutrition & Health',
    },
    title: {
      hi: 'हरी सब्जियाँ और आयरन की गोली',
      mr: 'हिरव्या पालेभाज्या आणि लोहाच्या गोळ्या',
      bn: 'সবুজ শাকসবজি ও আয়রন ট্যাবলেট',
      ta: 'பச்சை காய்கறிகள் & இரும்புச்சத்து மாத்திரை',
      te: 'ఆకుకూరలు మరియు ఐరన్ మాత్రలు',
      kn: 'ಹಸಿರು ತರಕಾರಿಗಳು ಮತ್ತು ಕಬ್ಬಿಣದ ಮಾತ್ರೆಗಳು',
      en: 'Green Leafy Vegetables & Iron Tablets',
    },
    content: {
      hi: 'गर्भावस्था में रोज दाल, हरी सब्जियाँ और गुड़ खाएं। आशा दीदी से मिली आयरन की गोली रोज नींबू पानी के साथ लें ताकि खून की कमी न हो।',
      mr: 'गरोदरपणात दररोज डाळी, पालेभाज्या आणि गूळ खा. आशा ताईंनी दिलेल्या लोहाच्या गोळ्या नियमित घ्या.',
      bn: 'গর্ভাবস্থায় প্রতিদিন ডাল, সবুজ শাকসবজি ও গুড় খান। রক্তাল্পতা দূর করতে নিয়মিত আয়রন ট্যাবলেট নিন।',
      ta: 'கர்ப்ப காலத்தில் கீரைகள், பருப்பு மற்றும் வெல்லம் சாப்பிடுங்கள். ஆஷா பணியாளர் தரும் இரும்பு மாத்திரையை தவறாமல் உட்கொள்ளுங்கள்.',
      te: 'గర్భధారణ సమయంలో పప్పులు, ఆకుకూరలు మరియు బెల్లం తినండి. రక్తహీనత నివారణకు ఐరన్ మాత్రలు క్రమం తప్పకుండా తీసుకోండి.',
      kn: 'ಗರ್ಭಾವಸ್ಥೆಯಲ್ಲಿ ಪ್ರತಿದಿನ ಸೊಪ್ಪು ಮತ್ತು ಬೆಲ್ಲ ಸೇವಿಸಿ. ರಕ್ತಹೀನತೆ ತಡೆಯಲು ಐರನ್ ಮಾತ್ರೆಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ತೆಗೆದುಕೊಳ್ಳಿ.',
      en: 'Eat green leafy vegetables, lentils, and jaggery daily. Take your government Iron-Folic Acid tablets with water to keep your hemoglobin healthy.',
    },
    audioNarration: {
      hi: 'आज का मातृत्व सुझाव: गर्भावस्था में रोज दाल, हरी सब्जियाँ और गुड़ खाएं। आशा दीदी से मिली आयरन की गोली रोज लें ताकि खून की कमी न हो।',
      mr: 'आजचा सल्ला: गरोदरपणात दररोज डाळी, पालेभाज्या आणि गूळ खा. आशा ताईंनी दिलेल्या लोहाच्या गोळ्या नियमित घ्या.',
      bn: 'আজকের পরামর্শ: গর্ভাবস্থায় সবুজ শাকসবজি ও গুড় খান। নিয়মিত আয়রন ট্যাবলেট সেবন করুন।',
      ta: 'இன்றைய குறிப்பு: கர்ப்ப காலத்தில் கீரைகள் மற்றும் சத்தான உணவுகளை சாப்பிடுங்கள். இரும்பு மாத்திரையை தவறாமல் உட்கொள்ளுங்கள்.',
      te: 'నేటి సలహా: గర్భధారణ సమయంలో ఆకుకూరలు తినండి మరియు ఐరన్ మాత్రలు క్రమం తప్పకుండా తీసుకోండి.',
      kn: 'ಇಂದಿನ ಸಲಹೆ: ಗರ್ಭಾವಸ್ಥೆಯಲ್ಲಿ ಹಸಿರು ಸೊಪ್ಪುಗಳನ್ನು ತಿನ್ನಿ ಮತ್ತು ಐರನ್ ಮಾತ್ರೆಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಸೇವಿಸಿ.',
      en: "Today's Maternity Tip: Eat green leafy vegetables and lentils daily. Take your government Iron-Folic Acid tablets to prevent anemia and stay energized.",
    },
  },
  {
    id: 'anc_registration',
    category: 'benefit',
    categoryLabel: {
      hi: 'योजना लाभ व जाँच',
      mr: 'योजना लाभ व तपासणी',
      bn: 'যোজনা ও ডাক্তার যাচাই',
      ta: 'திட்ட உதவி & பரிசோதனை',
      te: 'పథకం & పరీక్ష',
      kn: 'ಯೋಜನೆ ಮತ್ತು ತಪಾಸಣೆ',
      en: 'PMMVY Benefit & ANC',
    },
    title: {
      hi: 'पहली जाँच पर मिलते हैं ₹3,000',
      mr: 'पहिल्या तपासणीवर मिळतात ₹३,०००',
      bn: 'প্রথম ডাক্তার যাচাইয়ে পাবেন ₹৩,০০০',
      ta: 'முதல் பரிசோதனையில் ₹3,000 உதவி',
      te: 'మొదటి పరీక్షలో ₹3,000 సహాయం',
      kn: 'ಮೊದಲ ತಪಾಸಣೆಗೆ ₹3,000 ನೆರವು',
      en: 'Receive ₹3,000 on First ANC Checkup',
    },
    content: {
      hi: 'गर्भधारण के 6 महीने के भीतर आंगनवाड़ी में नाम दर्ज कराएं और पहली डॉक्टर जाँच कराएं। इससे आपके बैंक खाते में ₹3,000 की पहली किस्त सीधे आ जाएगी।',
      mr: 'गरोदरपणाच्या ६ महिन्यांच्या आत अंगणवाडीत नोंदणी करा आणि पहिली तपासणी पूर्ण करून ₹३,००० मिळवा.',
      bn: 'গর্ভধারণের ৬ মাসের মধ্যে অঙ্গনওয়াড়িতে নাম নথিভুক্ত করুন এবং প্রথম ডাক্তার যাচাই করে ₹৩,০০০ এর প্রথম কিস্তি পান।',
      ta: 'கர்ப்பத்தின் 6 மாதங்களுக்குள் அங்கன்வாடியில் பதிவு செய்து முதல் பரிசோதனை முடித்தால் ₹3,000 உங்கள் வங்கிக் கணக்கில் வரும்.',
      te: 'గర్భం దాల్చిన 6 నెలల్లోపు అంగన్‌వాడీలో నమోదు చేసుకుని మొదటి వైద్య పరీక్ష పూర్తి చేసి ₹3,000 మొదటి విడత పొందండి.',
      kn: 'ಗರ್ಭಧಾರಣೆಯ 6 ತಿಂಗಳೊಳಗೆ ಅಂಗನವಾಡಿಯಲ್ಲಿ ನೋಂದಾಯಿಸಿ ಮೊದಲ ತಪಾಸಣೆ ಮುಗಿಸಿ ₹3,000 ಮೊದಲ ಕಂತನ್ನು ಪಡೆಯಿರಿ.',
      en: 'Register your pregnancy at your local Anganwadi within 6 months and complete your 1st Antenatal Checkup to claim your first ₹3,000 PMMVY instalment.',
    },
    audioNarration: {
      hi: 'आज का सुझाव: गर्भधारण के 6 महीने के भीतर आंगनवाड़ी में नाम दर्ज कराएं और पहली डॉक्टर जाँच कराएं, जिससे ₹3,000 की पहली किस्त सीधे आपके खाते में आए।',
      mr: 'आजचा सल्ला: ६ महिन्यांच्या आत अंगणवाडीत नोंदणी करा आणि ₹३,००० ची पहिली किस्त मिळवा.',
      bn: 'আজকের পরামর্শ: অঙ্গনওয়াড়িতে নাম নথিভুক্ত করে প্রথম ডাক্তার যাচাই করান এবং ₹৩,০০০ প্রথম কিস্তি সরাসরি পান।',
      ta: 'இன்றைய குறிப்பு: அங்கன்வாடியில் பதிவு செய்து முதல் பரிசோதனை முடித்தால் ₹3,000 உதவித்தொகை நேரடியாக வங்கிக்கு வரும்.',
      te: 'నేటి సలహా: అంగన్‌వాడీలో నమోదు చేసుకుని మొదటి వైద్య పరీక్ష చేయించుకోండి మరియు ₹3,000 పొందండి.',
      kn: 'ಇಂದಿನ ಸಲಹೆ: ಅಂಗನವಾಡಿಯಲ್ಲಿ ನೋಂದಾಯಿಸಿ ಮೊದಲ ತಪಾಸಣೆ ಮಾಡಿಸಿ ₹3,000 ಮೊದಲ ಕಂತನ್ನು ಪಡೆಯಿರಿ.',
      en: "Today's Tip: Register at your nearest Anganwadi within 6 months and complete your first ANC to receive your first ₹3,000 direct bank transfer.",
    },
  },
  {
    id: 'aadhaar_bank',
    category: 'benefit',
    categoryLabel: {
      hi: 'सीधा बैंक अंतरण',
      mr: 'थेट बँक खात्यात',
      bn: 'সরাসরি ব্যাংক অ্যাকাউন্ট',
      ta: 'நேரடி வங்கி உதவி',
      te: 'నేరుగా బ్యాంక్ ఖాతా',
      kn: 'ನೇರ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ',
      en: 'Direct Bank Transfer',
    },
    title: {
      hi: 'बैंक खाते को आधार से जोड़कर रखें',
      mr: 'बँक खाते आधारशी जोडून ठेवा',
      bn: 'ব্যাংক অ্যাকাউন্টে আধার যুক্ত রাখুন',
      ta: 'வங்கி கணக்கில் ஆதார் இணைக்கவும்',
      te: 'బ్యాంక్ ఖాతాను ఆధార్‌తో లింక్ చేయండి',
      kn: 'ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ ಲಿಂಕ್ ಮಾಡಿ',
      en: 'Keep Your Bank Account Aadhaar-Seeded',
    },
    content: {
      hi: 'मातृ वंदना योजना के पूरे ₹5,000 से ₹6,000 सीधे आपके नाम के बैंक खाते में बिना किसी बिचौलिए के आते हैं। बैंक जाकर NPCI मैपिंग अवश्य कराएं।',
      mr: 'मातृ वंदना योजनेचे पैसे थेट तुमच्या आधार लिंक बँक खात्यात येतात. आपले खाते सक्रिय ठेवा.',
      bn: 'মাতৃ বন্দনা যোজনার টাকা সরাসরি আপনার আধার যুক্ত ব্যাংক একাউন্টে জমা হয়। ব্যাংকে আধার লিঙ্ক নিশ্চিত করুন।',
      ta: 'திட்டத்தின் முழு தொகையும் உங்கள் சொந்த ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கில் நேரடியாக டெபாசிட் செய்யப்படும்.',
      te: 'మాతృ వందన యోజన నిధులు నేరుగా మీ ఆధార్ లింక్ అయిన బ్యాంక్ ఖాతాలో జమ అవుతాయి.',
      kn: 'ಮಾತೃ ವಂದನಾ ಯೋಜನೆಯ ಹಣವು ನೇರವಾಗಿ ನಿಮ್ಮ ಆಧಾರ್ ಜೋಡಿಸಿದ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆಯಾಗುತ್ತದೆ.',
      en: 'Government maternity aid is credited directly to your Aadhaar-linked bank account without middlemen. Ensure your account has NPCI mapping active.',
    },
    audioNarration: {
      hi: 'आज का सुझाव: सरकारी मातृत्व सहायता सीधे आपके आधार से जुड़े बैंक खाते में आती है। अपने बैंक में जाकर आधार लिंक अवश्य कराएं।',
      mr: 'आजचा सल्ला: योजनेचे पैसे थेट तुमच्या आधार लिंक बँक खात्यात येतात. आपले बँक खाते आधारशी जोडून घ्या.',
      bn: 'আজকের পরামর্শ: সরকারি সহায়তা সরাসরি আপনার আধার যুক্ত ব্যাংক একাউন্টে জমা হয়। ব্যাংকে আধার লিঙ্ক করিয়ে নিন।',
      ta: 'இன்றைய குறிப்பு: அரசு உதவித்தொகை நேரடியாக உங்கள் ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கிற்கு வரும். ஆதார் இணைப்பை உறுதி செய்யுங்கள்.',
      te: 'నేటి సలహా: ప్రభుత్వ సహాయం నేరుగా మీ ఆధార్ లింక్ అయిన బ్యాంక్ ఖాతాకు వస్తుంది.',
      kn: 'ಇಂದಿನ ಸಲಹೆ: ಸರ್ಕಾರದ ಸಹಾಯಧನ ನೇರವಾಗಿ ನಿಮ್ಮ ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಬರುತ್ತದೆ.',
      en: "Today's Tip: Government maternity assistance is sent directly to your Aadhaar-linked bank account. Keep your bank account active.",
    },
  },
  {
    id: 'colostrum_breastfeeding',
    category: 'baby',
    categoryLabel: {
      hi: 'शिशु स्वास्थ्य',
      mr: 'बाळाचे आरोग्य',
      bn: 'শিশুর স্বাস্থ্য',
      ta: 'குழந்தை நலம்',
      te: 'శిశు ఆరోగ్యం',
      kn: 'ಮಗುವಿನ ಆರೋಗ್ಯ',
      en: 'Newborn Care',
    },
    title: {
      hi: 'जन्म के पहले घंटे में माँ का पहला दूध',
      mr: 'जन्मानंतर पहिल्या तासात आईचे पहिले दूध',
      bn: 'জন্মের প্রথম ঘণ্টায় মায়ের প্রথম শালদুধ',
      ta: 'பிறந்த முதல் மணிநேரத்தில் தாய்ப்பால்',
      te: 'పుట్టిన మొదటి గంటలో తల్లి పాలు',
      kn: 'ಜನಿಸಿದ ಮೊದಲ ಗಂಟೆಯಲ್ಲಿ ತಾಯಿಯ ಹಾಲು',
      en: 'Golden Hour: Mother’s First Milk (Colostrum)',
    },
    content: {
      hi: 'जन्म के तुरंत बाद 1 घंटे के भीतर शिशु को माँ का पहला पीला गाढ़ा दूध (कोलोस्ट्रम) जरूर पिलाएं। यह बच्चे का पहला प्राकृतिक टीका है।',
      mr: 'जन्मानंतर लगेच १ तासाच्या आत बाळाला आईचे पहिले दूध (चीक दूध) पाजा. यामुळे बाळाची प्रतिकारशक्ती वाढते.',
      bn: 'জন্মের ১ ঘণ্টার মধ্যে শিশুকে মায়ের প্রথম শালদুধ খাওয়ান। এটি শিশুর রোগ প্রতিরোধ ক্ষমতা বাড়াতে সবচেয়ে উপকারী।',
      ta: 'பிறந்த 1 மணி நேரத்திற்குள் குழந்தைக்கு தாயின் முதல் சீம்பாலை கொடுங்கள். இது குழந்தைக்கு முதல் இயற்கை தடுப்பூசியாகும்.',
      te: 'పుట్టిన 1 గంటలోపు శిశువుకు తల్లి ముర్రుపాలు పట్టించండి. ఇది బిడ్డకు మొదటి సహజ రోగనిరోధక శక్తిని ఇస్తుంది.',
      kn: 'ಜನಿಸಿದ 1 ಗಂಟೆಯೊಳಗೆ ಮಗುವಿಗೆ ತಾಯಿಯ ಮೊದಲ ಹಾಲನ್ನು ಕುಡಿಸಿ. ಇದು ಮಗುವಿನ ಮೊದಲ ನೈಸರ್ಗಿಕ ಲಸಿಕೆಯಾಗಿದೆ.',
      en: 'Initiate breastfeeding within the first golden hour after birth. Colostrum (first yellow milk) acts as the baby’s first natural immunization.',
    },
    audioNarration: {
      hi: 'आज का सुझाव: जन्म के पहले एक घंटे में शिशु को माँ का पहला पीला गाढ़ा दूध अवश्य पिलाएं। यह बच्चे के लिए पहला सुरक्षा कवच है।',
      mr: 'आजचा सल्ला: जन्मानंतर पहिल्या तासात बाळाला आईचे पहिले दूध पाजा. हे बाळाचे पहिले नैसर्गिक संरक्षण आहे.',
      bn: 'আজকের পরামর্শ: জন্মের এক ঘণ্টার মধ্যে শিশুকে মায়ের প্রথম শালদুধ খাওয়ান। এটি শিশুর সুরক্ষার চাবিকাঠি।',
      ta: 'இன்றைய குறிப்பு: பிறந்த முதல் மணிநேரத்தில் குழந்தைக்கு சீம்பால் கொடுங்கள். இது இயற்கையான பாதுகாப்பு.',
      te: 'నేటి సలహా: పుట్టిన మొదటి గంటలో తల్లి మొదటి పాలు పట్టించండి.',
      kn: 'ಇಂದಿನ ಸಲಹೆ: ಜನಿಸಿದ ಮೊದಲ ಗಂಟೆಯಲ್ಲಿ ಮಗುವಿಗೆ ತಾಯಿಯ ಮೊದಲ ಹಾಲನ್ನು ಕುಡಿಸಿ.',
      en: "Today's Tip: Breastfeed within the first hour of birth. The mother's first milk protects your newborn from infections and illnesses.",
    },
  },
  {
    id: 'vaccination_instalment',
    category: 'baby',
    categoryLabel: {
      hi: 'टीकाकरण व दूसरी किस्त',
      mr: 'लसीकरण व दुसरी किस्त',
      bn: 'টিকাদান ও দ্বিতীয় কিস্তি',
      ta: 'தடுப்பூசி & 2வது உதவி',
      te: 'టీకాలు & రెండవ విడత',
      kn: 'ಲಸಿಕೆ ಮತ್ತು 2ನೇ ಕಂತು',
      en: 'Immunization & 2nd Instalment',
    },
    title: {
      hi: '14 सप्ताह के टीके और ₹2,000 की किस्त',
      mr: '१४ आठवड्यांचे लसीकरण आणि ₹२,००० ची किस्त',
      bn: '১৪ সপ্তাহের টিকা ও ₹২,০০০ কিস্তি',
      ta: '14 வார தடுப்பூசிகள் & ₹2,000 உதவி',
      te: '14 వారాల టీకాలు మరియు ₹2,000 విడత',
      kn: '14 ವಾರಗಳ ಲಸಿಕೆ ಮತ್ತು ₹2,000 ಕಂತು',
      en: 'Complete 14-Week Vaccines for ₹2,000',
    },
    content: {
      hi: 'शिशु के जन्म पंजीकरण के बाद 14 सप्ताह तक के सभी प्राथमिक टीके (BCG, OPV, पेंटावेलेंट) लगवाएं। इससे बच्चे का स्वास्थ्य सुरक्षित होगा और ₹2,000 मिलेंगे।',
      mr: 'बाळाच्या जन्मानंतर १४ आठवड्यांचे सर्व प्राथमिक डोस पूर्ण करा आणि ₹२,००० ची दुसरी किस्त मिळवा.',
      bn: 'শিশুর জন্ম নিবন্ধনের পর ১৪ সপ্তাহ পর্যন্ত সমস্ত টিকা সম্পন্ন করুন এবং ₹২,০০০ এর দ্বিতীয় কিস্তি পান।',
      ta: 'குழந்தை பிறப்பு பதிவு செய்து 14 வார தடுப்பூசிகளை முடித்தவுடன் ₹2,000 இரண்டாவது உதவித்தொகை கிடைக்கும்.',
      te: 'శిశువు జనన నమోదు తర్వాత 14 వారాల టీకాలు వేయించి ₹2,000 రెండవ విడత సహాయం పొందండి.',
      kn: 'ಮಗುವಿನ ಜನನ ನೋಂದಣಿ ನಂತರ 14 ವಾರಗಳ ಲಸಿಕೆಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ ₹2,000 ಎರಡನೇ ಕಂತನ್ನು ಪಡೆಯಿರಿ.',
      en: 'Complete your child’s birth registration and 14-week primary immunization cycle (BCG, OPV, Pentavalent) to receive your ₹2,000 PMMVY 2nd instalment.',
    },
    audioNarration: {
      hi: 'आज का सुझाव: शिशु के 14 सप्ताह तक के सभी प्राथमिक टीके समय पर लगवाएं, जिससे बच्चा स्वस्थ रहे और ₹2,000 की दूसरी किस्त मिले।',
      mr: 'आजचा सल्ला: बाळाचे १४ आठवड्यांचे सर्व प्राथमिक लसीकरण वेळेवर पूर्ण करा आणि ₹२,००० मिळवा.',
      bn: 'আজকের পরামর্শ: শিশুর ১৪ সপ্তাহের সমস্ত টিকা সম্পন্ন করে দ্বিতীয় কিস্তি ₹২,০০০ পান।',
      ta: 'இன்றைய குறிப்பு: குழந்தையின் 14 வார தடுப்பூசிகளை முடித்து ₹2,000 இரண்டாவது உதவித்தொகையை பெறுங்கள்.',
      te: 'నేటి సలహా: శిశువుకు 14 వారాల టీకాలు వేయించి ₹2,000 రెండవ విడత పొందండి.',
      kn: 'ಇಂದಿನ ಸಲಹೆ: ಮಗುವಿಗೆ 14 ವಾರಗಳ ಲಸಿಕೆಗಳನ್ನು ಕೊಡಿಸಿ ₹2,000 ಎರಡನೇ ಕಂತನ್ನು ಪಡೆಯಿರಿ.',
      en: "Today's Tip: Complete 14-week infant immunization to protect your baby and claim the second ₹2,000 government instalment.",
    },
  },
  {
    id: 'rest_water',
    category: 'health',
    categoryLabel: {
      hi: 'मातृ स्वास्थ्य',
      mr: 'आईचे आरोग्य',
      bn: 'মায়ের যত্ন',
      ta: 'தாயின் நலம்',
      te: 'తల్లి ఆరోగ్యం',
      kn: 'ತಾಯಿಯ ಆರೈಕೆ',
      en: 'Maternal Care',
    },
    title: {
      hi: 'खूब पानी पिएं और बाईं करवट सोएं',
      mr: 'भरपूर पाणी प्या आणि डाव्या कुशीवर झोपा',
      bn: 'প্রচুর জল পান করুন ও বাম পাশ ফিরে ঘুমান',
      ta: 'அதிக தண்ணீர் குடிக்கவும் மற்றும் இடதுபுறமாக படுக்கவும்',
      te: 'ఎక్కువ నీరు త్రాగండి మరియు ఎడమవైపు పడుకోండి',
      kn: 'ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಎಡ ಮಗ್ಗುಲಲ್ಲಿ ಮಲಗಿ',
      en: 'Stay Hydrated & Rest on Your Left Side',
    },
    content: {
      hi: 'दिन भर में 8 से 10 गिलास साफ पानी या नारियल पानी पिएं। रात में बाईं करवट सोने से गर्भ में पल रहे शिशु तक रक्त और ऑक्सीजन भरपूर पहुँचता है।',
      mr: 'दिवसभरात ८ ते १० ग्लास पाणी प्या. डाव्या कुशीवर झोपल्याने गर्भातील बाळाला भरपूर रक्तपुरवठा मिळतो.',
      bn: 'সারাদিনে ৮-১০ গ্লাস বিশুদ্ধ জল পান করুন। বাম পাশ ফিরে শুলে গর্ভের শিশুর কাছে অক্সিজেন ও রক্ত সঠিকভাবে পৌঁছায়।',
      ta: 'தினமும் 8 முதல் 10 டம்ளர் சுத்தமான தண்ணீர் குடியுங்கள். இடதுபுறமாக படுப்பது கருவில் உள்ள குழந்தைக்கு நல்ல ரத்த ஓட்டத்தை தரும்.',
      te: 'రోజుకు 8 నుండి 10 గ్లాసుల నీరు త్రాగండి. ఎడమవైపు తిరిగి పడుకోవడం వల్ల బిడ్డకు మంచి రక్త ప్రసరణ అందుతుంది.',
      kn: 'ದಿನಕ್ಕೆ 8 ರಿಂದ 10 ಗ್ಲಾಸ್ ನೀರು ಕುಡಿಯಿರಿ. ಎಡ ಮಗ್ಗುಲಲ್ಲಿ ಮಲಗುವುದರಿಂದ ಗರ್ಭದಲ್ಲಿರುವ ಮಗುವಿಗೆ ರಕ್ತ ಸಂಚಾರ ಚೆನ್ನಾಗಿರುತ್ತದೆ.',
      en: 'Drink 8 to 10 glasses of clean water daily. Resting on your left side improves blood and oxygen circulation to your growing baby.',
    },
    audioNarration: {
      hi: 'आज का सुझाव: दिन भर में 8 से 10 गिलास पानी पिएं और बाईं करवट सोएं, जिससे शिशु को भरपूर पोषण और ऑक्सीजन मिले।',
      mr: 'आजचा सल्ला: भरपूर पाणी प्या आणि डाव्या कुशीवर झोपा.',
      bn: 'আজকের পরামর্শ: দিনে ৮-১০ গ্লাস জল পান করুন এবং বাম পাশে শুয়ে বিশ্রাম নিন।',
      ta: 'இன்றைய குறிப்பு: தினமும் போதுமான தண்ணீர் குடியுங்கள் மற்றும் இடதுபுறமாக படுத்து ஓய்வெடுங்கள்.',
      te: 'నేటి సలహా: తగినంత నీరు త్రాగండి మరియు ఎడమవైపు పడుకోండి.',
      kn: 'ಇಂದಿನ ಸಲಹೆ: ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಎಡ ಮಗ್ಗುಲಲ್ಲಿ ಮಲಗಿ.',
      en: "Today's Tip: Stay well-hydrated with 8-10 glasses of clean water and rest on your left side to boost circulation to your baby.",
    },
  },
];

const CATEGORY_ICONS = {
  health: Stethoscope,
  benefit: Coins,
  nutrition: Apple,
  baby: Baby,
};

export const DailyMaternityTip: React.FC<DailyMaternityTipProps> = ({
  language,
  className = '',
}) => {
  // Deterministic daily index based on current calendar date
  const dayOfYear = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }, []);

  const [offset, setOffset] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeIndex = (dayOfYear + offset) % TIPS.length;
  const tip = TIPS[activeIndex];

  const IconComponent = CATEGORY_ICONS[tip.category] || Heart;

  const handleNextTip = () => {
    speechHelper.stopSpeaking();
    setIsPlayingAudio(false);
    setOffset((prev) => prev + 1);
  };

  const handleSpeakTip = () => {
    if (isPlayingAudio) {
      speechHelper.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    const narration = tip.audioNarration[language] || tip.audioNarration.hi;
    speechHelper.unlockAudio(true);
    setIsPlayingAudio(true);
    speechHelper.speak(
      narration,
      language,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  return (
    <aside
      aria-label="Daily Maternity Tip"
      className={`w-full max-w-md mx-auto text-left relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1122]/95 via-[#1d0b17]/95 to-[#12050e] border border-amber-500/30 p-4 sm:p-5 shadow-xl shadow-black/40 transition-all animate-slide-up-fade ${className}`}
    >
      {/* Background Soft Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Badge & Controls */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="inline-flex items-center gap-1.5 bg-amber-950/70 border border-amber-500/30 px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {language === 'en' ? "Today's Maternity Tip" : 'आज का मातृत्व सुझाव'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Audio Readout Button */}
          <button
            onClick={handleSpeakTip}
            type="button"
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                : 'bg-black/30 hover:bg-black/50 border-amber-500/25 text-amber-300 hover:text-white'
            }`}
            title={isPlayingAudio ? 'Stop Voice' : 'Listen Aloud (बोलकर सुनें)'}
            aria-label="Listen to daily tip"
          >
            {isPlayingAudio ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Shuffle / Next Tip Button */}
          <button
            onClick={handleNextTip}
            type="button"
            className="p-1.5 rounded-xl bg-black/30 hover:bg-black/50 border border-amber-500/25 text-amber-300 hover:text-white transition-all cursor-pointer active:scale-95"
            title={language === 'en' ? 'Next Tip' : 'अगला सुझाव देखें'}
            aria-label="View next tip"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tip Card Body with gentle key-based transition on shuffle */}
      <div key={tip.id} className="flex items-start gap-3 mt-1 animate-slide-up-fade">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-rose-900/40 ring-1 ring-amber-300/40">
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-300 bg-rose-950/50 px-2 py-0.5 rounded-md border border-rose-500/20">
              {tip.categoryLabel[language]}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-amber-100 font-serif-cinematic leading-snug">
            {tip.title[language]}
          </h3>

          <p className="text-xs text-amber-200/85 leading-relaxed pt-0.5">
            {tip.content[language]}
          </p>
        </div>
      </div>
    </aside>
  );
};
