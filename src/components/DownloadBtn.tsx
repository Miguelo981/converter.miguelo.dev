import saveAs from "file-saver";
import { Buffer } from "buffer";
import type { FormBody } from "@/models/image";

type DownloadBtnProps = {
  files: FormBody[];
  onClick: () => void;
};

export default function DownloadBtn({ files, onClick }: DownloadBtnProps) {
  const handleDownloadClick = () => {
    files.forEach((file) => {
      if (typeof file.source === "string" || !file.source) {
        return;
      }

      saveAs(
        new Blob([Buffer.from(file.source)]),
        `${file.name}.${file.format}`
      );
    });
    onClick();
  };

  return (
    <button
      className="download-btn w-full"
      disabled={files.length < 1}
      onClick={handleDownloadClick}
    >
      <span>Descargar</span>
    </button>
  );
}
