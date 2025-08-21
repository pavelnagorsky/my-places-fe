import axiosInstance from "@/services/axios.instance";
import { IImage } from "@/services/file-service/image.interface";
import { IFileUploadResponse } from "@/services/place-files-service/interfaces";

const placeFilesService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.set("file", file);
    return axiosInstance.postForm<IFileUploadResponse>(
      "/place-files",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  delete: (id: number) => {
    return axiosInstance.delete(`/place-files/${id}`);
  },
};

export default placeFilesService;
