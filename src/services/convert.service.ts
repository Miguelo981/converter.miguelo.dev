export type ImgFormat = "png" | "jpeg" | "bmp" | "gif";

export interface ConvertedImg {
    source: Buffer;
}

const host = import.meta.env.PUBLIC_NODE_ENV === 'production' ? import.meta.env.PUBLIC_APP_HOST : `${import.meta.env.PUBLIC_APP_HOST}:${import.meta.env.PUBLIC_APP_PORT}`

export async function convertImgFile(source: Buffer | string, format: ImgFormat): Promise<ConvertedImg | Error> {
    return await fetch(`${host}/img-convert`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            source,
            format
        })
    })
    .then(res => res.json())
    .catch(err => err)
}