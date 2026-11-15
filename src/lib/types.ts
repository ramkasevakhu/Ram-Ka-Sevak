export type SevaCategoryId = 'roadside-relief' | 'animal-welfare' | 'medical-emergency' | 'disaster-relief';

export interface SevaUnitConfig {
  unitLabelHindi: string;
  unitLabelEnglish: string;
  unitCost: number; // e.g. 50 for 1 meal
  presets: number[]; // e.g. [1, 5, 10, 25, 50, 100]
  unitDescription: string;
}

export interface SevaCategory {
  id: SevaCategoryId;
  titleHindi: string;
  titleEnglish: string;
  badgeHindi: string;
  badgeEnglish: string;
  tagline: string;
  description: string;
  iconName: string;
  minAmount: number;
  highlightTag?: string;
  unitConfig: SevaUnitConfig;
  quickSlabs: {
    label: string;
    amount: number;
    impact: string;
    popular?: boolean;
  }[];
  points: string[];
}

export interface DonationRecord {
  id?: string;
  donorName: string;
  donorPhone?: string;
  donorEmail?: string;
  categoryId: SevaCategoryId;
  categoryName: string;
  quantity: number;
  unitLabel: string;
  amount: number;
  paymentMethod: 'UPI_INTENT' | 'UPI_QR' | 'RAZORPAY';
  transactionRef?: string;
  sankalpMessage?: string;
  isAnonymous?: boolean;
  status: 'pending' | 'success' | 'verified';
  createdAt?: string;
}

export interface SankalpBlessing {
  id: string;
  donorName: string;
  categoryName: string;
  unitsText: string;
  amount: number;
  message?: string;
  timeAgo: string;
  isVerified: boolean;
}
