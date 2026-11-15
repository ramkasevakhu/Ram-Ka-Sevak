import { SevaCategory } from './types';

export const SITE_CONFIG = {
  name: 'Ram Ka Sevak',
  domain: 'ramkasevak.org',
  taglineHindi: 'हर ज़रूरतमंद का सहारा — राम का सेवक',
  taglineEnglish: 'Serving the Needy, Protecting Every Soul',
  creatorName: 'Vipu',
  creatorUsername: 'vipuone',
  officialEmail: 'contact@ramkasevak.org',
  socialLinks: {
    instagram: 'https://instagram.com/vipuone',
    youtube: 'https://youtube.com/@vipuone',
    facebook: 'https://facebook.com/vipuone',
  },
  // Default UPI address (can be overridden by NEXT_PUBLIC_UPI_ID in env)
  defaultUpiId: process.env.NEXT_PUBLIC_UPI_ID || 'vipuone@upi',
  defaultUpiName: process.env.NEXT_PUBLIC_UPI_NAME || 'Ram Ka Sevak (Vipu Seva Trust)',
};

export const SEVA_CATEGORIES: SevaCategory[] = [
  {
    id: 'roadside-relief',
    titleHindi: 'अन्नदान एवं सड़क सहायता',
    titleEnglish: 'Annadaan & Roadside Relief',
    badgeHindi: 'भूखों को भोजन व सहारा',
    badgeEnglish: 'Food & Homeless Care',
    tagline: 'Sadak kinare be-sahara logo ko taaza paushtik bhojan aur kapde',
    description: 'Footpath aur sadak kinare be-ghar, vriddh aur asahay logo tak sidha taaza bhojan, pani aur mausam anusaar garam kapde pahuchana.',
    iconName: 'Utensils',
    minAmount: 50,
    highlightTag: 'Sabse Zyada Zaroori',
    unitConfig: {
      unitLabelHindi: 'व्यक्ति का भोजन',
      unitLabelEnglish: 'Person Meal',
      unitCost: 50,
      presets: [1, 5, 10, 25, 50, 100],
      unitDescription: '₹50 me 1 vyakti ko taaza, swacch aur paushtik pet-bhar bhojan diya jata hai.',
    },
    quickSlabs: [
      { label: '1 Vyakti Ka Bhojan', amount: 50, impact: '1 Bhookhe ko Bhojan' },
      { label: '5 Logo Ka Bhojan', amount: 250, impact: '5 Zarooratmand ko Bhojan', popular: true },
      { label: '10 Logo Ka Bhojan', amount: 500, impact: '10 Logo ko Pavitra Annadaan' },
      { label: '25 Logo Ka Langar', amount: 1250, impact: '25 Logo ko Bhojan + Paani' },
      { label: '50 Logo Ka Mahabhoj', amount: 2500, impact: '50 Sadak Nivasiyo ko Seva' },
    ],
    points: [
      'Rozana ground par sadak aur red-light par direct distribution',
      'Taaza, garam aur hygienically banaya gaya bhojan',
      'Sardiyo me kambal aur garmiyo me thanda jal sahayata',
    ],
  },
  {
    id: 'animal-welfare',
    titleHindi: 'मूक जीव एवं गौ सेवा',
    titleEnglish: 'Jeev Daya & Animal Welfare',
    badgeHindi: 'गौ माता व स्ट्रीट डॉग्स',
    badgeEnglish: 'Stray Dogs & Cow Rescue',
    tagline: 'Ghayal aur bhookhe be-zubaan mook jeevo ki chikitsa aur aahaar',
    description: 'Gau-vansh ke liye hara chara, sadak ke be-sahara dogs ke liye paushtik bhojan, aur ghayal be-zubano ka turant ilaj va rescue.',
    iconName: 'HeartHandshake',
    minAmount: 50,
    highlightTag: 'Mook Jeev Daya',
    unitConfig: {
      unitLabelHindi: 'मूक जीव आहार',
      unitLabelEnglish: 'Animal Meal / Care',
      unitCost: 50,
      presets: [1, 5, 10, 20, 50],
      unitDescription: '₹50 me street dogs ka meal ya Gau-mata ke liye chara/poshan pradan hota hai.',
    },
    quickSlabs: [
      { label: '1 Mook Jeev Aahaar', amount: 50, impact: '1 Stray Dog / Gau Seva' },
      { label: '5 Jeev Aahaar', amount: 250, impact: '5 Be-zubaan Jeevo ko Khana', popular: true },
      { label: '10 Jeev Poshan', amount: 500, impact: '10 Animals Diet & Biscuit' },
      { label: 'Ghayal Jeev First-Aid', amount: 1000, impact: 'Rescue & Medical Dressing' },
      { label: 'Monthly Pack Gau-Grass', amount: 2500, impact: 'Badi Gau-Shala Chara Seva' },
    ],
    points: [
      'Street dogs ke liye daily fresh meal & boiled eggs/pedigree',
      'Gau-mata ke liye hara chara, gur aur chokar seva',
      'Accident ya ghayal hone par instant antiseptic dressing & vet care',
    ],
  },
  {
    id: 'medical-emergency',
    titleHindi: 'आपातकालीन चिकित्सा सहायता',
    titleEnglish: 'Apatkalin Chikitsa (Medical Emergency & Doctor Care)',
    badgeHindi: 'अस्पताल व ऑपरेशन राहत',
    badgeEnglish: 'Critical Hospital & Doctor Support',
    tagline: 'Garib marizo ke operation, dava aur hospital charges me sidhi madad',
    description: 'Aise garib parivaar jinke paas doctor ki fees, zaroori dawaiyo ya achanak aaye operation ke paise nahi hote, unko turant medical sahayata.',
    iconName: 'Activity',
    minAmount: 500,
    highlightTag: 'Jeevan Raksha',
    unitConfig: {
      unitLabelHindi: 'मेडिकल किट / सहायता',
      unitLabelEnglish: 'Emergency Medical Unit',
      unitCost: 500,
      presets: [1, 2, 5, 10, 20],
      unitDescription: '₹500 me zarooratmand mariz ke liye zaroori emergency dawaayein uplabdh hoti hain.',
    },
    quickSlabs: [
      { label: '1 Emergency Medicine Kit', amount: 500, impact: 'Zaroori Dawaayein & Parikshan' },
      { label: 'Doctor Consultation & Tests', amount: 1100, impact: 'Specialist Doctor + Blood Test', popular: true },
      { label: 'Hospital Admit Sahayata', amount: 2500, impact: 'Emergency Bed & Injection Care' },
      { label: 'Critical Surgery Contribution', amount: 5000, impact: 'Operation Theatre & Life-Saving Relief' },
      { label: 'Major Treatment Sahayata', amount: 11000, impact: 'Parivaar ko ICU / Badi Bimari Relief' },
    ],
    points: [
      'Direct chemist ya hospital bill me genuine reimbursement',
      'Doctor prescription verify karke hi dava vitran',
      'Life-saving emergency me bina deri kiye turant ground relief',
    ],
  },
  {
    id: 'disaster-relief',
    titleHindi: 'प्राकृतिक आपदा राहत कोष',
    titleEnglish: 'Prakritik Aapadha Rahat (Disaster & Calamity Relief)',
    badgeHindi: 'बाढ़, भूकंप व विपदा',
    badgeEnglish: 'Floods, Earthquakes & Crisis Relief',
    tagline: 'Kudrat ki aafat se prabhavit logo ke liye emergency relief fund',
    description: 'Baadh (Floods), Bhukamp ya kisi bhi achanak aayi prakritik aapadha me be-ghar hue logo tak tarpaulin, rashan kit aur emergency kit pahuchana.',
    iconName: 'ShieldAlert',
    minAmount: 250,
    highlightTag: 'Evergreen Emergency Fund',
    unitConfig: {
      unitLabelHindi: 'आपदा राहत किट',
      unitLabelEnglish: 'Disaster Relief Kit',
      unitCost: 250,
      presets: [1, 2, 5, 10, 20],
      unitDescription: '₹250 me 1 aapatkalin rashan v prathmik sahayata kit tayyar hoti hai.',
    },
    quickSlabs: [
      { label: '1 Emergency Ration Kit', amount: 250, impact: '3 Din ka Sukha Ration & Paani' },
      { label: '2 Parivaar Sahayata Kit', amount: 500, impact: 'Tarpaulin Tripal + Rashan Kit', popular: true },
      { label: '5 Parivaar Relief Kit', amount: 1250, impact: '5 Families Complete Aid Pack' },
      { label: 'Community Relief Camp', amount: 2500, impact: 'Aapadha Kshetr me Bada Seva Shivir' },
      { label: 'Punarvaas Sahayata', amount: 5000, impact: 'Ghar Thik Karne me Arthik Madad' },
    ],
    points: [
      'Evergreen Aapadha Kosh — aafat aane par turant dispatch',
      'Sukha rashan, peene ka shuddh paani aur tripal kit',
      'Ground par team dwara direct prabhavit kshetr me delivery',
    ],
  },
];

export const INITIAL_COMMUNITY_BLESSINGS: {
  id: string;
  donorName: string;
  categoryName: string;
  unitsText: string;
  amount: number;
  message?: string;
  timeAgo: string;
  isVerified: boolean;
}[] = [
  {
    id: 'b-1',
    donorName: 'Aman Sharma',
    categoryName: 'अन्नदान एवं सड़क सहायता',
    unitsText: '10 vyaktiyon ka bhojan',
    amount: 500,
    message: 'Bhai aapki reels dekh kar bohot prerna milti hai. Prabhu Shri Ram kripa karein! 🙏',
    timeAgo: 'Abhi kuch der pehle',
    isVerified: true,
  },
  {
    id: 'b-2',
    donorName: 'Priya Rathore',
    categoryName: 'मूक जीव एवं गौ सेवा',
    unitsText: '5 Gau-Mata Chara Seva',
    amount: 250,
    message: 'Gau mata aur be-sahara dogs ke liye meri choti si bhent. Har Har Mahadev!',
    timeAgo: '15 minute pehle',
    isVerified: true,
  },
  {
    id: 'b-3',
    donorName: 'Rahul Verma (Delhi)',
    categoryName: 'आपातकालीन चिकित्सा',
    unitsText: '1 Emergency Medical Kit',
    amount: 1100,
    message: 'Kisi zarooratmand ke ilaj me kaam aaye. Jai Shri Ram!',
    timeAgo: '42 minute pehle',
    isVerified: true,
  },
  {
    id: 'b-4',
    donorName: 'Anonymous Sevak',
    categoryName: 'अन्नदान एवं सड़क सहायता',
    unitsText: '25 Logo Ka Langar',
    amount: 1250,
    message: 'Gupt Daan. Ram ji sabka bhala karein.',
    timeAgo: '1 ghanta pehle',
    isVerified: true,
  },
  {
    id: 'b-5',
    donorName: 'Vikram Joshi',
    categoryName: 'प्राकृतिक आपदा राहत कोष',
    unitsText: '2 Disaster Relief Kits',
    amount: 500,
    message: 'Emergency fund me mera yogdan. Vipu bhai great ground work!',
    timeAgo: '2 ghante pehle',
    isVerified: true,
  },
];
