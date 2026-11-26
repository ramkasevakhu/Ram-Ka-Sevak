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
  locationHindi: 'ऋषिकेश, उत्तराखंड, भारत',
  locationEnglish: 'Rishikesh, Uttarakhand, India',
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
    imageAlt: 'ऋषिकेश में सड़क पर ज़रूरतमंद लोगों को गरम भोजन वितरण',
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
  summary: string;
  coreTeaching: string;
  icon: string;
}

export const UNIVERSAL_COMPASSION_STORIES: CompassionStory[] = [
  {
    id: 'shabari',
    faithCategory: 'रामायण',
    tag: 'अन्नदान महादान',
    title: 'माता शबरी और प्रभु श्री राम',
    subtitle: 'भक्ति और प्रेम में कोई छोटा-बड़ा भेद नहीं होता',
    summary: 'कथा का सार: प्रभु श्री राम ने राजमहल के भोग छोड़कर वृद्धा माता शबरी के प्रेम से अर्पित किए गए बेर स्वीकार किए। यह प्रसंग सिखाता है कि प्रेम और श्रद्धा से किसी भूखे को भोजन कराना ही सबसे बड़ी भक्ति है।',
    coreTeaching: 'भूखे को खिलाना प्रभु की सच्ची पूजा है।',
    icon: '🥣',
  },
  {
    id: 'jatayu',
    faithCategory: 'रामायण',
    tag: 'मूक जीव रक्षा',
    title: 'पक्षीराज जटायु का उद्धार',
    subtitle: 'असहाय जीव की रक्षा अपने परिवार समान करना',
    summary: 'कथा का सार: जब रावण से लड़ते हुए जटायु घायल हुए, तो प्रभु राम ने उन्हें स्नेह से गले लगाया और पिता समान अंतिम संस्कार किया। यह प्रसंग बेज़ुबान और असहाय जीवों के प्रति करुणा व कर्तव्य का बोध कराता है।',
    coreTeaching: 'बेज़ुबान पशु-पक्षियों की रक्षा करना प्रभु सेवा है।',
    icon: '🦅',
  },
  {
    id: 'squirrel',
    faithCategory: 'रामायण',
    tag: 'श्रद्धा का महत्व',
    title: 'राम सेतु की नन्ही गिलहरी',
    subtitle: 'सेवा में कोई भी छोटा योगदान छोटा नहीं होता',
    summary: 'कथा का सार: समुद्र पर सेतु बनते समय नन्ही गिलहरी ने भी रेत के कण डालकर अपना योगदान दिया। प्रभु राम ने उसके छोटे प्रयास को सम्मान देकर सिखाया कि सेवा में राशि या आकार नहीं, मन की निष्ठा महत्वपूर्ण है।',
    coreTeaching: 'आपका ₹50 का सहयोग भी सेवा में अमूल्य है।',
    icon: '🐿️',
  },
  {
    id: 'karna',
    faithCategory: 'महाभारत',
    tag: 'निःस्वार्थ दान',
    title: 'दानवीर कर्ण का त्याग',
    subtitle: 'अंतिम समय तक निष्काम दान की प्रेरणा',
    summary: 'कथा का सार: युद्धभूमि में कठिन परिस्थिति में भी कर्ण ने बिना किसी स्वार्थ के याचक को दान दिया। यह प्रसंग सिखाता है कि सच्चा दान वही है जो बिना किसी अपेक्षा या दिखावे के किया जाए।',
    coreTeaching: 'बिना स्वार्थ किया गया दान ही सार्थक होता है।',
    icon: '🏹',
  },
  {
    id: 'sudama',
    faithCategory: 'भागवत',
    tag: 'पवित्र समर्पण',
    title: 'श्री कृष्ण और सुदामा',
    subtitle: 'प्रेम की एक मुट्ठी धन-दौलत से बड़ी है',
    summary: 'कथा का सार: श्री कृष्ण ने गरीब मित्र सुदामा का आदर-सत्कार किया और उनके लाए हुए साधारण चावल बड़े प्रेम से स्वीकार किए। यह प्रसंग दर्शाता है कि सेवा और भेंट में धन नहीं, भावना देखी जाती है।',
    coreTeaching: 'प्रेम से दिया गया थोड़ा सहयोग भी अनंत फल देता है।',
    icon: '🦚',
  },
  {
    id: 'mahadev',
    faithCategory: 'शिव पुराण',
    tag: 'पशुपतिनाथ सेवा',
    title: 'पशुपतिनाथ महादेव की करुणा',
    subtitle: 'हर भटके और पीड़ित जीव के रक्षक',
    summary: 'कथा का सार: भगवान शिव को पशुपतिनाथ कहा जाता है, जो समस्त मूक और बेसहारा प्राणियों के रक्षक हैं। इस परंपरा में असहाय पशुओं की देखभाल करना और उनके कष्ट दूर करना श्रेष्ठ सेवा माना गया है।',
    coreTeaching: 'असहाय पशुओं की सेवा ही पशुपतिनाथ की भक्ति है।',
    icon: '🔱',
  },
  {
    id: 'guru-nanak',
    faithCategory: 'सिख परंपरा',
    tag: 'सच्चा सौदा व लंगर',
    title: 'गुरु नानक देव जी का सच्चा सौदा',
    subtitle: 'भूखे को खाना खिलाना ही सबसे बड़ा व्यापार है',
    summary: 'कथा का सार: बालक नानक ने व्यापार के लिए मिले धन से भूखे साधुओं और ज़रूरतमंद लोगों को भोजन कराया। यहीं से लंगर और वंड छको (बाँटकर खाने) की महान सेवा परंपरा का संदेश मिलता है।',
    coreTeaching: 'अपनी कमाई ज़रूरतमंद के साथ बाँटना ही सच्चा धर्म है।',
    icon: 'ੴ',
  },
  {
    id: 'prophet-dog',
    faithCategory: 'इस्लामी शिक्षा',
    tag: 'जीवों पर रहम',
    title: 'रेगिस्तान में प्यासे कुत्ते की सेवा',
    subtitle: 'बेज़ुबान को पानी पिलाने से ईश्वर की रहमत मिलती है',
    summary: 'कथा का सार: तपती धूप में एक मुसाफिर ने कुएँ से पानी निकालकर प्यासे कुत्ते की प्यास बुझाई। इस परंपरा में सिखाया गया है कि हर ज़िंदा जीव पर दया और रहम करना सबसे बड़ी नेकी है।',
    coreTeaching: 'हर ज़िंदा जीव पर रहम करना सबसे बड़ी नेकी है।',
    icon: '🌙',
  },
  {
    id: 'hazrat-ali',
    faithCategory: 'इस्लामी शिक्षा',
    tag: 'त्याग व दान',
    title: 'हज़रत अली का त्याग',
    subtitle: 'स्वयं भूखे रहकर ज़रूरतमंद को पहले खिलाना',
    summary: 'कथा का सार: लगातार तीन दिन के उपवास के बाद भी परिवार ने हर शाम दरवाज़े पर आए भूखे और असहाय लोगों को अपना भोजन दे दिया। यह प्रसंग त्याग और इंसानियत की उच्च मिसाल देता है।',
    coreTeaching: 'अपनी ज़रूरत से पहले दूसरों का पेट भरना ही इंसानियत है।',
    icon: '✨',
  },
  {
    id: 'buddha',
    faithCategory: 'बौद्ध दर्शन',
    tag: 'सर्वोच्च करुणा',
    title: 'सिद्धार्थ और घायल हंस',
    subtitle: 'मारने वाले से बचाने वाला हमेशा बड़ा होता है',
    summary: 'कथा का सार: तीर से घायल हुए हंस का राजकुमार सिद्धार्थ ने उपचार कर उसके प्राण बचाए। यह प्रसंग सिखाता है कि जीवन पर अधिकार उसका होता है जो रक्षा और करुणा करता है।',
    coreTeaching: 'सभी जीवों पर दया और करुणा ही परम धर्म है।',
    icon: '☸️',
  },
  {
    id: 'mahavira',
    faithCategory: 'जैन दर्शन',
    tag: 'अहिंसा परमो धर्मः',
    title: 'भगवान महावीर की करुणा शिक्षा',
    subtitle: 'आहार-दान और औषधि-दान मानवता का सर्वोच्च दान है',
    summary: 'कथा का सार: जैन दर्शन में हर छोटे-बड़े प्राणी में समान जीवन माना गया है। भूखे को आहार और बीमार को औषधि देना तथा अभयदान करना मानवता का प्रमुख कर्तव्य बताया गया है।',
    coreTeaching: 'सभी जीव एक-दूसरे की सेवा और सहयोग के लिए बने हैं।',
    icon: '🙏',
  },
  {
    id: 'good-samaritan',
    faithCategory: 'ईसाई शिक्षा',
    tag: 'दीन-दुखी की सेवा',
    title: 'सड़क किनारे घायल की मदद',
    subtitle: 'गिरते हुए अनजान व्यक्ति को उठाना ही ईश्वर का कार्य है',
    summary: 'कथा का सार: रास्ते में घायल पड़े एक अनजान व्यक्ति की मदद के लिए एक दयालु राहगीर रुका, उसके घाव साफ़ किए और इलाज का पूरा प्रबंध किया। यह प्रसंग बिना भेदभाव सेवा करने की सीख देता है।',
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
