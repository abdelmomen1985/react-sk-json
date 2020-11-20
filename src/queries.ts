import { gql } from "@apollo/client/core";

export const DEVELOPER_BY_SK_ID = gql`
  query developer_by_sk_id($developer_id: String) {
    developers(where: { sk_id: { _eq: $developer_id } }) {
      id
    }
  }
`;

export const COMPOUND_BY_SK_ID = gql`
  query compound_by_sk_id($compond_id: String) {
    compounds(where: { sk_id: { _eq: $compond_id } }) {
      id
    }
  }
`;

export const UPDATE_COMPOUND = gql`
  mutation update_compounds(
    $id: uuid
    $description: json
    $media: jsonb
    $slug_ar: String
    $slug_en: String
    $developer_id: uuid
    $sk_id: String
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
        sk_id: $sk_id
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
  mutation update_developers($id: uuid, $description: json, $media: jsonb) {
    update_developers(
      where: { id: { _eq: $id } }
      _set: { description: $description, media: $media }
    ) {
      affected_rows
    }
  }
`;
