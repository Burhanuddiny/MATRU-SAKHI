/**
 * Scheme Facts: Pradhan Mantri Matru Vandana Yojana (PMMVY)
 * Source: Ministry of Women and Child Development (WCD)
 * Official Portal: https://pmmvy.wcd.gov.in
 * Verified: 2026-10-01
 */

export interface SchemeMetadata {
  id: 'pmmvy';
  name: string;
  hindiName: string;
  officialPortal: string;
  lastVerified: string;
  sourceUrl: string;
  emergencyHelplines: {
    pmmvyHelpline: string;
    womenHelpline: string;
    nationalEmergency: string;
    healthHelpline: string;
  };
  benefits: {
    firstChildTotal: number;
    firstChildInstalments: { number: number; amount: number; condition: string }[];
    secondChildGirlTotal: number;
    secondChildInstalmentCondition: string;
  };
  eligibilityAge: {
    minYears: number;
    minMonths: number;
    maxYears: number;
  };
  maxDaysAfterBirth: number;
}

export const PMMVY_SCHEME: SchemeMetadata = {
  id: 'pmmvy',
  name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
  hindiName: 'प्रधानमंत्री मातृ वंदना योजना (PMMVY)',
  officialPortal: 'https://pmmvy.wcd.gov.in',
  lastVerified: '2026-10-01',
  sourceUrl: 'https://www.spniwcd.wcd.gov.in/pradhan-mantri-matru-vandana-yojna/faqs',
  emergencyHelplines: {
    pmmvyHelpline: '14445',
    womenHelpline: '181',
    nationalEmergency: '112',
    healthHelpline: '104',
  },
  benefits: {
    firstChildTotal: 5000,
    firstChildInstalments: [
      {
        number: 1,
        amount: 3000,
        condition: 'At registration of pregnancy and at least one ante-natal check-up (ANC) within 6 months of LMP',
      },
      {
        number: 2,
        amount: 2000,
        condition: 'After child birth registration and first cycle of vaccination within 14 weeks',
      },
    ],
    secondChildGirlTotal: 6000,
    secondChildInstalmentCondition:
      'Single instalment of ₹6,000 upon child birth registration and completed immunization if the baby is a girl',
  },
  eligibilityAge: {
    minYears: 18,
    minMonths: 7,
    maxYears: 55,
  },
  maxDaysAfterBirth: 270,
};

export interface QualifyingCategoryInfo {
  id: string;
  titleEn: string;
  titleHi: string;
  simpleDescription: string;
}

export const QUALIFYING_CATEGORIES: QualifyingCategoryInfo[] = [
  {
    id: 'ration_card',
    titleEn: 'Ration Card / NFSA / BPL',
    titleHi: 'राशन कार्ड (BPL या अंत्योदय)',
    simpleDescription: 'Ration card or BPL card for food grains',
  },
  {
    id: 'ayushman_pmjay',
    titleEn: 'Ayushman Bharat (PM-JAY)',
    titleHi: 'आयुष्मान भारत गोल्डन कार्ड (PM-JAY)',
    simpleDescription: 'Golden health card for free hospital treatment',
  },
  {
    id: 'eshram',
    titleEn: 'e-Shram Card',
    titleHi: 'ई-श्रम कार्ड (e-Shram)',
    simpleDescription: 'Worker registration card with 12-digit UAN',
  },
  {
    id: 'sc_st',
    titleEn: 'Scheduled Caste / Scheduled Tribe',
    titleHi: 'अनुसूचित जाति / जनजाति (SC/ST)',
    simpleDescription: 'SC or ST community certificate',
  },
  {
    id: 'mgnrega',
    titleEn: 'MGNREGA Job Card',
    titleHi: 'मनरेगा जॉब कार्ड (MGNREGA)',
    simpleDescription: 'Rural employment job card',
  },
  {
    id: 'kisan_samman',
    titleEn: 'Kisan Samman Nidhi Beneficiary',
    titleHi: 'किसान सम्मान निधि (PM-KISAN)',
    simpleDescription: 'Woman farmer receiving ₹6,000 yearly farmer aid',
  },
  {
    id: 'income_under_8lakh',
    titleEn: 'Family Income Under ₹8 Lakh/Year',
    titleHi: 'पारिवारिक वार्षिक आय 8 लाख से कम',
    simpleDescription: 'Self-declaration or income certificate under ₹8 lakh',
  },
  {
    id: 'disability',
    titleEn: '40% or more Disability (Divyangjan)',
    titleHi: 'दिव्यांगजन (40% या अधिक दिव्यांगता)',
    simpleDescription: 'Disability certificate or UDID card',
  },
  {
    id: 'anganwadi_asha',
    titleEn: 'Anganwadi Worker / Helper / ASHA',
    titleHi: 'आंगनवाड़ी कार्यकर्ता / सहायिका / आशा',
    simpleDescription: 'Serving as Anganwadi or ASHA field worker',
  },
];

export interface DocumentInfo {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  visualCue: string;
  isMandatory: boolean;
}

export const SCHEME_DOCUMENTS: DocumentInfo[] = [
  {
    id: 'aadhaar',
    titleEn: 'Mother’s Aadhaar Card',
    titleHi: 'माता का आधार कार्ड',
    descriptionEn: 'Government photo card with 12 digits',
    descriptionHi: 'सरकारी पहचान पत्र जिस पर फोटो और 12 अंकों का नंबर होता है',
    visualCue: 'White card with national emblem and photo',
    isMandatory: true,
  },
  {
    id: 'bank_passbook',
    titleEn: 'Bank or Post Office Passbook',
    titleHi: 'बैंक या पोस्ट ऑफिस की पासबुक',
    descriptionEn: 'Must be linked to mother’s Aadhaar for direct bank transfer',
    descriptionHi: 'माता के नाम की पासबुक जो आधार से जुड़ी हो, पैसा सीधे इसी खाते में आएगा',
    visualCue: 'Small passbook or account document showing name and IFSC',
    isMandatory: true,
  },
  {
    id: 'mcp_card',
    titleEn: 'Mother & Child Protection (MCP / RCHI) Card',
    titleHi: 'ममता कार्ड / मातृ एवं बाल सुरक्षा (MCP) कार्ड',
    descriptionEn: 'Issued by hospital or Anganwadi showing check-ups and vaccine dates',
    descriptionHi: 'अस्पताल या आंगनवाड़ी से मिला टीका और जांच वाला कार्ड',
    visualCue: 'Green or yellow printed booklet with health stamps',
    isMandatory: true,
  },
  {
    id: 'ration_card',
    titleEn: 'Qualifying Proof (e.g. Ration Card / e-Shram / PM-JAY)',
    titleHi: 'पात्रता प्रमाण पत्र (राशन कार्ड या ई-श्रम या PM-JAY)',
    descriptionEn: 'Any one of the qualifying government cards or certificates',
    descriptionHi: 'राशन कार्ड, ई-श्रम, या आयुष्मान कार्ड में से कोई एक',
    visualCue: 'Ration booklet or government scheme card',
    isMandatory: true,
  },
  {
    id: 'mobile_number',
    titleEn: 'Active Mobile Number',
    titleHi: 'चालू मोबाइल नंबर',
    descriptionEn: 'To receive OTP and installment SMS updates',
    descriptionHi: 'मैसेज और किस्त की जानकारी पाने के लिए घर का फोन',
    visualCue: 'Mobile phone',
    isMandatory: true,
  },
  {
    id: 'child_birth_certificate',
    titleEn: 'Child’s Birth Certificate (if already delivered)',
    titleHi: 'बच्चे का जन्म प्रमाण पत्र (यदि जन्म हो चुका है)',
    descriptionEn: 'Required for 2nd installment or second girl child claim',
    descriptionHi: 'जन्म के बाद नगर पालिका या पंचायत से जारी प्रमाण पत्र',
    visualCue: 'Official birth certificate document',
    isMandatory: false,
  },
];
