import { useForm } from "react-hook-form-mui";
import { ICityFormContext } from "@/containers/admin/cities/city/interfaces";
import useLanguages from "@/hooks/useLanguages";

const useNewCityForm = () => {
  const languages = useLanguages();

  const formContext = useForm<ICityFormContext>({
    defaultValues: {
      titleTranslations: languages.map((lang) => ({
        langId: lang.id,
        text: "",
      })),
    },
    mode: "onChange",
  });

  return formContext;
};

export default useNewCityForm;
