import sharp from "sharp"

export const OUTPUT_FORMATS = [
    'heic', 'heif', 'avif', 'jpeg', 'jpg', 'jpe', 'tile', 'dz', 'png', 'raw', 'tiff', 'tif', 'webp', 'gif', 'jp2', 'jpx', 'j2k', 'j2c', 'jxl'
]

export const INPUT_FORMATS = Object.keys(sharp.format)