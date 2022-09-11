import { useFormik } from "formik";
import { ChangeEvent, useRef, useState } from "react";
import { ConvertedImg, convertImgFile, ImgFormat } from "../services/convert.service"
import "../assets/scss/global.scss";
import Loading from "./Loading";
import { Buffer } from 'buffer';
import DownloadBtn from "./DownloadBtn";

const IMG_FORMATS = ["png", "jpeg", "bmp", "gif"], MAX_FILE_SIZE = 4096;

type Source = Buffer | string | ArrayBuffer | null;

export default function ConvertBtn() {
    const inputFile = useRef<HTMLInputElement>()
    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [fileList, setFileList] = useState<any>([]);
    const formik = useFormik({
        initialValues: { source: null as Source, format: "png" as ImgFormat },
        onSubmit: () => {}
    });
    
    const handleClick = async  () => {
        if (formik.values.source == null) return;

        setServerError(null)
        setLoading(true);
        const res = await convertImgFile(formik.values.source as any, formik.values.format)
        setLoading(false);

        if ((res as Error).message) {
            setServerError((res as Error).message);
            return;
        }

        setFileList([...fileList, { source: (res as ConvertedImg).source, format: formik.values.format, name: "testName" }])
    }

    const handlePickBtn = () => {
        formik.values.source = null;
        inputFile.current?.click();
    }

    const handleFile = async (evt: ChangeEvent<HTMLInputElement>) => {
        const file = evt.target.files![0];

        if (!file) return;

        if (file.size / 1000 > MAX_FILE_SIZE) {
            setServerError("Tamaño de image superior a 4MBs.");
            return;
        }

        const reader = new FileReader();
        
        reader.onload = () => {
            if (!(reader.result instanceof ArrayBuffer)) return;

            formik.setFieldValue("source", Buffer.from(reader.result))
        }

        reader.readAsArrayBuffer(file)
    }

    //TODO CONVERTED LIST
    
    return (
        <>
            <div className="rounded-xl border-2 border-blue-600 p-5 bg-white flex flex-col w-full mb-8">
                <form onSubmit={(evt) => evt.preventDefault()} className="flex items-center justify-center space-x-3 mb-6">
                    <div className="relative w-full">
                        <div className="label-container">
                            <label className="input-label" htmlFor="source">Fuente remoto</label>
                        </div>
                        <input className="app-text-input" type="text" name="source" id="source" onChange={formik.handleChange} placeholder="Escribe un enlace remoto" />
                    </div>
                    <span> o </span>
                    <button 
                        className="mx-auto px-10 py-2 border-2 border-blue-600 bg-white hover:bg-blue-600 hover:text-white transition ease-out rounded-md shadow-md font-semibold" 
                        onClick={handlePickBtn}>
                            { formik.values.source === null ? "Elegir" : "Cambiar" }
                    </button>
                    <input ref={inputFile} type="file" className="hidden" name="source" id="source" 
                        /* onChange={formik.handleChange} */
                        onChange={handleFile}
                        accept={IMG_FORMATS.map(fmt => `.${fmt}`).join(',')} 
                    />
                    <div className="relative w-52">
                        <div className="label-container">
                            <label className="input-label z-20" htmlFor="format">Formato</label>
                        </div>
                        <select className="app-select-input z-10" name="format" id="format" onChange={formik.handleChange}>
                            {
                                IMG_FORMATS.map((fmt, index) => (
                                    <option key={'option-'+index} value={fmt} className="uppercase">{`.${fmt}`}</option>
                                ))
                            }
                        </select>
                    </div>
                </form>
                <button 
                    className="mb-3 mx-auto w-56 px-10 py-2 disabled:bg-slate-400 bg-blue-600 hover:bg-blue-500 transition ease-out rounded-md text-white shadow-md font-semibold flex items-center justify-center space-x-2" 
                    disabled={formik.values.source === null}
                    onClick={handleClick}>{ loading ? <Loading color="#fff transparent" /> : null }<span>Convertir</span></button>
                {
                    serverError != null ? 
                    <p className="text-red-400 text-center">{ serverError }</p>
                    : null
                }
            </div>
            <DownloadBtn files={fileList} />
        </>
    )
}