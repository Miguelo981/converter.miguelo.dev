import { MAX_FILE_SIZE, IMG_FORMATS } from "@/constants";
import { useFormik } from "formik";
import { useRef, useState, ChangeEvent, useEffect } from "react";
import ConvertBtn from "./ConvertBtn";
import ConvertFeedback from "./ConvertFeedback";
import DownloadBtn from "./DownloadBtn";
import type { FormBody } from "@/models/image";
import ConvertFileDetail from "./ConvertFileDetail";
import { randomString } from "@/util/text";

export default function ConvertForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sourceFeedback, setSourceFeedback] = useState<{
    isError: boolean;
    message: string;
  } | null>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  const textInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<FormBody[]>([]);

  const formik = useFormik<FormBody>({
    initialValues: {
      source: "",
      name: "",
      format: "png",
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    if (formik.values.source === null || formik.values.source === "") {
      setSourceFeedback(null);
      return;
    }

    if (typeof formik.values.source !== "string") return;

    try {
      // eslint-disable-next-line no-new
      new URL(formik.values.source);
      formik.setFieldError("source", undefined);
      setSourceFeedback({ message: "The URL is valid.", isError: false });
    } catch (err) {
      formik.setFieldError("source", "Invalid URL.");
      setSourceFeedback({ message: "Invalid URL.", isError: true });
    }
  }, [formik, formik.values.source]);

  const handlePickBtn = () => {
    formik.values.source = null;
    inputFile.current?.click();
  };

  const handleDownloadClick = () => {
    setFileList([]);
    textInput.current!.value = "";
    formik.values.name = "";
  };

  const handleFile = async (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files![0];

    if (!file) return;

    if (file.size / 1000 > MAX_FILE_SIZE) {
      setServerError(`Tamaño de image superior a ${MAX_FILE_SIZE} bytes.`);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (!(reader.result instanceof ArrayBuffer)) return;

      formik.setFieldValue("source", Buffer.from(reader.result));
      formik.setFieldValue("name", file.name.split(".")[0]);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSuccess = (file: FormBody) => {
    textInput.current!.value = "";
    formik.setFieldValue("name", "");
    setFileList([...fileList, file]);
    setSourceFeedback(null);
  };

  const handleFileRemove = (file: FormBody) => {
    setFileList(fileList.filter((f) => f.source !== file.source));
  };

  return (
    <>
      <header className="mb-8 flex w-full flex-col rounded-md bg-white p-6">
        <form
          onSubmit={(evt) => evt.preventDefault()}
          className="mb-6 flex flex-col items-start justify-center gap-3 md:flex-row"
        >
          <div className="relative w-full">
            <div className="label-container">
              <label className="input-label" htmlFor="source">
                Remote source
              </label>
            </div>
            <input
              ref={textInput}
              className={`app-text-input ${
                formik.errors.source
                  ? "border border-tertiary text-tertiary"
                  : ""
              }`}
              type="text"
              name="source"
              id="source"
              onChange={formik.handleChange}
              placeholder="https://test.com/banana.png"
            />
            {sourceFeedback && (
              <span
                className={`text-sm ${
                  sourceFeedback.isError ? "text-tertiary" : "text-quaternary"
                }`}
              >
                {sourceFeedback.message}
              </span>
            )}
          </div>
          <span className="py-3 text-app-bg"> o </span>
          <div className="flex h-full w-full items-center justify-center gap-4">
            <button
              className="w-1/2 rounded-sm border border-primary bg-white px-0 py-3 text-app-bg shadow-md transition duration-100 ease-in-out hover:bg-primary hover:text-white md:w-full md:px-10"
              onClick={handlePickBtn}
            >
              {formik.values.source === null ||
              typeof formik.values.source === "string"
                ? "Pick file"
                : "Change file"}
            </button>
            <input
              hidden
              ref={inputFile}
              type="file"
              name="source"
              id="source"
              onChange={handleFile}
              accept={IMG_FORMATS.map((fmt) => `.${fmt}`).join(",")}
            />
            <div className="relative w-1/2 md:w-full">
              <div className="label-container">
                <label className="input-label z-20" htmlFor="format">
                  Format
                </label>
              </div>
              <select
                className="app-select-input z-10"
                name="format"
                id="format"
                onChange={formik.handleChange}
              >
                {IMG_FORMATS.map((fmt, index) => (
                  <option
                    key={"option-" + index}
                    value={fmt}
                    className="uppercase"
                  >{`.${fmt}`}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
        <ConvertBtn
          name={formik.values.name}
          source={formik.values.source}
          format={formik.values.format}
          onError={setServerError}
          onSuccess={handleSuccess}
          disabled={
            formik.values.source === null || formik.values.source === ""
          }
        />
      </header>
      {serverError && <ConvertFeedback message={serverError} />}
      <footer className="relative">
        <div className="absolute -top-5 left-5 bg-app-bg p-1">
          <h2 className="text-2xl font-bold text-primary">Preview</h2>
        </div>
        <div className="scrollbar mb-8 flex h-[200px] w-full flex-wrap gap-4 overflow-y-auto rounded-lg border border-primary p-5 md:h-[275px]">
          {fileList?.map((file) => (
            <ConvertFileDetail
              key={randomString(10)}
              file={file}
              onRemove={() => handleFileRemove(file)}
            />
          ))}
        </div>
      </footer>
      <DownloadBtn files={fileList} onClick={handleDownloadClick} />
    </>
  );
}
