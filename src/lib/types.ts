export type SevaCategoryId =
  | 'roadside-relief'
  | 'animal-welfare'
  | 'medical-emergency'
  | 'disaster-relief';

export type VideoPlatform = 'youtube' | 'instagram' | 'facebook';

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  platform: VideoPlatform;
  category: string;
  video_date: string;
  is_visible: boolean;
  sort_order: number;
  created_at?: string;
}

export interface ImpactCounters {
  mealsServed: number;
  animalsTreated: number;
  totalDonationsAmount: number;
}

export interface TransparencyData {
  monthLabel: string;
  incomeAmount: number;
  expenseAmount: number;
  notes: string;
}

export interface DonationRecord {
  id: string;
  donor_name: string;
  donor_phone?: string | null;
  donor_email?: string | null;
  category_id: string;
  category_name: string;
  quantity?: number;
  unit_label?: string | null;
  amount: number;
  payment_method: string;
  transaction_ref?: string | null;
  sankalp_message?: string | null;
  admin_note?: string | null;
  is_anonymous: boolean;
  status: 'success' | 'verified' | 'pending' | 'failed';
  created_at: string;
}

export interface PublicSupporter {
  id: string;
  donor_name: string;
  category_name: string;
  units_text: string;
  amount: number;
  message?: string | null;
  created_at: string;
}
