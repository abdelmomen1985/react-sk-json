export function convert(value: string, structure: string) {
  const returnArr: any[] = [];
  try {
    const json = JSON.parse(value);
    const jsonStruct = JSON.parse(structure);
    const arrKey = Object.keys(jsonStruct)[0];
    const dataArr: any[] = json[arrKey];
    const structObj = jsonStruct[arrKey];
    // Loop throw data array
    dataArr.forEach((item) => {
      let newItem = { ...item };
      Object.keys(structObj).forEach((key) => {
        const newLabel = structObj[key];
        // check if new lable has period .

        const [newLabelFirst, newLabelLast] = ("" + newLabel).split(".");
        if (newLabelLast) {
          const newSubObject = { ...newItem[newLabelFirst] };
          newSubObject[newLabelLast] = newItem[key];
          newItem[newLabelFirst] = newSubObject;
        } else {
          newItem[newLabel] = newItem[key];
        }
        delete newItem[key];
        returnArr.push(newItem);
      });
    });
  } catch (error) {
    console.error(error);
  }
  return returnArr;
}
