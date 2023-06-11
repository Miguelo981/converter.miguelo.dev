export type ImgFormat =
  | "png"
  | "jpeg"
  | "gif"
  | "webp"
  | "avif"
  | "tiff"
  | "heif"
  | "jxl"
  | "raw";

export type Source = Buffer | string | ArrayBuffer | null;

export interface ConvertResponseData {
  message?: string;
  source?: Buffer;
}
