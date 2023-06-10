import { ConvertedImg } from "@/models/image";
import { ImgFormat } from "@/types/types";

const ENDPOINT = "/api/images";

export async function convertImgFile(
  source: Buffer | string,
  format: ImgFormat
): Promise<ConvertedImg | Error> {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5000);

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

  if (!res.ok) {
    throw new Error(`Error converting image: ${res.statusText}`);
  }

  return res.json();
}
