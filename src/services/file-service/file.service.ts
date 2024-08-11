import axiosInstance from "@/services/axios.instance";
import { IImage } from "@/services/file-service/image.interface";
import imageCompression from "browser-image-compression";

const fileService = {
  uploadImage: async (image: File) => {
    const compressedImage = await imageCompression(image, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });
    const formData = new FormData();
    formData.set("file", compressedImage);
    return axiosInstance.postForm<IImage>("/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteImage: (id: number) => {
    return axiosInstance.delete(`/images/${id}`);
  },
};

export default fileService;
