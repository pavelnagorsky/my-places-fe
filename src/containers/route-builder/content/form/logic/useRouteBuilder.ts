import { useForm } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { useCallback } from "react";

const useRouteBuilder = () => {
  const form = useForm<IRouteBuilderForm>({
    mode: "onChange",
    shouldUseNativeValidation: false,
    defaultValues: {
      searchFrom: {
        isSearchByMe: false,
        coordinates: null,
        location: null,
      },
      searchTo: {
        isSearchByMe: false,
        coordinates: null,
        location: null,
      },
      addPlace: null,
      title: "Мой маршрут №1",
    },
  });

  const onSaveRoute = useCallback(() => {
    form.handleSubmit((data) => {
      console.log(data);
    })();
  }, []);

  return { form, onSaveRoute };
};

export default useRouteBuilder;
