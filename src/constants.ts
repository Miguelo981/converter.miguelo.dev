export const IMG_FORMATS = [
  "png",
  "jpeg",
  "gif",
  "webp",
  "avif",
  "jp2",
  "tiff",
  "heif",
  "raw",
];
export const MAX_FILE_SIZE = Number(
  process.env.NEXT_PUBLIC_MAX_FILE_SIZE ?? 4096
);
