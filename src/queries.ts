import { gql } from "@apollo/client/core";

export const DEVELOPER_BY_SK_ID = gql`
  query developer_by_sk_id($developer_id: String) {
    developers(where: { sk_id: { _eq: $developer_id } }) {
      id
    }
  }
`;

export const COMPOUND_BY_SK_ID = gql`
  query compound_by_sk_id($sk_id: String) {
    compounds(where: { sk_id: { _eq: $sk_id } }) {
      id
    }
  }
`;

export const UPDATE_COMPOUND = gql`
  mutation update_compounds(
    $id: uuid
    $description: jsonb
    $media: jsonb
    $slug_ar: String
    $slug_en: String
    $developer_id: uuid
    $city_sk_id: String
    $district_sk_id: String
    $east: Float
    $north: Float
    $west: Float
    $south: Float
  ) {
    update_compounds(
      where: { id: { _eq: $id } }
      _set: {
        description: $description
        media: $media
        slug_ar: $slug_ar
        slug_en: $slug_en
        developer_id: $developer_id
        city_sk_id: $city_sk_id
        district_sk_id: $district_sk_id
        east: $east
        north: $north
        west: $west
        south: $south
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_DEVELOPER = gql`
  mutation update_developers($id: uuid, $description: jsonb, $media: jsonb) {
    update_developers(
      where: { id: { _eq: $id } }
      _set: { description: $description, media: $media }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_UNIT = gql`
  mutation insert_units_one(
    $sk_id: String
    $bathrooms: Int
    $bedrooms: Int
    $bua: Int
    $land: Int
    $fin_down_payment: Int
    $fin_years: Int
    $fin_monthly_payment: Int
    $fin_total: Int
    $property_type_id: uuid
    $compound_id: uuid
    $developer_id: uuid
    $finishing_type: String
    $slug_en: String
    $slug_ar: String
    $ref_id: String
    $sk_city: jsonb
    $sk_district: jsonb
    $sk_phase: jsonb
    $media: jsonb
    $npv: Int
    $delivery_year: Int
    $delivery_month: Int
    $lat: Float
    $lng: Float
  ) {
    insert_units_one(
      object: {
        sk_id: $sk_id
        bathrooms: $bathrooms
        bedrooms: $bedrooms
        bua: $bua
        land: $land
        property_type_id: $property_type_id
        developer_id: $developer_id
        compound_id: $compound_id
        finishing_type: $finishing_type
        ref_id: $ref_id
        sk_city: $sk_city
        sk_district: $sk_district
        sk_phase: $sk_phase
        media: $media
        fin_total: $fin_total
        fin_down_payment: $fin_down_payment
        fin_monthly_payment: $fin_monthly_payment
        fin_years: $fin_years
        npv: $npv
        delivery_year: $delivery_year
        delivery_month: $delivery_month
        lat: $lat
        lng: $lng
        slug_en: $slug_en
        slug_ar: $slug_ar
      }
    ) {
      id
      sk_id
    }
  }
`;
