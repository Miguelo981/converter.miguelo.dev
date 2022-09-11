import saveAs from 'file-saver';
import type { ImgFormat } from '../services/convert.service';
import { Buffer } from 'buffer';

type DownloadBtnProps = {
    files: {
        source: Buffer | string;
        name: string;
        format: ImgFormat
    }[];
}

export default function DownloadBtn({ files }: DownloadBtnProps) {
    const handleDownloadClick = () => {
        files
            .map((file) =>
                {
                    if (typeof file.source === "string") {
                        return;
                    }

                    saveAs(new Blob([Buffer.from(file.source)]), `${file.name}.${file.format}`);
                }      
            );
    }

    return (
        <button 
            className="w-full mb-3 mx-auto px-10 py-2 disabled:bg-slate-400 bg-blue-600 hover:bg-blue-500 transition ease-out rounded-md text-white shadow-md font-semibold flex items-center justify-center space-x-2" 
            disabled={files.length < 1}
            onClick={handleDownloadClick}>Descargar</button>
    )
}