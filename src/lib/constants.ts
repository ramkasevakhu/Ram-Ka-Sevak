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
    shortName: 'Annadaan (Food Relief)',
    titleEnglish: 'Annadaan & Street Food Seva',
    titleHindi: 'अन्नदान सेवा',
    shortDesc: 'Providing fresh, hygienic, and nutritious hot meal thalis directly to roadside homeless elders and children.',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Indian food distribution to the poor',
    unitCost: 50,
    unitName: '1 Meal = ₹50',
    exactBreakdownTitle: 'What is included in ₹50? (Exact Food Menu)',
    exactBreakdownItems: [
      '4 Fresh Hot Rotis (100% Whole Wheat)',
      'Nutritious Seasonal Curry (Paneer / Mixed Veg / Aloo-Gobi)',
      'Lentil Dal & Steamed Basmati Rice',
      'Fresh Pickle, Salad & Clean Drinking Water',
    ],
    options: [
      { label: '1 Person Meal', amount: 50, whatIsGiven: '1 Fresh Hot Thali Meal (4 Rotis, Sabzi, Dal-Chawal, Water)' },
      { label: '5 People Meals', amount: 250, whatIsGiven: '5 Complete Hot Meal Packs distributed to roadside homeless', popular: true },
      { label: '10 People Meals', amount: 500, whatIsGiven: 'Full stomach fresh hot meals for 10 hungry people on streets' },
      { label: '25 People Langar', amount: 1250, whatIsGiven: 'Street langar seva for 25 destitute elders & street kids' },
      { label: '50 People Mahabhoj', amount: 2500, whatIsGiven: 'Large-scale roadside fresh food distribution drive' },
    ],
  },
  {
    id: 'animal-welfare',
    tabNumber: '02',
    shortName: 'Animal Care & Cow Rescue',
    titleEnglish: 'Jeev Daya & Animal Welfare',
    titleHindi: 'मूक जीव व गौ सेवा',
    shortDesc: 'Daily nutritious meals for stray dogs, fresh green fodder for cows, and emergency medical rescue.',
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Sacred cow and stray animal care in India',
    unitCost: 50,
    unitName: '1 Animal Feed = ₹50',
    exactBreakdownTitle: 'What do we feed the animals? (Exact Diet)',
    exactBreakdownItems: [
      'Street Dogs: Fresh milk, boiled eggs, warm rotis & high-protein dog kibble',
      'Sacred Cows: Fresh green fodder (Barseem/Jowar), wheat bran (chokar) & sweet jaggery',
      'Injured Animals: Antiseptic wound spray, sterile bandages, pain relief & vet care',
    ],
    options: [
      { label: '1 Stray Dog Meal', amount: 50, whatIsGiven: 'Fresh milk, rotis & high-protein nutritious dog meal' },
      { label: '1 Cow Green Fodder', amount: 100, whatIsGiven: 'Fresh green grass, wheat bran (chokar) & sweet jaggery (gud)', popular: true },
      { label: '5 Stray Dogs Feeding', amount: 250, whatIsGiven: 'Nutritious diet and wholesome food for 5 street dogs' },
      { label: 'Gaushala Fodder Bundle', amount: 500, whatIsGiven: 'Large green fodder grass bundle for gaushala cows' },
      { label: 'Injured Animal Treatment', amount: 1000, whatIsGiven: 'Veterinary dressing, antiseptic injection & essential medicines' },
    ],
  },
  {
    id: 'medical-emergency',
    tabNumber: '03',
    shortName: 'Emergency Medical & Doctor Aid',
    titleEnglish: 'Emergency Hospital & Patient Support',
    titleHindi: 'आपातकालीन चिकित्सा',
    shortDesc: 'Direct financial assistance for destitute patients struggling with doctor consultations, medicines, and hospital charges.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Medical aid for patient in India',
    unitCost: 500,
    unitName: 'Medical Aid = ₹500',
    exactBreakdownTitle: 'Where is your contribution used? (Exact Medical Care)',
    exactBreakdownItems: [
      'Medicines: Prescription antibiotics, painkillers, glucose drip & emergency supplies',
      'Diagnostics: Direct hospital/lab payment for critical blood tests, X-rays, or ECGs',
      'Hospital Bed & Surgery: Emergency ward charges, OT supplies & life-saving support',
    ],
    options: [
      { label: 'Essential Medicines Support', amount: 500, whatIsGiven: 'Doctor prescribed antibiotics, painkillers & saline drip' },
      { label: 'Doctor Consultation & Lab Tests', amount: 1100, whatIsGiven: 'Specialist doctor fee + Blood & Diagnostic tests', popular: true },
      { label: 'Hospital Emergency Bed & Injections', amount: 2500, whatIsGiven: 'Emergency ward bed charges, IV drips & critical injections' },
      { label: 'Critical Surgery Contribution', amount: 5000, whatIsGiven: 'Operation theatre charges & emergency life-saving medicines' },
      { label: 'Major ICU & Hospital Bill Support', amount: 11000, whatIsGiven: 'Direct hospital bill settlement for poor families in critical care' },
    ],
  },
  {
    id: 'disaster-relief',
    tabNumber: '04',
    shortName: 'Disaster Emergency Relief',
    titleEnglish: 'Disaster & Calamity Emergency Relief',
    titleHindi: 'आपदा राहत कोष',
    shortDesc: 'Immediate dispatch of dry ration survival packs, waterproof tarpaulins, and potable water to displaced families.',
    imageUrl: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Disaster emergency relief packaging',
    unitCost: 250,
    unitName: '1 Relief Kit = ₹250',
    exactBreakdownTitle: 'What is inside the Relief Kit? (Emergency Survival)',
    exactBreakdownItems: [
      'Dry Ration: 5kg Wheat flour, 2kg Rice, Lentils, Cooking oil, Salt, Biscuits & Matches',
      'Shelter: Heavy-duty waterproof tarpaulin (tripal) for rain and sun protection',
      'Clean Water: Packaged mineral water bottles and oral rehydration salt (ORS) packets',
    ],
    options: [
      { label: '1 Family Dry Ration Kit', amount: 250, whatIsGiven: '3-4 Days dry food pack (Wheat flour, Rice, Dal, Biscuits, Water)' },
      { label: 'Tarpaulin + Ration Combo', amount: 500, whatIsGiven: 'Heavy-duty roof tarpaulin (tripal) + 1 Week family food pack', popular: true },
      { label: '5 Families Emergency Relief', amount: 1250, whatIsGiven: 'Complete food, water & essential survival supplies for 5 families' },
      { label: 'Community Relief Kitchen', amount: 2500, whatIsGiven: 'Hot food langar camp & clean drinking water tanker in crisis area' },
      { label: 'Home Rehabilitation Support', amount: 5000, whatIsGiven: 'Damaged house repair aid & essential household recovery items' },
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
    tag: 'Sacred Annadaan',
    title: "Mata Shabari's Ber",
    subtitle: 'Love and hunger know no status or caste',
    description: 'Lord Shri Ram left behind royal palace banquets to eat the wild berries tasted with pure devotion by the impoverished elderly Mata Shabari. He showed that feeding someone with genuine love is the supreme virtue in the universe.',
    coreTeaching: 'Feeding the hungry is the highest form of devotion.',
    icon: '🥣',
  },
  {
    id: 'jatayu',
    faithCategory: 'Ramayana (Sanatan)',
    tag: 'Animal Protection',
    title: 'The Redemption of Jatayu',
    subtitle: 'Honoring a noble wounded creature as a father',
    description: 'When Jatayu fought bravely against Ravana to protect righteousness, Lord Ram embraced the fallen bird with tears and performed his last rites with the dignity given to his own father. He taught that defending innocent creatures is direct worship of God.',
    coreTeaching: 'Protecting innocent, speechless animals is true devotion.',
    icon: '🦅',
  },
  {
    id: 'squirrel',
    faithCategory: 'Ramayana (Sanatan)',
    tag: 'Power of Small Giving',
    title: 'The Ram Setu Little Squirrel',
    subtitle: 'No act of kindness or contribution is too small',
    description: 'While building the bridge across the ocean, a tiny squirrel rolled in sand to drop grains between the boulders. The mighty warriors laughed, but Lord Ram gently lifted her on his palm and stroked her back. He declared that sincere intention outweighs the size of the gift.',
    coreTeaching: 'Even your ₹50 contribution is sacred in the eyes of God.',
    icon: '🐿️',
  },
  {
    id: 'karna',
    faithCategory: 'Mahabharata',
    tag: 'Selfless Charity',
    title: "Daanveer Karna's Ultimate Gift",
    subtitle: 'Giving till the very last breath',
    description: 'Even as Karna lay wounded on the battlefield, Lord Indra tested him in the guise of a destitute traveler asking for charity. With nothing left to give, Karna broke his gold teeth with a stone and offered them freely. Lord Krishna declared him the ultimate symbol of daan.',
    coreTeaching: 'True charity is given selflessly when the need is greatest.',
    icon: '🏹',
  },
  {
    id: 'sudama',
    faithCategory: 'Mahabharata / Bhagavata',
    tag: 'Pure Compassion',
    title: "Krishna & Sudama's Puffed Rice",
    subtitle: 'A humble handful of grain loved beyond all gold',
    description: 'When poor Sudama arrived in rags, Lord Krishna washed his feet with his own tears and joyfully ate the humble puffed rice Sudama brought in a torn cloth. God demonstrated that what matters in seva is heart and sincerity, not wealth.',
    coreTeaching: 'A single grain offered with devotion is blessed infinitely.',
    icon: '🦚',
  },
  {
    id: 'mahadev',
    faithCategory: 'Mahadev (Lord Shiva)',
    tag: 'Protector of All Beings',
    title: "Mahadev as 'Pashupatinath'",
    subtitle: 'Guardian of every stray, rejected, and suffering soul',
    description: 'Lord Shiva is venerated as Pashupatinath—the divine father and protector of every animal, stray, and abandoned being. When toxic poison threatened creation, Mahadev drank it himself to safeguard every living creature.',
    coreTeaching: 'Those who show mercy to helpless animals receive divine blessings.',
    icon: '🔱',
  },
  {
    id: 'guru-nanak',
    faithCategory: 'Sikh Tradition',
    tag: 'Sacha Sauda & Langar',
    title: 'Guru Nanak Dev Ji’s "Sacha Sauda"',
    subtitle: 'Feeding the hungry is the true business of life',
    description: 'Young Guru Nanak was given 20 silver coins by his father to do profitable business. Finding a group of starving sadhus and poor folk in the forest, he spent all the money buying food and feeding them. He proclaimed: "There is no truer or more profitable business than feeding hungry souls."',
    coreTeaching: 'Vand Chhako: Share your food with the needy; that is the true path to God.',
    icon: 'ੴ',
  },
  {
    id: 'prophet-dog',
    faithCategory: 'Islamic Tradition',
    tag: 'Compassion to Animals',
    title: 'The Thirsty Dog in the Desert',
    subtitle: 'Forgiveness and grace for saving a thirsty animal',
    description: 'In the Hadith, a traveler in the scorching desert saw a thirsty dog licking wet sand in agony. The man climbed down a deep well, filled his shoe with cool water, and held it with his teeth to quench the dog’s thirst. God was pleased with his mercy and granted him eternal grace.',
    coreTeaching: 'There is a reward for kindness to every living creature. Charity never decreases wealth.',
    icon: '🌙',
  },
  {
    id: 'hazrat-ali',
    faithCategory: 'Islamic Tradition',
    tag: 'Sacrifice for Others',
    title: 'Hazrat Ali & The 3 Days of Fasting',
    subtitle: 'Staying hungry to feed the orphan, prisoner, and poor',
    description: 'The Quran (Surah Al-Insan) records that when Hazrat Ali and his family fasted for three consecutive days, at each sunset a hungry orphan, a destitute beggar, and a captive arrived asking for food. Each evening, the family gave away their only bread and broke their fast with only water.',
    coreTeaching: 'Placing the hunger of the destitute before your own is the pinnacle of humanity.',
    icon: '✨',
  },
  {
    id: 'buddha',
    faithCategory: 'Buddhist Wisdom',
    tag: 'Supreme Karuna',
    title: 'Prince Siddhartha & The Wounded Swan',
    subtitle: 'The one who saves life is always greater than the one who takes it',
    description: 'When Prince Devadatta shot a swan with an arrow, young Siddhartha gently removed the arrow, washed the bird’s wound, and gave it cool water. When brought before the king’s court, the council ruled: "Life belongs to the one who protects and saves it, not to the one who hurts it."',
    coreTeaching: 'Compassion and mercy toward all living beings is the highest truth.',
    icon: '☸️',
  },
  {
    id: 'mahavira',
    faithCategory: 'Jain Philosophy',
    tag: 'Ahimsa & Jiva Daya',
    title: 'Bhagwan Mahavira’s "Ahimsa Paramo Dharma"',
    subtitle: 'Protecting life and removing fear is the greatest gift',
    description: 'Lord Mahavira taught that consciousness dwells in every living creature, big or small. In Jain ethics, the four supreme gifts to humanity are Ahaar-Daan (Food), Aushadhi-Daan (Medicine), Abhay-Daan (Protection from harm), and Gyaan-Daan (Knowledge).',
    coreTeaching: 'Parasparopagraho Jivanam: All life is interconnected in mutual service.',
    icon: '🙏',
  },
  {
    id: 'good-samaritan',
    faithCategory: 'Christian Teachings',
    tag: 'Helping the Wounded',
    title: 'The Good Samaritan',
    subtitle: 'Stopping on the road to heal a suffering stranger',
    description: 'Jesus shared the parable of a traveler beaten by thieves and left wounded beside the road. While others walked past, a compassionate traveler stopped, tended to his wounds with oil and bandages, placed him on his donkey, and paid the innkeeper for his entire hospital care.',
    coreTeaching: 'Whoever stops to lift the fallen and suffering is the true servant of God.',
    icon: '✝️',
  },
];

export const INITIAL_COMMUNITY_BLESSINGS = [
  {
    id: 'b-1',
    donorName: 'Aman Sharma',
    categoryName: 'Annadaan (Food Relief)',
    unitsText: '10 People Meals',
    amount: 500,
    message: 'Brother, your reels are truly inspiring. May Lord Shri Ram bless your ground work! 🙏',
    timeAgo: 'Just now',
    isVerified: true,
  },
  {
    id: 'b-2',
    donorName: 'Priya Rathore',
    categoryName: 'Animal Care & Cow Rescue',
    unitsText: '1 Cow Green Fodder',
    amount: 100,
    message: 'My humble contribution for sacred cows and street dogs. Har Har Mahadev!',
    timeAgo: '15 mins ago',
    isVerified: true,
  },
  {
    id: 'b-3',
    donorName: 'Rahul Verma',
    categoryName: 'Emergency Medical & Doctor Aid',
    unitsText: 'Doctor Consultation & Lab Tests',
    amount: 1100,
    message: 'Hope this helps a destitute patient get immediate hospital treatment. Jai Shri Ram!',
    timeAgo: '42 mins ago',
    isVerified: true,
  },
  {
    id: 'b-4',
    donorName: 'Farhan Ahmed',
    categoryName: 'Annadaan (Food Relief)',
    unitsText: '10 People Meals',
    amount: 500,
    message: 'Humanity is the highest religion. Vipu brother, salute to your selfless ground action!',
    timeAgo: '1 hr ago',
    isVerified: true,
  },
  {
    id: 'b-5',
    donorName: 'Vikram Joshi',
    categoryName: 'Disaster Emergency Relief',
    unitsText: 'Tarpaulin + Ration Combo',
    amount: 500,
    message: 'Happy to contribute to the disaster emergency relief fund. Great work!',
    timeAgo: '2 hrs ago',
    isVerified: true,
  },
];
