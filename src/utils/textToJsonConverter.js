export const rawTextToJson = (ocrText) => {
  // 1. Extract the data using the Regex
  const refMatch = ocrText.match(/Ref No\.?\s?(\d{11,13})/i);
  const amountMatch = ocrText.match(
    /(?:Amount|Total|P|PHP)\s?([\d,]+\.\d{2})/i,
  );

  // 2. Create a standard JavaScript Object
  const transactionData = {
    amount: amountMatch ? parseFloat(amountMatch[1].replace(/,/g, "")) : 0,
    referenceNumber: refMatch ? refMatch[1] : "Not Found",
  };

  // 3. convert this object to a JSON string
  const jsonString = JSON.stringify(transactionData, null, 2);

  console.log("JSON STRING", jsonString);

  const jsonParsed = JSON.parse(jsonString);

  console.log("JSON FILE", jsonParsed);
};
