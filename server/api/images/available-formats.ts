import type { H3Event } from 'h3';
import { OUTPUT_FORMATS } from '~/shared/constants';

export default defineEventHandler(async (event: H3Event) => {
    const method = event.method

    if (method !== 'GET') {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method Not Allowed'
        })
    }

    return new Response(JSON.stringify(OUTPUT_FORMATS), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
})
