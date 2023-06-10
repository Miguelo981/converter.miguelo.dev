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
    <div className="w-[45%] rounded-sm border border-primary p-2 md:w-[150px]">
      <div className="flex">
        <img
          className="h-16 w-auto rounded-sm object-contain"
          src={`data:image/png;base64,${Buffer.from(
            file.source as Buffer
          ).toString("base64")}`}
          alt={file.name}
        />
        <button onClick={onRemove}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 cursor-pointer stroke-white stroke-2"
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
      <p className="mt-1 truncate text-sm text-main">{file.name}</p>
    </div>
  );
}
