import Joi from 'joi'
import { INPUT_FORMATS, OUTPUT_FORMATS } from '~/shared/constants'

export const imgConvertSchema = Joi.object({
  source: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid(...INPUT_FORMATS.map((f) => `image/${f}`)).required(),
    file: Joi.any().required(),
  }).required(),
  format: Joi.string()
    .valid(...OUTPUT_FORMATS)
    .required(),
})