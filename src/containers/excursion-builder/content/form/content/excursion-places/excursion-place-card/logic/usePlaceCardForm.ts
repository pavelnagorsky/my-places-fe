import { useForm } from "react-hook-form-mui";
import { IPlaceCardForm } from "@/containers/excursion-builder/content/form/content/excursion-places/excursion-place-card/logic/interfaces";
import {
  IExcursionBuilderItem,
  selectEditExcursionData,
} from "@/store/excursion-builder-slice/excursion-builder.slice";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

const usePlaceCardForm = ({ place }: { place: IExcursionBuilderItem }) => {
  const excursionData = useAppSelector(selectEditExcursionData);

  const form = useForm<IPlaceCardForm>({
    mode: "onChange",
    defaultValues: {
      description: place.excursionDescription || "",
      excursionDuration: place.excursionDuration || 15,
    },
  });

  useEffect(() => {
    if (!excursionData) return;
    form.reset({
      ...form.getValues(),
      description: place.excursionDescription ?? form.getValues("description"),
    });
  }, [excursionData]);

  return form;
};

export default usePlaceCardForm;
