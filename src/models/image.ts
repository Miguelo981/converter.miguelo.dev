import type { ImgFormat, Source } from "@/types/types";

export interface ConvertedImg {
  source: Buffer;
}

export interface FormBody {
  source: Source;
  name: string;
  format: ImgFormat;
}
