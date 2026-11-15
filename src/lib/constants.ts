export interface SevaItemDetail {
  label: string;
  amount: number;
  whatIsGiven: string; // Exact physical breakdown (e.g. 4 Roti, Sabzi, Dal-Chawal, etc.)
  popular?: boolean;
}

export interface DetailedSevaCategory {
  id: string;
  titleEnglish: string;
  titleHindi: string;
  badgeEnglish: string;
  badgeHindi: string;
  shortDesc: string;
  imageUrl: string;
  imageAlt: string;
  unitCost: number;
  unitName: string;
  exactBreakdownTitle: string;
  exactBreakdownItems: string[];
  options: SevaItemDetail[];
}

export const SITE_CONFIG = {
  name: 'Ram Ka Sevak',
  domain: 'ramkasevak.org',
  tagline: 'सेवा ही भक्ति है',
  taglineSub: 'Service to Humanity is the Highest Devotion',
  creatorName: 'Vipu',
  creatorUsername: 'vipuone',
  officialEmail: 'contact@ramkasevak.org',
  socialLinks: {
    instagram: 'https://instagram.com/vipuone',
    youtube: 'https://youtube.com/@vipuone',
    facebook: 'https://facebook.com/vipuone',
  },
  defaultUpiId: process.env.NEXT_PUBLIC_UPI_ID || 'vipuone@upi',
  defaultUpiName: process.env.NEXT_PUBLIC_UPI_NAME || 'Ram Ka Sevak (Seva Mission)',
};

export const DETAILED_SEVA_CATEGORIES: DetailedSevaCategory[] = [
  {
    id: 'roadside-relief',
    titleEnglish: 'Annadaan & Street Food Seva',
    titleHindi: 'अन्नदान एवं सड़क सहायता',
    badgeEnglish: 'Fresh Cooked Meals',
    badgeHindi: 'ताज़ा व भरपेट भोजन',
    shortDesc: 'Sadak kinare be-sahara buzurgo aur bachho tak garam, hygienically banaya gaya taaza bhojan.',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Food distribution to poor and needy',
    unitCost: 50,
    unitName: 'व्यक्ति का भोजन',
    exactBreakdownTitle: '₹50 में हम क्या देते हैं? (Exact Food Menu)',
    exactBreakdownItems: [
      '4 ताज़ी गरम रोटियां (देसी गेहूं)',
      'पोषक मौसमी सब्ज़ी (आलू-गोभी / मटर-पनीर / हरी सब्ज़ी)',
      'दाल एवं शुद्ध बासमती चावल',
      'अचार, सलाद एवं शुद्ध स्वच्छ पीने का पानी',
    ],
    options: [
      { label: '1 व्यक्ति का भोजन', amount: 50, whatIsGiven: '1 थाली ताज़ा भरपेट भोजन (4 रोटी, सब्ज़ी, दाल-चावल, पानी)' },
      { label: '5 व्यक्तियों का भोजन', amount: 250, whatIsGiven: '5 थाली संपूर्ण भोजन पैकेट (सड़क किनारे वितरण)', popular: true },
      { label: '10 व्यक्तियों का भोजन', amount: 500, whatIsGiven: '10 ज़रूरतमंदों का एक वक्त का संपूर्ण भोजन' },
      { label: '25 व्यक्तियों का लंगर', amount: 1250, whatIsGiven: '25 लोगों का फुटपाथ लंगर व जल सेवा' },
      { label: '50 व्यक्तियों का महाभोज', amount: 2500, whatIsGiven: '50 बेसहारा लोगों को संपूर्ण सम्मानपूर्वक भोजन' },
    ],
  },
  {
    id: 'animal-welfare',
    titleEnglish: 'Jeev Daya & Animal Rescue',
    titleHindi: 'मूक जीव एवं गौ सेवा',
    badgeEnglish: 'Stray Dogs & Cow Fodder',
    badgeHindi: 'गौ ग्रास व डॉग फीडिंग',
    shortDesc: 'Bhookhe street dogs aur be-sahara Gau-mata ke liye poshtik khana, chara aur emergency first aid.',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Cow and stray dog care',
    unitCost: 50,
    unitName: 'मूक जीव आहार',
    exactBreakdownTitle: 'मूक जीवों को हम क्या देते हैं? (Exact Diet)',
    exactBreakdownItems: [
      'Street Dogs: ताज़ा दूध, रोटी, उबले अंडे व हाई-प्रोटीन डॉग फूड',
      'गौ माता: ताज़ा हरा चारा (बरसीम/ज्वार), चोकर, भूसा एवं मीठा गुड़',
      'घायल जीव: एंटीसेप्टिक स्प्रे, बैंडेज, पेनकिलर व प्राथमिक उपचार',
    ],
    options: [
      { label: '1 मूक जीव आहार', amount: 50, whatIsGiven: '1 स्ट्रीट डॉग को ताज़ा दूध, रोटी व डॉग फूड' },
      { label: '1 गौ-माता का हरा चारा', amount: 100, whatIsGiven: '1 गाय के लिए ताज़ा हरा चारा, भूसा, चोकर व गुड़', popular: true },
      { label: '5 स्ट्रीट डॉग्स का भोजन', amount: 250, whatIsGiven: '5 बे-ज़ुबान कुत्तों को भरपेट पौष्टिक भोजन' },
      { label: 'गौ-शाला हरा चारा गट्ठर', amount: 500, whatIsGiven: 'बड़ी मात्रा में ताज़ा हरा चारा व पोषक आहार' },
      { label: 'घायल जीव इलाज व फर्स्ट-एड', amount: 1000, whatIsGiven: 'डॉक्टर द्वारा ड्रेसिंग, सेप्टिक इंजेक्शन व दवा' },
    ],
  },
  {
    id: 'medical-emergency',
    titleEnglish: 'Emergency Hospital & Patient Support',
    titleHindi: 'आपातकालीन चिकित्सा सहायता',
    badgeEnglish: 'Direct Chemist & Doctor Bills',
    badgeHindi: 'दवा व डॉक्टर सहायता',
    shortDesc: 'Garib parivaaro ke marizo ke liye zaroori dawaiyo, doctor parchi aur emergency hospital charges me sidhi madad.',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Medical aid for poor patient',
    unitCost: 500,
    unitName: 'दवा व चिकित्सा सहायता',
    exactBreakdownTitle: 'मरीज़ों के इलाज में यह पैसा कहाँ लगता है? (Exact Use)',
    exactBreakdownItems: [
      'दवाइयां: डॉक्टर की पर्ची के अनुसार ज़रूरी एंटीबायोटिक, पेनकिलर व ग्लूकोज़ बॉटल',
      'जांच (Tests): ब्लड टेस्ट, एक्स-रे या ईसीजी का सरकारी/प्राइवेट लैब भुगतान',
      'अस्पताल बेड व इंजेक्शन: इमरजेंसी वार्ड व ऑपरेशन थिएटर की ज़रूरी किट',
    ],
    options: [
      { label: 'ज़रूरी दवाइयां सहायता', amount: 500, whatIsGiven: 'डॉक्टर की पर्ची पर लिखी ज़रूरी एंटीबायोटिक्स, पेनकिलर व ड्रिप' },
      { label: 'डॉक्टर फीस व ब्लड टेस्ट', amount: 1100, whatIsGiven: 'स्पेशलिस्ट डॉक्टर परामर्श + ब्लड टेस्ट व एक्स-रे जांच', popular: true },
      { label: 'अस्पताल एडमिट व इंजेक्शन', amount: 2500, whatIsGiven: 'इमरजेंसी वार्ड बेड, स्लाइन ड्रिप व ज़रूरी इंजेक्शन खर्च' },
      { label: 'ऑपरेशन व सर्जरी सहायता', amount: 5000, whatIsGiven: 'ऑपरेशन थिएटर खर्च व जीवन रक्षक दवाइयों में प्रत्यक्ष मदद' },
      { label: 'मेजर आईसीयू इलाज सहायता', amount: 11000, whatIsGiven: 'गंभीर बीमारी में पीड़ित परिवार को हॉस्पिटल बिल में बड़ी राहत' },
    ],
  },
  {
    id: 'disaster-relief',
    titleEnglish: 'Disaster & Calamity Emergency Relief',
    titleHindi: 'प्राकृतिक आपदा राहत कोष',
    badgeEnglish: 'Flood & Earthquake Aid',
    badgeHindi: 'बाढ़ व विपदा राहत',
    shortDesc: 'Baadh, bhukamp ya achanak aayi aafat se prabhavit be-ghar parivaaro tak ration aur tripal sahayata.',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Disaster survival relief packs',
    unitCost: 250,
    unitName: 'राहत किट',
    exactBreakdownTitle: 'आपदा राहत में क्या दिया जाता है? (Emergency Survival)',
    exactBreakdownItems: [
      'सूखा राशन: 5kg आटा, 2kg चावल, दाल, तेल, नमक, बिस्कुट व माचिस',
      'सुरक्षा: वाटरप्रूफ तिरपाल (Tarpaulin) बारिश व धूप से छत के लिए',
      'स्वच्छ जल: मिनरल वाटर की बोतलें व ओआरएस पैकेट',
    ],
    options: [
      { label: '1 परिवार सूखा राशन किट', amount: 250, whatIsGiven: '3-4 दिन का सूखा राशन (आटा, चावल, दाल, बिस्कुट, माचिस)' },
      { label: 'तिरपाल + राशन कॉम्बो', amount: 500, whatIsGiven: 'वाटरप्रूफ तिरपाल (छत) + 1 सप्ताह का राशन पैकेट', popular: true },
      { label: '5 परिवारों की राहत सामग्री', amount: 1250, whatIsGiven: '5 बेघर परिवारों तक संपूर्ण आपातकालीन राशन व प्राथमिक दवा' },
      { label: 'सामुदायिक राहत कैंप', amount: 2500, whatIsGiven: 'आपदा क्षेत्र में भोजन लंगर व शुद्ध पेयजल टैंकर व्यवस्था' },
      { label: 'पुनर्वास व घर सहायता', amount: 5000, whatIsGiven: 'टूटे घर की मरम्मत व बर्तनों/सामान की आपातकालीन मदद' },
    ],
  },
];

export interface CompassionStory {
  id: string;
  faithCategory: string; // e.g. "सनातन (रामायण)", "महाभारत", "सिख परंपरा", "इस्लाम", "बौद्ध धर्म", "जैन धर्म", "ईसाई धर्म"
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
    faithCategory: 'सनातन (रामायण)',
    tag: 'अन्नदान की महिमा',
    title: 'माता शबरी के जूठे बेर',
    subtitle: 'भूख और प्रेम में कोई भेद नहीं होता',
    description: 'भगवान श्री राम ने अयोध्या के 56 भोग छोड़ कर वन में गरीब माता शबरी के प्रेम से चखे हुए जूठे बेर खाए। प्रभु ने संसार को सिखाया कि किसी भूखे को आदर और प्रेम से खिलाना ही सबसे बड़ा पुण्य है।',
    coreTeaching: 'भूखे को अन्न देना ही प्रभु की सबसे बड़ी सेवा है।',
    icon: '🥣',
  },
  {
    id: 'jatayu',
    faithCategory: 'सनातन (रामायण)',
    tag: 'मूक जीव रक्षा',
    title: 'पक्षीराज जटायु का उद्धार',
    subtitle: 'एक पक्षी को पिता समान सम्मान',
    description: 'रावण से लड़ते हुए जब जटायु घायल होकर गिरे, तो भगवान राम ने उन्हें गोद में लेकर अपने पिता राजा दशरथ के समान उनका अंतिम संस्कार किया। प्रभु ने संदेश दिया कि बे-ज़ुबान जीवों की रक्षा करना ईश्वर की साक्षात पूजा है।',
    coreTeaching: 'मूक पशु-पक्षियों पर दया करना ही सच्ची राम भक्ति है।',
    icon: '🦅',
  },
  {
    id: 'squirrel',
    faithCategory: 'सनातन (रामायण)',
    tag: 'छोटे दान का महत्व',
    title: 'राम सेतु की नन्हीं गिलहरी',
    subtitle: 'कोई भी दान या मदद छोटी नहीं होती',
    description: 'राम सेतु निर्माण में एक नन्हीं गिलहरी रेत के कण लाकर डाल रही थी। वानरों ने मज़ाक उड़ाया, लेकिन भगवान राम ने उसे हथेली पर उठाकर प्यार से पीठ पर उंगलियां फेरीं। प्रभु ने कहा—"भाव सच्चा होना चाहिए, आपका छोटा सहयोग भी प्रभु को उतना ही प्रिय है।"',
    coreTeaching: 'आपका ₹50 का सहयोग भी प्रभु राम के सेतु निर्माण के समान पवित्र है।',
    icon: '🐿️',
  },
  {
    id: 'karna',
    faithCategory: 'महाभारत',
    tag: 'दानवीर परंपरा',
    title: 'दानवीर कर्ण का अंतिम दान',
    subtitle: 'प्राण जाते हुए भी दान से पीछे न हटना',
    description: 'रणभूमि में जब कर्ण अंतिम सांसें ले रहे थे, तब इंद्र ब्राह्मण रूप में दान मांगने आए। कर्ण के पास कुछ नहीं था, फिर भी उन्होंने पत्थर से अपने सोने के दांत तोड़कर दान में दे दिए। भगवान श्री कृष्ण ने कर्ण को दान का सर्वोच्च प्रतीक घोषित किया।',
    coreTeaching: 'दान वही श्रेष्ठ है जो निस्वार्थ भाव से ज़रूरतमंद को दिया जाए।',
    icon: '🏹',
  },
  {
    id: 'sudama',
    faithCategory: 'महाभारत / भागवत',
    tag: 'प्रेम व संवेदना',
    title: 'श्री कृष्ण और सुदामा के तंदुल',
    subtitle: 'चार मुट्ठी चावल और तीनों लोकों का ऐश्वर्य',
    description: 'सुदामा जब फटे हाल में श्री कृष्ण से मिलने पहुंचे, तो प्रभु ने उनके पैरों को अपने आंसुओं से धोया और उनके प्रेम पूर्वक लाए पोहे (तंदुल) खाकर उन्हें सब कुछ दे दिया। प्रभु ने सिद्ध किया कि सेवा में धन की मात्रा नहीं, भावना का मूल्य होता है।',
    coreTeaching: 'श्रद्धा से दिया गया एक कण भी ईश्वर को अनंत गुना होकर स्वीकार होता है।',
    icon: '🦚',
  },
  {
    id: 'mahadev',
    faithCategory: 'सनातन (महादेव)',
    tag: 'पशुपतिनाथ व नीलकंठ',
    title: 'महादेव का पशुपतिनाथ रूप',
    subtitle: 'समस्त प्राणियों के रक्षक व कृपालु',
    description: 'भगवान शिव को "पशुपतिनाथ" कहा जाता है क्योंकि वे सभी बे-सहारा पशुओं, मूक जीवों और तिरस्कृत प्राणियों के रक्षक हैं। जब संसार में विष फैला, तो महादेव ने खुद विष पीकर समस्त जीवों की रक्षा की।',
    coreTeaching: 'जो बेसहारा और घायल जीवों पर करुणा करता है, उस पर महादेव की सदैव कृपा रहती है।',
    icon: '🔱',
  },
  {
    id: 'guru-nanak',
    faithCategory: 'सिख परंपरा',
    tag: 'सच्चा सौदा व लंगर',
    title: 'गुरु नानक देव जी का "सच्चा सौदा"',
    subtitle: 'भूखों को खिलाना ही सबसे बड़ा व्यापार है',
    description: 'पिताजी ने गुरु नानक देव जी को व्यापार के लिए 20 रुपये दिए थे। रास्ते में भूखे साधुओं और गरीबों को देखकर नानक जी ने सारे रुपयों से उन्हें भरपेट भोजन करा दिया। जब पिता ने पूछा, तो बोले—"भूखों को भोजन कराने से बड़ा कोई सच्चा सौदा नहीं हो सकता।" इसी से लंगर प्रथा का जन्म हुआ।',
    coreTeaching: 'वंड छको: बांट कर खाना और भूखों का पेट भरना ही परमात्मा का सच्चा मार्ग है।',
    icon: 'ੴ',
  },
  {
    id: 'prophet-dog',
    faithCategory: 'इस्लामिक शिक्षा',
    tag: 'मूक जीव पर दया',
    title: 'प्यासे कुत्ते को पानी पिलाने का सवाब',
    subtitle: 'एक मूक जानवर की प्यास बुझाने पर मगफिरत',
    description: 'हदीस में आता है कि एक व्यक्ति ने रेगिस्तान में एक प्यासे कुत्ते को मिट्टी चाटते देखा। उसने कुएं में उतरकर अपने जूते में पानी भरकर उस तड़पते कुत्ते को पिलाया। ईश्वर ने उसकी इस एक दया पर प्रसन्न होकर उसके समस्त पाप क्षमा कर दिए।',
    coreTeaching: 'हर जीवित प्राणी पर दया करने में पुण्य (सवाब) है। दान से कभी धन घटता नहीं।',
    icon: '🌙',
  },
  {
    id: 'hazrat-ali',
    faithCategory: 'इस्लामिक शिक्षा',
    tag: 'ईसार व त्याग',
    title: 'हज़रत अली व अहले-बैत का त्याग',
    subtitle: 'खुद भूखे रहकर यतीम व मिस्कीन को खाना दिया',
    description: 'पवित्र कुरआन के सूरह इंसान में आता है कि जब हज़रत अली और उनके परिवार ने तीन दिन रोज़ा रखा, और जब भी इफ्तार का वक्त आया, तो दरवाजे पर भूखा यतीम, मिस्कीन और कैदी आ गया। उन्होंने अपना सारा भोजन उन भूखों को दे दिया और खुद सिर्फ पानी से रोज़ा पूरा किया।',
    coreTeaching: 'दूसरों की भूख को अपनी भूख से ऊपर रखना ही सर्वोच्च इंसानियत है।',
    icon: '✨',
  },
  {
    id: 'buddha',
    faithCategory: 'बौद्ध दर्शन',
    tag: 'करुणा व अहिंसा',
    title: 'गौतम बुद्ध और घायल हंस',
    subtitle: 'मारने वाले से बचाने वाला बड़ा होता है',
    description: 'राजकुमार देवदत्त ने तीर से एक हंस को घायल कर दिया। सिद्धार्थ (गौतम बुद्ध) ने हंस के शरीर से तीर निकाला, घाव पर पट्टी बांधी और पानी पिलाया। जब सभा में फैसला हुआ तो निर्णय आया—"मारने वाले से बचाने वाले का अधिकार बड़ा होता है।"',
    coreTeaching: 'करुणा और दया ही जीवन का सबसे श्रेष्ठ धर्म है।',
    icon: '☸️',
  },
  {
    id: 'mahavira',
    faithCategory: 'जैन दर्शन',
    tag: 'जीव दया व अभयदान',
    title: 'भगवान महावीर का "अहिंसा परमो धर्मः"',
    subtitle: 'जीवों को अभयदान देना ही सबसे बड़ा दान है',
    description: 'भगवान महावीर ने सिखाया कि संसार के छोटे से छोटे जीव में भी आत्मा होती है। भूखे को भोजन, प्यासे को पानी, रोगी को औषधि और भयभीत को अभय देना ही जैन धर्म के चार सर्वोच्च दान (आहार, औषधि, ज्ञान, अभय) हैं।',
    coreTeaching: 'परस्परोपग्रहो जीवानाम्: सभी जीव एक-दूसरे के उपकार के लिए बने हैं।',
    icon: '🙏',
  },
  {
    id: 'good-samaritan',
    faithCategory: 'ईसाई शिक्षा',
    tag: 'सड़क पर घायल की मदद',
    title: 'द गुड सेमेरिटन (नेक मुसाफ़िर)',
    subtitle: 'सड़क पर घायल अजनबी का सहारा बनना',
    description: 'ईसा मसीह ने कहानी सुनाई कि एक व्यक्ति डाकुओं के हमले में सड़क किनारे अधमरा पड़ा था। कई लोग देखकर आगे निकल गए, लेकिन एक मुसाफिर ने रुककर उसके घावों पर तेल लगाया, अपनी सवारी पर बिठाकर सराय पहुंचाया और इलाज का सारा खर्च अपनी जेब से दिया।',
    coreTeaching: 'जो सड़क पर गिरे और लाचार की मदद करे, वही ईश्वर का सच्चा सेवक है।',
    icon: '✝️',
  },
];

export const INITIAL_COMMUNITY_BLESSINGS = [
  {
    id: 'b-1',
    donorName: 'Aman Sharma',
    categoryName: 'Annadaan & Street Food Seva',
    unitsText: '10 व्यक्तियों का भोजन',
    amount: 500,
    message: 'Bhai aapki reels dekh kar bohot prerna milti hai. Prabhu Shri Ram kripa karein! 🙏',
    timeAgo: 'Just now',
    isVerified: true,
  },
  {
    id: 'b-2',
    donorName: 'Priya Rathore',
    categoryName: 'Jeev Daya & Animal Rescue',
    unitsText: '5 मूक जीवों का भोजन',
    amount: 250,
    message: 'Gau mata aur be-sahara dogs ke liye meri choti si bhent. Har Har Mahadev!',
    timeAgo: '15 mins ago',
    isVerified: true,
  },
  {
    id: 'b-3',
    donorName: 'Rahul Verma',
    categoryName: 'Emergency Hospital & Patient Support',
    unitsText: 'डॉक्टर फीस व ब्लड टेस्ट',
    amount: 1100,
    message: 'Kisi zarooratmand ke hospital ilaj me kaam aaye. Jai Shri Ram!',
    timeAgo: '42 mins ago',
    isVerified: true,
  },
  {
    id: 'b-4',
    donorName: 'Farhan Ahmed',
    categoryName: 'Annadaan & Street Food Seva',
    unitsText: '10 व्यक्तियों का भोजन',
    amount: 500,
    message: 'Insaniyat sabse bada dhararm hai. Vipu bhai great ground relief! Duayein.',
    timeAgo: '1 hr ago',
    isVerified: true,
  },
  {
    id: 'b-5',
    donorName: 'Vikram Joshi',
    categoryName: 'Disaster Relief',
    unitsText: 'तिरपाल + राशन कॉम्बो',
    amount: 500,
    message: 'Emergency fund me mera yogdan. Great ground work!',
    timeAgo: '2 hrs ago',
    isVerified: true,
  },
];
