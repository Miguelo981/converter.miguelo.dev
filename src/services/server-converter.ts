import { ImgFormat } from "@/types/types";
import sharp from "sharp";

/**
 *
 * @param source Buffer | string | ArrayBuffer | null
 * @param format ImgFormat
 * @returns Buffer | undefined
 */
export async function fileConverter(
  source: Buffer,
  format: ImgFormat
): Promise<Buffer | undefined> {
  try {
    const file: Buffer = await sharp(source).toFormat(format).toBuffer();

    return file;
  } catch (err) {
    console.log(err);
  }
}
