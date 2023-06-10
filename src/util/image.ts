import { IMG_FORMATS } from "@/constants";

export function checkIfValidFormat(format: string): boolean {
  return IMG_FORMATS.includes(format);
}

export async function imageRemoteSrcToBuffer(
  source: string
): Promise<Buffer | undefined> {
  try {
    const url = new URL(source);
    const res = await fetch(url.href);
    const buffer = Buffer.from(await res.arrayBuffer());

    return buffer;
  } catch (err) {}
}
