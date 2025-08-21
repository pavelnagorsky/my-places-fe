import { useForm } from "react-hook-form-mui";
import { IEditPlaceContext } from "@/containers/personal-area/my-places/edit-my-place/interfaces";

export const placeFormDefaultValues: IEditPlaceContext = {
  images: [],
  attachments: [],
  title: "",
  description: "",
  website: "",
  address: "",
  lat: "",
  lng: "",
  placeTypeId: "" as any,
  categoriesIds: [],
  isCommercial: false,
  updateTranslations: false,
};

const usePlaceForm = () => {
  const form = useForm<IEditPlaceContext>({
    defaultValues: placeFormDefaultValues,
    mode: "onChange",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  return form;
};

export default usePlaceForm;
