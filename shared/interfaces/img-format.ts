import type sharp from "sharp"

export type ConvertParams = {
    source: Buffer
    format: ImgFormat
}

export type ImgFormat = keyof sharp.FormatEnum | sharp.AvailableFormatInfo

export interface IImgFormatRepository {
    convert(params: ConvertParams): Promise<Buffer | null>
}