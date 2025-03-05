import { useContext } from "react";
import ExcursionPlacesFieldArrayContext from "@/containers/excursion-builder/content/form/content/excursion-places/context/ExcursionPlacesFieldArrayContext";

const useExcursionPlacesFieldArrayContext = () => {
  return useContext(ExcursionPlacesFieldArrayContext);
};

export default useExcursionPlacesFieldArrayContext;
