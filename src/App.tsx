import {
  Box,
  Button,
  Text,
  Textarea,
  theme,
  ThemeProvider
} from "@chakra-ui/core";

import * as React from "react";
import "./styles.css";
import { convert } from "./converter";
import Axios from "axios";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { DEVELOPER_BY_SK_ID, UPDATE_DEVELOPER } from "./queries";
import { Developer, SKDeveloper } from "./types";

const customTheme = {
  ...theme
};

const headers = {
  "content-type": "application/json",
  "x-hasura-admin-secret": "rKpA@W3S2PlZsK"
};

export const client = new ApolloClient({
  uri: "https://realestate.hasura.app/v1/graphql",
  headers,
  cache: new InMemoryCache()
});

export default function App() {
  let [value, setValue] = React.useState("");
  let [page, setPage] = React.useState(1);
  let [structVal, setStructVal] = React.useState("");
  let [newArr, setNewArr] = React.useState<any[]>([]);

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
    const resp = await Axios.post(
      "https://app.sakneen.com/apis/marketplace/filters?sort=financial_plan.monthly_payment&limit=1&page=1",
      { range: {}, multiple: {}, exaxt: {}, match: {} },
      {
        headers: {
          origin: "https://www.sakneen.com",
          referer: "https://www.sakneen.com/",
          "app-request-origin": "sakneen-platform",
          "Cotent-type": "application/json"
        }
      }
    );
    console.log("goNext ", resp.data.listings[0]);
    const developerData: SKDeveloper = resp.data.listings[0].developer;
    proccessDeveloper(developerData);
  };

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
