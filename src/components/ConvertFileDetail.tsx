import type { FormBody } from "@/models/image";
import { MouseEvent } from "react";

interface ConvertFileDetailProps {
  file: FormBody;
  onRemove: (file: MouseEvent<HTMLButtonElement>) => void;
}

export default function ConvertFileDetail({
  file,
  onRemove,
}: ConvertFileDetailProps) {
  return (
    <div className="h-fit w-[45%] rounded-sm border border-primary md:w-[140px]">
      <div className="group relative flex">
        <div className="absolute hidden h-full w-full bg-gray-500/50 group-hover:block">
          <div className="flex h-full items-center justify-center">
            <button onClick={onRemove}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 cursor-pointer stroke-app-bg stroke-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <img
          className="h-16 w-full rounded-sm object-cover"
          src={`data:image/png;base64,${Buffer.from(
            file.source as Buffer
          ).toString("base64")}`}
          alt={file.name}
        />
      </div>
      <p className="mt-1 truncate p-2 text-sm text-main">
        {file.name}.{file.format}
      </p>
    </div>
  );
}
