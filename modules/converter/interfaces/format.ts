export interface IFormatRepository {
    convert(formData: FormData): Promise<Blob>
    list(): Promise<string[]>
}