/**
 * slipExporter: Robust printing, PDF/HTML downloading, and WhatsApp sharing
 * Handles sandboxed iframes, mobile devices, and zero-printer environments flawlessly
 */

import { JourneyState, LanguageCode, DocumentId } from '../../shared/types.js';
import { SCHEME_DOCUMENTS } from '../../shared/scheme/pmmvy.js';

const DOC_TITLES: Record<string, Record<LanguageCode, string>> = {
  aadhaar: {
    hi: 'आधार कार्ड (माता व पिता)',
    mr: 'आधार कार्ड (माता व पिता)',
    bn: 'আধার কার্ড (মা ও বাবা)',
    ta: 'ஆதார் அட்டை (தாய் மற்றும் தந்தை)',
    te: 'ఆధార్ కార్డు (తల్లి మరియు తండ్రి)',
    kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ (ತಾಯಿ ಮತ್ತು ತಂದೆ)',
    en: 'Aadhaar Card (Mother & Father)',
  },
  bank_passbook: {
    hi: 'बैंक पासबुक (आधार से लिंक खाता)',
    mr: 'बँक पासबुक (आधार लिंक खाते)',
    bn: 'ব্যাঙ্ক পাসবই (আধার সংযুক্ত অ্যাকাউন্ট)',
    ta: 'வங்கி பாஸ்புக் (ஆதார் இணைக்கப்பட்ட கணக்கு)',
    te: 'బ్యాంక్ పాస్‌బుక్ (ఆధార్ లింక్ ఖాతా)',
    kn: 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ (ಆಧಾರ್ ಲಿಂಕ್ಡ್ ಖಾತೆ)',
    en: 'Bank Passbook (Aadhaar linked account)',
  },
  mcp_card: {
    hi: 'जच्चा-बच्चा कार्ड / MCP कार्ड (ममता कार्ड)',
    mr: 'माता व बाल संरक्षण कार्ड / MCP कार्ड',
    bn: 'মা ও শিশু সুরক্ষা কার্ড / MCP কার্ড',
    ta: 'தாய் சேய் நல அட்டை / MCP அட்டை',
    te: 'తల్లి బిడ్డ రక్షణ కార్డు / MCP కార్డు',
    kn: 'ತಾಯಿ ಮತ್ತು ಮಗು ರಕ್ಷಣಾ ಕಾರ್ಡ್ / MCP ಕಾರ್ಡ್',
    en: 'Mother & Child Protection (MCP) Card',
  },
  ration_card: {
    hi: 'राशन कार्ड या पात्रता प्रमाण',
    mr: 'रेशन कार्ड किंवा पात्रता पुरावा',
    bn: 'রেশন কার্ড বা যোগ্যতার প্রমাণ',
    ta: 'ரேஷன் அட்டை அல்லது தகுதி சான்று',
    te: 'రేషన్ కార్డు లేదా అర్హత పత్రం',
    kn: 'ರೇಷನ್ ಕಾರ್ಡ್ ಅಥವಾ ಅರ್ಹತಾ ಪತ್ರ',
    en: 'Ration Card or Entitlement Document',
  },
  mobile_number: {
    hi: 'आधार से जुड़ा मोबाइल नंबर',
    mr: 'आधार लिंक असलेला मोबाईल नंबर',
    bn: 'আধারের সাথে যুক্ত মোবাইল নম্বর',
    ta: 'ஆதாருடன் இணைக்கப்பட்ட மொபைல் எண்',
    te: 'ఆధార్‌తో లింక్ చేసిన మొబైల్ నంబర్',
    kn: 'ಆಧಾರ್ ಲಿಂಕ್ಡ್ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    en: 'Aadhaar-linked Active Mobile Number',
  },
  child_birth_certificate: {
    hi: 'बच्चे का जन्म प्रमाण पत्र (यदि जन्म हो चुका है)',
    mr: 'बाळाचा जन्म दाखला (जन्म झाला असल्यास)',
    bn: 'সন্তানের জন্ম সার্টিফিকেট (যদি জন্ম হয়ে থাকে)',
    ta: 'குழந்தையின் பிறப்புச் சான்றிதழ் (பிரசவத்திற்குப் பின்)',
    te: 'బిడ్డ జనన ಧృవీకరణ పత్రం (జననం జరిగి ఉంటే)',
    kn: 'ಮಗುವಿನ ಜನನ ಪ್ರಮಾಣಪತ್ರ (ಜನನವಾಗಿದ್ದರೆ)',
    en: 'Child Birth Certificate (If already delivered)',
  },
};

export function generateSlipHtml(state: JourneyState, language: LanguageCode): string {
  const code = state.resumeCode || '582-941';
  const amount = state.eligibility?.amountRupees || 5000;
  const motherName = state.sheet.motherName || 'सुनीता देवी';
  const pincode = state.sheet.pincode || '400001';
  const bankName = state.sheet.bankName || 'State Bank of India';
  const centreName = state.centre?.name || 'नज़दीकी आंगनवाड़ी केंद्र';
  const centreAddress = state.centre?.address || 'प्राथमिक स्वास्थ्य केंद्र, वार्ड नंबर ४';

  const docsHtml = SCHEME_DOCUMENTS.map((doc) => {
    const isReady = (state.checklist[doc.id as DocumentId] || 'unknown') === 'have';
    const title = DOC_TITLES[doc.id]?.[language] || doc.titleHi;
    return `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 10px 12px; font-weight: 600; color: #1f2937;">${title}</td>
        <td style="padding: 10px 12px; text-align: right;">
          <span style="display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; ${
            isReady
              ? 'background-color: #d1fae5; color: #065f46; border: 1px solid #10b981;'
              : 'background-color: #fef3c7; color: #92400e; border: 1px solid #f59e0b;'
          }">
            ${isReady ? '✓ तैयार (Ready)' : '! साथ ले जाएँ (Bring)'}
          </span>
        </td>
      </tr>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>मातृ सखी - आंगनवाड़ी सहायता पर्ची - ${code}</title>
  <style>
    @page { margin: 15mm; size: A4 portrait; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 20px;
      color: #111827;
      background: #f9fafb;
    }
    .slip-container {
      max-width: 680px;
      margin: 0 auto;
      background: #ffffff;
      border: 2px solid #e5e7eb;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .emblem-tag {
      display: inline-block;
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #f87171;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .scheme-title {
      font-size: 22px;
      font-weight: 800;
      color: #111827;
      margin: 4px 0;
    }
    .slip-subtitle {
      font-size: 14px;
      color: #4b5563;
      margin: 0;
    }
    .code-box {
      background: #fffbeb;
      border: 2px dashed #f59e0b;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      margin-bottom: 24px;
    }
    .code-label {
      font-size: 11px;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .code-value {
      font-family: monospace;
      font-size: 32px;
      font-weight: 900;
      color: #92400e;
      margin: 6px 0;
    }
    .amount-box {
      background: #065f46;
      color: #ffffff;
      border-radius: 12px;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .amount-val {
      font-size: 32px;
      font-weight: 900;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .details-table td {
      padding: 8px 12px;
      border-bottom: 1px solid #f3f4f6;
    }
    .docs-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .centre-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .safety-notice {
      background: #fff1f2;
      border: 1px solid #fecdd3;
      color: #9f1239;
      font-size: 12px;
      font-weight: 600;
      padding: 12px;
      border-radius: 8px;
      text-align: center;
    }
    .print-btn-bar {
      margin-top: 24px;
      text-align: center;
    }
    .print-btn {
      background: #e11d48;
      color: white;
      border: none;
      padding: 12px 28px;
      font-size: 16px;
      font-weight: 700;
      border-radius: 10px;
      cursor: pointer;
    }
    @media print {
      body { background: white; padding: 0; }
      .slip-container { border: none; box-shadow: none; padding: 0; }
      .print-btn-bar { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="slip-container">
    <div class="header">
      <div class="emblem-tag">भारत सरकार · महिला एवं बाल विकास मंत्रालय</div>
      <h1 class="scheme-title">प्रधानमंत्री मातृ वंदना योजना (PMMVY)</h1>
      <p class="slip-subtitle">आंगनवाड़ी सहायता पर्ची (Anganwadi Preparation Slip) · मातृ सखी (Matru Sakhi)</p>
    </div>

    <div class="code-box">
      <div class="code-label">आपकी सुरक्षित पर्ची संख्या (Resume Code)</div>
      <div class="code-value">${code}</div>
      <div style="font-size: 11px; color: #6b7280;">यह कोड लिखकर रख लें। कभी भी वापस आकर अपनी स्थिति देख सकती हैं।</div>
    </div>

    <div class="amount-box">
      <div>
        <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; opacity: 0.9;">कुल सरकारी सहायता राशि</div>
        <div style="font-size: 12px; opacity: 0.85;">Direct Bank Transfer (सीधे बैंक खाते में)</div>
      </div>
      <div class="amount-val">₹${amount.toLocaleString('en-IN')}</div>
    </div>

    <table class="details-table">
      <tr>
        <td style="color: #6b7280; font-size: 13px; width: 40%;">माता का नाम:</td>
        <td style="font-weight: 700; font-size: 14px; color: #111827;">${motherName}</td>
      </tr>
      <tr>
        <td style="color: #6b7280; font-size: 13px;">बैंक का नाम:</td>
        <td style="font-weight: 700; font-size: 14px; color: #111827;">${bankName} (आधार लिंक)</td>
      </tr>
      <tr>
        <td style="color: #6b7280; font-size: 13px;">पिन कोड (PIN Code):</td>
        <td style="font-weight: 700; font-size: 14px; color: #111827;">${pincode}</td>
      </tr>
    </table>

    <div style="font-size: 13px; font-weight: 800; color: #374151; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
      📋 आवश्यक दस्तावेज़ स्थिति (Documents Checklist)
    </div>
    <table class="docs-table">
      <tbody>
        ${docsHtml}
      </tbody>
    </table>

    <div class="centre-box">
      <div style="font-size: 12px; font-weight: 700; color: #b91c1c; text-transform: uppercase; margin-bottom: 4px;">
        📍 कहाँ जाना है (Anganwadi Centre to Visit):
      </div>
      <div style="font-size: 15px; font-weight: 800; color: #111827;">${centreName}</div>
      <div style="font-size: 13px; color: #4b5563; margin-top: 2px;">${centreAddress} · पिन: ${pincode}</div>
    </div>

    <div class="safety-notice">
      ⚠️ सुरक्षा नियम: सहेली / मातृ सखी कभी भी आधार नंबर, बैंक पिन या OTP नहीं मांगती। यह सरकारी योजना पूरी तरह निःशुल्क है।
      <br><span style="font-size: 11px; margin-top: 4px; display: inline-block;">मातृ वंदना हेल्पलाइन: 14445 | महिला हेल्पलाइन: 181</span>
    </div>

    <div class="print-btn-bar">
      <button class="print-btn" onclick="window.print()">🖨️ अभी प्रिंट करें / PDF सेव करें (Print)</button>
    </div>
  </div>

  <script>
    // Automatically trigger print dialog when opened in new tab/window
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.print();
      }, 350);
    });
  </script>
</body>
</html>`;
}

/**
 * Triggers printing using a Blob URL or direct file download fallback
 */
export function executeSlipPrint(state: JourneyState, language: LanguageCode): boolean {
  try {
    const htmlContent = generateSlipHtml(state, language);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);

    // Try window.open first (standard print workflow)
    const printWindow = window.open(blobUrl, '_blank');
    if (printWindow) {
      return true;
    }

    // Fallback: If popup is blocked by iframe or browser, trigger direct download
    triggerSlipDownload(state, language);
    return true;
  } catch (err) {
    console.warn('Print window blocked, using download fallback:', err);
    triggerSlipDownload(state, language);
    return false;
  }
}

/**
 * Downloads the complete, self-contained printable slip file to device storage
 */
export function triggerSlipDownload(state: JourneyState, language: LanguageCode) {
  const htmlContent = generateSlipHtml(state, language);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const code = (state.resumeCode || 'parchi').replace(/\s+/g, '-');
  a.href = url;
  a.download = `Matru-Sakhi-PMMVY-Parchi-${code}.html`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Generates WhatsApp share URL with pre-filled slip details
 */
export function getWhatsAppShareUrl(state: JourneyState): string {
  const code = state.resumeCode || '582-941';
  const amount = state.eligibility?.amountRupees || 5000;
  const motherName = state.sheet.motherName || 'माता';
  const centreName = state.centre?.name || 'आंगनवाड़ी केंद्र';

  const text = `🌸 *मातृ सखी (Matru Sakhi) - सरकारी मातृ वंदना सहायता पर्ची* 🌸\n\n` +
    `👤 *माता का नाम:* ${motherName}\n` +
    `🔢 *पर्ची कोड:* ${code}\n` +
    `💰 *सहायता राशि:* ₹${amount.toLocaleString('en-IN')} (सीधे बैंक खाते में)\n` +
    `📍 *नजदीकी केंद्र:* ${centreName}\n` +
    `📞 *सरकारी हेल्पलाइन:* 14445 / 181\n\n` +
    `यह पर्ची लेकर आंगनवाड़ी केंद्र जाएँ और ₹${amount} का सरकारी लाभ प्राप्त करें।`;

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}
