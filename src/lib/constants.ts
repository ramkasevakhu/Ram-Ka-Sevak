export interface SevaItemDetail {
  label: string;
  amount: number;
  whatIsGiven: string;
  popular?: boolean;
}

export interface DetailedSevaCategory {
  id: string;
  tabNumber: string;
  titleEnglish: string;
  titleHindi: string;
  shortName: string;
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
  defaultUpiName: process.env.NEXT_PUBLIC_UPI_NAME || 'Ram Ka Sevak',
};

export const DETAILED_SEVA_CATEGORIES: DetailedSevaCategory[] = [
  {
    id: 'roadside-relief',
    tabNumber: '01',
    shortName: 'Annadaan (Food Seva)',
    titleEnglish: 'Annadaan & Street Food Seva',
    titleHindi: 'अन्नदान सेवा (भूखे को भोजन)',
    shortDesc: 'Sadak par beghar buzurgon, zarooratmand majdooron aur street bacchon tak taza, poshtik aur garam thali khana deliver karna.',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Indian food distribution to the poor',
    unitCost: 50,
    unitName: '1 Garam Thali = ₹50',
    exactBreakdownTitle: '₹50 me kya kya diya jata hai? (Exact Food Menu)',
    exactBreakdownItems: [
      '4 Tazi Garam Roti (100% Shuddh Gehun)',
      'Poshtik Taza Sabzi (Paneer / Mix Veg / Aloo-Gobhi)',
      'Dal & Garam Basmati Chawal',
      'Taza Achar, Salad aur Saaf Peene ka Paani',
    ],
    options: [
      { label: '1 Vyakti ka Khana', amount: 50, whatIsGiven: '1 Garam Thali (4 Roti, Sabzi, Dal-Chawal, Saaf Paani)' },
      { label: '5 Logon ka Khana', amount: 250, whatIsGiven: '5 Complete Hot Meal Packs sadak par beghar buzurgon ko direct handover', popular: true },
      { label: '10 Logon ka Khana', amount: 500, whatIsGiven: '10 zarooratmand logon ka pet bhar poshtik bhojan' },
      { label: '25 Logon ka Langar', amount: 1250, whatIsGiven: 'Roadside buzurgon aur street kids ke liye langar seva drive' },
      { label: '50 Logon ka Mahabhoj', amount: 2500, whatIsGiven: 'Bada street food distribution drive aur bharpet bhojan' },
    ],
  },
  {
    id: 'animal-welfare',
    tabNumber: '02',
    shortName: 'Gau & Pashu Seva',
    titleEnglish: 'Jeev Daya & Animal Welfare',
    titleHindi: 'मूक जीव व गौ सेवा',
    shortDesc: 'Sadak ke street dogs ko daily doodh-roti, Gau Mata ko taza hara chara aur injured janwaron ko emergency medical rescue & treatment.',
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Sacred cow and stray animal care in India',
    unitCost: 50,
    unitName: '1 Pashu Seva = ₹50',
    exactBreakdownTitle: 'Pashuon ko kya khilaya jata hai? (Exact Diet)',
    exactBreakdownItems: [
      'Street Dogs: Garam doodh, boiled andey, tazi rotiyan aur high-protein dog food',
      'Gau Mata: Taza hara chara (Barseem/Jowar), gehun ka chokar aur meetha gud',
      'Injured Pashu: Antiseptic wound spray, sterile patti, dard nivarak davaai aur vet doctor ilaaj',
    ],
    options: [
      { label: '1 Street Dog Meal', amount: 50, whatIsGiven: 'Taza doodh, rotiyan aur poshtik dog food meal' },
      { label: '1 Gau Mata Hara Chara', amount: 100, whatIsGiven: 'Taza hara ghaas chara, gehun chokar aur meetha gud', popular: true },
      { label: '5 Street Dogs Feeding', amount: 250, whatIsGiven: '5 street dogs ke liye pet bhar nutritious diet' },
      { label: 'Gaushala Chara Bundle', amount: 500, whatIsGiven: 'Gaushala me gaayon ke liye bada hara chara bundle' },
      { label: 'Injured Animal Treatment', amount: 1000, whatIsGiven: 'Veterinary dressing, antiseptic injection aur zaroori davaaiyan' },
    ],
  },
  {
    id: 'medical-emergency',
    tabNumber: '03',
    shortName: 'Emergency Medical Aid',
    titleEnglish: 'Emergency Hospital & Patient Support',
    titleHindi: 'आपातकालीन चिकित्सा सहायता',
    shortDesc: 'Gareeb aur asahay marizon ke liye doctor consultation, zaroori dawaaiyan aur hospital bed charges me direct aarthik sahayata.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Medical aid for patient in India',
    unitCost: 500,
    unitName: 'Medical Daan = ₹500',
    exactBreakdownTitle: 'Aapka sahyog kahan kharch hota hai? (Exact Medical Care)',
    exactBreakdownItems: [
      'Dawaaiyan: Doctor ki parchi wali zaroori antibiotics, painkillers, glucose drip aur emergency supplies',
      'Jaanch (Diagnostics): Critical blood tests, X-rays ya ECG ke liye direct chemist/hospital payment',
      'Emergency Ward Bed & Surgery: Emergency ward charges, OT supplies aur life-saving treatment support',
    ],
    options: [
      { label: 'Zaroori Dawaai Sahayata', amount: 500, whatIsGiven: 'Doctor prescribed antibiotics, painkillers aur glucose saline drip' },
      { label: 'Doctor Fee & Lab Tests', amount: 1100, whatIsGiven: 'Specialist doctor consultation + Critical blood & diagnostic tests', popular: true },
      { label: 'Hospital Bed & Injections', amount: 2500, whatIsGiven: 'Emergency ward bed charges, IV drips aur zaroori injections' },
      { label: 'Surgery Contribution', amount: 5000, whatIsGiven: 'Operation theatre charges aur emergency life-saving dawaaiyan' },
      { label: 'Major ICU & Hospital Support', amount: 11000, whatIsGiven: 'Gareeb parivar ke ICU mareez ke hospital bill me direct settlement' },
    ],
  },
  {
    id: 'disaster-relief',
    tabNumber: '04',
    shortName: 'Disaster Relief Seva',
    titleEnglish: 'Disaster & Calamity Emergency Relief',
    titleHindi: 'आपदा राहत सेवा कोष',
    shortDesc: 'Baadh ya aafat me beghar hue parivaron tak sukha rashan survival kit, waterproof tripal (tarpaulin) aur peene ka saaf paani pahunchana.',
    imageUrl: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Disaster emergency relief packaging',
    unitCost: 250,
    unitName: '1 Relief Kit = ₹250',
    exactBreakdownTitle: 'Relief Kit me kya hota hai? (Emergency Survival)',
    exactBreakdownItems: [
      'Sukha Rashan: 5kg Aata, 2kg Chawal, Dal, Tel, Namak, Biscuits aur Maachis pack',
      'Chhat (Shelter): Baarish aur dhoop se bachav ke liye heavy-duty waterproof tripal (tarpaulin)',
      'Saaf Paani: Packaged mineral water bottles aur ORS rehydration packets',
    ],
    options: [
      { label: '1 Parivar Rashan Kit', amount: 250, whatIsGiven: '3-4 Din ka sukha khana pack (Aata, Chawal, Dal, Biscuits, Paani)' },
      { label: 'Tripal + Rashan Combo', amount: 500, whatIsGiven: 'Heavy-duty roof tripal (tarpaulin) + 1 hafte ka family food pack', popular: true },
      { label: '5 Parivaron ki Rahat', amount: 1250, whatIsGiven: '5 aafat-prabhavit parivaron ke liye rashan, paani aur zaroori samaan' },
      { label: 'Community Relief Langar', amount: 2500, whatIsGiven: 'Crisis area me garam khane ka langar camp aur peene ke paani ka tanker' },
      { label: 'Ghar Punarvaas Sahayata', amount: 5000, whatIsGiven: 'Khatigrast ghar ki repair sahayata aur zaroori gharelu punarvaas saman' },
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
    faithCategory: 'Ramayana (Sanatan)',
    tag: 'अन्नदान महादान',
    title: "माता शबरी के जूठे बेर (Mata Shabari's Ber)",
    subtitle: 'Bhakti aur prem me koi chhota-bada ya jaati-bhed nahi hota',
    description: 'Prabhu Shri Ram ne rajmahal ke 56 bhog chhodkar garib vridhha Mata Shabari ke prem se chakhe hue jhoothe ber khaye. Prabhu ne dikhaya ki kisi bhookhe ko dil se khilana hi sansaar ka sabse bada punya hai.',
    coreTeaching: '॥ अन्नदान ही सबसे बड़ा धर्म है ॥ Bhookhe ko khilana Prabhu ki sacchi pooja hai.',
    icon: '🥣',
  },
  {
    id: 'jatayu',
    faithCategory: 'Ramayana (Sanatan)',
    tag: 'मूक जीव रक्षा',
    title: 'पक्षीराज जटायु का उद्धार (Redemption of Jatayu)',
    subtitle: 'Bejubaan aur asahay jeev ki raksha apne pita samaan karna',
    description: 'Jab Ravana se ladte hue Jatayu veer-gati ko praapt hue, toh Prabhu Ram ne asahay pakshi ko aansuon ke sath gale lagaya aur pita samaan antim sanskar kiya. Prabhu ne sikhaya ki nirdosh bejubaan pashuon ki raksha karna bhagwan ki pratyaksh seva hai.',
    coreTeaching: '॥ मूक जीव रक्षा ही सेवा है ॥ Bejubaan pashu-pakshiyon ki raksha karna Prabhu seva hai.',
    icon: '🦅',
  },
  {
    id: 'squirrel',
    faithCategory: 'Ramayana (Sanatan)',
    tag: 'श्रद्धा का महत्व',
    title: 'राम सेतु की छोटी गिलहरी (The Ram Setu Squirrel)',
    subtitle: 'Shraddha aur seva me koi bhi chhota yogdan chhota nahi hota',
    description: 'Samudra par Setu banate samay ek nanhi gilahari ret me lotkar pattharon ke beech ret daal rahi thi. Vanaron ke hasne par Prabhu Ram ne use bade prem se apni hatheli par uthaya aur peeth par aashirwad diya. Prabhu ne kaha — daan me dhan ka aakaar nahi, dil ki nishtha dekhi jaati hai.',
    coreTeaching: '॥ श्रद्धा ही सब कुछ है ॥ Aapka ₹50 ka daan bhi Prabhu ke charno me amulya hai.',
    icon: '🐿️',
  },
  {
    id: 'karna',
    faithCategory: 'Mahabharata',
    tag: 'निःस्वार्थ महादान',
    title: "दानवीर कर्ण का अंतिम महादान (Daanveer Karna)",
    subtitle: 'Antim saans tak nishkaam daan ki amar prerna',
    description: 'Kurukshetra ke yuddh-kshetra me ghaayal pade Karna se jab Bhagwan Krishna ne yaachak bankar daan maanga, toh Karna ne patthar se apna sone ka daant todkar bhet kar diya. Krishna ne kaha ki nishkaam daan karne wala aakash me surya ki tarah sada chamakta hai.',
    coreTeaching: '॥ दानवीरता ही अमर है ॥ Saccha daan wahi hai jo sankat ke samay bina kisi swarth ke diya jaye.',
    icon: '🏹',
  },
  {
    id: 'sudama',
    faithCategory: 'Mahabharata / Bhagavata',
    tag: 'पवित्र समर्पण',
    title: "श्री कृष्ण और सुदामा के तंदुल (Sudama's Puffed Rice)",
    subtitle: 'Prem ki ek mutthi dhan-daulat se hazaar guna badi hai',
    description: 'Fatey-purane vastron me aaye garib Sudama ke charan Bhagwan Krishna ne apne aansuon se dhoye aur faati potli me se tandul (chawal) bade chaav se khaye. Prabhu ne dikhaya ki seva me dhan nahi, sirf bhavna aur samarpan dekha jaata hai.',
    coreTeaching: '॥ भाव ही भगवान है ॥ Prem se diya gaya ek daana bhi anant guna phal deta hai.',
    icon: '🦚',
  },
  {
    id: 'mahadev',
    faithCategory: 'Mahadev (Lord Shiva)',
    tag: 'पशुपतिनाथ सेवा',
    title: "पशुपतिनाथ महादेव (Lord Shiva as Pashupatinath)",
    subtitle: 'Har bhatke, laawaris aur peedit jeev ke devta',
    description: 'Bhagwan Shiv ko Pashupatinath kaha gaya hai — jo sabhi bejubaan pashuon, street animals aur beghar jeevon ke pita aur rakshak hain. Sansaar ko bachane ke liye Mahadev ne swayam vish peekar sabhi praniyon ki jeevan-raksha ki.',
    coreTeaching: '॥ सर्वभूतहिते रताः ॥ Asahay pashuon par daya karne wale par Mahadev ki kripa hoti hai.',
    icon: '🔱',
  },
  {
    id: 'guru-nanak',
    faithCategory: 'Sikh Tradition',
    tag: 'सच्चा सौदा व लंगर',
    title: 'गुरु नानक देव जी का "सच्चा सौदा" (Sacha Sauda)',
    subtitle: 'Bhookhe ko khana khilana hi jeevan ka sabse bada vyapar hai',
    description: 'Pita ji ne balak Nanak ko 20 chandi ke sikke dekar vyapar karne bheja. Nanak ji ne jangal me bhookhe sadhuon aur zarooratmand logon ko dekha toh poore paise ka ration khareed kar unka pet bhara. Kaha: "Bhookhe ko khilane se bada koi saccha vyapar nahi hai."',
    coreTeaching: '॥ वंड छको (Vand Chhako) ॥ Apni kamayi zarooratmand ke sath baantna hi saccha dharam hai.',
    icon: 'ੴ',
  },
  {
    id: 'prophet-dog',
    faithCategory: 'Islamic Tradition',
    tag: 'जीवों पर रहम',
    title: 'रेगिस्तान में प्यासा कुत्ता (The Thirsty Dog in Desert)',
    subtitle: 'Bejubaan pashu ko paani pilane se Khuda ki rehemat milti hai',
    description: 'Hadith me aata hai ki dhoop se tapte registan me ek musafir ne dekha ki ek pyaasa kutta tadapkar geeli mitti chaat raha hai. Us shakhs ne kuye me utarkar apne joote me paani bhara aur daanto se pakadkar upar lakar kutte ki pyaas bujhayi. Khuda ne uski rehem-dili dekhkar uske saare gunaah maaf kar diye.',
    coreTeaching: '॥ रहम ही इबादत है ॥ Har zinda jeev par rehem karne ka ajar (punya) milta hai.',
    icon: '🌙',
  },
  {
    id: 'hazrat-ali',
    faithCategory: 'Islamic Tradition',
    tag: 'त्याग व सखी दान',
    title: 'हज़रत अली का तीन दिन का रोज़ा (Hazrat Ali)',
    subtitle: 'Swayam bhookhe rehkar zarooratmand ko pehle khilana',
    description: 'Quran (Surah Al-Insan) me zikr hai ki jab Hazrat Ali aur unke parivar ne 3 din lagatar roza rakha, toh har shaam iftar ke waqt ek yateem (orphan), mohtaj (destitute) aur qaidi ne aakar khana maanga. Parivar ne har din apni aakhri roti unhe de di aur sirf paani se roza khola.',
    coreTeaching: '॥ इंसानियत ही इबादत है ॥ Apni zaroorat bhoolkar dusron ka pet bharna hi mahanata hai.',
    icon: '✨',
  },
  {
    id: 'buddha',
    faithCategory: 'Buddhist Wisdom',
    tag: 'सर्वोच्च करुणा',
    title: 'राजकुमार सिद्धार्थ और घायल हंस (Prince Siddhartha)',
    subtitle: 'Maarne wale se bachane wala hamesha bada hota hai',
    description: 'Jab Devadatta ne ek nirdosh hans ko teer maara, toh Siddhartha ne nikalte teer ko aaram se nikala, ghaav dhoya aur paani pilakar uski jaan bachayi. Raj-darbar me faisla hua: "Jeevan par usika adhikaar hai jo jeevan bachata hai, uska nahi jo chheenta hai."',
    coreTeaching: '॥ अहिंसा और करुणा ही सत्य है ॥ Sabhi jeevon par daya aur karuna hi param dharam hai.',
    icon: '☸️',
  },
  {
    id: 'mahavira',
    faithCategory: 'Jain Philosophy',
    tag: 'अहिंसा परमो धर्मः',
    title: 'भगवान महावीर: अहिंसा परमो धर्मः (Lord Mahavira)',
    subtitle: 'Jeev daya aur asahay ko abhay daan dena sabse bada dharam',
    description: 'Bhagwan Mahavira ne sikhaya ki sansaar ke har chhot-bade jeev me ek samaan aatma hai. Jain darshan me Ahaar-Daan (Food), Aushadhi-Daan (Medicine) aur Abhay-Daan (Protection) ko manavta ka sarvochha daan mana gaya hai.',
    coreTeaching: '॥ परस्परोपग्रहो जीवानाम् ॥ Sabhi jeev ek-dusre ki seva aur sahyog ke liye bane hain.',
    icon: '🙏',
  },
  {
    id: 'good-samaritan',
    faithCategory: 'Christian Teachings',
    tag: 'दीन-दुखी की सेवा',
    title: 'सड़क किनारे घायल की मदद (The Good Samaritan)',
    subtitle: 'Girte hue ajnabi ko uthana hi Prabhu ka saccha kaam hai',
    description: 'Raste me loot-mar se ghaayal pade vyakti ko dekhkar kai log aage nikal gaye, lekin ek dayalu ajnabi ne ruk kar uske ghaav par patti baandhi, hospital pahunchaya aur apne paas se pura kharcha bhara. Jesus ne kaha: "Jo peedit ki madad ke liye rukta hai, wahi saccha sevak hai."',
    coreTeaching: '॥ पीड़ित की सेवा ही ईश्वर सेवा है ॥ Jo asahay ka sahara bane, wahi Prabhu ka saccha sevak hai.',
    icon: '✝️',
  },
];

export const INITIAL_COMMUNITY_BLESSINGS = [
  {
    id: 'b-1',
    donorName: 'Aman Sharma',
    categoryName: 'Annadaan (Food Seva)',
    unitsText: '10 Logon ka Khana',
    amount: 500,
    message: 'Bhai aapki reels dekhkar dil khush ho gaya. Prabhu Shri Ram aapke is pavitra ground work ko sada safal banayein! 🙏',
    timeAgo: 'Just now',
    isVerified: true,
  },
  {
    id: 'b-2',
    donorName: 'Priya Rathore',
    categoryName: 'Gau & Pashu Seva',
    unitsText: '1 Gau Mata Hara Chara',
    amount: 100,
    message: 'Gau Mata aur street dogs ke liye mera chhota sa sahyog. Har Har Mahadev!',
    timeAgo: '15 mins ago',
    isVerified: true,
  },
  {
    id: 'b-3',
    donorName: 'Rahul Verma',
    categoryName: 'Emergency Medical Aid',
    unitsText: 'Doctor Fee & Lab Tests',
    amount: 1100,
    message: 'Umeed hai isse kisi gareeb mareez ko turant hospital me treatment mil sakega. Jai Shri Ram!',
    timeAgo: '42 mins ago',
    isVerified: true,
  },
  {
    id: 'b-4',
    donorName: 'Farhan Ahmed',
    categoryName: 'Annadaan (Food Seva)',
    unitsText: '10 Logon ka Khana',
    amount: 500,
    message: 'Insaniyat se bada koi mazhab nahi. Vipu bhai, aapke selfless ground action ko dil se salaam!',
    timeAgo: '1 hr ago',
    isVerified: true,
  },
  {
    id: 'b-5',
    donorName: 'Vikram Joshi',
    categoryName: 'Disaster Relief Seva',
    unitsText: 'Tripal + Rashan Combo',
    amount: 500,
    message: 'Aapda emergency relief fund me mera chhota sa hissa. Bahut hi shandar aur imaandaar prayas!',
    timeAgo: '2 hrs ago',
    isVerified: true,
  },
];
