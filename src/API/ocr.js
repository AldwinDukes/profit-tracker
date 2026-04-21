export const ocrSpace = async (imageFile) => {
  const formData = new FormData();
  formData.append("apikey", "K81697412288957");

  // FIX 2: Ensure we are appending the file object correctly
  // Some environments prefer the key "file" but verify the file object is valid
  formData.append("file", imageFile);

  formData.append("language", "eng");
  formData.append("OCREngine", "2");
  formData.append("isTable", "true");

  // FIX 3: Manually set file type to solve error 3 (Unable to detect file extension)
  formData.append("filetype", "JPG");

  try {
    const request = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: formData,
      // NOTE: Do NOT set Content-Type header manually.
      // The browser will automatically set it to 'multipart/form-data' with the correct boundary.
    });

    const response = await request.json();
    console.log(response);
    console.log("OCR Result:", response.ParsedResults[0].ParsedText);
    return response;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};
