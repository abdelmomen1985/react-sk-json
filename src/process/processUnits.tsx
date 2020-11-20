import { client } from "../App";
import { INSERT_UNIT } from "../queries";
import { SKUnit, UnitType } from "../types";
import { getPropertyTypeId } from "./propertyTypes";

export async function proccessUnit(
  unit: SKUnit,
  { compound_id, developer_id }: { compound_id: string; developer_id: string }
): Promise<string> {
  const {
    bathrooms,
    bedrooms,
    district,
    developer,
    compound,
    city,
    _id,
    garden,
    garage,
    bua,
    slug_ar,
    delivery_month,
    delivery_year,
    financial_plan,
    finishing_type,
    floor_plan,
    land,
    latitude,
    longitude,
    npv,
    pricePerMeter,
    ready_to_move,
    unit_id,
    slug,
    total_price,
    unit_type,
    photos,
    phase,
    phaseName,
  } = unit;

  const property_type_id = getPropertyTypeId(unit_type);

  let newUnitData = {
    compound_id,
    developer_id,
    bathrooms,
    bedrooms,
    finishing_type,
    bua: Math.floor(bua),
    delivery_month,
    delivery_year,
    property_type_id,
    npv,
    land: Math.floor(land),
    media: {
      floor_plan,
      photos,
    },
    sk_district: district,
    sk_city: city,
    fin_total: Math.floor(total_price),
    sk_id: _id,
    ref_id: unit_id,
    lat: latitude,
    lng: longitude,
    slug_ar,
    slug_en: slug,
    sk_phase: {
      name: phaseName,
      sk_id: phase,
    },
    fin_down_payment: financial_plan.down_payment,
    fin_monthly_payment: financial_plan.monthly_payment,
    fin_years: financial_plan.number_of_years,
  } as UnitType;

  const { errors, data: mutData } = await client.mutate({
    mutation: INSERT_UNIT,
    variables: newUnitData,
  });
  if (errors?.length) {
    console.error(errors);
    return "";
  } else return mutData.id;
}
