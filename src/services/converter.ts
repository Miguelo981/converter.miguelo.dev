import { TIMEOUT_MS } from "@/constants";
import { ConvertResponseData, ImgFormat } from "@/types/types";

const ENDPOINT = "/api/images";

export async function convertImgFile(
  source: Buffer | string,
  format: ImgFormat
): Promise<ConvertResponseData | Error> {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), TIMEOUT_MS);

  const res = await fetch(`${ENDPOINT}/convert`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source,
      format,
    }),
    signal: controller.signal,
  });

  const data: ConvertResponseData = await res.json();

  if (!res.ok) {
    throw new Error(data.message); // `Error converting image: ${res.statusText}`
  }

  return data;
}
