import { IImage } from "@/services/file-service/image.interface";

export interface IFileUploadResponse extends IImage {
  filename?: string;
}
