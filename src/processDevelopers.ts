
import { DEVELOPER_BY_SK_ID, UPDATE_DEVELOPER } from "./queries";
import { Developer, SKDeveloper } from "./types";
import { useLocalStorage} from './hooks/useLocalSorage';

export function proccessDeveloper (developer:SKDeveloper) {

  let [processedDevelopers, setProcessedDevelopers] = useLocalStorage("PROCESSED_DEVELOPERS",[]);

    
  const { data } = await client.query({
    query: DEVELOPER_BY_SK_ID,
    variables: { developer._id }
  });
      // Now update developer with new data
      const newDeveloper: Developer = {
        id: developer._id,
        description: {
          ar: developer_data.description_ar,
          en: developer_data.description
        },
        media: {
          card_icon: developer_data.card_icon,
          page_icon: developer_data.page_icon
        }
      };
      // filter the current developers
      const { errors, data: mutData } = await client.mutate({
        mutation: UPDATE_DEVELOPER,
        variables: {
          id: newDeveloper.id,
          media: newDeveloper.media,
          description: newDeveloper.description
        }
      });
      console.error(errors);
      console.info(mutData);
}
