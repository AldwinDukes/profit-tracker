import { ocrSpace } from "../API/ocr";

export function UploadImage() {
  const handleUpload = async (e) => {
    // FIX 1: Get the actual file object
    const file = e.target.files[0];

    if (file) {
      console.log("Uploading:", file.name);
      await ocrSpace(file);
    }
  };

  return <input type="file" accept="image/*" onChange={handleUpload} />;
}
