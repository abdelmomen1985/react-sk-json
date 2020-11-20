import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  Box,
  Button,
  Text,
  Textarea,
  theme,
  ThemeProvider,
} from "@chakra-ui/core";
import Axios from "axios";
import * as React from "react";
import { convert } from "./converter";
import useLocalStorage from "./hooks/useLocalSorage";
import {
  getCompoundIdBySKID,
  proccessCompound,
} from "./process/processCompounds";
import { getDeveloperId, proccessDeveloper } from "./process/processDevelopers";
import { proccessUnit } from "./process/processUnits";
import "./styles.css";
import { SKCompound, SKDeveloper } from "./types";

const customTheme = {
  ...theme,
};

const headers = {
  "content-type": "application/json",
  "x-hasura-admin-secret": "rKpA@W3S2PlZsK",
};

export const client = new ApolloClient({
  uri: "https://realestate.hasura.app/v1/graphql",
  headers,
  cache: new InMemoryCache(),
});

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default function App() {
  let [value, setValue] = React.useState("");
  let [page, setPage] = useLocalStorage("PAGE", 1);
  let [structVal, setStructVal] = React.useState("");
  let [newArr, setNewArr] = React.useState<any[]>([]);
  let [storedDevIds, setStoredDevIds] = useLocalStorage(
    "PROCESSED_DEVELOPERS",
    []
  );
  let [storedCompoundsIds, setStoredCompoundsIds] = useLocalStorage(
    "PROCESSED_COMPOUNDS",
    []
  );

  let handleInputChange = (e: React.ChangeEvent<any>) => {
    setValue(e.target.value);
  };

  let handleStructInputChange = (e: React.ChangeEvent<any>) => {
    setStructVal(e.target.value);
  };

  const doConvert = () => {
    setNewArr(convert(value, structVal));
  };

  const goNext = async () => {
    // first let's fetch page / unit
    /*
    const resp = await Axios.post(
      `https://app.sakneen.com/apis/marketplace/filters?sort=financial_plan.monthly_payment&limit=1&page=${page}`,
      { range: {}, multiple: {}, exaxt: {}, match: {} },
      {
        headers: {
          "app-request-origin": "sakneen-platform",
          "Cotent-type": "application/json",
        },
      }
    );
    */
    const resp = await Axios.get(
      `https://6uoxt.sse.codesandbox.io/units?page=${page}`
    );

    console.log("%c Mo2Log resp ", "background: #bada55", resp.data);
    const unit = resp.data[0];
    // Process Developer
    const skDeveloper: SKDeveloper = unit.developer;
    const developer_id = await getDeveloperId(skDeveloper._id);
    if ((storedDevIds as string[])?.indexOf(skDeveloper._id) < 0) {
      const id = await proccessDeveloper(developer_id, skDeveloper);
      if (id) {
        setStoredDevIds([...storedDevIds, skDeveloper._id]);
      }
    }

    const skCompound: SKCompound = unit.compound;
    const compound_id = await getCompoundIdBySKID(skCompound._id);
    if ((storedCompoundsIds as string[])?.indexOf(skCompound._id) < 0) {
      const id = await proccessCompound(compound_id, skCompound);
      if (id) {
        setStoredCompoundsIds([...storedCompoundsIds, skCompound._id]);
      }
    }

    await proccessUnit(unit, {
      developer_id,
      compound_id,
    });

    await sleep(1500);
    setPage(1 + page);
  };

  React.useEffect(() => {
    goNext();
  }, [page]);

  return (
    <ThemeProvider theme={customTheme}>
      <Box w="70%">
        <Box>Current page: {page}</Box>
        <Box d="flex" mt="1em">
          <Button variantColor="green" onClick={goNext}>
            Next
          </Button>
        </Box>
      </Box>
      <Box w="70%">
        <Text mb=".5em" fontSize="1.2em">
          JSON OBJECT
        </Text>
        <div>
          <Textarea
            value={value}
            onChange={handleInputChange}
            placeholder="Enter Json"
            size="md"
          />
        </div>
      </Box>
      <Box w="70%">
        <Text mb=".5em" fontSize="1.2em">
          JSON Structure Mapper
        </Text>
        <div>
          <Textarea
            value={structVal}
            onChange={handleStructInputChange}
            placeholder="Enter Json"
            size="md"
          />
        </div>
      </Box>
      <Box d="flex" mt="1em">
        <Button variantColor="green" onClick={doConvert}>
          Convert
        </Button>
      </Box>
      <pre>{JSON.stringify(newArr, null, 2)}</pre>
    </ThemeProvider>
  );
}
