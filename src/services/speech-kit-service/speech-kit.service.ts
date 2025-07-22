import { ITTSRequest } from "@/services/speech-kit-service/interfaces/tts-request.interface";
import axiosInstance from "@/services/axios.instance";

const speechKitService = {
  synthesizeSpeech: (dto: ITTSRequest) => {
    return axiosInstance.post("/speech-kit/tts", dto, {
      responseType: "blob",
    });
  },
};

export default speechKitService;
