import { useForm } from "react-hook-form-mui";
import { IPlaceCardForm } from "@/containers/excursion-builder/content/form/content/excursion-places/excursion-place-card/logic/interfaces";

const usePlaceCardForm = () => {
  const form = useForm<IPlaceCardForm>({
    mode: "onChange",
    defaultValues: {
      description: "",
      excursionDuration: 15,
    },
  });

  return form;
};

export default usePlaceCardForm;
