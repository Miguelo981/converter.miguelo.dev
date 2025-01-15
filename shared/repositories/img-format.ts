import type { IImgFormatRepository, ConvertParams } from "@/shared/interfaces/img-format";
import sharp from "sharp"

class ImgFormatRepository implements IImgFormatRepository {
    async convert({ source, format }: ConvertParams): Promise<Buffer | null> {
        try {
            const file: Buffer = await sharp(source).toFormat(format).toBuffer();

            return file;
        } catch (err) {
            console.log(err);
        }

        return null
    }
}

export const imgFormatRepository = new ImgFormatRepository()