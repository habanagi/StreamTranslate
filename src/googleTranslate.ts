import { devID } from "./devID";

async function translateText(
  text: string,
  source: string,
  target: string
): Promise<any> {
  const url = `https://script.google.com/macros/s/${devID}/exec?text=${encodeURIComponent(
    text
  )}&source=${source}&target=${target}`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching translation:", error);
    throw error;
  }
}

export { translateText };
