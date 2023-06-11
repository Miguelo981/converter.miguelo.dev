import type { NextApiRequest, NextApiResponse } from "next";
import { checkIfValidFormat, imageRemoteSrcToBuffer } from "@/util/image";
import { fileConverter } from "@/services/server-converter";
import { MAX_FILE_SIZE } from "@/constants";
import { ConvertResponseData } from "@/types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConvertResponseData>
) {
  const { method, body } = req;
  const { source, format } = body;

  try {
    switch (method) {
      case "POST":
        if (!checkIfValidFormat(format)) {
          res.status(400).send({
            message: "Format not allowed.",
          });
          return;
        }

        if (!source) {
          res.status(400).send({
            message: "Source field is empty.",
          });
          return;
        }

        let parsedSource: Buffer;

        if (typeof source === "string") {
          const buffer = await imageRemoteSrcToBuffer(source);

          if (!buffer) {
            res.status(400).send({
              message: "Invalid URL source.",
            });
            return;
          }

          parsedSource = buffer;
        } else {
          parsedSource = Buffer.from(source);
        }

        const file = await fileConverter(parsedSource, format);

        if (!file) {
          res.status(400).send({
            message: "Unexpected converting error.",
          });
          return;
        }

        res.send({ source: file });
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(405).send({
      message: "Source or Format field is empty.",
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: MAX_FILE_SIZE * 1024,
    },
  },
};
