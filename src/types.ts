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
