import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form-mui";

export interface ISearchForm {
  typesCommercial: number[];
  types: number[];
  title: string;
  radius: number;
  searchByMe: boolean;
  search: string | null;
  locationTitle: string;
  locationInputValue: string;
}

const WithSearch = ({ children }: PropsWithChildren) => {
  const formContext = useForm<ISearchForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
      radius: 100,
      searchByMe: false,
      types: [],
      typesCommercial: [],
      search: null,
      locationTitle: "",
      locationInputValue: "",
    },
  });

  return <FormProvider {...formContext}>{children}</FormProvider>;
};

export default WithSearch;
