import { rawTextToJson } from "../utils/textToJsonConverter";

export const ocrSpace = async (imageFile) => {
  const formData = new FormData();
  formData.append("apikey", "K81697412288957");
  formData.append("file", imageFile);
  formData.append("language", "eng");
  formData.append("OCREngine", "2");
  formData.append("isTable", "true");
  formData.append("filetype", "JPG");

  try {
    const request = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: formData,
    });

    const response = await request.json();

    console.log(response);

    console.log("OCR Result:", response.ParsedResults[0].ParsedText);

    const rawTextData = response.ParsedResults[0].ParsedText;

    rawTextToJson(rawTextData);

    return;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};
