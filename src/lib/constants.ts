import { ImpactCounters, TransparencyData } from './types';

export interface SevaOption {
  amount: number;
  label: string;
  impactLine: string;
  popular?: boolean;
}

export interface DetailedSevaCategory {
  id: 'roadside-relief' | 'animal-welfare' | 'medical-emergency' | 'disaster-relief';
  tabNumber: string;
  shortName: string;
  titleHindi: string;
  shortDesc: string;
  imageUrl: string;
  imageAlt: string;
  unitCost: number;
  unitLabel: string;
  menuAccordionTitle: string;
  menuAccordionItems: string[];
  options: SevaOption[];
}

export const SITE_CONFIG = {
  name: 'राम का सेवक',
  nameLatin: 'Ram Ka Sevak',
  domain: 'ramkasevak.org',
  tagline: 'सेवा ही भक्ति है',
  creatorName: 'विपु',
  creatorUsername: 'vipuone',
  officialEmail: 'contact@ramkasevak.org',
  whatsappNumber: '919999999999', // अपना असली WhatsApp नंबर यहाँ भरें
  cityPlaceholder: 'जयपुर, राजस्थान (अपना शहर/पता यहाँ भरें)',
  socialLinks: {
    instagram: 'https://instagram.com/vipuone',
    youtube: 'https://youtube.com/@vipuone',
    facebook: 'https://facebook.com/vipuone',
  },
  defaultUpiId: process.env.NEXT_PUBLIC_UPI_ID || 'vipuone@upi',
  defaultUpiName: process.env.NEXT_PUBLIC_UPI_NAME || 'Ram Ka Sevak',
};

export const DEFAULT_IMPACT_COUNTERS: ImpactCounters = {
  mealsServed: 12450,
  animalsTreated: 3280,
  totalDonationsAmount: 485000,
};

export const DEFAULT_TRANSPARENCY: TransparencyData = {
  monthLabel: 'नवंबर 2026',
  incomeAmount: 68500,
  expenseAmount: 66200,
  notes: 'राशन, सब्ज़ी, पशु चारा, दवाइयाँ और आपदा राहत सामग्री में सीधा व्यय।',
};

export const DETAILED_SEVA_CATEGORIES: DetailedSevaCategory[] = [
  {
    id: 'roadside-relief',
    tabNumber: '01',
    shortName: 'अन्नदान',
    titleHindi: 'अन्नदान सेवा (भूखे को भोजन)',
    shortDesc: 'सड़क पर बेघर बुज़ुर्गों और ज़रूरतमंद लोगों को ताज़ा व गरम भोजन पहुँचाना।',
    imageUrl: '/images/annadaan-seva.jpg',
    imageAlt: 'सड़क पर ज़रूरतमंद लोगों को गरम भोजन वितरण',
    unitCost: 50,
    unitLabel: '1 व्यक्ति का भोजन',
    menuAccordionTitle: '₹50 की थाली में क्या मिलता है?',
    menuAccordionItems: [
      '4 ताज़ी गरम रोटी (शुद्ध गेहूँ)',
      'ताज़ी सब्ज़ी व दाल-चावल',
      'अचार और पीने का साफ़ पानी',
    ],
    options: [
      { amount: 50, label: '1 व्यक्ति', impactLine: '1 व्यक्ति का गरम भोजन' },
      { amount: 250, label: '5 लोग', impactLine: '5 लोगों का गरम खाना', popular: true },
      { amount: 500, label: '10 लोग', impactLine: '10 लोगों का भरपेट भोजन' },
      { amount: 1250, label: '25 लोग', impactLine: '25 लोगों का लंगर सहयोग' },
      { amount: 2500, label: '50 लोग', impactLine: '50 लोगों का महाभोज' },
    ],
  },
  {
    id: 'animal-welfare',
    tabNumber: '02',
    shortName: 'गौ व पशु सेवा',
    titleHindi: 'गौ माता व मूक जीव सेवा',
    shortDesc: 'गौ माता को हरा चारा, स्ट्रीट डॉग्स को दूध-रोटी और घायल पशुओं का इलाज।',
    imageUrl: '/images/gau-pashu-seva.jpg',
    imageAlt: 'गौ माता व घायल बेज़ुबान पशुओं की देखभाल',
    unitCost: 50,
    unitLabel: '1 पशु आहार',
    menuAccordionTitle: '₹50 में पशु सेवा में क्या दिया जाता है?',
    menuAccordionItems: [
      'गौ माता के लिए ताज़ा हरा चारा, चोकर व गुड़',
      'स्ट्रीट डॉग्स के लिए गरम दूध, रोटी व पौष्टिक आहार',
      'घायल पशुओं के लिए एंटीसेप्टिक स्प्रे, पट्टी व दवा',
    ],
    options: [
      { amount: 50, label: '1 पशु आहार', impactLine: '1 स्ट्रीट डॉग / पक्षी आहार' },
      { amount: 250, label: 'गौ चारा', impactLine: 'गौ माता के लिए हरा चारा व गुड़', popular: true },
      { amount: 500, label: '10 पशु आहार', impactLine: '10 बेज़ुबानों का दैनिक भोजन' },
      { amount: 1250, label: 'पशु पट्टी-दवा', impactLine: 'घायल पशुओं का प्राथमिक उपचार' },
      { amount: 2500, label: 'गौशाला सहयोग', impactLine: 'बड़ा चारा बंडल व वेटनरी इलाज' },
    ],
  },
  {
    id: 'medical-emergency',
    tabNumber: '03',
    shortName: 'चिकित्सा सेवा',
    titleHindi: 'आपातकालीन चिकित्सा सहायता',
    shortDesc: 'गरीब व असहाय मरीज़ों को ज़रूरी दवाइयाँ, जाँच और अस्पताल इलाज में मदद।',
    imageUrl: '/images/medical-seva.jpg',
    imageAlt: 'ज़रूरतमंद मरीज़ों के लिए दवा व चिकित्सा सहायता',
    unitCost: 50,
    unitLabel: 'प्राथमिक दवा सहयोग',
    menuAccordionTitle: 'चिकित्सा सहायता में क्या शामिल होता है?',
    menuAccordionItems: [
      'डॉक्टर की पर्ची की ज़रूरी दवाइयाँ व ग्लूकोज़ ड्रिप',
      'खून की जाँच, एक्स-रे व प्राथमिक उपचार शुल्क',
      'अस्पताल बेड व आपातकालीन इलाज में सीधी मदद',
    ],
    options: [
      { amount: 50, label: 'प्राथमिक दवा', impactLine: 'बुनियादी दवा व पट्टी सहयोग' },
      { amount: 250, label: 'दवा किट', impactLine: '1 मरीज़ की ज़रूरी दवाइयाँ', popular: true },
      { amount: 500, label: 'डॉक्टर जाँच', impactLine: 'डॉक्टर फीस व ब्लड टेस्ट' },
      { amount: 1250, label: 'अस्पताल मदद', impactLine: 'इंजेक्शन व ग्लूकोज़ ड्रिप खर्च' },
      { amount: 2500, label: 'ऑपरेशन मदद', impactLine: 'गंभीर मरीज़ के इलाज में सहयोग' },
    ],
  },
  {
    id: 'disaster-relief',
    tabNumber: '04',
    shortName: 'आपदा राहत',
    titleHindi: 'आपदा राहत व राशन सेवा',
    shortDesc: 'बाढ़ या संकट में बेघर परिवारों को सूखा राशन, तिरपाल और साफ़ पानी पहुँचाना।',
    imageUrl: '/images/disaster-seva.jpg',
    imageAlt: 'आपदा प्रभावित परिवारों के लिए राशन व राहत सामग्री',
    unitCost: 50,
    unitLabel: 'पानी व बिस्किट पैक',
    menuAccordionTitle: 'आपदा राहत किट में क्या दिया जाता है?',
    menuAccordionItems: [
      'सूखा राशन: आटा, चावल, दाल, तेल, नमक व माचिस',
      'बारिश व धूप से बचाव के लिए मज़बूत तिरपाल',
      'पीने का साफ़ पानी व ओआरएस पैकेट',
    ],
    options: [
      { amount: 50, label: 'पानी व राशन', impactLine: 'पीने का साफ़ पानी व ओआरएस' },
      { amount: 250, label: '1 राशन किट', impactLine: '1 परिवार का 3 दिन का सूखा राशन', popular: true },
      { amount: 500, label: 'तिरपाल + राशन', impactLine: 'छत के लिए तिरपाल व राशन किट' },
      { amount: 1250, label: '5 परिवार मदद', impactLine: '5 प्रभावित परिवारों को राहत पैक' },
      { amount: 2500, label: 'राहत कैंप', impactLine: 'संकट क्षेत्र में सामूहिक लंगर व पानी' },
    ],
  },
];

export interface CompassionStory {
  id: string;
  faithCategory: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  coreTeaching: string;
  icon: string;
}

export const UNIVERSAL_COMPASSION_STORIES: CompassionStory[] = [
  {
    id: 'shabari',
    faithCategory: 'रामायण',
    tag: 'अन्नदान महादान',
    title: 'माता शबरी के जूठे बेर',
    subtitle: 'भक्ति और प्रेम में कोई छोटा-बड़ा भेद नहीं होता',
    description: 'प्रभु श्री राम ने राजमहल के भोग छोड़कर गरीब वृद्धा माता शबरी के प्रेम से चखे हुए बेर खाए और दिखाया कि किसी भूखे को प्रेम से खिलाना ही सबसे बड़ा पुण्य है।',
    coreTeaching: 'भूखे को खिलाना प्रभु की सच्ची पूजा है।',
    icon: '🥣',
  },
  {
    id: 'jatayu',
    faithCategory: 'रामायण',
    tag: 'मूक जीव रक्षा',
    title: 'पक्षीराज जटायु का उद्धार',
    subtitle: 'असहाय जीव की रक्षा अपने परिवार समान करना',
    description: 'जब रावण से लड़ते हुए जटायु घायल हुए, तो प्रभु राम ने उन्हें गले लगाया और पिता समान अंतिम संस्कार कर सिखाया कि बेज़ुबान जीवों की रक्षा ही सच्ची सेवा है।',
    coreTeaching: 'बेज़ुबान पशु-पक्षियों की रक्षा करना प्रभु सेवा है।',
    icon: '🦅',
  },
  {
    id: 'squirrel',
    faithCategory: 'रामायण',
    tag: 'श्रद्धा का महत्व',
    title: 'राम सेतु की नन्ही गिलहरी',
    subtitle: 'सेवा में कोई भी छोटा योगदान छोटा नहीं होता',
    description: 'समुद्र पर सेतु बनाते समय नन्ही गिलहरी रेत में लोटकर पत्थरों के बीच रेत डाल रही थी। प्रभु राम ने उसे हथेली पर उठाकर कहा कि दान में आकार नहीं, दिल की निष्ठा देखी जाती है।',
    coreTeaching: 'आपका ₹50 का सहयोग भी प्रभु के चरणों में अमूल्य है।',
    icon: '🐿️',
  },
  {
    id: 'karna',
    faithCategory: 'महाभारत',
    tag: 'निःस्वार्थ दान',
    title: 'दानवीर कर्ण का महादान',
    subtitle: 'अंतिम सांस तक निष्काम दान की अमर प्रेरणा',
    description: 'युद्धभूमि में घायल कर्ण से जब याचक रूप में दान माँगा गया, तो उन्होंने बिना संकोच अपना स्वर्ण दान कर दिया। सच्चा दान संकट में भी बिना स्वार्थ किया जाता है।',
    coreTeaching: 'बिना स्वार्थ किया गया दान ही अमर होता है।',
    icon: '🏹',
  },
  {
    id: 'sudama',
    faithCategory: 'भागवत',
    tag: 'पवित्र समर्पण',
    title: 'श्री कृष्ण और सुदामा के तंदुल',
    subtitle: 'प्रेम की एक मुट्ठी धन-दौलत से बड़ी है',
    description: 'गरीब सुदामा के चरण भगवान कृष्ण ने धोए और फटी पोटली से चावल बड़े चाव से खाए। प्रभु ने दिखाया कि सेवा में धन नहीं, भावना और समर्पण देखा जाता है।',
    coreTeaching: 'प्रेम से दिया गया एक दाना भी अनंत फल देता है।',
    icon: '🦚',
  },
  {
    id: 'mahadev',
    faithCategory: 'शिव पुराण',
    tag: 'पशुपतिनाथ सेवा',
    title: 'पशुपतिनाथ महादेव',
    subtitle: 'हर भटके और पीड़ित जीव के रक्षक',
    description: 'भगवान शिव को पशुपतिनाथ कहा गया है — जो सभी बेज़ुबान पशुओं और बेघर जीवों के रक्षक हैं। असहाय जीवों पर दया करने वाले पर महादेव की कृपा होती है।',
    coreTeaching: 'असहाय पशुओं की सेवा ही पशुपतिनाथ की भक्ति है।',
    icon: '🔱',
  },
  {
    id: 'guru-nanak',
    faithCategory: 'सिख परंपरा',
    tag: 'सच्चा सौदा व लंगर',
    title: 'गुरु नानक देव जी का "सच्चा सौदा"',
    subtitle: 'भूखे को खाना खिलाना ही सबसे बड़ा व्यापार है',
    description: 'पिताजी ने बालक नानक को व्यापार के लिए सिक्के दिए। नानक जी ने भूखे साधुओं व ज़रूरतमंदों को देख पूरे पैसों का राशन खरीदकर उनका पेट भरा।',
    coreTeaching: 'अपनी कमाई ज़रूरतमंद के साथ बाँटना ही सच्चा धर्म है।',
    icon: 'ੴ',
  },
  {
    id: 'prophet-dog',
    faithCategory: 'इस्लामी शिक्षा',
    tag: 'जीवों पर रहम',
    title: 'रेगिस्तान में प्यासा कुत्ता',
    subtitle: 'बेज़ुबान को पानी पिलाने से ईश्वर की रहमत मिलती है',
    description: 'हदीस में आता है कि तपती धूप में एक मुसाफिर ने प्यासे कुत्ते को कुएँ से पानी निकालकर पिलाया। उसकी इस रहमदिली से ईश्वर अत्यंत प्रसन्न हुए।',
    coreTeaching: 'हर ज़िंदा जीव पर रहम करना सबसे बड़ी नेकी है।',
    icon: '🌙',
  },
  {
    id: 'hazrat-ali',
    faithCategory: 'इस्लामी शिक्षा',
    tag: 'त्याग व दान',
    title: 'हज़रत अली का तीन दिन का रोज़ा',
    subtitle: 'स्वयं भूखे रहकर ज़रूरतमंद को पहले खिलाना',
    description: 'जब हज़रत अली और उनके परिवार ने लगातार तीन दिन रोज़ा रखा, तो हर शाम इफ़्तार के समय आए भूखे व असहाय लोगों को अपनी रोटी दे दी।',
    coreTeaching: 'अपनी ज़रूरत भूलकर दूसरों का पेट भरना ही इंसानियत है।',
    icon: '✨',
  },
  {
    id: 'buddha',
    faithCategory: 'बौद्ध दर्शन',
    tag: 'सर्वोच्च करुणा',
    title: 'राजकुमार सिद्धार्थ और घायल हंस',
    subtitle: 'मारने वाले से बचाने वाला हमेशा बड़ा होता है',
    description: 'जब तीर से घायल हंस गिरा, तो सिद्धार्थ ने उसका तीर निकालकर घाव धोया और जान बचाई। जीवन पर उसी का अधिकार है जो जीवन बचाता है।',
    coreTeaching: 'सभी जीवों पर दया और करुणा ही परम धर्म है।',
    icon: '☸️',
  },
  {
    id: 'mahavira',
    faithCategory: 'जैन दर्शन',
    tag: 'अहिंसा परमो धर्मः',
    title: 'भगवान महावीर की करुणा शिक्षा',
    subtitle: 'आहार-दान और औषधि-दान मानवता का सर्वोच्च दान है',
    description: 'भगवान महावीर ने सिखाया कि संसार के हर छोटे-बड़े जीव में एक समान आत्मा है। भूखे को भोजन और बीमार को दवा देना सर्वोच्च कर्तव्य है।',
    coreTeaching: 'सभी जीव एक-दूसरे की सेवा और सहयोग के लिए बने हैं।',
    icon: '🙏',
  },
  {
    id: 'good-samaritan',
    faithCategory: 'ईसाई शिक्षा',
    tag: 'दीन-दुखी की सेवा',
    title: 'सड़क किनारे घायल की मदद',
    subtitle: 'गिरते हुए अनजान व्यक्ति को उठाना ही ईश्वर का कार्य है',
    description: 'रास्ते में घायल पड़े व्यक्ति को देखकर एक दयालु राहगीर रुका, उसके घाव पर पट्टी बाँधी, अस्पताल पहुँचाया और पूरा खर्च स्वयं भरा।',
    coreTeaching: 'जो पीड़ित की मदद के लिए रुकता है, वही सच्चा सेवक है।',
    icon: '✝️',
  },
];

export const INITIAL_COMMUNITY_BLESSINGS = [
  {
    id: 'b-1',
    donor_name: 'अमन शर्मा',
    category_name: 'अन्नदान',
    units_text: '10 लोगों का भोजन',
    amount: 500,
    message: 'प्रभु श्री राम आपके इस सेवा कार्य को सदा सफल बनाएँ।',
    created_at: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: 'b-2',
    donor_name: 'प्रिया राठौर',
    category_name: 'गौ व पशु सेवा',
    units_text: 'गौ माता चारा',
    amount: 250,
    message: 'गौ माता और बेज़ुबान जीवों के लिए छोटा सा सहयोग।',
    created_at: new Date(Date.now() - 35 * 60000).toISOString(),
  },
  {
    id: 'b-3',
    donor_name: 'राहुल वर्मा',
    category_name: 'चिकित्सा सेवा',
    units_text: 'डॉक्टर जाँच सहयोग',
    amount: 500,
    message: 'उम्मीद है किसी ज़रूरतमंद मरीज़ को समय पर दवा मिल सकेगी।',
    created_at: new Date(Date.now() - 90 * 60000).toISOString(),
  },
  {
    id: 'b-4',
    donor_name: 'फरहान अहमद',
    category_name: 'अन्नदान',
    units_text: '5 लोगों का भोजन',
    amount: 250,
    message: 'इंसानियत से बड़ा कोई धर्म नहीं। बहुत सराहनीय प्रयास।',
    created_at: new Date(Date.now() - 150 * 60000).toISOString(),
  },
];
