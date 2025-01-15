import { IFormatRepository } from '~/modules/converter/interfaces/format';

const endpoint = '/api/images'

class FormatRepository implements IFormatRepository {
    async convert(body: FormData): Promise<Blob> {
        const res = await $fetch(`${endpoint}/convert`, {
            method: 'POST',
            body,
            responseType: 'arrayBuffer'
        })

        const blob = new Blob([res], { type: `image/${body.get('format')}` })

        return blob
    }

    async list(): Promise<string[]> {
        const res = await $fetch(`${endpoint}/available-formats`)

        return res
    }
}

export const formatRepository = new FormatRepository();