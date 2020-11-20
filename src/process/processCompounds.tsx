import { COMPOUND_BY_SK_ID, UPDATE_COMPOUND } from "../queries";
import { CompoundType, SKCompound } from "../types";
import { client } from "../App";
import { getDeveloperId } from "./processDevelopers";

export async function getCompoundIdBySKID(sk_id: string): Promise<string> {
  const { data } = await client.query({
    query: COMPOUND_BY_SK_ID,
    variables: { sk_id },
  });
  const { id } = data.compounds[0];
  return id;
}

export async function proccessCompound(
  id: string,
  compound: SKCompound
): Promise<string> {
  const developer_id = await getDeveloperId(compound.developer);
  // Now update developer with new data
  const newCompoundData = {
    developer_id,
    description: {
      ar: compound.description_ar,
      en: compound.description,
    },
    media: {
      card_icon: compound.card_icon,
      page_icon: compound.page_icon,
      brochure: compound.brochure,
    },
    slug_ar: compound.slug_ar,
    slug_en: compound.slug,
    city_sk_id: compound.city,
    district_sk_id: compound.district,
    east: compound.east,
    north: compound.north,
    west: compound.west,
    south: compound.south,
  } as CompoundType;
  // filter the current developers
  console.log({ ...newCompoundData, id });

  const { errors, data: mutData } = await client.mutate({
    mutation: UPDATE_COMPOUND,
    variables: {
      ...newCompoundData,
      id,
      /*
      media: newCompoundData.media,
      description: newCompoundData.description,
      slug_ar: newCompoundData.slug_ar,
      slug_en: newCompoundData.slug_en,
      developer_id: developer_id,
      city_sk_id: newCompoundData.city_sk_id,
      district_sk_id: newCompoundData.district_sk_id
      */
    },
  });
  if (errors?.length) {
    console.error(errors);
    return "";
  } else return id;
}
