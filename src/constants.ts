export const IMG_FORMATS: string[] = [
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
