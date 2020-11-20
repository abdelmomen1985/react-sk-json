export type SKDeveloper = {
  _id: string;
  description: string;
  description_ar: string;
  card_icon: string;
  page_icon: string;
};

export type JsonLangsProp = {
  en: string;
  ar: string;
};

export type Developer = {
  created_at: string;
  description: JsonLangsProp;
  ext_data: any;
  id: string;
  media: any;
  name: JsonLangsProp;
  slug_ar: string;
  slug_en: string;
  updated_at: string;
};

export type SKCompound = {
  _id: string;
  description: string;
  description_ar: string;
  card_icon: string;
  page_icon: string;
  brochure: string;
  city: string;
  compound_name: string;
  compound_name_ar: string;
  deliveryYearFrom: number;
  deliveryYearTo: number;
  developer: string;
  district: string;
  slug: string;
  slug_ar: string;
  east: number;
  north: number;
  south: number;
  west: number;
  photos: string[];
};

export type CompoundType = {
  id: string;
  created_at: string;
  updated_at: string;
  name: JsonLangsProp;
  description: JsonLangsProp;
  ext_data: any;
  media: any;
  slug_ar: string;
  slug_en: string;
  developer_id: string;
  sk_id: string;
  city_sk_id: string;
  district_sk_id: string;
  east: number;
  north: number;
  west: number;
  south: number;
};

export type SkFinancialPlan = {
  cash_discount: number;
  contract_payment: number;
  down_payment: number;
  monthly_payment: number;
  number_of_years: number;
};

export type SKDistrict = {
  name: string;
  name_ar: string;
  _id: string;
};

export type SKCity = {
  name: string;
  name_ar: string;
  _id: string;
};

export type SKPhase = {
  sk_id: string;
  name: string;
};

export type SKUnit = {
  _id: string;
  finishing_type: string;
  unit_type: string;
  floor_plan: string;
  compound: SKCompound;
  delivery_year: number;
  delivery_month: number;
  total_price: number;
  unit_id: string;
  slug: string;
  slug_ar: string;
  financial_plan: SkFinancialPlan;
  district: SKDistrict;
  city: SKCity;
  developer: SKDeveloper;
  garage: boolean;
  garden: boolean;
  ready_to_move: boolean;
  bathrooms: number;
  bedrooms: number;
  npv: number;
  bua: number;
  land: number;
  latitude: number;
  longitude: number;
  pricePerMeter: number;
  photos: string[];
  phase: string;
  phaseName: string;
};

export type UnitType = {
  id: string;
  created_at: string;
  updated_at: string;
  description: JsonLangsProp;
  finishing_type: string;
  unit_design: string;
  media: any;
  property_type_id: string;
  compound_id: string;
  developer_id: string;
  comp_phase_id: string;
  delivery_year: number;
  delivery_month: number;
  deleted_at: string;
  ref_id: string;
  sk_id: string;
  slug_en: string;
  slug_ar: string;
  lat: number;
  lng: number;
  fin_down_payment: number;
  fin_years: number;
  fin_monthly_payment: number;
  fin_total: number;
  bathrooms: number;
  bedrooms: number;
  npv: number;
  bua: number;
  land: number;
  amenities_arr: any[];
  sk_city: SKCity;
  sk_district: SKDistrict;
  sk_phase: SKPhase;
};
