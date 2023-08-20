import axiosInstance from "@/services/axios.instance";
import { IImage } from "@/services/file-service/image.interface";

const fileService = {
  uploadImage: (image: File) => {
    const formData = new FormData();
    formData.set("file", image);
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
