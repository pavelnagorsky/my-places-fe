import { PropsWithChildren } from "react";
import ExcursionPlacesFieldArrayContext from "@/containers/excursion-builder/content/form/content/excursion-places/context/ExcursionPlacesFieldArrayContext";
import { UseFieldArrayReturn } from "react-hook-form";
import { IExcursionBuilderForm } from "@/containers/excursion-builder/content/form/logic/interfaces";

const ExcursionPlacesFieldArrayProvider = ({
  children,
  ...props
}: UseFieldArrayReturn<IExcursionBuilderForm, "places", "key"> &
  PropsWithChildren) => {
  return (
    <ExcursionPlacesFieldArrayContext.Provider value={{ ...props }}>
      {children}
    </ExcursionPlacesFieldArrayContext.Provider>
  );
};

export default ExcursionPlacesFieldArrayProvider;
