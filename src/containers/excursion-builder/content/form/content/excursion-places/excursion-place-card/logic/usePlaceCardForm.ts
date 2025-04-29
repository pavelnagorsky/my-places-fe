import { useForm } from "react-hook-form-mui";
import { IPlaceCardForm } from "@/containers/excursion-builder/content/form/content/excursion-places/excursion-place-card/logic/interfaces";
import { IExcursionBuilderItem } from "@/store/excursion-builder-slice/excursion-builder.slice";
import { useEffect } from "react";

const usePlaceCardForm = ({ place }: { place: IExcursionBuilderItem }) => {
  const form = useForm<IPlaceCardForm>({
    mode: "onChange",
    defaultValues: {
      description: place.excursionDescription || "",
      excursionDuration: place.excursionDuration || 15,
    },
  });

  useEffect(() => {
    form.reset({
      description: place.excursionDescription || "",
      excursionDuration: place.excursionDuration || 15,
    });
  }, [place.title]);

  return form;
};

export default usePlaceCardForm;
