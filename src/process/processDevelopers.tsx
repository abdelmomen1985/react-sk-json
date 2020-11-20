import { DEVELOPER_BY_SK_ID, UPDATE_DEVELOPER } from "../queries";
import { Developer, SKDeveloper } from "../types";
import { client } from "../App";

export async function getDeveloperId(sk_id: string): Promise<string> {
  const { data } = await client.query({
    query: DEVELOPER_BY_SK_ID,
    variables: { developer_id: sk_id },
  });
  // Now update developer with new data
  const { id } = data.developers[0];
  return id;
}

export async function proccessDeveloper(
  id: string,
  developer: SKDeveloper
): Promise<string> {
  const newDeveloperData = {
    description: {
      ar: developer.description_ar,
      en: developer.description,
    },
    media: {
      card_icon: developer.card_icon,
      page_icon: developer.page_icon,
    },
  } as Developer;
  // filter the current developers
  const { errors, data: mutData } = await client.mutate({
    mutation: UPDATE_DEVELOPER,
    variables: {
      id,
      media: newDeveloperData.media,
      description: newDeveloperData.description,
    },
  });
  if (errors?.length) {
    console.error(errors);
    return "";
  } else return id;
}
