import saveAs from 'file-saver';
import type { ImgFormat } from '../services/convert.service';
import { Buffer } from 'buffer';

type DownloadBtnProps = {
    files: {
        source: Buffer | string;
        name: string;
        format: ImgFormat
    }[];
    onClick: () => void;
}

export default function DownloadBtn({ files, onClick }: DownloadBtnProps) {
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
        onClick();
    }

    return (
        <button 
            className="download-btn w-full" 
            disabled={files.length < 1}
            onClick={handleDownloadClick}><span>Descargar</span></button>
    )
}