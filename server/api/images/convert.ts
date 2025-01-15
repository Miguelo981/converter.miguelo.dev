import type { H3Event } from 'h3';
import { imgFormatRepository } from '~/shared/repositories/img-format';
import { imgConvertSchema } from '~/shared/validators/img-format';

export default defineEventHandler(async (event: H3Event) => {
    const method = event.method

    if (method !== 'POST') {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method Not Allowed'
        })
    }

    const formData = await readMultipartFormData(event);

    if (!formData) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing form data'
        })
    }

    const parsedData: Record<string, any> = {};
    for (const field of formData) {
        if (field.type) {
            parsedData.source = {
                name: field.filename,
                type: field.type,
                file: field.data,
            };
        } else {
            parsedData[field.name!] = field.data.toString();
        }
    }

    const { error, value } = imgConvertSchema.validate(parsedData, { abortEarly: false })

    if (error) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Required files are not valid'
        })
    }

    const convertedImg = await imgFormatRepository.convert({ source: value.source.file, format: value.format })

    if (!convertedImg) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error during convertion'
        })
    }

    return new Response(convertedImg, {
        status: 200,
        headers: {
            'Content-Type': `image/${value.format}`,
            'Content-Disposition': `inline; filename="${value.source.name}.${value.format}"`,
            'Content-Length': String(convertedImg.byteLength),
        }
    })
})
