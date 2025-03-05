import { UseFieldArrayReturn } from "react-hook-form";
import { IExcursionBuilderForm } from "@/containers/excursion-builder/content/form/logic/interfaces";
import { createContext } from "react";
type ExcursionPlacesFieldArrayContextType = UseFieldArrayReturn<
  IExcursionBuilderForm,
  "places",
  "key"
>;

const ExcursionPlacesFieldArrayContext =
  createContext<ExcursionPlacesFieldArrayContextType>(
    {} as ExcursionPlacesFieldArrayContextType
  );

export default ExcursionPlacesFieldArrayContext;
