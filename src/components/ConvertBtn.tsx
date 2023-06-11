import { useState } from "react";
import { convertImgFile } from "@/services/converter";
import Loading from "./Loading";

import { ConvertedImg, FormBody } from "@/models/image";
import type { ImgFormat, Source } from "@/types/types";

interface ConvertBtnProps {
  source: Source;
  format: ImgFormat;
  name?: string;
  disabled: boolean;
  onError: (message: string) => void;
  onSuccess: (file: FormBody) => void;
}

export default function ConvertBtn({
  source,
  format,
  name,
  disabled,
  onError,
  onSuccess,
}: ConvertBtnProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    if (
      loading ||
      source == null ||
      (typeof source !== "string" && source instanceof ArrayBuffer)
    )
      return;

    onError("");
    setLoading(true);

    try {
      const res = await convertImgFile(source, format);

      if ((name === null || name === "") && typeof source === "string") {
        name = encodeURI(source).split("/").pop()!.split(".")[0];
      }

      onSuccess({
        source: (res as ConvertedImg).source,
        format,
        name: name ?? "",
      });
    } catch (err) {
      onError((err as Error).message!);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="mx-auto flex w-full items-center justify-center space-x-2 rounded-sm bg-primary px-10 py-2 font-semibold text-white shadow-md transition ease-out hover:bg-primary/80 disabled:bg-quaternary"
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading && <Loading color="#fff transparent" />}
      <span>Convertir</span>
    </button>
  );
}
