import { ImgFormat } from "./types/types";

export const IMG_FORMATS: ImgFormat[] = [
  "png",
  "jpeg",
  "gif",
  "webp",
  "avif",
  "tiff",
  "heif",
  "raw",
];
export const MAX_FILE_SIZE = Number(
  process.env.NEXT_PUBLIC_MAX_FILE_SIZE ?? 4096
);
